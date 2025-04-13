// // next.config.js
// const nextConfig = {
//   reactStrictMode: true,
//   env: {
//     customKey: "my-value",
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
