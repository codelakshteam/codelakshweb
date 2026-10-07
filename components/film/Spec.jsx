import { SITE } from '@/lib/seo';

// Light act, after the statement: the claim, in plain language, with where and who.
export default function Spec() {
  return (
    <section className="fm-spec-light" data-tone="light" aria-label="What CodeLaksh is">
      <div className="fm-wrap fm-two">
        <p className="fm-lead">
          CodeLaksh is a software development company in {SITE.city} ({SITE.cityAlt}), {SITE.region}, with a second branch in Hadapsar, Pune. A team of developers, designers and
          project managers designs, builds and supports software for businesses across India.
        </p>
        <ul className="fm-rows">
          <li><span>Builds</span><b>Custom software, web, mobile, ERP, AI, cloud</b></li>
          <li><span>Ships</span><b>Our own products on Google Play and the App Store</b></li>
          <li><span>Supports</span><b>Fixes, updates and new requirements after launch</b></li>
          <li><span>Works with</span><b>Retail, restaurants, hotels, medical, bakeries, salons</b></li>
          <li><span>Also builds</span><b>Event management, fintech, hospitality and HRM SaaS, e-commerce</b></li>
        </ul>
      </div>
    </section>
  );
}
