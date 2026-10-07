import { Montserrat, Poppins } from 'next/font/google';
import StructuredData from '@/components/StructuredData';
import RevealOnScroll from '@/components/RevealOnScroll';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = 'https://codelaksh.in';
const siteTitle = 'CodeLaksh | AI Solutions & Software Development';
const siteDescription =
  'CodeLaksh - Premier AI Solutions & Software Development Company in India. Web Development, App Development, AI Chatbots, Machine Learning.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | CodeLaksh',
  },
  description: siteDescription,
  keywords: [
    'AI solutions',
    'AI chatbot development',
    'web development company India',
    'app development',
    'machine learning',
    'software development company India',
    'ERP software India',
    'GST billing software',
    'CodeLaksh ERP',
    'CodeLaksh',
  ],
  authors: [{ name: 'CodeLaksh' }],
  creator: 'CodeLaksh',
  publisher: 'CodeLaksh',
  alternates: { canonical: '/' },
  openGraph: {
    title: siteTitle,
    description: 'Transform your business with cutting-edge AI technology.',
    url: siteUrl,
    siteName: 'CodeLaksh',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CodeLaksh' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0483d2',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('cl-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}",
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <StructuredData />
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
