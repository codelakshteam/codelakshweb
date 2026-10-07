'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { PLAY_STORE_URL } from '@/components/erpData';

// `section` is the id of the matching block on the home page, used to highlight the link while scrolling there.
// Every link is a real, crawlable page URL.
const navLinks = [
  { href: '/', label: 'Home', section: 'home' },
  { href: '/about', label: 'About', section: 'about' },
  { href: '/services', label: 'Services', section: 'services' },
  { href: '/erp', label: 'CodeLaksh ERP', section: 'erp' },
  { href: '/portfolio', label: 'Portfolio', section: 'portfolio' },
  { href: '/contact', label: 'Contact', section: 'contact' },
];

// Every block on the home page, in page order. The Kidodom block has no menu item of its own.
const HOME_SECTIONS = ['home', 'about', 'services', 'erp', 'kidodom', 'portfolio', 'contact'];

export default function Header() {
  const pathname = usePathname() || '/';
  const onHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      if (!onHome) return;
      // The active block is the last one whose top has passed just below the fixed header.
      let current = HOME_SECTIONS[0];
      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  const isActive = (link) => {
    if (onHome) return activeSection === link.section;
    if (link.href === '/') return false;
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true"></div>
      <div className="container">
        <nav className="navbar">
          <a href="/" className="logo">
            <Image className="logo-img-dark" src="/logo-white-header.png" alt="CodeLaksh logo" width={36} height={29} priority />
            <Image className="logo-img-light" src="/logo-header.png" alt="" width={36} height={31} priority />
            <span>CodeLaksh</span>
          </a>
          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={active ? 'is-active' : undefined}
                    aria-current={active ? (onHome ? 'location' : 'page') : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="nav-cta-mobile">
              <a className="btn btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google-play" aria-hidden="true"></i> Get the app
              </a>
            </li>
          </ul>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="btn btn-primary btn-sm" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google-play" aria-hidden="true"></i> Get the app
            </a>
            <div
              className="hamburger"
              id="hamburger"
              role="button"
              tabIndex={0}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setMenuOpen((open) => !open);
              }}
            >
              <i className={`fas ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
