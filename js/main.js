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

    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        header.classList.toggle('nav-open');
      });
      document.querySelectorAll('.main-nav a').forEach(function (a) {
        a.addEventListener('click', function () {
          header.classList.remove('nav-open');
        });
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
    function goTo(i) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = i;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }
    setInterval(function () {
      goTo((current + 1) % slides.length);
    }, 6000);
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
  ['Rose', 'Rose.png'],
  ['Red Roses', 'Red%20Roses.png'],
  ['Strelitzia', 'Strelitzia.png'],
  ['Arum Lily', 'Arum%20Lily.png'],
  ['Asiatic Lily', 'Asiatic%20Lily.png'],
  ['Tiger Lily', 'Tiger%20Lily.png'],
  ['Gerbera', 'Gerbera.png'],
  ['Hydrangea', 'Hydrangea.png'],
  ['Standard Carnation', 'Standard%20Carnation.png'],
  ['Gladiolus', 'Gladiolus.png'],
  ['Delphinium', 'Deliphinium.png'],
  ['Alstromeria', 'Alstromeria.png'],
  ['Watsonia', 'Watsonia.png'],
  ['Heliconia', 'Heliconia.png'],
  ['Sun Flower', 'Sun%20Flower.png'],
  ['Gypsophila', 'Gypsophilia.png'],
  ['Hypericum Berries', 'Hypericum%20Berries.png'],
  ['Solidago', 'Solidago.png']
];

var FOLIAGE = [
  ['Ruscus', 'Rescus.png'],
  ['Leather Fern', 'Leather%20Fern.png'],
  ['Coprosma', 'Coprosma.png'],
  ['Ivy', 'Ivy.png'],
  ['Anthurium Leaves', 'Athurium%20Leaves.png'],
  ['Dracaena / Cordyline', 'DraceneaCordline.png'],
  ['Monstera', 'Monstera.png'],
  ['Cycad', 'Cycad.png']
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
