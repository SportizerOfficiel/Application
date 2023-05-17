// // next.config.js
// const isProduction = process.env.NODE_ENV === 'prod';

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: !isProduction, // Disable PWA in development mode
// });

// module.exports = withPWA({});
// next.config.js
const { i18n } = require("./next-i18next.config");

module.exports = {
  async headers() {
    return [
      {
        // Set cache-control headers to disable caching
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
  i18n
};
