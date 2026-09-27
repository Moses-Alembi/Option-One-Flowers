"""Stamp local CSS/JS/image references with a content hash (?v=xxxxxxxx).

The URL of an asset only changes when the file itself changes, so browsers can
cache assets for a long time (see .htaccess) and still pick up every update.

Run from the project root before deploying:  python tools/version-assets.py
"""
import hashlib, re, sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent
REF = re.compile(
    r"""(?P<pre>(?:src|href|poster)=["']|url\(\s*['"]?)"""
    r"""(?P<path>(?:\.\./)?(?:css|js|images)/[^"'()?#\n]+)"""
    r"""(?:\?v=[0-9a-f]+)?"""
)

def digest(path):
    return hashlib.md5(path.read_bytes()).hexdigest()[:8]

def stamp(file):
    text = file.read_text(encoding="utf-8")
    missing = []
    def sub(m):
        target = (file.parent / unquote(m["path"])).resolve()
        if not target.is_file():
            missing.append(m["path"])
            return m[0]
        return f'{m["pre"]}{m["path"]}?v={digest(target)}'
    new = REF.sub(sub, text)
    if new != text:
        file.write_text(new, encoding="utf-8", newline="\n")
        print(f"updated {file.relative_to(ROOT)}")
    for p in missing:
        print(f"  warning: {file.relative_to(ROOT)} references missing file {p}", file=sys.stderr)

# Stylesheets first: their image hashes feed into the stylesheet's own hash.
for css in sorted((ROOT / "css").glob("*.css")):
    stamp(css)
for html in sorted(ROOT.glob("*.html")):
    stamp(html)
