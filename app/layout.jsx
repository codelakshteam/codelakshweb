import { Archivo, Inter, IBM_Plex_Mono } from 'next/font/google';
import StructuredData from '@/components/StructuredData';
import RevealOnScroll from '@/components/RevealOnScroll';
import Runtime from '@/components/film/Runtime';
import './globals.css';
import './film.css';

// Display face for the big editorial type, plain sans for reading. Both are self-hosted by next/font.
const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = 'https://codelaksh.in';
const siteTitle = 'CodeLaksh | Software Development Company in India';
const siteDescription =
  'CodeLaksh is a software development company in India delivering custom software, web and mobile app development, AI, machine learning, cloud, ERP and digital solutions for businesses.';

// Page-specific canonicals are set on each page (pageMetadata in lib/seo.js); none is set here so a page can never
// inherit another page's canonical by accident.
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | CodeLaksh',
  },
  description: siteDescription,
  applicationName: 'CodeLaksh',
  authors: [{ name: 'CodeLaksh', url: siteUrl }],
  creator: 'CodeLaksh',
  publisher: 'CodeLaksh',
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'CodeLaksh',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CodeLaksh - Software Development Company in India' }],
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
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: "var d=document.documentElement;d.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('rm');if(matchMedia('(pointer: coarse), (max-width: 900px)').matches)d.classList.add('mob')" }} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <StructuredData />
        {children}
        <RevealOnScroll />
        <Runtime />
      </body>
    </html>
  );
}
