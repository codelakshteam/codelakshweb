'use client';

import { useState } from 'react';
import { plans } from '@/components/erpData';

// Plan cards with a Monthly / Yearly switch. Growth, Business and Pro have a yearly price; Starter is already
// billed yearly.
export default function ErpPricing() {
  const [billing, setBilling] = useState('monthly');

  return (
    <>
      <div className="billing-toggle-wrap">
        <div className="billing-toggle" role="tablist" aria-label="Billing period">
          <button type="button" role="tab" aria-selected={billing === 'monthly'} className={billing === 'monthly' ? 'on' : ''} onClick={() => setBilling('monthly')}>
            Monthly
          </button>
          <button type="button" role="tab" aria-selected={billing === 'yearly'} className={billing === 'yearly' ? 'on' : ''} onClick={() => setBilling('yearly')}>
            Yearly
          </button>
        </div>
        <span className="billing-note">Growth, Business and Pro save about 17% when paid yearly. Starter is always billed yearly.</span>
      </div>

      <div className="erp-plan-grid">
        {plans.map((plan) => {
          const view = billing === 'yearly' && plan.yearly ? { ...plan, ...plan.yearly } : plan;
          return (
            <div className={`erp-plan ${view.featured ? 'featured' : ''}`} key={view.name}>
              {view.badge && <span className="erp-plan-badge">{view.badge}</span>}
              <h3>{view.name}</h3>
              <p className="erp-plan-tag">{view.tagline}</p>
              <div className="erp-plan-price">
                <strong>{view.price}</strong>
                <span>{view.cadence}</span>
              </div>
              <p className="erp-plan-extra">{view.extra}</p>
              <ul>
                {view.features.map((feature) => (
                  <li key={feature}>
                    <i className="fas fa-check" aria-hidden="true"></i> {feature}
                  </li>
                ))}
              </ul>
              <a
                href={view.href}
                className={`btn ${view.featured ? 'btn-primary' : 'btn-outline'}`}
                {...(view.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {view.cta}
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
