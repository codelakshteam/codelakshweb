'use client';

import { useEffect, useState } from 'react';

// The theme itself is applied before first paint by the inline script in app/layout.jsx (data-theme on <html>);
// this button only flips it and remembers the choice.
export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('cl-theme', next);
    } catch (e) {
      /* private mode: the theme just won't be remembered */
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true"></i>
    </button>
  );
}
