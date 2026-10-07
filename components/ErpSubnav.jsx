'use client';

import { useEffect, useState } from 'react';

const links = [
  { id: 'features', label: 'Features' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'industries', label: 'Industries' },
  { id: 'mobile', label: 'Mobile app' },
  { id: 'desktop', label: 'Desktop app' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

// Sticky in-page menu for /erp; highlights the block currently under the header.
export default function ErpSubnav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      let current = '';
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 190) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="erp-subnav" aria-label="On this page">
      <div className="erp-subnav-inner">
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} className={active === link.id ? 'is-active' : undefined}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
