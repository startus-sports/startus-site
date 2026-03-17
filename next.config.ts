import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
