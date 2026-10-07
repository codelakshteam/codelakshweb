'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SoundToggle from '@/components/film/SoundToggle';
import { SITE } from '@/lib/seo';

const links = [
  { href: '/portfolio', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/technology', label: 'Technology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// A thin instrument bar. mix-blend-mode: difference keeps it legible over both light and dark scenes; it tucks away
// when scrolling down and returns on the way up. On phones the menu is a full-screen sheet with large type.
export default function Navigation() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [top, setTop] = useState(true);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setTop(y < 40);
      if (Math.abs(y - last.current) > 8) {
        setHidden(y > last.current && y > 200);
        last.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (window.__lenis) (open ? window.__lenis.stop() : window.__lenis.start());
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, [open]);

  const active = (h) => pathname === h || pathname.startsWith(`${h}/`);
  return (
    <>
      <a className="fm-skip" href="#main">Skip to content</a>
      <header className={`fm-nav ${hidden && !open ? 'is-hidden' : ''} ${top ? 'is-top' : ''}`}>
        <a href="/" className="fm-brand" aria-label="CodeLaksh home">
          <Image src="/logo-white-header.png" alt="" width={26} height={21} priority />
          <span>CODELAKSH</span>
        </a>
        <nav className="fm-nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined}>{l.label}</a>
          ))}
        </nav>
        <SoundToggle />
        <a href="/contact" className="fm-nav-cta" data-cta>
          Start a project <span aria-hidden="true">&#8599;</span>
        </a>
        <button type="button" className="fm-burger" aria-expanded={open} aria-controls="fm-sheet" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((v) => !v)}>
          <span></span><span></span>
        </button>
      </header>
      <div id="fm-sheet" className={`fm-sheet ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          <ol>
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i }}>
                <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  <small>{String(i + 1).padStart(2, '0')}</small>{l.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="fm-sheet-foot">
          <SoundToggle />
          <a href={`mailto:${SITE.email}`} tabIndex={open ? 0 : -1}>{SITE.email}</a>
          <a href={`tel:${SITE.phone}`} tabIndex={open ? 0 : -1}>{SITE.phoneDisplay}</a>
        </div>
      </div>
    </>
  );
}
