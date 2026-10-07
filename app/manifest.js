export default function manifest() {
  return {
    name: 'CodeLaksh - AI Solutions & Software Development',
    short_name: 'CodeLaksh',
    description:
      'Premier AI Solutions & Software Development Company in India. Web Development, App Development, AI Chatbots, Machine Learning.',
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
