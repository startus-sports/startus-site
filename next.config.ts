import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel builds with Turbopack by default but the project uses webpack
  // to avoid potential unicode path issues

  // 旧WordPress URLからのリダイレクト
  async redirects() {
    return [
      { source: '/archives/class_detail/:id', destination: '/class/:id', permanent: true },
      { source: '/taiken_form', destination: '/taiken', permanent: true },
      { source: '/class', destination: '/class', permanent: false },
    ]
  },
}

export default nextConfig
