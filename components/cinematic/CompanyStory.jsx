import { facts, story } from '@/lib/home';

// Sections 10 and 11. An editorial timeline and a credibility strip. Only verified facts are used: no founding year,
// no client counts, no testimonials until they are confirmed for public use.
export default function CompanyStory() {
  return (
    <section className="cx-section cx-story" aria-labelledby="story-title">
      <div className="cx-wrap">
        <p className="cx-eyebrow rv">Our story</p>
        <h2 id="story-title" className="cx-h2 rv">
          A STUDIO IN
          <br />
          <span className="cx-grad">CHHATRAPATI SAMBHAJINAGAR.</span>
        </h2>
        <ol className="cx-story-list">
          {story.map((s, i) => (
            <li key={s.k} className="rv" style={{ '--i': i }}>
              <span className="cx-story-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.k}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
        <h3 className="cx-eyebrow cx-facts-title rv">On the record</h3>
        <dl className="cx-facts">
          {facts.map((f) => (
            <div key={f.l} className="rv">
              <dt>{f.l}</dt>
              <dd>
                <b>{f.v}</b>
                <span>{f.d}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="cx-story-note rv">
          We build for retail and distribution, restaurants and hotels, medical stores, bakeries and sweet marts, salons and
          growing companies replacing spreadsheets. <a href="/about">More about CodeLaksh</a> and{' '}
          <a href="/locations/aurangabad">our studio in Chhatrapati Sambhajinagar (Aurangabad)</a>.
        </p>
      </div>
    </section>
  );
}
