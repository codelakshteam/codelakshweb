'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useScrollProgress, useOnScreen } from '@/components/film/hooks';
import { film, setAct } from '@/lib/film';
import { erpViews } from '@/lib/home';

// Projects as product launches: three full-screen scenes on a pinned horizontal rail. The fixed stage behind them
// resolves its network into an interface grid, so each product appears to be built out of the network you just saw.
export default function Work() {
  const ref = useRef(null);
  const on = useOnScreen(ref, '0px');
  const [view, setView] = useState(erpViews[0].id);
  useScrollProgress(ref, { mode: 'pin', onChange: (p) => (film.p.work = p) });
  useEffect(() => {
    setAct('work', on);
    return () => setAct('work', false);
  }, [on]);
  const cur = erpViews.find((v) => v.id === view);

  return (
    <section className="fm-work" ref={ref} data-tone="dark" style={{ '--n': 3, '--d': 2 }} aria-label="Selected work">
      <div className="fm-pin">
        <div className="fm-rail-x">
          <article className="fm-scene" style={{ '--k': 0 }}>
            <div className="fm-scene-copy">
              <p className="fm-meta">Project 01 / 02 &nbsp;&middot;&nbsp; Digital platform</p>
              <h3>CODELAKSH<br />ERP</h3>
              <p className="fm-keys-line">ERP &nbsp;/&nbsp; Desktop &nbsp;/&nbsp; Mobile &nbsp;/&nbsp; Cloud</p>
              <p className="fm-story">Billing, inventory, accounting and payments for Indian shops, restaurants and hotels. It bills offline at the counter, syncs to the cloud and runs on Android.</p>
              <div className="fm-tabs" role="tablist" aria-label="CodeLaksh ERP screens">
                {erpViews.map((v) => (
                  <button key={v.id} type="button" role="tab" aria-selected={v.id === view} id={`wk-${v.id}`} aria-controls="wk-panel" className={v.id === view ? 'is-on' : ''} onClick={() => setView(v.id)}>{v.label}</button>
                ))}
              </div>
              <p className="fm-tabtext" id="wk-panel" role="tabpanel" aria-labelledby={`wk-${view}`}>{cur.text}</p>
              <a href="/portfolio/codelaksh-erp" className="fm-btn fm-btn-solid" data-cursor="EXPLORE &rarr;">Read the case study <i aria-hidden="true">&rarr;</i></a>
            </div>
            <div className="fm-shot fm-shot-wide" data-cursor="EXPLORE &rarr;">
              <div className="fm-device">
                <div className="fm-device-bar" aria-hidden="true"><i></i><i></i><i></i></div>
                <div className="fm-device-screen">
                  {erpViews.map((v, i) => (
                    <Image key={v.id} src={v.src} alt={v.alt} width={1200} height={617} loading={i === 0 ? 'eager' : 'lazy'} className={v.id === view ? 'is-on' : ''} sizes="(max-width: 900px) 92vw, 52vw" />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="fm-scene" style={{ '--k': 1 }}>
            <div className="fm-scene-copy">
              <p className="fm-meta">Project 02 / 02 &nbsp;&middot;&nbsp; Digital platform</p>
              <h3>KIDODOM</h3>
              <p className="fm-keys-line">Mobile &nbsp;/&nbsp; E-commerce &nbsp;/&nbsp; iOS &nbsp;/&nbsp; Android</p>
              <p className="fm-story">A shopping and guidance app for parents of young children: a vaccination tracker, developmental milestones, contests and deals, on the App Store and Google Play.</p>
              <a href="/portfolio/kidodom" className="fm-btn fm-btn-solid" data-cursor="EXPLORE &rarr;">Read the case study <i aria-hidden="true">&rarr;</i></a>
            </div>
            <div className="fm-shot fm-shot-phones" data-cursor="EXPLORE &rarr;">
              <Image src="/kidodom-assets/2-discover.webp" alt="Kidodom app home screen with product categories" width={520} height={1125} loading="lazy" sizes="(max-width: 900px) 44vw, 20vw" />
              <Image src="/kidodom-assets/5-guidance.webp" alt="Kidodom guidance hub with vaccination tracker and milestones" width={520} height={1125} loading="lazy" sizes="(max-width: 900px) 44vw, 20vw" />
            </div>
          </article>

          <article className="fm-scene fm-scene-next" style={{ '--k': 2 }}>
            <div className="fm-scene-copy">
              <p className="fm-meta">Next</p>
              <h3>YOUR<br />PROJECT.</h3>
              <p className="fm-story">Tell us what you want to build. We will reply with questions, a suggested approach and a written estimate.</p>
              <a href="/contact" className="fm-btn fm-btn-solid" data-cta>Start a project <i aria-hidden="true">&rarr;</i></a>
              <p className="fm-also"><a className="fm-link" href="/portfolio">All work <i aria-hidden="true">&rarr;</i></a></p>
            </div>
          </article>
        </div>
        <p className="fm-progress fm-meta" aria-hidden="true"><i></i></p>
      </div>
    </section>
  );
}
