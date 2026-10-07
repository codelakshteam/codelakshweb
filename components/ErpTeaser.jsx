import Image from 'next/image';
import { PLAY_STORE_URL, mobileShots } from '@/components/erpData';

export default function ErpTeaser() {
  return (
    <section className="erp-teaser" id="erp">
      <div className="container erp-teaser-grid">
        <div>
          <span className="section-subtitle">Our Product</span>
          <h2 className="section-title">
            CodeLaksh <span className="highlight">ERP</span>
          </h2>
          <p className="erp-lead">
            Billing, inventory, accounting and payments for Indian shops, restaurants and hotels. Works offline on
            desktop, syncs to the cloud, and runs on your phone. Now live on Google Play.
          </p>
          <ul className="erp-teaser-points">
            <li><i className="fas fa-check" aria-hidden="true"></i> GST-ready billing &amp; barcode scanning</li>
            <li><i className="fas fa-check" aria-hidden="true"></i> Inventory, purchases &amp; accounting</li>
            <li><i className="fas fa-check" aria-hidden="true"></i> 7-day free trial on Starter &amp; Growth, Growth from Rs. 599/month</li>
          </ul>
          <div className="erp-cta">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-play">
              <i className="fab fa-google-play" aria-hidden="true"></i>
              <span>
                <small>GET IT ON</small>
                Google Play
              </span>
            </a>
            <a href="/erp" className="btn btn-outline">
              Features &amp; pricing
            </a>
          </div>
        </div>
        <div className="erp-teaser-phones">
          <Image className="erp-phone erp-phone-back" src={mobileShots[2].src} alt={mobileShots[2].alt} width={270} height={584} loading="lazy" />
          <Image className="erp-phone erp-phone-front" src={mobileShots[0].src} alt={mobileShots[0].alt} width={270} height={584} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
