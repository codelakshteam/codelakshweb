import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import CinematicHero from '@/components/cinematic/CinematicHero';
import Statement from '@/components/cinematic/Statement';
import TechnologyUniverse from '@/components/cinematic/TechnologyUniverse';
import ServiceExperience from '@/components/cinematic/ServiceExperience';
import CodeToProduct from '@/components/cinematic/CodeToProduct';
import ProjectShowcase from '@/components/cinematic/ProjectShowcase';
import ProductLaunch from '@/components/cinematic/ProductLaunch';
import TechConstellation from '@/components/cinematic/TechConstellation';
import ProcessTimeline from '@/components/cinematic/ProcessTimeline';
import CompanyStory from '@/components/cinematic/CompanyStory';
import ContactExperience from '@/components/cinematic/ContactExperience';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'CodeLaksh | Software Development Company in India',
  description:
    'CodeLaksh is a software development company in India delivering custom software, web and mobile app development, AI, machine learning, cloud, ERP and digital solutions for businesses.',
  path: '/',
});

// The cinematic home page. Every section is real, server-rendered HTML; the 3D and canvas layers are decoration.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <CinematicHero />
        <Statement />
        <TechnologyUniverse />
        <ServiceExperience />
        <CodeToProduct />
        <ProjectShowcase />
        <ProductLaunch />
        <TechConstellation />
        <ProcessTimeline />
        <CompanyStory />
        <ContactExperience />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
