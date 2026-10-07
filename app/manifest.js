export default function manifest() {
  return {
    name: 'CodeLaksh - Software Development Company in India',
    short_name: 'CodeLaksh',
    description:
      'CodeLaksh is a software development company in India delivering custom software, web and mobile apps, AI, ERP and cloud solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f1a',
    theme_color: '#0483d2',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo.png', sizes: '276x225', type: 'image/png' },
    ],
  };
}
