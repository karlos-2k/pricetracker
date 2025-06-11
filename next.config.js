module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  transpilePackages: ['mongoose'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      }
    ]
  }
}