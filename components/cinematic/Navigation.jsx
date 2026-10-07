'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/seo';

const links = [
  { href: '/portfolio', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/technology', label: 'Technology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Transparent over the hero, then a compact floating bar once the page scrolls. On phones the menu is a full-screen
// overlay with large, thumb-sized links instead of a collapsed desktop bar.
export default function Navigation() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const active = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a className="cx-skip" href="#main">
        Skip to content
      </a>
      <header className={`cx-nav ${scrolled ? 'is-compact' : ''} ${open ? 'is-open' : ''}`}>
        <div className="cx-nav-bar">
          <a href="/" className="cx-brand" aria-label="CodeLaksh home">
            <Image src="/logo-white-header.png" alt="" width={30} height={24} priority />
            <span>CodeLaksh</span>
          </a>
          <nav className="cx-nav-links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="/contact" className="cx-pill cx-magnetic cx-nav-cta">
            Start a Project
          </a>
          <button
            type="button"
            className="cx-burger"
            aria-expanded={open}
            aria-controls="cx-overlay"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div id="cx-overlay" className={`cx-overlay ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          <ol>
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i }}>
                <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="cx-overlay-foot">
          <a href="/contact" className="cx-pill cx-pill-solid" tabIndex={open ? 0 : -1}>
            Start a Project
          </a>
          <a href={`mailto:${SITE.email}`} tabIndex={open ? 0 : -1}>
            {SITE.email}
          </a>
          <a href={`tel:${SITE.phone}`} tabIndex={open ? 0 : -1}>
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
