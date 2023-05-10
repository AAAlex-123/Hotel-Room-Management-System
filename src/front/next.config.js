/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://host.docker.internal:8081/api/:path*'
      }
    ]
  }
}