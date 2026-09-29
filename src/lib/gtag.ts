type GtagWindow = Window & {
  gtag?: (command: 'event', eventName: string, params?: Record<string, string>) => void
}

// 教室紹介ページ（src/content/lp/*.html を表示するページ）。増やしたらここにも足す
const CLASS_LP_PATHS = new Set([
  '/kakekko-wednesday', '/kakekko-monday', '/hashiri-juku', '/izumi-junior',
  '/nakamura-kakekko', '/inclusive-rikujo', '/otona-marathon', '/socialfootball',
])

/** どの種類のページで起きたか。全イベントに page_type として付け、GA4 でページの種類ごとに比べられるようにする */
export function pageType(pathname: string): string {
  if (pathname === '/') return 'top'
  if (pathname.startsWith('/taiken')) return 'taiken'
  if (pathname.startsWith('/venue/')) return 'venue'
  if (pathname === '/rikujo' || pathname.startsWith('/class/')) return 'category'
  if (CLASS_LP_PATHS.has(pathname)) return 'class_lp'
  if (pathname === '/faq') return 'faq'
  if (pathname === '/about') return 'about'
  return 'other'
}

export function trackEvent(eventName: string, params?: Record<string, string>) {
  const w = window as GtagWindow
  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, { page_type: pageType(window.location.pathname), ...params })
  }
}
