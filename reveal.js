// reveal.js - Scroll animations & Universal Dark/Light Mode Switcher
(function () {
  // 1. Theme Initialization: Default is 'dark'
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

  // 2. Inject Theme Toggle Button once DOM is ready
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

    // Find header or inject fixed
    var header = document.querySelector('header') || document.querySelector('.site-header');
    if (header) {
      // Ensure header displays items in flex row
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.appendChild(btn);
    } else {
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

  // Listen for storage changes across tabs
  window.addEventListener('storage', function (e) {
    if (e.key === 'site-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
      applyTheme(e.newValue);
    }
  });

  // 3. Scroll Reveal Animations
  document.documentElement.classList.add('js');
  var items = [].slice.call(document.querySelectorAll('.reveal'));
  items.forEach(function (e, i) { e.style.setProperty('--i', i % 6); });

  function checkReveal() {
    var trigger = window.innerHeight * 0.92;
    for (var i = 0; i < items.length; i++) {
      var e = items[i];
      if (!e.classList.contains('in') && e.getBoundingClientRect().top < trigger) {
        e.classList.add('in');
      }
    }
  }

  checkReveal();
  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('resize', checkReveal);
})();
