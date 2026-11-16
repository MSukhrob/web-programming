// adds the "js" class and fades elements in when they scroll into view
(function () {
  document.documentElement.classList.add('js');
  var items = [].slice.call(document.querySelectorAll('.reveal'));
  items.forEach(function (e, i) { e.style.setProperty('--i', i % 6); });
  function check() {
    items.forEach(function (e) {
      if (!e.classList.contains('in') && e.getBoundingClientRect().top < window.innerHeight * 0.92) {
        e.classList.add('in');
      }
    });
  }
  check();
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
})();
