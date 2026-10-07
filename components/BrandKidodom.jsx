import Image from 'next/image';
import { APP_STORE_URL_KIDODOM, PLAY_STORE_URL_KIDODOM, KIDODOM_SITE_URL, kidodomShots } from '@/components/erpData';

export default function BrandKidodom() {
  return (
    <section className="kidodom" id="kidodom">
      <div className="container kidodom-grid">
        <div className="kidodom-logo">
          <Image src="/kidodom-icon.png" alt="Kidodom logo" width={160} height={160} loading="lazy" />
        </div>
        <div>
          <span className="section-subtitle">A CodeLaksh Brand</span>
          <h2 className="section-title">
            <span className="highlight">Kidodom</span>: everything your little one needs
          </h2>
          <p className="erp-lead">
            Kidodom is our baby &amp; kids brand: safe, certified products for feeding, clothing, toys and health,
            plus parenting tips and vaccine reminders. Shop on the web or in the app, now on both the App Store and
            Google Play.
          </p>
          <div className="erp-cta">
            <a href={APP_STORE_URL_KIDODOM} target="_blank" rel="noopener noreferrer" className="btn btn-play">
              <i className="fab fa-apple" aria-hidden="true"></i>
              <span>
                <small>DOWNLOAD ON THE</small>
                App Store
              </span>
            </a>
            <a href={PLAY_STORE_URL_KIDODOM} target="_blank" rel="noopener noreferrer" className="btn btn-play">
              <i className="fab fa-google-play" aria-hidden="true"></i>
              <span>
                <small>GET IT ON</small>
                Google Play
              </span>
            </a>
            <a href={KIDODOM_SITE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Visit kidodom.in
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="erp-phone-strip kidodom-strip">
          {kidodomShots.map((shot) => (
            <Image key={shot.src} className="erp-strip-phone" src={shot.src} alt={shot.alt} width={240} height={519} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
