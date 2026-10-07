'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PLAY_STORE_URL } from '@/components/erpData';
import { erpViews } from '@/lib/home';

// Section 07. CodeLaksh ERP presented like a product launch: a large device frame whose screen switches between real
// product screenshots. All five screenshots are in the page; the tabs only change which one is visible.
export default function ProductLaunch() {
  const [view, setView] = useState(erpViews[0].id);
  const current = erpViews.find((v) => v.id === view);
  return (
    <section className="cx-section cx-product" aria-labelledby="product-title">
      <div className="cx-wrap">
        <p className="cx-eyebrow rv">Built by CodeLaksh</p>
        <h2 id="product-title" className="cx-h2 rv">
          CODELAKSH
          <span className="cx-grad"> ERP.</span>
        </h2>
        <p className="cx-product-lede rv">
          Our own billing, inventory, accounting and payments platform for Indian shops, restaurants and hotels. Offline-first
          on Windows, on Android through Google Play, and in sync through the cloud.
        </p>
        <div className="cx-product-grid">
          <div className="cx-device rv" data-cursor="EXPLORE">
            <div className="cx-device-bar" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="cx-device-screen">
              {erpViews.map((v, i) => (
                <Image
                  key={v.id}
                  src={v.src}
                  alt={v.alt}
                  width={1200}
                  height={617}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={v.id === view ? 'is-on' : ''}
                  sizes="(max-width: 900px) 92vw, 640px"
                />
              ))}
            </div>
          </div>
          <div className="cx-product-side rv">
            <div role="tablist" aria-label="CodeLaksh ERP screens" className="cx-tabs">
              {erpViews.map((v) => (
                <button key={v.id} type="button" role="tab" id={`tab-${v.id}`} aria-selected={v.id === view} aria-controls="erp-panel" className={v.id === view ? 'is-on' : ''} onClick={() => setView(v.id)}>
                  {v.label}
                </button>
              ))}
            </div>
            <div id="erp-panel" role="tabpanel" aria-labelledby={`tab-${view}`} className="cx-tabpanel">
              <h3>{current.label}</h3>
              <p>{current.text}</p>
            </div>
            <ul className="cx-product-points">
              <li>GST-ready invoicing, barcodes and printing</li>
              <li>Multi-branch, roles, approvals and live sync</li>
              <li>Plans from Rs. 3,499 per year, 7-day free trial on Growth</li>
            </ul>
            <div className="cx-actions">
              <a href="/erp" className="cx-pill cx-pill-solid cx-magnetic">
                Explore CodeLaksh ERP <span aria-hidden="true">&rarr;</span>
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="cx-pill cx-magnetic">
                Get it on Google Play
              </a>
            </div>
            <p className="cx-faint">Prices exclude 18% GST.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
