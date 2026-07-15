import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel builds with Turbopack by default but the project uses webpack
  // to avoid potential unicode path issues

  // 旧WordPress URL（kanazawa-ssc.jp時代）からのリダイレクト
  async redirects() {
    return [
      { source: '/archives/class_detail/:id', destination: '/#classes', permanent: true },
      { source: '/archives/instructor', destination: '/about', permanent: true },
      { source: '/taiken_form', destination: '/taiken', permanent: true },
      { source: '/class', destination: '/#classes', permanent: true },
      { source: '/policy', destination: '/about', permanent: true },
      { source: '/nagare', destination: '/#flow', permanent: true },
      { source: '/access', destination: '/#venue', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/event', destination: '/', permanent: false },
    ]
  },
}

export default nextConfig
