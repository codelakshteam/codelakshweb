'use client';

import { useEffect, useState } from 'react';
import { initSound, isEnabled, setEnabled } from '@/lib/sound';

// Small instrument-style switch: three bars that move while sound is on. Remembers the choice.
export default function SoundToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    setOn(initSound());
    const sync = () => setOn(isEnabled());
    window.addEventListener('cl-sound', sync);
    return () => window.removeEventListener('cl-sound', sync);
  }, []);
  return (
    <button type="button" className={`fm-sound ${on ? 'is-on' : ''}`} aria-pressed={on} aria-label={on ? 'Sound on. Turn sound off' : 'Sound off. Turn sound on'} onClick={() => setEnabled(!isEnabled())}>
      <span className="fm-sound-bars" aria-hidden="true"><i></i><i></i><i></i></span>
      <span className="fm-sound-label">Sound {on ? 'on' : 'off'}</span>
    </button>
  );
}
