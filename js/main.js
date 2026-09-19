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
  ['Rose', 'Rose.webp'],
  ['Red Roses', 'Red%20Roses.webp'],
  ['Strelitzia', 'Strelitzia.webp'],
  ['Arum Lily', 'Arum%20Lily.webp'],
  ['Calla Lily', 'Calla%20Lily.webp'],
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
  ['Eryngium', 'Eryngium.webp'],
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
