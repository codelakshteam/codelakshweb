import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import TeamApplyForm from '@/components/TeamApplyForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Become a CodeLaksh Sales Partner | Commission-Based Opportunity',
  description:
    'Join the CodeLaksh sales partner network and earn commission by selling our ERP and software products. Register with the form and our team will contact you.',
  path: '/join',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Sales partner', href: '/join' },
];

// Sales partner program (commission-based). Separate from the unpaid internship on /careers.
export default function JoinPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          crumbs={crumbs}
          label="Sales partner network"
          h1="Join CodeLaksh and sell our software products"
          lead="Become a CodeLaksh sales partner: introduce our ERP and software products to businesses and earn commission on the sales you bring. Register below and our team will contact you with the next steps."
        />
        <section className="erp-section">
          <div className="container join-wrap">
            <TeamApplyForm role="sales-partner" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
