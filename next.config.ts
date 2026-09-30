import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel builds with Turbopack by default but the project uses webpack
  // to avoid potential unicode path issues

  // 限定公開（2026-09-30〜）: 検索エンジンに載せず、URLを知っている人だけが見られる状態にする。
  // 全ページに noindex を付ける（ページ側の robots 設定より優先される）。
  // robots.txt は allow のまま残すこと。クロールを禁止すると noindex が読まれず検索に残る。
  // 公開を再開するときはこの headers() を丸ごと消し、Search Console の削除リクエストも取り消す。
  async headers() {
    return [
      { source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
    ]
  },

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
