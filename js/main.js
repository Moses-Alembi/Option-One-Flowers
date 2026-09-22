document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    var hamburger = document.getElementById('menuToggle');
    var navMenu = header.querySelector('.main-nav');
    if (hamburger && navMenu) {
      var closeNav = function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      };
      var openNav = function () {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        document.body.classList.add('nav-open');
        hamburger.setAttribute('aria-expanded', 'true');
      };
      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) closeNav(); else openNav();
      });
      navMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeNav);
      });
      document.addEventListener('click', function (e) {
        if (!navMenu.classList.contains('active')) return;
        if (navMenu.contains(e.target) || hamburger.contains(e.target)) return;
        closeNav();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
      });
    }
  }

  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length) {
    var dotsWrap = document.getElementById('heroDots');
    var current = 0;
    var dots = [];
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        if (i === 0) b.className = 'is-active';
        b.setAttribute('aria-label', 'Show slide ' + (i + 1));
        b.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }
    var heroWord = document.getElementById('heroWord');
    function setWord(slide) {
      if (!heroWord) return;
      var word = slide.getAttribute('data-word');
      if (!word || word === heroWord.textContent) return;
      heroWord.classList.add('is-swapping');
      setTimeout(function () {
        heroWord.textContent = word;
        heroWord.classList.remove('is-swapping');
      }, 350);
    }
    // Taken off the stylesheet so the dissolve length can't drift out of step
    var FADE = (parseFloat(getComputedStyle(slides[0]).transitionDuration) || 1.6) * 1000;
    var MIN_HOLD = 2600;
    var timer = null;
    var startedAt = Date.now();

    // A clip looping back to its first frame while still on screen is the
    // plainest "it switched" tell there is, so a slide is held only as long as
    // its own clip can cover it: the dissolve out ends as the clip runs out.
    function holdFor(slide) {
      var v = slide.querySelector('video');
      var d = v ? v.duration : 0;
      if (!d || !isFinite(d)) return 5200;
      return Math.max(MIN_HOLD, d * 1000 - FADE - 200);
    }
    function schedule() {
      clearTimeout(timer);
      var slide = slides[current];
      var v = slide.querySelector('video');
      // duration is NaN until metadata lands; redo the sum once it arrives
      if (v && !(v.duration > 0)) v.addEventListener('loadedmetadata', schedule, { once: true });
      timer = setTimeout(function () {
        goTo((current + 1) % slides.length);
      }, Math.max(400, holdFor(slide) - (Date.now() - startedAt)));
    }
    function goTo(i) {
      if (i === current) return;
      var prev = slides[current];
      var prevVideo = prev.querySelector('video');
      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = i;
      startedAt = Date.now();
      var slide = slides[current];
      slide.classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
      var v = slide.querySelector('video');
      if (v) {
        try { v.currentTime = 0; } catch (e) {}
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      }
      // Swap the word inside the dissolve rather than on its first frame, so
      // the copy changing doesn't announce the slide changing
      setTimeout(function () { setWord(slide); }, FADE * 0.35);
      // Let the outgoing slide go only once it is completely covered; pausing
      // it any earlier leaves a frozen frame in plain sight
      setTimeout(function () {
        if (prev.classList.contains('is-active')) return;
        prev.classList.remove('is-leaving');
        if (prevVideo) prevVideo.pause();
      }, FADE);
      schedule();
    }
    // Buffer the clips that aren't on screen yet: a slide arriving still
    // loading shows its poster and then jumps into motion
    window.addEventListener('load', function () {
      slides.forEach(function (s, n) {
        var v = s.querySelector('video');
        if (!v || n === current) return;
        v.preload = 'auto';
        v.load();
      });
    });
    schedule();
  }

  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('newsletterNote');
      if (note) note.textContent = "Thanks! For now, please reach us directly at optionone368@gmail.com.";
    });
  }
});

var FLOWERS = [
  ['Rose', 'Rose.webp'],
  ['Red Roses', 'Red%20Roses.webp'],
  ['Strelitzia (Bird of Paradise)', 'Strelitzia.webp'],
  ['Arum Lily', 'Calla%20Lily.webp'],
  ['Asiatic Lily', 'Asiatic%20Lily.webp'],
  ['Tiger Lily', 'Tiger%20Lily.webp'],
  ['Gerbera', 'Gerbera.webp'],
  ['Hydrangea', 'Hydrangea.webp'],
  ['Standard Carnation', 'Standard%20Carnation.webp'],
  ['Gladiolus', 'Gladiolus.webp'],
  ['Delphinium', 'Deliphinium.webp'],
  ['Alstromeria', 'Alstromeria.webp'],
  ['Watsonia', 'Watsonia.webp'],
  ['Heliconia', 'Heliconia.webp'],
  ['Sun Flower', 'Sun%20Flower.webp'],
  ['Gypsophila', 'Gypsophilia.webp'],
  ['Hypericum Berries', 'Hypericum%20Berries.webp'],
  ['Solidago', 'Solidago.webp'],
  ['Snapdragon', 'Snapdragon.webp'],
  ['Craspedia', 'Craspedia.webp'],
  ['Veronica', 'Veronica.webp'],
  ['Pink Anthurium', 'Pink%20Anthurium.webp'],
  ['Red Anthurium', 'Red%20Anthurium.webp']
];

var FOLIAGE = [
  ['Ruscus', 'Rescus.webp'],
  ['Leather Fern', 'Leather%20Fern.webp'],
  ['Coprosma', 'Coprosma.webp'],
  ['Ivy', 'Ivy.webp'],
  ['Anthurium Leaves', 'Athurium%20Leaves.webp'],
  ['Dracaena / Cordyline', 'DraceneaCordline.webp'],
  ['Monstera', 'Monstera.webp'],
  ['Cycad', 'Cycad.webp'],
  ['Eucalyptus', 'Eucalyptus.webp']
];

function renderCatalogue(gridId, items, imgBase) {
  var grid = document.getElementById(gridId);
  if (!grid) return;
  items.forEach(function (item) {
    var card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = '<div class="cat-thumb"><img loading="lazy" src="' + imgBase + item[1] + '" alt="' + item[0] + '"></div><h4>' + item[0] + '</h4>';
    grid.appendChild(card);
  });
}
