// next.config.js
const isProduction = process.env.NODE_ENV === 'prod';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProduction, // Disable PWA in development mode
});

module.exports = withPWA({});
