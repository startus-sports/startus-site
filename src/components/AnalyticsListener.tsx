'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/gtag'
import { captureAttribution } from '@/lib/attribution'

// サイト全体の「どこが押されたか」「どこまで読まれたか」を GA4 に送る。
// ボタンごとに計測コードを書かなくても、教室紹介ページ（HTML本文）の中のリンクまで拾える。
//
//   電話・メール・LINE・体験申込ページ・入会フォーム・会場ページ・Googleマップへのリンク
//     → tel_click / mail_click / line_click / taiken_link_click / nyukai_link_click / venue_link_click / map_link_click
//       （location = 押された場所。data-ga-location → 親の section の id → header/footer の順で決める）
//   ページを 25% / 50% / 75% までスクロール → scroll_depth（90% は GA4 標準の scroll）
//   id 付きの <section> が画面の中央を通過 → section_view（どのセクションまで読まれているか）
//
// 送るのは種類と場所だけで、氏名などの個人情報は送らない。
// finder_taiken_click（教室検索の体験申込ボタン）は残してあり、体験申込ページへのクリックは
// taiken_link_click が全ページ共通の指標になる（二重に数えているのではなく別の切り口）。
// トップの cta_click は 2026-10 のリデザインで廃止し、taiken_link_click の location に一本化した。
// 個別に計測済みで重ねたくないリンクには data-ga-skip を付ける。

const LINE_HOSTS = /(^|\.)(lin\.ee|line\.me)$/

function locationOf(el: Element): string {
  const tagged = el.closest('[data-ga-location]') as HTMLElement | null
  if (tagged?.dataset.gaLocation) return tagged.dataset.gaLocation
  const section = el.closest('section[id]')
  if (section) return section.id
  if (el.closest('header')) return 'header'
  if (el.closest('footer')) return 'footer'
  return 'content'
}

function classifyLink(a: HTMLAnchorElement): { event: string; params: Record<string, string> } | null {
  const href = a.getAttribute('href') || ''
  if (href.startsWith('tel:')) return { event: 'tel_click', params: {} }
  if (href.startsWith('mailto:')) return { event: 'mail_click', params: {} }

  let url: URL
  try {
    url = new URL(href, window.location.href)
  } catch {
    return null
  }
  if (LINE_HOSTS.test(url.hostname)) return { event: 'line_click', params: {} }
  // Google マップ（道順・地図を開く）。会場まで行こうとしている人の数になる
  if (/(^|\.)google\.[a-z.]+$/.test(url.hostname) && url.pathname.startsWith('/maps')) {
    return { event: 'map_link_click', params: {} }
  }

  let path = url.pathname
  try {
    path = decodeURIComponent(url.pathname)
  } catch {
    // 不正なエスケープはそのまま扱う
  }
  const isSelf = url.hostname === window.location.hostname
  const isForms = url.hostname.endsWith('workers.dev')
  if ((isSelf || isForms) && path.startsWith('/taiken')) {
    return {
      event: 'taiken_link_click',
      params: { from: url.searchParams.get('from') || '', class_tag: url.searchParams.get('class_tag') || '' },
    }
  }
  if (path.includes('入会フォーム') || (isForms && path.startsWith('/nyukai'))) {
    return { event: 'nyukai_link_click', params: {} }
  }
  // 会場ページ（/venue/<id>）へのリンク。トップの会場一覧・地図や教室ページから
  if (isSelf && path.startsWith('/venue/')) {
    return { event: 'venue_link_click', params: { venue: path.slice('/venue/'.length).replace(/\/$/, '') } }
  }
  return null
}

export default function AnalyticsListener() {
  const pathname = usePathname()

  // リンクのクリック（ページをまたいで1回だけ登録）
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.dataset.gaSkip !== undefined) return
      const hit = classifyLink(a)
      if (hit) trackEvent(hit.event, { location: locationOf(a), ...hit.params })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // ページごと: 流入元の記録 / スクロールの深さ / セクションの表示
  useEffect(() => {
    captureAttribution()

    // ページを移った直後は前のページのスクロール位置が一瞬残る（短いページだと「75%まで読んだ」に化ける）。
    // 表示が落ち着くまで待ってから計測を始める
    let ready = false
    const firedDepth = new Set<number>()
    function onScroll() {
      if (!ready) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = (window.scrollY / max) * 100
      for (const t of [25, 50, 75]) {
        if (pct >= t && !firedDepth.has(t)) {
          firedDepth.add(t)
          trackEvent('scroll_depth', { percent: String(t) })
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const seen = new Set<string>()
    function markSeen(el: Element) {
      const id = (el as HTMLElement).id
      if (id && !seen.has(id)) {
        seen.add(id)
        trackEvent('section_view', { section: id })
      }
    }
    const observers: IntersectionObserver[] = []
    const timer = window.setTimeout(() => {
      ready = true
      if (!('IntersectionObserver' in window)) return
      // 長いセクション（教室検索など、画面の何倍もあるもの）: 画面中央の帯を通過したら「見た」
      observers.push(new IntersectionObserver(
        entries => entries.forEach(en => { if (en.isIntersecting) markSeen(en.target) }),
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      ))
      // 短いセクション（ページ末尾で中央まで上がってこないもの）: 半分以上見えたら「見た」
      observers.push(new IntersectionObserver(
        entries => entries.forEach(en => { if (en.intersectionRatio >= 0.5) markSeen(en.target) }),
        { threshold: 0.5 },
      ))
      document.querySelectorAll('section[id]').forEach(s => observers.forEach(o => o.observe(s)))
    }, 800)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
      observers.forEach(o => o.disconnect())
    }
  }, [pathname])

  return null
}
