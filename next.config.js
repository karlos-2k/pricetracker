/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb'
        }
    },
    transpilePackages: ['mongoose'],
    images: {
        domains: ['m.media-amazon.com']
    }
}

module.exports = nextConfig