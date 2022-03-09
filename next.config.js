/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|css|js)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000, must-revalidate',
          },
        ],
      },
    ]
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
  reactStrictMode: true,
}
