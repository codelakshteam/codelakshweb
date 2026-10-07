'use client';

import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setSubmitError('');

    const form = e.target;
    const payload = {
      name: form.name.value,
      email,
      phone,
      service: form.service.value,
      message: form.message.value,
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Contact Us</span>
          <h2 className="section-title">
            Let&apos;s Build
            <br />
            <span className="highlight">Something Amazing</span>
          </h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              </div>
              <div>
                <h4>Visit Our Office</h4>
                <p>
                  CodeLaksh Office, Sangram Nagar
                  <br />
                  Aurangabad, India
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone-alt" aria-hidden="true"></i>
              </div>
              <div>
                <h4>Call Us</h4>
                <p>+91-9834684866</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </div>
              <div>
                <h4>Email Us</h4>
                <p>codelaksh@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-clock" aria-hidden="true"></i>
              </div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon-Sat: 10 AM to 7 PM</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="GitHub">
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            {submitted ? (
              <p>Thanks for reaching out! We&apos;ll get back to you soon.</p>
            ) : (
              <>
                <div className="form-row">
                  <input type="text" name="name" placeholder="Your Name" required />
                  <div className="form-field">
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    {emailError && <span className="field-error">{emailError}</span>}
                  </div>
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Please enter a 10-digit phone number"
                />
                <select name="service" defaultValue="">
                  <option value="">Select Service</option>
                  <option>AI Chatbot Development</option>
                  <option>Web Development</option>
                  <option>App Development</option>
                  <option>Machine Learning</option>
                  <option>Digital Marketing</option>
                </select>
                <textarea name="message" placeholder="Tell us about your project" rows={5} required></textarea>
                {submitError && <span className="field-error">{submitError}</span>}
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane" aria-hidden="true"></i>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
