'use client';

import { useState } from 'react';

function getBotResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi'))
    return 'Hello! 👋 Welcome to CodeLaksh! How can I help you today?';
  if (lower.includes('erp') || lower.includes('billing software') || lower.includes('invoice'))
    return 'CodeLaksh ERP: billing, inventory, accounting & payments. Starter Rs. 3,499/year, Growth Rs. 499/month (7-day free trial), Business Rs. 999/month, Pro Rs. 1,999/month (excl. GST). Yearly prepay saves ~17%. Details: codelaksh.in/erp. Android app on Google Play.';
  if (lower.includes('price') || lower.includes('cost'))
    return 'Our services vary based on requirements. Call +91-9834684866 or email codelaksh@gmail.com for a quote.';
  if (lower.includes('website') || lower.includes('web'))
    return 'We build modern websites using React, Node.js, Python. Contact us for a consultation!';
  if (lower.includes('chatbot') || lower.includes('ai'))
    return 'We develop intelligent AI chatbots for 24/7 customer support. Want to schedule a demo?';
  if (lower.includes('app') || lower.includes('mobile'))
    return "We create native and cross-platform mobile apps for iOS and Android. Let's discuss your app idea!";
  if (lower.includes('contact') || lower.includes('call'))
    return '📞 +91-9834684866 | 📧 codelaksh@gmail.com | 📍 Sangram Nagar, Aurangabad';
  if (lower.includes('thank')) return "You're welcome! 😊 Feel free to reach out for more questions.";
  return 'Thanks for your message! Our team will get back to you soon. For urgent queries, call +91-9834684866.';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hello! 👋 I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userInput = input;
    setMessages((prev) => [...prev, { from: 'user', text: userInput }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getBotResponse(userInput) }]);
    }, 800);
  };

  return (
    <div className="chatbot-widget">
      <button
        className="chatbot-toggle"
        id="chatToggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle chat"
      >
        <i className="fas fa-robot" aria-hidden="true"></i>
      </button>
      <div className={`chatbot-popup ${isOpen ? 'active' : ''}`} id="chatPopup">
        <div className="popup-header">
          <span>
            <i className="fas fa-robot" aria-hidden="true"></i> CodeLaksh AI
          </span>
          <button id="chatClose" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="popup-messages" id="chatMessages">
          {messages.map((message, index) => (
            <div className={`message ${message.from}`} key={index}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="popup-input">
          <input
            type="text"
            id="chatInput"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button id="chatSend" onClick={handleSend} aria-label="Send message">
            <i className="fas fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
