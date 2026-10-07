import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Stage from '@/components/film/Stage';
import Hero from '@/components/film/Hero';
import Sweep from '@/components/film/Sweep';
import Spec from '@/components/film/Spec';
import Systems from '@/components/film/Systems';
import Industries from '@/components/film/Industries';
import Work from '@/components/film/Work';
import Process from '@/components/film/Process';
import Studio from '@/components/film/Studio';
import ContactExperience from '@/components/film/ContactExperience';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'CodeLaksh | Software Development Company in India',
  description:
    'CodeLaksh is a software development company in India delivering custom software, web and mobile app development, AI, machine learning, cloud, ERP and digital solutions for businesses.',
  path: '/',
});

// One continuous film: a fixed stage (the scene) behind dark acts, light acts that cover it, and light-sweep transitions
// between them. Every section is server-rendered HTML; the stage is decoration.
export default function Home() {
  return (
    <>
      <Stage />
      <Header />
      <main id="main">
        <Hero />
        <Sweep id="statement" to="light" eyebrow="What we do" meta="01 / Statement" lines={["WE DON’T", 'JUST WRITE', 'CODE.', 'WE ENGINEER', 'DIGITAL', 'SYSTEMS.']} />
        <Spec />
        <Sweep id="engineer" to="dark" eyebrow="Engineering systems" meta="02 / Systems" lines={['WHAT WE', 'ENGINEER.']} />
        <Systems />
        <Sweep id="business" to="light" eyebrow="Industries" meta="03 / Business" lines={['BUILT AROUND', 'REAL BUSINESS.']} />
        <Industries />
        <Sweep id="shipped" to="dark" eyebrow="Selected work" meta="04 / Products" lines={['BUILT.', 'SHIPPED.', 'LIVE.']} />
        <Work />
        <Sweep id="method" to="light" eyebrow="How we build" meta="05 / Method" lines={['FROM PROBLEM', 'TO PRODUCTION.']} />
        <Process />
        <Studio />
        <ContactExperience />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
