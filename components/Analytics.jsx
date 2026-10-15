'use client';

import { useEffect } from 'react';

// Lightweight conversion tracking. Pushes named events to window.dataLayer and, when a gtag/GA4 tag is installed,
// to gtag too. With no tag installed it only fills dataLayer, so it is harmless until analytics is connected.
// A click on a call / email / WhatsApp link is an intent signal, not a lead: the completed enquiry is the separate
// `generate_lead` event fired by the contact form after a successful submit.
export function track(event, params = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
  } catch {}
}

function classify(a) {
  const href = a.getAttribute('href') || '';
  if (href.startsWith('tel:')) return 'call_click';
  if (href.startsWith('mailto:')) return 'email_click';
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp_click';
  if (/^\/erp(#|$)|^\/portfolio\/codelaksh-erp/.test(href) && a.hasAttribute('data-cta')) return 'erp_demo_click';
  if (/^\/contact(#|$)/.test(href) && a.hasAttribute('data-cta')) return 'enquiry_cta_click';
  return null;
}

export default function Analytics() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const event = classify(a);
      if (event) track(event, { link_url: a.getAttribute('href'), page_path: location.pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
