import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProofStrip from '@/components/ProofStrip';
import About from '@/components/About';
import Services from '@/components/Services';
import ErpTeaser from '@/components/ErpTeaser';
import BrandKidodom from '@/components/BrandKidodom';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Services />
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
