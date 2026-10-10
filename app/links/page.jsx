import Image from 'next/image';
import { PLAY_STORE_URL, PLAY_STORE_URL_KIDODOM, APP_STORE_URL_KIDODOM, KIDODOM_SITE_URL } from '@/components/erpData';

export const metadata = {
  title: 'CodeLaksh Links',
  description: 'CodeLaksh ERP, apps and services: all our links in one place.',
  alternates: { canonical: '/links' },
  robots: { index: false, follow: true },
};

const utm = (url, content) => `${url}${url.includes('?') ? '&' : '?'}utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=${content}`;

const links = [
  { label: 'CodeLaksh ERP: features & pricing', sub: '7-day free trial on Starter and Growth', href: utm('https://codelaksh.in/erp', 'erp'), primary: true },
  { label: 'Get the ERP app on Google Play', sub: 'Android', href: PLAY_STORE_URL },
  { label: 'Request a demo / contact us', sub: 'Tell us about your business', href: utm('https://codelaksh.in/#contact', 'contact') },
  { label: 'Our services', sub: 'AI chatbots, web, apps, cloud, marketing', href: utm('https://codelaksh.in/#services', 'services') },
  { label: 'Kidodom: our baby & kids brand', sub: 'Web, App Store and Google Play', href: KIDODOM_SITE_URL },
];

export default function Links() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '56px 20px' }}>
      <div style={{ width: '100%', maxWidth: 520, textAlign: 'center' }}>
        <Image src="/logo-white.png" alt="CodeLaksh logo" width={72} height={59} priority className="logo-img-dark" />
        <Image src="/logo.png" alt="" width={72} height={63} priority className="logo-img-light" />
        <h1 style={{ fontFamily: 'var(--font-mont)', fontSize: 28, margin: '16px 0 6px' }}>CodeLaksh</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Code Your Vision With Innovation</p>
        <div style={{ display: 'grid', gap: 14 }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${l.primary ? 'btn-primary' : 'btn-outline'}`} style={{ display: 'block', padding: '16px 20px' }}>
              <strong style={{ display: 'block' }}>{l.label}</strong>
              <small style={{ opacity: 0.8 }}>{l.sub}</small>
            </a>
          ))}
        </div>
        <p style={{ marginTop: 28, fontSize: 14 }}>
          <a href={APP_STORE_URL_KIDODOM} target="_blank" rel="noopener noreferrer">Kidodom on App Store</a> ·{' '}
          <a href={PLAY_STORE_URL_KIDODOM} target="_blank" rel="noopener noreferrer">Kidodom on Google Play</a>
        </p>
      </div>
    </main>
  );
}
