'use client';

import { useEffect, useRef, useState } from 'react';
import { play } from '@/lib/sound';

function getBotResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi'))
    return 'Hello! 👋 Welcome to CodeLaksh! How can I help you today?';
  if (lower.includes('erp') || lower.includes('billing software') || lower.includes('invoice') || lower.includes('pricing'))
    return 'CodeLaksh ERP: billing, inventory, accounting & payments. Starter Rs. 3,499/year, Growth Rs. 499/month (7-day free trial), Business Rs. 999/month, Pro Rs. 1,999/month (excl. GST). Yearly prepay saves ~17%. Details: codelaksh.in/erp. Android app on Google Play.';
  if (lower.includes('price') || lower.includes('cost'))
    return 'Our services vary based on requirements. Call +91-9834684866 or email codelaksh@gmail.com for a quote.';
  if (lower.includes('website') || lower.includes('web'))
    return 'We build modern websites using React, Node.js, Python. Contact us for a consultation!';
  if (lower.includes('chatbot') || lower.includes('ai'))
    return 'We develop intelligent AI chatbots for 24/7 customer support. Want to schedule a demo?';
  if (lower.includes('app') || lower.includes('mobile'))
    return "We create native and cross-platform mobile apps for iOS and Android. Let's discuss your app idea!";
  if (lower.includes('service'))
    return 'We build custom software, web and mobile apps, AI and chatbots, ERP, cloud solutions, e-commerce and digital marketing. See codelaksh.in/services.';
  if (lower.includes('contact') || lower.includes('call'))
    return '📞 +91-9834684866 | 📧 codelaksh@gmail.com | 📍 Sangram Nagar, Chhatrapati Sambhajinagar (Aurangabad)';
  if (lower.includes('thank')) return "You're welcome! 😊 Feel free to reach out for more questions.";
  return 'Thanks for your message! Our team will get back to you soon. For urgent queries, call +91-9834684866.';
}

const QUICK = ['ERP pricing', 'Our services', 'Contact details'];

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z" />
    <path d="M9 8.5h6M9 11.5h3.5" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hello! I'm the CodeLaksh assistant. Ask about our services, ERP plans or how to reach us." }]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current && inputRef.current.focus();
  }, [isOpen]);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const send = (text) => {
    const userInput = (text ?? input).trim();
    if (!userInput) return;
    setMessages((prev) => [...prev, { from: 'user', text: userInput }]);
    setInput('');
    play('tick');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getBotResponse(userInput) }]);
      play('tick');
    }, 700);
  };

  return (
    <div className={`fm-chat ${isOpen ? 'is-open' : ''}`}>
      <section className="fm-chat-panel" id="chatPopup" role="dialog" aria-label="CodeLaksh assistant" aria-hidden={!isOpen}>
        <header>
          <div>
            <p className="fm-chat-title">CodeLaksh assistant</p>
            <p className="fm-chat-status"><i></i> Online</p>
          </div>
          <button type="button" className="fm-chat-x" onClick={() => setIsOpen(false)} aria-label="Close chat" tabIndex={isOpen ? 0 : -1}><CloseIcon /></button>
        </header>
        <div className="fm-chat-list" ref={listRef} aria-live="polite">
          {messages.map((m, i) => (
            <p className={`fm-msg fm-msg-${m.from}`} key={i}>{m.text}</p>
          ))}
        </div>
        <div className="fm-chat-quick">
          {QUICK.map((q) => (
            <button type="button" key={q} onClick={() => send(q)} tabIndex={isOpen ? 0 : -1}>{q}</button>
          ))}
        </div>
        <form className="fm-chat-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input ref={inputRef} type="text" placeholder="Type a message" aria-label="Your message" value={input} onChange={(e) => setInput(e.target.value)} tabIndex={isOpen ? 0 : -1} />
          <button type="submit" aria-label="Send message" tabIndex={isOpen ? 0 : -1}><SendIcon /></button>
        </form>
      </section>
      <button type="button" className="fm-chat-launch" id="chatToggle" onClick={() => setIsOpen((o) => !o)} aria-expanded={isOpen} aria-controls="chatPopup" aria-label={isOpen ? 'Close chat' : 'Open chat with CodeLaksh'}>
        <span className="fm-chat-ring" aria-hidden="true"></span>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
        <i className="fm-chat-dot" aria-hidden="true"></i>
      </button>
    </div>
  );
}
