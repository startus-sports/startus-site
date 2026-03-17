'use client'

import { useState } from 'react'
import Link from 'next/link'
import { trackClasses, venues, days } from '@/lib/classes-data'
import type { ClassData } from '@/lib/classes-data'

// ============================================================
// Hero Section
// ============================================================
function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-navy to-brand-navy-light overflow-hidden">
      <div className="absolute top-[-40px] right-[-40px] w-44 h-44 rounded-full bg-brand-orange opacity-10" />
      <div className="absolute bottom-[-60px] left-[-30px] w-36 h-36 rounded-full bg-brand-orange opacity-[0.06]" />

      <div className="relative max-w-3xl mx-auto px-5 py-12 md:py-20 text-center">
        <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
          金沢で一番通いやすい陸上教室
        </span>

        <h1 className="font-display text-white text-2xl md:text-4xl font-bold leading-relaxed mb-3">
          家の近くで、<span className="text-brand-orange">好きな曜日</span>に。
          <br />金沢の陸上教室
        </h1>

        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
          市内6会場で毎日開催。お子様のスケジュールに
          <br className="md:hidden" />合わせて教室を選べます。
        </p>

        <div className="flex justify-center gap-8 md:gap-12 mb-8">
          {[
            { num: '12', label: '教室' },
            { num: '6', label: '会場' },
            { num: '週6', label: '日開催' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-brand-orange text-2xl md:text-3xl font-bold">{num}</div>
              <div className="text-white/50 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <Link href="/taiken" className="btn-primary text-lg px-10 py-4">
          無料体験に申し込む
        </Link>
        <p className="text-white/40 text-xs mt-3">体験当日の入会で入会金(¥5,500)が無料</p>
      </div>
    </section>
  )
}

// ============================================================
// Map Section
// ============================================================
function VenueMap({ activeVenue, onSelect }: { activeVenue: string | null; onSelect: (id: string | null) => void }) {
  // 簡易地図: 金沢市内の相対位置にピンを配置
  const pinPositions: Record<string, { top: string; left: string }> = {
    seibu:    { top: '32%', left: '14%' },
    shiei:    { top: '40%', left: '48%' },
    nakamura: { top: '72%', left: '56%' },
    inoki:    { top: '18%', left: '74%' },
    sporec:   { top: '58%', left: '24%' },
    sogo:     { top: '50%', left: '72%' },
  }

  const trackVenueIds = ['shiei', 'nakamura', 'seibu', 'inoki', 'sporec']

  return (
    <div className="relative bg-gradient-to-br from-[#E8F0E4] to-[#D8E6D0] rounded-2xl overflow-hidden h-64 md:h-80 border border-warm-200">
      {/* Simplified rivers */}
      <div className="absolute top-[28%] left-0 w-full h-[3px] bg-blue-300/30 -rotate-[12deg]" />
      <div className="absolute top-[52%] left-[10%] w-[80%] h-[3px] bg-blue-300/25 -rotate-[8deg]" />

      {/* Area labels */}
      <span className="absolute top-[10%] left-[8%] text-[9px] text-black/20 font-medium">西部</span>
      <span className="absolute top-[14%] left-[60%] text-[9px] text-black/20 font-medium">中心部</span>
      <span className="absolute top-[78%] left-[18%] text-[9px] text-black/20 font-medium">泉野</span>
      <span className="absolute top-[82%] left-[62%] text-[9px] text-black/20 font-medium">中村町</span>
      <span className="absolute top-[6%] right-[10%] text-[9px] text-black/20 font-medium">東部</span>

      {/* Venue pins */}
      {venues
        .filter(v => trackVenueIds.includes(v.id))
        .map(venue => {
          const pos = pinPositions[venue.id]
          const classCount = trackClasses.filter(c => c.venueId === venue.id).length
          const isActive = activeVenue === venue.id

          return (
            <button
              key={venue.id}
              className={`absolute transition-transform duration-150 z-10 group ${isActive ? 'scale-110' : 'hover:scale-105'}`}
              style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
              onClick={() => onSelect(isActive ? null : venue.id)}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold border-[2.5px] border-white shadow-lg ${isActive ? 'ring-4 ring-brand-orange/30' : ''}`}
                style={{ backgroundColor: venue.color }}
              >
                {venue.shortName.charAt(0)}
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                {classCount}
              </span>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-brand-navy bg-white/90 px-1.5 py-0.5 rounded shadow-sm">
                {venue.shortName}
              </span>
            </button>
          )
        })}
    </div>
  )
}

// ============================================================
// Matrix Section
// ============================================================
function ClassMatrix({ activeVenue }: { activeVenue: string | null }) {
  const venueOrder = ['shiei', 'nakamura', 'seibu', 'inoki', 'sporec']
  const dayKeys = ['月', '火', '水', '木', '金', '土']

  function getClasses(venueId: string, day: string): ClassData[] {
    return trackClasses.filter(c => {
      if (c.venueId !== venueId) return false
      if (day === '土') return c.day.includes('土') || c.day.includes('日')
      return c.day.includes(day) && !c.day.includes('・')
    })
  }

  return (
    <div className="matrix-scroll overflow-x-auto -mx-4 px-4">
      <table className="w-full min-w-[560px] border-collapse text-xs">
        <thead>
          <tr>
            <th className="text-left p-2 text-[10px] font-bold text-gray-400 border-b-2 border-brand-orange sticky left-0 bg-brand-orange-light z-10 min-w-[80px]">
              会場
            </th>
            {dayKeys.map(d => (
              <th key={d} className="p-2 text-[10px] font-bold text-gray-400 border-b-2 border-brand-orange text-center min-w-[70px]">
                {d === '土' ? '土日' : d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {venueOrder.map(venueId => {
            const venue = venues.find(v => v.id === venueId)!
            const isHighlighted = activeVenue === venueId

            return (
              <tr
                key={venueId}
                className={`border-b border-warm-200 transition-colors ${isHighlighted ? 'bg-brand-orange-light' : 'hover:bg-warm-50'}`}
              >
                <td className={`p-2 sticky left-0 z-[1] ${isHighlighted ? 'bg-brand-orange-light' : 'bg-white'}`}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: venue.color }} />
                    <span className="font-bold text-brand-navy text-[11px]">{venue.shortName}</span>
                  </div>
                </td>
                {dayKeys.map(day => {
                  const classes = getClasses(venueId, day)
                  return (
                    <td key={day} className="p-1 align-top text-center">
                      {classes.length === 0 ? (
                        <span className="text-gray-200">-</span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {classes.map(cls => (
                            <div
                              key={cls.id}
                              className={`text-left p-1.5 rounded-md border cursor-pointer transition-all hover:border-brand-orange hover:bg-brand-orange-light ${
                                cls.isPopular ? 'border-brand-orange bg-brand-orange-light' : 'border-warm-200 bg-white'
                              }`}
                            >
                              <div className={`font-bold text-[10px] leading-tight ${cls.isPopular ? 'text-brand-orange' : 'text-brand-navy'}`}>
                                {cls.shortName}
                              </div>
                              <div className="text-[9px] text-gray-400 mt-0.5">{cls.time}</div>
                              <span className={`inline-block text-[8px] px-1 py-px rounded mt-0.5 ${
                                cls.isPopular ? 'bg-brand-orange/10 text-brand-orange' : 'bg-blue-50 text-blue-600'
                              }`}>
                                {cls.age}
                                {cls.isPopular && ' 人気No.1'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================
// Price Section
// ============================================================
function PriceSection() {
  return (
    <section id="price" className="px-5 py-10 max-w-3xl mx-auto">
      <p className="section-label">料金</p>
      <h2 className="section-title mb-2">NPO法人だから、安心の価格設定</h2>
      <p className="text-sm text-gray-500 mb-6">一般的な陸上教室と比べて、手頃な月額で専門的な指導が受けられます。</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: '中村町・スポレク', price: '¥5,500', note: '/月' },
          { label: 'かけっこ塾・泉 他', price: '¥6,600', note: '/月' },
          { label: 'インクルーシブ', price: '¥3,300', note: '/月' },
          { label: 'るぶげる親子', price: '¥8,800', note: '/月' },
        ].map(({ label, price, note }) => (
          <div key={label} className="bg-warm-50 rounded-xl p-4 text-center">
            <div className="text-[10px] text-gray-400 mb-1">{label}</div>
            <div className="font-display font-bold text-xl text-brand-navy">{price}</div>
            <div className="text-[10px] text-gray-400">{note}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-warm-200 rounded-xl overflow-hidden text-sm">
        <div className="bg-brand-navy text-white px-4 py-2.5 font-display font-bold text-sm">入会時にかかる費用（すべて税込）</div>
        <div className="divide-y divide-warm-200">
          {[
            { item: '入会手数料', price: '¥5,500', note: '※同一世帯2人目以降 ¥2,750' },
            { item: '年度会費', price: '¥5,500/年', note: '' },
            { item: 'スポーツ安全保険', price: '¥800〜¥2,000/年', note: '加入区分により異なる' },
          ].map(({ item, price, note }) => (
            <div key={item} className="flex items-center justify-between px-4 py-3">
              <div>
                <span className="font-bold text-brand-navy">{item}</span>
                {note && <span className="text-[10px] text-gray-400 block">{note}</span>}
              </div>
              <span className="font-display font-bold text-brand-navy">{price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-brand-orange-light border border-brand-orange/20 rounded-xl p-4 text-center">
        <p className="text-sm text-brand-navy">
          <span className="font-bold text-brand-orange">体験当日の入会で入会金(¥5,500)が無料！</span>
          <br />
          <span className="text-xs text-gray-500">+ STARTUSオリジナルTシャツプレゼント</span>
        </p>
      </div>
    </section>
  )
}

// ============================================================
// Age Guide Section
// ============================================================
function AgeGuide() {
  const steps = [
    { age: '年中〜小1', name: 'アプローチ', highlight: true },
    { age: '小1〜小3', name: 'キッズ', highlight: false },
    { age: '小3〜中学', name: 'ジュニア', highlight: false },
    { age: '中学〜大人', name: 'マラソン塾', highlight: false },
  ]

  return (
    <section className="px-5 py-10 bg-warm-50 max-w-3xl mx-auto">
      <p className="section-label">ステップアップ</p>
      <h2 className="section-title mb-2">年齢に合わせて長く続けられる</h2>
      <p className="text-sm text-gray-500 mb-6">お子様の成長に合わせてクラブ内でレベルアップ。</p>

      <div className="flex gap-0">
        {steps.map((step, i) => (
          <div
            key={step.name}
            className={`flex-1 text-center py-3 px-1 relative border rounded-lg -mr-px ${
              step.highlight ? 'bg-brand-orange-light border-brand-orange' : 'bg-white border-warm-200'
            }`}
          >
            <div className="text-[9px] text-gray-400">{step.age}</div>
            <div className="text-[11px] font-bold text-brand-navy mt-0.5">{step.name}</div>
            {i < steps.length - 1 && (
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-brand-orange text-sm z-10">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// Sticky CTA
// ============================================================
function StickyCTA() {
  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-sm border-t border-warm-200 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="text-xs text-gray-500">
          <span className="font-bold text-brand-navy text-sm block">まずは無料体験から</span>
          体験当日の入会で入会金無料
        </div>
        <Link href="/taiken" className="btn-primary !py-2.5 !px-6 !text-sm whitespace-nowrap">
          体験申込
        </Link>
      </div>
    </div>
  )
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer className="bg-brand-navy text-center px-5 py-8">
      <div className="font-display text-white font-bold text-sm mb-1">STARTUS sports academy</div>
      <p className="text-white/35 text-[10px] leading-relaxed">
        NPO法人かなざわ総合スポーツクラブ
        <br />〒921-8022 金沢市中村町26-43 VIDA金沢2階
        <br />TEL 076-287-3789（10:00〜16:00）
      </p>
    </footer>
  )
}

// ============================================================
// Main LP Component
// ============================================================
export default function RikujoLP() {
  const [activeVenue, setActiveVenue] = useState<string | null>(null)

  return (
    <main>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Map Section */}
      <section id="map" className="px-5 py-10 max-w-3xl mx-auto">
        <p className="section-label">step 1</p>
        <h2 className="section-title mb-1">近くの会場をタップ</h2>
        <p className="text-sm text-gray-500 mb-4">お住まいの地域から一番近い会場を見つけましょう</p>
        <VenueMap activeVenue={activeVenue} onSelect={setActiveVenue} />

        {/* Venue legend buttons */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <button
            onClick={() => setActiveVenue(null)}
            className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
              !activeVenue ? 'bg-brand-orange-light border-brand-orange text-brand-navy font-bold' : 'bg-white border-warm-200 text-gray-500 hover:border-brand-orange'
            }`}
          >
            すべて
          </button>
          {venues
            .filter(v => ['shiei', 'nakamura', 'seibu', 'inoki', 'sporec'].includes(v.id))
            .map(v => (
              <button
                key={v.id}
                onClick={() => setActiveVenue(activeVenue === v.id ? null : v.id)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                  activeVenue === v.id ? 'bg-brand-orange-light border-brand-orange text-brand-navy font-bold' : 'bg-white border-warm-200 text-gray-500 hover:border-brand-orange'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                {v.shortName}
              </button>
            ))}
        </div>
      </section>

      {/* 3. Matrix Section */}
      <section id="matrix" className="px-5 py-10 bg-brand-orange-light max-w-3xl mx-auto">
        <p className="section-label">step 2</p>
        <h2 className="section-title mb-1">曜日と教室をくらべる</h2>
        <p className="text-sm text-gray-500 mb-4">横スクロールで全曜日を確認。教室をタップで詳細表示。</p>
        <ClassMatrix activeVenue={activeVenue} />
      </section>

      {/* 4. Growth / Data Section */}
      <section className="px-5 py-10 max-w-3xl mx-auto">
        <p className="section-label">成長の見える化</p>
        <h2 className="section-title mb-2">データで成長が見える指導</h2>
        <p className="text-sm text-gray-500 mb-6">
          半年に一度のフィードバックシートで、お子様の成長を可視化。
          在籍データも公開し、教室の雰囲気がわかります。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: '📊', title: 'フィードバックシート', desc: '半年ごとに目標と改善点を可視化。お子様の成長を実感できます。' },
            { icon: '👥', title: '在籍データ公開', desc: '学校別・学年別・男女比のデータを公開。どんな仲間がいるか事前にわかります。' },
            { icon: '💬', title: '保護者の声', desc: '「走るのが楽しくなった！」「50m走のタイムが上がった！」' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-warm-50 rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-bold text-sm text-brand-navy mb-1">{title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Price */}
      <PriceSection />

      {/* 6. Age Guide */}
      <AgeGuide />

      {/* 7. Bottom CTA */}
      <section className="bg-brand-navy px-5 py-12 text-center">
        <p className="text-white/80 text-base mb-2">
          まずは気軽に<span className="font-bold text-brand-orange">無料体験</span>から。
        </p>
        <p className="text-white/50 text-sm mb-6">お子様の「やってみたい」を応援します。</p>
        <Link href="/taiken" className="btn-primary text-lg px-12 py-4">
          無料体験に申し込む
        </Link>
        <p className="text-white/30 text-xs mt-3">体験当日の入会でおトクな特典あり</p>
      </section>

      {/* Sticky CTA */}
      <StickyCTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}
