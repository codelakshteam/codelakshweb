import Blueprint from '@/components/film/Blueprint';
import { facts, story, studioLines } from '@/lib/home';

// The studio: a brand statement, not an SEO block. Name, place and a short, verified history.
export default function Studio() {
  return (
    <section className="fm-studio" data-tone="light" aria-labelledby="studio-title">
      <Blueprint />
      <div className="fm-wrap">
        <p className="fm-label">The studio</p>
        <h2 className="fm-mega fm-studio-title" id="studio-title">THE STUDIO.</h2>
        <ul className="fm-place">
          {studioLines.map(([t, k], i) => (
            <li key={t} className="rv" style={{ '--i': i }}><small>{k}</small><span>{t}</span></li>
          ))}
        </ul>
        <p className="fm-meta rv">19.8762&deg; N &nbsp; 75.3433&deg; E &nbsp;&middot;&nbsp; Sangram Nagar</p>
        <ol className="fm-chron">
          {story.map((s, i) => (
            <li key={s.k} className="rv" style={{ '--i': i }}>
              <small>{String(i + 1).padStart(2, '0')}</small>
              <h3>{s.k}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
        <dl className="fm-spec">
          {facts.map((f) => (
            <div key={f.l} className="rv">
              <dt>{f.l}</dt>
              <dd><b>{f.v}</b><span>{f.d}</span></dd>
            </div>
          ))}
        </dl>
        <p className="fm-also rv"><a className="fm-link" href="/about">Read the studio story <i aria-hidden="true">&rarr;</i></a></p>
      </div>
    </section>
  );
}
