/**
 * Dark Academia Theme Interactive Features
 */

(function() {
  'use strict';

  // Theme Toggle
  function toggleTheme() {
    const current = document.body.dataset.theme || document.documentElement.dataset.theme || 'dark';
    const newTheme = current === 'dark' ? 'light' : 'dark';

    // Set on both html and body for CSS compatibility
    document.documentElement.dataset.theme = newTheme;
    document.body.dataset.theme = newTheme;

    try {
      localStorage.setItem('academia-theme', newTheme);
    } catch (e) {
      // localStorage not available
    }
  }

  function loadThemePreference() {
    try {
      const saved = localStorage.getItem('academia-theme');
      if (saved) {
        // Set on both html and body for CSS compatibility
        document.documentElement.dataset.theme = saved;
        document.body.dataset.theme = saved;
      }
    } catch (e) {
      // localStorage not available
    }
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.site-nav')?.offsetHeight || 60;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 32;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          history.pushState(null, '', href);
        }
      });
    });
  }

  // Keyboard shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select')) return;

      // Ctrl+T or Cmd+T: Toggle theme
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Theme toggle button click
    document.querySelectorAll('.theme-btn, [data-hotkey="ctrl+t"]').forEach(button => {
      button.addEventListener('click', toggleTheme);
    });
  }

  // Initialize
  function init() {
    loadThemePreference();
    initSmoothScroll();
    initKeyboardShortcuts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
