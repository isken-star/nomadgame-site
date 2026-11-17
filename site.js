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
