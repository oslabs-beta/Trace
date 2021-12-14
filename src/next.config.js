/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  distDir: 'trace',
  generateBuildId: async () => {
    return 'trace-app'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config
  }
}
