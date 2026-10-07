'use client';

import { useEffect, useState } from 'react';
import { initMusic, isMusicEnabled, setMusicEnabled } from '@/lib/music';
import { initSound, isEnabled, setEnabled } from '@/lib/sound';

// Two small instrument-style switches: Music (the score) and Sound (interface effects). Both remember their state.
function Switch({ kind }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const evt = kind === 'music' ? 'cl-music' : 'cl-sound';
    const read = () => setOn(kind === 'music' ? isMusicEnabled() : isEnabled());
    setOn(kind === 'music' ? initMusic() : initSound());
    window.addEventListener(evt, read);
    return () => window.removeEventListener(evt, read);
  }, [kind]);
  const label = kind === 'music' ? 'Music' : 'Sound';
  const toggle = () => (kind === 'music' ? setMusicEnabled(!isMusicEnabled()) : setEnabled(!isEnabled()));
  return (
    <button type="button" className={`fm-sound ${on ? 'is-on' : ''}`} aria-pressed={on} aria-label={`${label} ${on ? 'on. Turn off' : 'off. Turn on'}`} onClick={toggle}>
      <span className="fm-sound-bars" aria-hidden="true"><i></i><i></i><i></i></span>
      <span className="fm-sound-label">{label} {on ? 'on' : 'off'}</span>
    </button>
  );
}

export default function SoundToggle() {
  return (
    <span className="fm-audio">
      <Switch kind="music" />
      <Switch kind="sound" />
    </span>
  );
}
