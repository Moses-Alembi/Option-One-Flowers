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
