/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ]
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
  reactStrictMode: true,
  siteUrl: '',
}
