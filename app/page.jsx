import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProofStrip from '@/components/ProofStrip';
import About from '@/components/About';
import Services from '@/components/Services';
import ErpTeaser from '@/components/ErpTeaser';
import BrandKidodom from '@/components/BrandKidodom';
import Portfolio from '@/components/Portfolio';
import Capabilities from '@/components/Capabilities';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'CodeLaksh | Software Development Company in India',
  description:
    'CodeLaksh is a software development company in India delivering custom software, web and mobile app development, AI, machine learning, cloud, ERP and digital solutions for businesses.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Services />
        <Capabilities />
        <ErpTeaser />
        <BrandKidodom />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
