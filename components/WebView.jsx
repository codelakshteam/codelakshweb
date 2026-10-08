'use client';

import { useState } from 'react';

// Live look at a site inside a phone-style frame. The page is only requested after the visitor taps, so it costs
// nothing on load. If the site refuses to be framed, the visitor still has the direct link.
export default function WebView({ url, title }) {
  const [on, setOn] = useState(false);
  return (
    <div className="wv">
      <div className="wv-phone">
        <div className="wv-bar" aria-hidden="true"><span></span><em>{url.replace('https://', '')}</em></div>
        {on ? (
          <iframe src={url} title={title} loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
        ) : (
          <button type="button" className="wv-start" onClick={() => setOn(true)}>
            <i className="fas fa-play" aria-hidden="true"></i>
            <span>Tap to load the live web app</span>
          </button>
        )}
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Open {url.replace('https://', '')}</a>
    </div>
  );
}
