'use client';

import { useEffect } from 'react';

// Blocks that fade up as they scroll into view. Only blocks that start below the fold are touched, so nothing flashes
// on first paint, and the classes are removed again once the animation is done (so hover effects keep working).
const SELECTOR = [
  '.section-header',
  '.about-grid > *',
  '.service-card',
  '.portfolio-item',
  '.contact-item',
  '.contact-form',
  '.erp-teaser-grid > *',
  '.kidodom-grid > *',
  '.erp-plan',
  '.erp-addon',
  '.erp-desktop-card',
  '.erp-faq-item',
  '.erp-phone-strip',
].join(', ');

export default function RevealOnScroll() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('in-view');
          observer.unobserve(el);
          setTimeout(() => el.classList.remove('reveal', 'in-view'), 800);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll(SELECTOR).forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
