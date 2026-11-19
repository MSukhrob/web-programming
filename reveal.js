// reveal.js - Scroll animations & Universal Dark/Light Mode Switcher
(function () {
  // ----------------------------------------------------
  // 1. Theme Initialization: Default is 'dark'
  // ----------------------------------------------------
  function getPreferredTheme() {
    var saved = localStorage.getItem('site-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'dark'; // Dark mode by default across entire site
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    var btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      if (theme === 'dark') {
        btn.innerHTML = '&#9728;&#65039; Light Mode';
        btn.setAttribute('aria-label', 'Switch to light mode');
        btn.setAttribute('title', 'Switch to light mode');
      } else {
        btn.innerHTML = '&#127769; Dark Mode';
        btn.setAttribute('aria-label', 'Switch to dark mode');
        btn.setAttribute('title', 'Switch to dark mode');
      }
    }
  }

  // Apply theme immediately
  var currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // ----------------------------------------------------
  // 2. Inject Theme Toggle Button once DOM is ready
  // ----------------------------------------------------
  function initThemeButton() {
    if (document.getElementById('theme-toggle-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.className = 'theme-toggle-btn';

    btn.addEventListener('click', function () {
      var activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      var nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('site-theme', nextTheme);
      applyTheme(nextTheme);
    });

    var header = document.querySelector('header') || document.querySelector('.site-header');
    if (header) {
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.appendChild(btn);
    } else if (document.body) {
      btn.style.position = 'fixed';
      btn.style.top = '14px';
      btn.style.right = '16px';
      btn.style.zIndex = '99999';
      btn.style.boxShadow = '0 4px 14px rgba(0,0,0,0.4)';
      document.body.appendChild(btn);
    }

    applyTheme(document.documentElement.getAttribute('data-theme') || currentTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeButton);
  } else {
    initThemeButton();
  }

  window.addEventListener('storage', function (e) {
    if (e.key === 'site-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
      applyTheme(e.newValue);
    }
  });

  // ----------------------------------------------------
  // 3. Dynamic Scroll Reveal Animations (React & Babel safe)
  // ----------------------------------------------------
  document.documentElement.classList.add('js');

  function checkReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    var trigger = window.innerHeight * 0.95;

    for (var i = 0; i < items.length; i++) {
      var e = items[i];
      if (!e.style.getPropertyValue('--i')) {
        e.style.setProperty('--i', i % 6);
      }
      if (!e.classList.contains('in')) {
        var rect = e.getBoundingClientRect();
        // Reveal if element top is above viewport bottom, or if element is in viewport
        if (rect.top < trigger && rect.bottom > -100) {
          e.classList.add('in');
        }
      }
    }
  }

  // Check immediately and on events
  checkReveal();
  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('resize', checkReveal);
  window.addEventListener('DOMContentLoaded', checkReveal);
  window.addEventListener('load', checkReveal);

  // Interval fallbacks for dynamically rendered frameworks (React / Babel)
  setTimeout(checkReveal, 50);
  setTimeout(checkReveal, 200);
  setTimeout(checkReveal, 500);
  setTimeout(checkReveal, 1000);
  setTimeout(checkReveal, 2000);

  // MutationObserver to automatically reveal any element dynamically added
  if (window.MutationObserver) {
    var observer = new MutationObserver(function () {
      checkReveal();
    });
    var target = document.body || document.documentElement;
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  }
})();
