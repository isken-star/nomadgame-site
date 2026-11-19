// NOMAD website: header backdrop on scroll, fade-in on scroll, and the contents list's current section.
(function () {
  var top = document.getElementById('top');
  function onScroll() { if (top) top.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // The language picker closes on a tap anywhere else, or on Escape.
  var picker = document.querySelector('details.lang');
  if (picker) {
    document.addEventListener('click', function (e) { if (picker.open && !picker.contains(e.target)) picker.open = false; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') picker.open = false; });
  }

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });

  var links = document.querySelectorAll('.toc a');
  if (!links.length) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('active'); });
      var a = byId[e.target.id];
      if (a) a.classList.add('active');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  Object.keys(byId).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });
})();

// The App Store link. Until version 1.0 is released Apple's link shows "not available",
// so the buttons keep saying "Coming soon". On launch day set live to true (or preview a
// page with ?store=live): every download button then links to the App Store in the
// visitor's own country, and the closing line says the game is out.
(function () {
  var STORE = { live: true, url: 'https://apps.apple.com/app/id6832766971' };
  if (!STORE.live && !/[?&]store=live\b/.test(location.search)) return;
  document.querySelectorAll('[data-store]').forEach(function (a) {
    a.href = STORE.url;
    var label = a.querySelector('[data-store-text]');
    if (label) label.textContent = a.getAttribute('data-live-text');
  });
  document.querySelectorAll('[data-store-line]').forEach(function (p) {
    p.textContent = p.getAttribute('data-store-line');
  });
})();
