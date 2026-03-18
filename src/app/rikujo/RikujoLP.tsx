'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { trackClasses, venues } from '@/lib/classes-data'
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
          市内5会場で毎日開催。お子様のスケジュールに
          <br className="md:hidden" />合わせて教室を選べます。
        </p>

        <div className="flex justify-center gap-8 md:gap-12 mb-8">
          {[
            { num: '17', label: '教室' },
            { num: '5', label: '会場' },
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
// Venue Detail Card (shown when a venue is selected)
// ============================================================
function VenueDetail({ venueId, onClassSelect }: { venueId: string; onClassSelect: (cls: ClassData) => void }) {
  const venue = venues.find(v => v.id === venueId)
  if (!venue) return null

  const venueClasses = trackClasses.filter(c => c.venueId === venueId)
  const childClasses = venueClasses.filter(c => !['中学〜大人'].includes(c.age))
  const otherClasses = venueClasses.filter(c => ['中学〜大人'].includes(c.age))

  return (
    <div className="mt-4 bg-white border-2 border-brand-orange/30 rounded-xl overflow-hidden animate-fadeIn shadow-lg">
      <div className="px-4 py-3 bg-brand-orange-light border-b border-brand-orange/20 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: venue.color }} />
        <div>
          <div className="font-bold text-sm text-brand-navy">{venue.name}</div>
          <div className="text-[10px] text-gray-400">{venue.address}</div>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {childClasses.length > 0 && (
          <>
            <div className="text-[10px] font-bold text-brand-orange mb-1">子ども向け教室（{childClasses.length}件）</div>
            {childClasses.map(cls => (
              <button
                key={cls.id}
                onClick={() => onClassSelect(cls)}
                className="w-full text-left p-3 rounded-lg border border-warm-200 hover:border-brand-orange hover:bg-brand-orange-light transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-brand-navy">{cls.shortName}</span>
                      {cls.isPopular && <span className="text-[8px] bg-brand-orange/10 text-brand-orange font-bold px-1 py-px rounded">人気</span>}
                      {cls.isNew && <span className="text-[8px] bg-blue-50 text-blue-600 font-bold px-1 py-px rounded">NEW</span>}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{cls.day} {cls.time} ｜ {cls.age} ｜ ¥{cls.price.toLocaleString()}/月</div>
                  </div>
                  <span className="text-brand-orange text-sm flex-shrink-0 ml-2">詳細 →</span>
                </div>
              </button>
            ))}
          </>
        )}
        {otherClasses.length > 0 && (
          <>
            <div className="text-[10px] font-bold text-gray-400 mt-3 mb-1">その他の教室</div>
            {otherClasses.map(cls => (
              <button
                key={cls.id}
                onClick={() => onClassSelect(cls)}
                className="w-full text-left p-2.5 rounded-lg border border-warm-100 hover:border-brand-orange hover:bg-brand-orange-light transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-gray-500">{cls.shortName}</span>
                    <div className="text-[10px] text-gray-400 mt-0.5">{cls.day} {cls.time} ｜ {cls.age} ｜ ¥{cls.price.toLocaleString()}/月</div>
                  </div>
                  <span className="text-gray-300 text-sm flex-shrink-0 ml-2">→</span>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
      <div className="px-3 pb-3">
        <p className="text-[10px] text-center text-gray-400">教室をタップすると詳細が表示されます</p>
      </div>
    </div>
  )
}

// ============================================================
// Class Detail Modal
// ============================================================
function ClassDetailModal({ cls, onClose }: { cls: ClassData; onClose: () => void }) {
  const venue = venues.find(v => v.id === cls.venueId)

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-warm-200 px-5 py-3 flex items-center justify-between z-10">
          <h3 className="font-display font-bold text-brand-navy">{cls.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-brand-navy text-2xl leading-none p-1">&times;</button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="flex gap-2">
            {cls.isPopular && (
              <span className="inline-block text-xs bg-brand-orange/10 text-brand-orange font-bold px-2 py-1 rounded">人気No.1 教室</span>
            )}
            {cls.isNew && (
              <span className="inline-block text-xs bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded">NEW</span>
            )}
          </div>

          {cls.description && (
            <p className="text-sm text-gray-600 leading-relaxed">{cls.description}</p>
          )}

          <div className="bg-warm-50 rounded-xl p-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">会場</span>
              <span className="font-bold text-brand-navy text-right">{venue?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">住所</span>
              <span className="text-xs text-gray-500 text-right">{venue?.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">曜日・時間</span>
              <span className="font-bold text-brand-navy">{cls.day} {cls.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">対象</span>
              <span className="font-bold text-brand-navy">{cls.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">月会費</span>
              <span className="font-display font-bold text-brand-orange text-lg">¥{cls.price.toLocaleString()}<span className="text-xs text-gray-400 font-normal">/月</span></span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">指導者</span>
              <span className="text-brand-navy text-right">{cls.instructor}</span>
            </div>
          </div>

          {/* Google Maps link for venue */}
          {venue && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm text-brand-orange border border-brand-orange/30 rounded-xl py-2.5 hover:bg-brand-orange-light transition-colors"
            >
              Google Mapで会場を見る
            </a>
          )}

          <Link
            href="/taiken"
            className="btn-primary w-full text-center"
          >
            この教室の無料体験に申し込む
          </Link>
          <p className="text-[10px] text-gray-400 text-center">体験当日のご入会で入会金(¥5,500)が無料</p>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Map Section (Google Maps with markers)
// ============================================================
function VenueMap({ activeVenue, onSelect }: { activeVenue: string | null; onSelect: (id: string | null) => void }) {
  const trackVenueIds = ['shiei', 'nakamura', 'seibu', 'inoki', 'sporec']
  const trackVenues = venues.filter(v => trackVenueIds.includes(v.id))

  // Build Google Maps Static API URL with markers
  const center = activeVenue
    ? venues.find(v => v.id === activeVenue)
    : null

  const mapLat = center?.lat ?? 36.565
  const mapLng = center?.lng ?? 136.650
  const mapZoom = activeVenue ? 15 : 12

  // Use Google Maps Embed with place mode for selected venue
  const mapSrc = activeVenue && center
    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(center.name + ' ' + center.address)}&center=${center.lat},${center.lng}&zoom=${mapZoom}&language=ja`
    : `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${mapLat},${mapLng}&zoom=${mapZoom}&language=ja`

  return (
    <div className="relative rounded-2xl overflow-hidden border border-warm-200">
      <iframe
        title="会場マップ"
        className="w-full h-64 md:h-80"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
      />

      {/* Venue quick-select chips overlay */}
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 justify-center">
        {trackVenues.map(v => {
          const classCount = trackClasses.filter(c => c.venueId === v.id).length
          const isActive = activeVenue === v.id
          return (
            <button
              key={v.id}
              onClick={() => onSelect(isActive ? null : v.id)}
              className={`text-[10px] px-2.5 py-1.5 rounded-full border transition-all flex items-center gap-1 shadow-sm backdrop-blur-sm ${
                isActive
                  ? 'bg-brand-orange text-white border-brand-orange font-bold'
                  : 'bg-white/90 border-white/50 text-brand-navy hover:border-brand-orange'
              }`}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: isActive ? '#fff' : v.color }} />
              {v.shortName}
              <span className={`text-[8px] ${isActive ? 'text-white/80' : 'text-gray-400'}`}>({classCount})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// Matrix Section
// ============================================================
function ClassMatrix({ activeVenue, onClassSelect }: { activeVenue: string | null; onClassSelect: (cls: ClassData) => void }) {
  const venueOrder = ['shiei', 'nakamura', 'seibu', 'inoki', 'sporec']
  const dayKeys = ['月', '火', '水', '木', '金', '土']

  function getClasses(venueId: string, day: string): ClassData[] {
    return trackClasses.filter(c => {
      if (c.venueId !== venueId) return false
      if (day === '土') return c.day.includes('土') || c.day.includes('日')
      return c.day.includes(day) && !c.day.includes('・')
    })
  }

  const filteredVenues = activeVenue ? [activeVenue] : venueOrder

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
          {filteredVenues.map(venueId => {
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
                            <button
                              key={cls.id}
                              onClick={() => onClassSelect(cls)}
                              className={`text-left p-1.5 rounded-md border cursor-pointer transition-all hover:border-brand-orange hover:bg-brand-orange-light active:scale-[0.97] ${
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
                                {cls.isPopular && ' 人気'}
                              </span>
                            </button>
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
      <h2 className="section-title mb-2">わかりやすい月額制</h2>
      <p className="text-sm text-gray-500 mb-6">月額¥3,300〜。手頃な価格で専門的な指導が受けられます。</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: '基本教室', price: '¥6,600', note: '/月', sub: 'かけっこ塾・泉・西部・中村町・スポレク' },
          { label: 'るぶげる親子', price: '¥9,900', note: '/月', sub: '親子で参加の陸上塾' },
          { label: 'インクルーシブ', price: '¥3,300', note: '/月', sub: '障がいの有無を問わず' },
          { label: '大人のマラソン', price: '¥3,300', note: '/月', sub: '中学生〜大人対象' },
        ].map(({ label, price, note, sub }) => (
          <div key={label} className="bg-warm-50 rounded-xl p-4 text-center">
            <div className="text-[10px] text-gray-400 mb-1">{label}</div>
            <div className="font-display font-bold text-xl text-brand-navy">{price}</div>
            <div className="text-[10px] text-gray-400">{note}</div>
            <div className="text-[9px] text-gray-300 mt-1 leading-tight">{sub}</div>
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
// Social Proof / Trust Section
// ============================================================
function SocialProof() {
  return (
    <section className="px-5 py-10 max-w-3xl mx-auto bg-warm-50">
      <p className="section-label">選ばれる理由</p>
      <h2 className="section-title mb-6">保護者が安心して通わせられる理由</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            icon: '🏟️',
            title: '市内5会場・週6日開催',
            desc: '家の近くで通いやすい。振替も柔軟に対応できます。',
          },
          {
            icon: '👨‍🏫',
            title: '教室ごとの専門指導者',
            desc: '大学陸上部コーチから元選手まで、各教室に専門の指導者が在籍。',
          },
          {
            icon: '💰',
            title: '安心の価格設定',
            desc: '月額¥3,300〜¥6,600の明朗会計。兄弟割引あり。',
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-5 text-center border border-warm-200">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="font-bold text-sm text-brand-navy mb-1">{title}</div>
            <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// FAQ Section
// ============================================================
function FAQ() {
  const faqs = [
    { q: '運動が苦手でも大丈夫？', a: 'はい。年中〜小1向けのアプローチクラスから始められます。楽しく体を動かすことから始めるので安心です。' },
    { q: '体験は何回できますか？', a: '各教室1回ずつ無料で体験できます。複数の教室を体験して比較するのもおすすめです。' },
    { q: '途中で教室を変えられる？', a: 'はい。同じ月額内で別の教室への振替・変更が可能です。曜日やレベルに合わせて柔軟に対応します。' },
    { q: '雨の日はどうなりますか？', a: '屋外教室は雨天中止です。スポレクプラザは屋内施設なので天候に左右されません。' },
    { q: '兄弟で通うと割引はある？', a: 'はい。同一世帯2人目以降は入会手数料が半額（¥2,750）になります。' },
  ]

  return (
    <section className="px-5 py-10 max-w-3xl mx-auto">
      <p className="section-label">よくある質問</p>
      <h2 className="section-title mb-6">Q&A</h2>
      <div className="space-y-3">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group bg-warm-50 rounded-xl overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-brand-navy flex items-center justify-between list-none">
              <span>Q. {q}</span>
              <span className="text-brand-orange transition-transform group-open:rotate-45 text-lg">+</span>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-500 leading-relaxed">
              A. {a}
            </div>
          </details>
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
        かなざわ総合スポーツクラブ
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
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
  const venueDetailRef = useRef<HTMLDivElement>(null)

  // Scroll to venue detail when a venue is selected
  function handleVenueSelect(venueId: string | null) {
    setActiveVenue(venueId)
    if (venueId) {
      setTimeout(() => {
        venueDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }

  return (
    <main>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Map Section */}
      <section id="map" className="px-5 py-10 max-w-3xl mx-auto">
        <p className="section-label">step 1</p>
        <h2 className="section-title mb-1">近くの会場をタップ</h2>
        <p className="text-sm text-gray-500 mb-4">会場を選ぶと、その会場の教室一覧が表示されます</p>
        <VenueMap activeVenue={activeVenue} onSelect={handleVenueSelect} />

        {/* Venue legend buttons */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <button
            onClick={() => handleVenueSelect(null)}
            className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
              !activeVenue ? 'bg-brand-orange-light border-brand-orange text-brand-navy font-bold' : 'bg-white border-warm-200 text-gray-500 hover:border-brand-orange'
            }`}
          >
            すべて
          </button>
          {venues
            .filter(v => ['shiei', 'nakamura', 'seibu', 'inoki', 'sporec'].includes(v.id))
            .map(v => {
              const classCount = trackClasses.filter(c => c.venueId === v.id).length
              return (
                <button
                  key={v.id}
                  onClick={() => handleVenueSelect(activeVenue === v.id ? null : v.id)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                    activeVenue === v.id ? 'bg-brand-orange text-white border-brand-orange font-bold' : 'bg-white border-warm-200 text-gray-500 hover:border-brand-orange'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeVenue === v.id ? '#fff' : v.color }} />
                  {v.shortName}
                  <span className={`text-[8px] ${activeVenue === v.id ? 'text-white/80' : 'text-gray-400'}`}>({classCount})</span>
                </button>
              )
            })}
        </div>

        {/* Venue detail card */}
        <div ref={venueDetailRef}>
          {activeVenue ? (
            <VenueDetail venueId={activeVenue} onClassSelect={setSelectedClass} />
          ) : (
            <div className="mt-4 bg-warm-50 border border-dashed border-warm-200 rounded-xl p-6 text-center animate-fadeIn">
              <p className="text-sm text-gray-400">上のボタンから会場を選ぶと<br />教室一覧が表示されます</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Matrix Section */}
      <section id="matrix" className="px-5 py-10 bg-brand-orange-light max-w-3xl mx-auto">
        <p className="section-label">step 2</p>
        <h2 className="section-title mb-1">曜日と教室をくらべる</h2>
        <p className="text-sm text-gray-500 mb-4">教室をタップすると詳細情報・指導者が確認できます</p>
        <ClassMatrix activeVenue={activeVenue} onClassSelect={setSelectedClass} />
      </section>

      {/* 4. Social Proof */}
      <SocialProof />

      {/* 5. Growth / Data Section */}
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

      {/* 6. Price */}
      <PriceSection />

      {/* 7. Age Guide */}
      <AgeGuide />

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Bottom CTA */}
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

      {/* Class Detail Modal */}
      {selectedClass && (
        <ClassDetailModal cls={selectedClass} onClose={() => setSelectedClass(null)} />
      )}
    </main>
  )
}
