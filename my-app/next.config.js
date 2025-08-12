const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  
  // Allow cross-origin requests in development (for network access)
  allowedDevOrigins: [
    '172.29.240.1', // Your current network IP
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
  ],
  
  // Optimize images if you're using next/image
  images: {
    // Configure image domains if needed
    // domains: ['example.com'],
  },
  
  // Other Next.js configuration...
};

module.exports = withNextIntl(nextConfig);