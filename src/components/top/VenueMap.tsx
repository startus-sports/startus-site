'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/lib/gtag'

/**
 * トップの「会場」の地図（Google マップ）。
 *
 * - 画面に近づいてから Google マップを読み込む（ページ表示を遅くしない・読み込み回数を増やさない）
 * - 読み込めるまで／読み込めなかったときは、children（イラストの地図）をそのまま見せる
 * - ピンには会場ごとの教室数。タップで会場名・住所と、会場ページ・道順へのリンクを出す
 * - スクロール中に地図が動かないよう gestureHandling は cooperative（スマホは2本指で動かす）
 *
 * キーは /rikujo の地図と同じ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY。
 */

export type MapVenue = {
  id: string
  name: string
  /** ピンの横に出す短い会場名 */
  shortName: string
  /** 会場名ラベルをピンのどこに出すか（近い会場どうしで重ならないように） */
  side: 'left' | 'right' | 'bottom'
  area: string
  address: string
  lat: number
  lng: number
  days: string
  classes: { name: string; day: string; time: string }[]
  note?: string
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

type MapsWindow = Window & { __stxMapsReady?: () => void }

let loadPromise: Promise<void> | null = null
function loadGoogleMaps(): Promise<void> {
  if (loadPromise) return loadPromise
  loadPromise = new Promise<void>((resolve, reject) => {
    // 他のページ（/rikujo の地図）で読み込み済みならそれを使う
    if (typeof window.google?.maps?.importLibrary === 'function') { resolve(); return }
    const w = window as MapsWindow
    w.__stxMapsReady = () => resolve()
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&language=ja&region=JP&loading=async&callback=__stxMapsReady`
    script.async = true
    script.onerror = () => { loadPromise = null; reject(new Error('Google Maps failed to load')) }
    document.head.appendChild(script)
  }).then(async () => {
    // loading=async のときは使う部品を明示的に読み込む（Marker は marker ライブラリ）
    await Promise.all([google.maps.importLibrary('maps'), google.maps.importLibrary('marker')])
  })
  return loadPromise
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

const LABEL_FONT = "700 12px 'Hiragino Sans','Hiragino Kaku Gothic ProN','Yu Gothic','Meiryo',sans-serif"
let measureCtx: CanvasRenderingContext2D | null = null
function textWidth(text: string): number {
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d')
  if (!measureCtx) return text.length * 12
  measureCtx.font = LABEL_FONT
  return Math.ceil(measureCtx.measureText(text).width)
}

/**
 * 星のマスコットと同じ2色のピン（中に教室数）＋ 会場名のラベル。
 * ラベルも画像に含めるので、ラベルを押しても会場の情報が開く。
 */
function pinIcon(v: MapVenue, active: boolean): google.maps.Icon {
  const pw = active ? 40 : 34
  const ph = Math.round(pw * 1.28)
  const s = pw / 36
  const label = v.shortName
  const lw = textWidth(label) + 14
  const lh = 22
  const gap = 2
  let W: number, H: number, pinX: number, labelX: number, labelY: number
  if (v.side === 'bottom') {
    W = Math.max(pw, lw); H = ph + gap + lh
    pinX = (W - pw) / 2; labelX = (W - lw) / 2; labelY = ph + gap
  } else {
    W = pw + gap + lw; H = ph
    pinX = v.side === 'left' ? lw + gap : 0
    labelX = v.side === 'left' ? 0 : pw + gap
    labelY = Math.round(17.5 * s - lh / 2)
  }
  const fill = active ? '#17324a' : '#eb6600'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect x="${labelX + 0.75}" y="${labelY + 0.75}" width="${lw - 1.5}" height="${lh - 1.5}" rx="7" fill="${active ? '#17324a' : '#ffffff'}" stroke="${active ? '#17324a' : '#c9d2dc'}" stroke-width="1.5"/>
    <text x="${labelX + lw / 2}" y="${labelY + 15.5}" text-anchor="middle" style="font:${LABEL_FONT}" fill="${active ? '#ffffff' : '#17324a'}">${esc(label)}</text>
    <g transform="translate(${pinX} 0) scale(${s})">
      <path d="M18 44.5s15-13.4 15-26.5A15 15 0 0 0 3 18c0 13.1 15 26.5 15 26.5z" fill="${fill}" stroke="#ffffff" stroke-width="2.5"/>
      <circle cx="18" cy="17.5" r="10" fill="#ffffff"/>
      <text x="18" y="22.3" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13.5" fill="#17324a">${v.classes.length}</text>
    </g>
  </svg>`
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(W, H),
    anchor: new google.maps.Point(pinX + pw / 2, ph - 1),
  }
}

function infoHtml(v: MapVenue): string {
  const dir = `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`
  const rows = v.classes.map(c => `
    <li style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;column-gap:8px;padding:4px 0;border-top:1px dashed #ffd2a8">
      <span style="font-size:12.5px;font-weight:700">${esc(c.name)}</span>
      <span style="font-size:11.5px;color:#4a5a6a;white-space:nowrap">${esc(c.day)} ${esc(c.time)}</span>
    </li>`).join('')
  return `<div style="font-family:'Noto Sans JP',sans-serif;color:#17324a;max-width:236px;line-height:1.45">
    <div style="font-size:14px;font-weight:900"><span style="font-size:11px;font-weight:700;color:#fff;background:#17324a;border-radius:4px;padding:0 5px;margin-right:5px;vertical-align:1px">${esc(v.area)}</span>${esc(v.name)}</div>
    ${v.note ? `<div style="font-size:11px;color:#4a5a6a;margin-top:1px">${esc(v.note)}</div>` : ''}
    <ul style="list-style:none;margin:6px 0 0;padding:0">${rows}</ul>
    <div style="margin-top:6px;padding-top:6px;border-top:1px dashed #ffd2a8;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <a href="/venue/${esc(v.id)}" style="font-size:13px;font-weight:700;color:#b84a00;text-decoration:none">対象・料金・体験申込 ›</a>
      <a href="${dir}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#1d5fa8">道順（Googleマップ）</a>
    </div>
  </div>`
}

export default function VenueMap({ venues, children }: { venues: MapVenue[]; children: React.ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const box = boxRef.current
    if (!box || !API_KEY || venues.length === 0) return
    let cancelled = false

    async function init() {
      try {
        await loadGoogleMaps()
      } catch {
        return // 読み込めなければイラストの地図のまま
      }
      if (cancelled || !mapRef.current) return

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 36.56, lng: 136.645 },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        cameraControl: false,
        zoomControl: true,
        clickableIcons: false,
        gestureHandling: 'cooperative',
        styles: [
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        ],
      })

      const info = new google.maps.InfoWindow({ maxWidth: 250 })
      const bounds = new google.maps.LatLngBounds()
      const markers: Record<string, google.maps.Marker> = {}
      let active: string | null = null

      function setActive(id: string | null) {
        if (active && markers[active]) {
          const prev = venues.find(v => v.id === active)
          if (prev) { markers[active].setIcon(pinIcon(prev, false)); markers[active].setZIndex(1) }
        }
        active = id
        if (id && markers[id]) {
          const v = venues.find(v => v.id === id)
          if (v) { markers[id].setIcon(pinIcon(v, true)); markers[id].setZIndex(999) }
        }
      }

      for (const v of venues) {
        const pos = { lat: v.lat, lng: v.lng }
        bounds.extend(pos)
        const m = new google.maps.Marker({
          position: pos,
          map,
          icon: pinIcon(v, false),
          title: `${v.name}（${v.classes.length}教室）`,
          optimized: false,
          zIndex: 1,
        })
        m.addListener('click', () => {
          setActive(v.id)
          info.setContent(infoHtml(v))
          info.open({ map, anchor: m })
          trackEvent('venue_map_click', { venue: v.id })
        })
        markers[v.id] = m
      }
      info.addListener('closeclick', () => setActive(null))

      map.fitBounds(bounds, { top: 40, right: 24, bottom: 24, left: 24 })
      google.maps.event.addListenerOnce(map, 'tilesloaded', () => { if (!cancelled) setReady(true) })
    }

    // 画面に近づいてから読み込む
    if (!('IntersectionObserver' in window)) { init(); return () => { cancelled = true } }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); init() }
    }, { rootMargin: '400px 0px' })
    io.observe(box)
    return () => { cancelled = true; io.disconnect() }
  }, [venues])

  return (
    <div ref={boxRef} className="relative h-[380px] lg:h-[420px] rounded-[20px] bg-[#eef5ee] border-2 border-[#d6e8d6] overflow-hidden">
      <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? 'opacity-0 invisible' : 'opacity-100'}`} aria-hidden={ready}>
        {children}
      </div>
      <div
        ref={mapRef}
        className={`absolute inset-0 transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
        role="region"
        aria-label="会場の地図（Googleマップ）。ピンを押すと会場の情報が出ます"
      />
    </div>
  )
}
