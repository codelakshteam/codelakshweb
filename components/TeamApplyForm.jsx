'use client';

import { useState } from 'react';
import { SITE } from '@/lib/seo';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const OCCUPATIONS = ['Student', 'Working professional', 'Freelancer', 'Business owner', 'Sales / marketing', 'Homemaker', 'Other'];
const EXPERIENCE = ['No selling experience', 'Less than 1 year', '1 to 3 years', '3+ years'];
const REACH = ['Schools / institutes', 'Small businesses', 'Shops / retail', 'Startups', 'Friends & family network', 'Online / social media'];

const empty = { name: '', email: '', phone: '', city: '', occupation: '', experience: '', reach: '', message: '', website: '' };

// Campaign form: people apply to join the CodeLaksh sales team. Posts to /api/team-apply, which stores every entry.
export default function TeamApplyForm({ role = '' }) {
  const [f, setF] = useState(empty);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setF((cur) => ({ ...cur, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim()) return setError('Please enter your name.');
    if (!EMAIL_REGEX.test(f.email.trim())) return setError('Please enter a valid email address.');
    if (!PHONE_REGEX.test(f.phone)) return setError('Please enter a valid 10-digit mobile number.');
    if (!f.city.trim()) return setError('Please enter your city.');
    setError('');
    setSending(true);
    try {
      const source = new URLSearchParams(window.location.search).get('ref') || document.referrer || 'direct';
      const res = await fetch('/api/team-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, source, role }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'failed');
      }
      setDone(true);
    } catch (err) {
      setError(`Something went wrong${err.message && err.message !== 'failed' ? ` (${err.message})` : ''}. Please try again or call ${SITE.phoneDisplay}.`);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="join-done" role="status">
        <h3>Application received.</h3>
        <p>Thank you for applying to join the CodeLaksh team. We will call or message you on {f.phone} within 2 working days.</p>
      </div>
    );
  }

  const select = (id, label, key, options, cls) => (
    <div className={cls}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={f[key]} onChange={set(key)}>
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form className="join-form" onSubmit={submit} noValidate>
      <div className="join-grid">
        <div>
          <label htmlFor="j-name">Full name *</label>
          <input id="j-name" autoComplete="name" value={f.name} onChange={set('name')} maxLength={100} />
        </div>
        <div>
          <label htmlFor="j-phone">Mobile number *</label>
          <input
            id="j-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={f.phone}
            maxLength={10}
            onChange={(e) => setF((c) => ({ ...c, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
          />
        </div>
        <div>
          <label htmlFor="j-email">Email *</label>
          <input id="j-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} maxLength={150} />
        </div>
        <div>
          <label htmlFor="j-city">City *</label>
          <input id="j-city" autoComplete="address-level2" value={f.city} onChange={set('city')} maxLength={80} />
        </div>
        {select('j-occ', 'You are a', 'occupation', OCCUPATIONS)}
        {select('j-exp', 'Selling experience', 'experience', EXPERIENCE)}
        {select('j-reach', 'Who can you reach best?', 'reach', REACH, 'join-full')}
        <div className="join-full">
          <label htmlFor="j-msg">Why do you want to join us? (optional)</label>
          <textarea id="j-msg" rows={4} value={f.message} onChange={set('message')} maxLength={2000} />
        </div>
      </div>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="join-hp" aria-hidden="true">
        <label htmlFor="j-web">Website</label>
        <input id="j-web" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
      </div>
      {error && (
        <p className="join-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary join-submit" disabled={sending}>
        {sending ? 'Submitting...' : 'Apply to join the team'}
      </button>
    </form>
  );
}
