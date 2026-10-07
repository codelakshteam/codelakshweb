'use client';

import { useState } from 'react';
import { play } from '@/lib/sound';
import { SITE } from '@/lib/seo';
import { contactTypes } from '@/lib/home';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Section 12. A three-step form (what / tell us / who) posting the same payload as the original contact form to the
// same /api/contact endpoint. Direct email and phone links stay visible as plain HTML.
export default function ContactExperience({ id = 'contact', heading = 'h2' }) {
  const [step, setStep] = useState(0);
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const Heading = heading;

  const toggle = (t) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  const next = () => {
    setError('');
    if (step === 0 && !types.length) return setError('Choose at least one option to continue.');
    if (step === 1 && message.trim().length < 5) return setError('Tell us a little about it so we can reply usefully.');
    return setStep(step + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please enter your name.');
    if (!EMAIL_REGEX.test(email)) return setError('Please enter a valid email address.');
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email, phone, service: types.join(', '), message: message.trim() }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      play('chime');
    } catch {
      setError(`Something went wrong. Please try again or email ${SITE.email}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="fm-contact" id={id} data-tone="light" aria-labelledby="contact-title">
      <div className="fm-contact-glow" aria-hidden="true"></div>
      <div className="fm-wrap">
        <p className="fm-label rv">Start a conversation</p>
        <Heading id="contact-title" className="fm-mega fm-mega-contact rv">
          LET&rsquo;S BUILD
          <br />
          <span className="">WHAT&rsquo;S NEXT.</span>
        </Heading>
        <div className="fm-contact-grid">
          <div className="rv">
            <p className="fm-contact-lede">
              Have an idea? Have a problem? Need a digital product? Let&rsquo;s talk. Tell us what you are building and we will reply
              with questions, a suggested approach and a written estimate.
            </p>
            <ul className="fm-direct">
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                Sangram Nagar, {SITE.city} ({SITE.cityAlt}), {SITE.region}
              </li>
              <li>Second branch: Hadapsar, Pune, Maharashtra (same phone)</li>
              <li>Mon to Sat, 10:00 to 19:00 IST</li>
            </ul>
          </div>
          <form className="fm-form rv" onSubmit={submit} noValidate>
            {done ? (
              <div className="fm-done" role="status">
                <h3>Thank you.</h3>
                <p>We have your message and will get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="fm-form-top" aria-hidden="true">
                  <span>{String(step + 1).padStart(2, '0')} / 03</span>
                  <i style={{ '--w': `${((step + 1) / 3) * 100}%` }}></i>
                </div>
                <div aria-live="polite">
                  {step === 0 && (
                    <fieldset>
                      <legend>WHAT ARE YOU BUILDING?</legend>
                      <div className="fm-types">
                        {contactTypes.map((t) => (
                          <button key={t} type="button" aria-pressed={types.includes(t)} className={types.includes(t) ? 'is-on' : ''} onClick={() => toggle(t)}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  {step === 1 && (
                    <div>
                      <label htmlFor="fm-msg">TELL US ABOUT IT</label>
                      <textarea id="fm-msg" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What problem are you solving? Who is it for?" />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="fm-fields">
                      <p className="fm-legend">CONTACT DETAILS</p>
                      <label htmlFor="fm-name">Name</label>
                      <input id="fm-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                      <label htmlFor="fm-email">Email</label>
                      <input id="fm-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <label htmlFor="fm-phone">Phone (optional)</label>
                      <input id="fm-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} />
                    </div>
                  )}
                </div>
                {error && (
                  <p className="fm-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="fm-form-actions">
                  {step > 0 && (
                    <button type="button" className="fm-btn" onClick={() => setStep(step - 1)}>
                      Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button type="button" className="fm-btn fm-btn-solid" onClick={next}>
                      Continue <span aria-hidden="true">&rarr;</span>
                    </button>
                  ) : (
                    <button type="submit" className="fm-btn fm-btn-solid" disabled={sending}>
                      {sending ? 'Sending...' : "LET'S BUILD IT"} <span aria-hidden="true">&rarr;</span>
                    </button>
                  )}
                </div>
              </>
            )}
            <noscript>
              <p>
                JavaScript is needed for this form. Please email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </noscript>
          </form>
        </div>
      </div>
    </section>
  );
}
