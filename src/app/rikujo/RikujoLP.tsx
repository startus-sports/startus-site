'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { trackClasses, venues, levelConfig, instructors, testimonials } from '@/lib/classes-data'
import type { ClassData } from '@/lib/classes-data'

// ============================================================
// Hero Section (improved with SVG silhouettes)
// ============================================================
function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-navy to-brand-navy-light overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-40px] right-[-40px] w-44 h-44 rounded-full bg-brand-orange opacity-10" />
      <div className="absolute bottom-[-60px] left-[-30px] w-36 h-36 rounded-full bg-brand-orange opacity-[0.06]" />

      {/* Running silhouettes */}
      <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.07] text-brand-orange" viewBox="0 0 200 200" fill="currentColor">
        <path d="M120 40c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zm38 82l-18-18-8 8-24-24-28 28v20h16v36h20v-36h16v36h20v-36h16v-14h-10z" />
      </svg>
      <svg className="absolute bottom-4 left-8 w-40 h-40 opacity-[0.05] text-white" viewBox="0 0 200 200" fill="currentColor">
        <path d="M80 35c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zm18 82l-18-18-8 8-24-24-28 28v20h16v36h20v-36h16v36h20v-36h16v-14h-10z" />
      </svg>

      <div className="relative max-w-3xl mx-auto px-5 py-14 md:py-24 text-center">
        <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
          金沢で一番通いやすい陸上教室
        </span>

        <h1 className="font-display text-white text-2xl md:text-4xl font-bold leading-relaxed mb-3">
          走ることが、<span className="text-brand-orange">好き</span>になる。
          <br />金沢の陸上教室
        </h1>

        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
          市内5会場で週6日開催。家の近くで、
          <br className="md:hidden" />好きな曜日に通えます。
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
// About Section (3 key features at a glance)
// ============================================================
function AboutSection() {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10 text-brand-orange" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth="2">
          <circle cx="20" cy="10" r="5" />
          <path d="M14 20h12l-2 14h-8l-2-14z" />
          <path d="M10 28l-4-6M30 28l4-6" strokeLinecap="round" />
        </svg>
      ),
      num: '17',
      title: '年中〜大人まで17教室',
      desc: 'お子様の年齢・レベルに合わせた教室を選べます。',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-brand-orange" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth="2">
          <path d="M20 6l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
          <circle cx="12" cy="30" r="3" />
          <circle cx="28" cy="28" r="3" />
          <circle cx="20" cy="34" r="2" />
        </svg>
      ),
      num: '5',
      title: '市内5会場で毎日開催',
      desc: '家の近くの会場で、好きな曜日に通えます。',
    },
    {
      icon: (
        <svg className="w-10 h-10 text-brand-orange" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth="2">
          <circle cx="20" cy="12" r="6" />
          <path d="M10 32c0-6 4-10 10-10s10 4 10 10" strokeLinecap="round" />
          <path d="M24 8l4-3M28 12l4 0" strokeLinecap="round" />
        </svg>
      ),
      num: '5',
      title: '専門の指導者がいる',
      desc: '大学陸上部コーチからベテランまで、各教室に専門コーチ。',
    },
  ]

  return (
    <section className="px-5 py-10 max-w-3xl mx-auto">
      <p className="section-label">STARTUSとは</p>
      <h2 className="section-title mb-6">3秒でわかるSTARTUS陸上教室</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map(({ icon, num, title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-5 text-center border border-warm-200 hover:border-brand-orange/30 transition-colors">
            <div className="flex justify-center mb-3">{icon}</div>
            <div className="font-display font-bold text-3xl text-brand-orange mb-1">{num}</div>
            <div className="font-bold text-sm text-brand-navy mb-1">{title}</div>
            <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// Social Proof / Trust Section (enhanced with numbers & mini testimonials)
// ============================================================
function SocialProof() {
  const reasons = [
    {
      icon: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
          <path d="M16 4l2 5 5 0-4 3 1 5-4-3-4 3 1-5-4-3 5 0 2-5z" />
          <rect x="6" y="18" width="20" height="10" rx="2" />
        </svg>
      ),
      highlight: '5会場',
      title: '市内5会場・週6日開催',
      desc: '家の近くで通いやすい。振替も柔軟に対応できます。',
      voice: '「近くで通えるのが決め手でした」',
      voiceBy: '40代保護者',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
          <circle cx="16" cy="10" r="5" />
          <path d="M8 26c0-5 3-8 8-8s8 3 8 8" strokeLinecap="round" />
        </svg>
      ),
      highlight: '5名+',
      title: '教室ごとの専門指導者',
      desc: '大学陸上部コーチから元選手まで、各教室に専門の指導者が在籍。',
      voice: '「先生が優しくて子どもが毎週楽しみにしています」',
      voiceBy: '30代保護者',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
          <circle cx="16" cy="16" r="10" />
          <path d="M16 10v6l4 4" strokeLinecap="round" />
        </svg>
      ),
      highlight: '月額制',
      title: '分かりやすい月額制',
      desc: '月額¥6,600が中心。月謝以外の追加料金なし。兄弟割引もあります。',
      voice: '「料金体系がシンプルで分かりやすいです」',
      voiceBy: '30代保護者',
    },
  ]

  return (
    <section className="px-5 py-10 max-w-3xl mx-auto bg-warm-50">
      <p className="section-label">選ばれる理由</p>
      <h2 className="section-title mb-6">保護者が安心して通わせられる理由</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {reasons.map(({ icon, highlight, title, desc, voice, voiceBy }) => (
          <div key={title} className="bg-white rounded-xl p-5 text-center border border-warm-200">
            <div className="flex justify-center mb-2">{icon}</div>
            <div className="font-display font-bold text-2xl text-brand-orange mb-1">{highlight}</div>
            <div className="font-bold text-sm text-brand-navy mb-1">{title}</div>
            <div className="text-xs text-gray-500 leading-relaxed mb-3">{desc}</div>
            <div className="border-t border-warm-200 pt-2">
              <p className="text-[10px] text-brand-navy italic">{voice}</p>
              <p className="text-[9px] text-gray-400">— {voiceBy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// Instructor Profiles Section (new)
// ============================================================
function InstructorProfiles() {
  return (
    <section className="px-5 py-10 max-w-3xl mx-auto">
      <p className="section-label">指導者紹介</p>
      <h2 className="section-title mb-2">お子さんを指導するコーチたち</h2>
      <p className="text-sm text-gray-500 mb-6">各教室に専門の指導者が在籍。安心してお任せください。</p>

      <div className="flex gap-3 overflow-x-auto pb-3 scroll-snap-x -mx-2 px-2">
        {instructors.map(inst => {
          const classNames = inst.classIds
            .map(id => trackClasses.find(c => c.id === id)?.shortName)
            .filter(Boolean)
            .slice(0, 3)

          return (
            <div
              key={inst.id}
              className="flex-shrink-0 w-44 bg-white rounded-xl border border-warm-200 p-4 text-center scroll-snap-item hover:border-brand-orange/30 transition-colors"
            >
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-display font-bold text-xl shadow-md"
                style={{ backgroundColor: inst.avatarColor }}
              >
                {inst.avatarInitial}
              </div>

              <div className="font-bold text-sm text-brand-navy">
                {inst.nickname ? `${inst.name}` : inst.name}
              </div>
              {inst.nickname && (
                <div className="text-xs text-brand-orange font-bold">{inst.nickname}</div>
              )}

              <span className="inline-block text-[9px] bg-brand-orange/10 text-brand-orange font-bold px-2 py-0.5 rounded-full mt-1">
                {inst.title}
              </span>

              <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">{inst.description}</p>

              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {classNames.map(name => (
                  <span key={name} className="text-[8px] bg-warm-50 text-gray-500 px-1.5 py-0.5 rounded">
                    {name}
                  </span>
                ))}
                {inst.classIds.length > 3 && (
                  <span className="text-[8px] text-gray-400">他{inst.classIds.length - 3}教室</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-[10px] text-gray-400 text-center mt-2">← 横にスクロールして他のコーチも見る</p>
    </section>
  )
}

// ============================================================
// Parent Voices Section (new)
// ============================================================
function ParentVoices() {
  return (
    <section className="px-5 py-10 max-w-3xl mx-auto bg-warm-50">
      <p className="section-label">保護者の声</p>
      <h2 className="section-title mb-6">「通わせてよかった」</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl p-5 border border-warm-200 relative">
            {/* Quote mark */}
            <span className="absolute top-3 left-4 text-4xl text-brand-orange/15 font-display font-bold leading-none">&ldquo;</span>

            <p className="text-sm text-brand-navy leading-relaxed mt-4 mb-3">
              {t.quote}
            </p>

            <div className="border-t border-warm-200 pt-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="7" r="3" />
                  <path d="M4 17c0-3 2-5 6-5s6 2 6 5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-brand-navy">{t.parent}</div>
                <div className="text-[9px] text-gray-400">{t.classRef}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// Enrollment Flow Section (new)
// ============================================================
function EnrollmentFlow() {
  const steps = [
    {
      num: '1',
      title: '無料体験に申し込む',
      desc: 'このサイトから申し込み。3営業日以内に事務局からご連絡します。',
      icon: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
          <rect x="8" y="4" width="16" height="24" rx="3" />
          <path d="M14 20h4M12 16h8M12 12h8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: '2',
      title: '体験レッスンに参加',
      desc: '運動できる服装と飲み物だけでOK。お気軽にどうぞ。',
      icon: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
          <circle cx="16" cy="8" r="4" />
          <path d="M10 28l2-10 4 4 4-4 2 10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: '3',
      title: '入会手続き',
      desc: '体験当日にその場で入会OK！入会金無料の特典あり。',
      icon: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
          <circle cx="16" cy="16" r="10" />
          <path d="M11 16l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <section id="flow" className="px-5 py-10 max-w-3xl mx-auto">
      <p className="section-label">入会の流れ</p>
      <h2 className="section-title mb-6">かんたん3ステップ</h2>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={step.num}>
            <div className="flex gap-4 items-start">
              {/* Step number */}
              <div className="flex-shrink-0 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-display font-bold text-xl shadow-md">
                {step.num}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  {step.icon}
                  <h3 className="font-bold text-base text-brand-navy">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="flex items-center ml-6 py-1">
                <div className="w-px h-6 bg-brand-orange/30" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Benefit badge */}
      <div className="mt-6 bg-brand-orange-light border border-brand-orange/20 rounded-xl p-4 text-center">
        <p className="text-sm font-bold text-brand-orange">
          体験当日の入会で入会金(¥5,500)が無料！
        </p>
        <p className="text-xs text-gray-500 mt-1">+ STARTUSオリジナルTシャツプレゼント</p>
      </div>
    </section>
  )
}

// ============================================================
// Instagram Section (new - placeholder)
// ============================================================
function InstagramSection() {
  return (
    <section className="px-5 py-10 max-w-3xl mx-auto bg-warm-50">
      <p className="section-label">活動報告</p>
      <h2 className="section-title mb-2">Instagramで最新の活動をチェック</h2>
      <p className="text-sm text-gray-500 mb-6">教室の様子やイベント情報を発信中</p>

      {/* Placeholder grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'ウォーミングアップ', gradient: 'from-brand-orange/20 to-amber-100' },
          { label: 'スタート練習', gradient: 'from-blue-100 to-blue-50' },
          { label: 'フォーム指導', gradient: 'from-green-100 to-green-50' },
          { label: 'タイム計測', gradient: 'from-purple-100 to-purple-50' },
          { label: 'みんなでリレー', gradient: 'from-brand-orange/10 to-yellow-50' },
          { label: 'マラソン練習', gradient: 'from-cyan-100 to-cyan-50' },
        ].map(({ label, gradient }) => (
          <div
            key={label}
            className={`aspect-square rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center p-2`}
          >
            <span className="text-[10px] text-gray-500 text-center font-medium">{label}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 text-center mb-4">
        写真は準備中です。Instagramでは実際の活動写真を公開中！
      </p>

      <div className="text-center">
        <a
          href="https://www.instagram.com/startus_sports/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Instagramをフォロー
        </a>
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
            {childClasses.map(cls => {
              const lc = levelConfig[cls.level]
              return (
                <button
                  key={cls.id}
                  onClick={() => onClassSelect(cls)}
                  className="w-full text-left p-3 rounded-lg border border-warm-200 hover:border-brand-orange hover:bg-brand-orange-light transition-all active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs text-brand-navy">{cls.shortName}</span>
                        {cls.isPopular && <span className="text-[8px] bg-brand-orange/10 text-brand-orange font-bold px-1 py-px rounded">人気</span>}
                        {cls.isNew && <span className="text-[8px] bg-blue-50 text-blue-600 font-bold px-1 py-px rounded">NEW</span>}
                        <span className="text-[8px] font-bold px-1.5 py-px rounded" style={{ backgroundColor: lc.bgColor, color: lc.color }}>
                          {'★'.repeat(lc.stars)}{'☆'.repeat(3 - lc.stars)} {lc.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-1 font-medium">{cls.oneLiner}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{cls.day} {cls.time} ｜ {cls.age} ｜ ¥{cls.price.toLocaleString()}/月</div>
                    </div>
                    <span className="text-brand-orange text-sm flex-shrink-0 ml-2 mt-1">詳細 →</span>
                  </div>
                </button>
              )
            })}
          </>
        )}
        {otherClasses.length > 0 && (
          <>
            <div className="text-[10px] font-bold text-gray-400 mt-3 mb-1">その他の教室</div>
            {otherClasses.map(cls => {
              const lc = levelConfig[cls.level]
              return (
                <button
                  key={cls.id}
                  onClick={() => onClassSelect(cls)}
                  className="w-full text-left p-2.5 rounded-lg border border-warm-100 hover:border-brand-orange hover:bg-brand-orange-light transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs text-gray-500">{cls.shortName}</span>
                        <span className="text-[8px] font-bold px-1.5 py-px rounded" style={{ backgroundColor: lc.bgColor, color: lc.color }}>
                          {lc.label}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{cls.day} {cls.time} ｜ {cls.age} ｜ ¥{cls.price.toLocaleString()}/月</div>
                    </div>
                    <span className="text-gray-300 text-sm flex-shrink-0 ml-2">→</span>
                  </div>
                </button>
              )
            })}
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
          {/* Badges row */}
          <div className="flex gap-2 flex-wrap">
            {(() => { const lc = levelConfig[cls.level]; return (
              <span className="inline-block text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: lc.bgColor, color: lc.color }}>
                {'★'.repeat(lc.stars)}{'☆'.repeat(3 - lc.stars)} {lc.label}
              </span>
            )})()}
            {cls.isPopular && (
              <span className="inline-block text-xs bg-brand-orange/10 text-brand-orange font-bold px-2 py-1 rounded">人気No.1 教室</span>
            )}
            {cls.isNew && (
              <span className="inline-block text-xs bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded">NEW</span>
            )}
          </div>

          {/* One-liner */}
          <p className="text-base font-bold text-brand-navy">{cls.oneLiner}</p>

          {cls.description && (
            <p className="text-sm text-gray-600 leading-relaxed">{cls.description}</p>
          )}

          {/* こんなお子さんにおすすめ */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-3.5">
            <div className="text-xs font-bold text-green-700 mb-1">こんなお子さんにおすすめ</div>
            <p className="text-sm text-green-800 leading-relaxed">{cls.recommendFor}</p>
          </div>

          {/* レッスン内容 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5">
            <div className="text-xs font-bold text-blue-700 mb-1">レッスンの流れ</div>
            <p className="text-sm text-blue-800 leading-relaxed">{cls.lessonContent}</p>
          </div>

          {/* 基本情報 */}
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
            <div className="border-t border-warm-200 pt-2.5">
              <div className="flex justify-between items-start">
                <span className="text-gray-400">指導者</span>
                <div className="text-right">
                  <span className="font-bold text-brand-navy">{cls.instructor}</span>
                  {cls.instructorTitle && (
                    <div className="text-[10px] text-gray-400 mt-0.5">{cls.instructorTitle}</div>
                  )}
                </div>
              </div>
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
// Venue Map using Google Maps JS API + venue cards
// ============================================================
import dynamic from 'next/dynamic'

// Google Maps must be loaded client-side only
const GoogleMapComponent = dynamic(() => import('./GoogleMap'), { ssr: false })

function VenueMap({ activeVenue, onSelect }: { activeVenue: string | null; onSelect: (id: string | null) => void }) {
  const trackVenueIds = ['shiei', 'nakamura', 'seibu', 'inoki', 'sporec']
  const trackVenues = venues.filter(v => trackVenueIds.includes(v.id))

  return (
    <div className="space-y-3">
      {/* Map with all venue markers */}
      <div className="relative rounded-2xl overflow-hidden border border-warm-200">
        <GoogleMapComponent
          venues={trackVenues}
          activeVenue={activeVenue}
          onSelect={onSelect}
          classCounts={Object.fromEntries(trackVenues.map(v => [v.id, trackClasses.filter(c => c.venueId === v.id).length]))}
        />
      </div>

      {/* Venue cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {trackVenues.map(v => {
          const classCount = trackClasses.filter(c => c.venueId === v.id).length
          const isActive = activeVenue === v.id

          return (
            <button
              key={v.id}
              onClick={() => onSelect(isActive ? null : v.id)}
              className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all active:scale-[0.97] ${
                isActive
                  ? 'border-brand-orange bg-brand-orange-light shadow-md'
                  : 'border-warm-200 bg-white hover:border-brand-orange/50 hover:shadow-sm'
              }`}
            >
              {/* Color dot + count badge */}
              <div className="relative mb-1.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md"
                  style={{ backgroundColor: v.color }}
                >
                  {classCount}
                </div>
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Venue name */}
              <span className={`text-xs font-bold text-center leading-tight ${isActive ? 'text-brand-orange' : 'text-brand-navy'}`}>
                {v.shortName}
              </span>

              {/* Area label */}
              <span className="text-[9px] text-gray-400 mt-0.5">{v.area}</span>

              {/* Class count label */}
              <span className={`text-[9px] mt-1 ${isActive ? 'text-brand-orange' : 'text-gray-400'}`}>
                {classCount}教室
              </span>
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
          { label: 'るぶげる親子', price: '¥9,900', note: '/月', sub: '親子で参加の陸上教室' },
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
// FAQ Section (expanded with 3 more questions)
// ============================================================
function FAQ() {
  const faqs = [
    { q: '運動が苦手でも大丈夫？', a: 'はい。年中〜小1向けのアプローチクラスから始められます。楽しく体を動かすことから始めるので安心です。' },
    { q: '体験は何回できますか？', a: '各教室1回ずつ無料で体験できます。複数の教室を体験して比較するのもおすすめです。' },
    { q: '途中で教室を変えられる？', a: 'はい。同じ月額内で別の教室への振替・変更が可能です。曜日やレベルに合わせて柔軟に対応します。' },
    { q: '雨の日はどうなりますか？', a: '屋外教室は雨天中止です。スポレクプラザは屋内施設なので天候に左右されません。' },
    { q: '兄弟で通うと割引はある？', a: 'はい。同一世帯2人目以降は入会手数料が半額（¥2,750）になります。' },
    { q: '入会までの流れを教えてください', a: '(1)このサイトから無料体験に申込 → (2)体験レッスンに参加 → (3)入会手続き の3ステップです。体験当日にその場で入会もできます。' },
    { q: '必要な持ち物は？', a: '運動できる服装、運動靴、飲み物をお持ちください。特別な道具は不要です。' },
    { q: '見学だけでもできますか？', a: 'はい。見学も大歓迎です。体験申込フォームの備考欄に「見学希望」とお書きください。' },
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
              <svg className="w-4 h-4 text-brand-orange transition-transform group-open:rotate-180 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
// Class Finder Quiz (おすすめ教室診断)
// ============================================================
function ClassFinderQuiz({ onClassSelect }: { onClassSelect: (cls: ClassData) => void }) {
  const [q1, setQ1] = useState<string | null>(null) // age
  const [q2, setQ2] = useState<string | null>(null) // goal

  function getRecommendations(): ClassData[] {
    const childClasses = trackClasses.filter(c => !['中学〜大人'].includes(c.age))

    if (!q1 || !q2) return []

    let filtered = childClasses

    // Filter by age
    if (q1 === 'preschool') {
      filtered = filtered.filter(c => c.age.includes('年中') || c.age.includes('年長') || c.level === 'beginner')
    } else if (q1 === 'lower') {
      filtered = filtered.filter(c => c.age.includes('小学') || c.age.includes('小1') || c.age.includes('小2'))
    } else if (q1 === 'upper') {
      filtered = filtered.filter(c => c.age.includes('中学') || c.level === 'intermediate' || c.level === 'marathon')
    }

    // Sort by goal preference
    if (q2 === 'fun') {
      filtered.sort((a, b) => (a.level === 'beginner' || a.level === 'basic' ? -1 : 1) - (b.level === 'beginner' || b.level === 'basic' ? -1 : 1))
    } else if (q2 === 'speed') {
      filtered.sort((a, b) => (a.level === 'intermediate' ? -1 : 1) - (b.level === 'intermediate' ? -1 : 1))
    } else if (q2 === 'marathon') {
      filtered.sort((a, b) => (a.level === 'marathon' ? -1 : 1) - (b.level === 'marathon' ? -1 : 1))
    } else if (q2 === 'parent') {
      filtered = trackClasses.filter(c => c.level === 'parent')
    }

    return filtered.slice(0, 3)
  }

  const results = getRecommendations()
  const isComplete = q1 && q2

  function reset() {
    setQ1(null)
    setQ2(null)
  }

  return (
    <section className="px-5 py-8 max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-brand-orange-light to-white border-2 border-brand-orange/20 rounded-2xl p-5 md:p-6">
        <div className="text-center mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="font-display font-bold text-lg text-brand-navy mt-1">お子さんにぴったりの教室は？</h2>
          <p className="text-xs text-gray-500 mt-1">2つの質問に答えるだけでおすすめ教室がわかります</p>
        </div>

        {/* Q1 */}
        <div className="mb-4">
          <div className="text-xs font-bold text-brand-navy mb-2">Q1. お子さんの年齢は？</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'preschool', label: '年中〜小1' },
              { id: 'lower', label: '小2〜小4' },
              { id: 'upper', label: '小5〜中学' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setQ1(opt.id)}
                className={`text-xs py-2.5 px-2 rounded-lg border-2 transition-all font-bold ${
                  q1 === opt.id
                    ? 'border-brand-orange bg-brand-orange text-white'
                    : 'border-warm-200 bg-white text-brand-navy hover:border-brand-orange/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="mb-4">
          <div className="text-xs font-bold text-brand-navy mb-2">Q2. どんな目標がありますか？</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'fun', label: '🏃 楽しく体を動かしたい' },
              { id: 'speed', label: '⚡ もっと速く走りたい' },
              { id: 'marathon', label: '🏅 マラソンに挑戦したい' },
              { id: 'parent', label: '👨‍👩‍👧 親子で一緒に' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setQ2(opt.id)}
                className={`text-xs py-2.5 px-2 rounded-lg border-2 transition-all font-bold text-left ${
                  q2 === opt.id
                    ? 'border-brand-orange bg-brand-orange text-white'
                    : 'border-warm-200 bg-white text-brand-navy hover:border-brand-orange/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {isComplete && results.length > 0 && (
          <div className="animate-fadeIn">
            <div className="border-t border-brand-orange/20 pt-4 mt-2">
              <div className="text-xs font-bold text-brand-orange mb-2">おすすめの教室（{results.length}件）</div>
              <div className="space-y-2">
                {results.map(cls => {
                  const lc = levelConfig[cls.level]
                  return (
                    <button
                      key={cls.id}
                      onClick={() => onClassSelect(cls)}
                      className="w-full text-left p-3 rounded-lg bg-white border border-warm-200 hover:border-brand-orange hover:shadow-sm transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-xs text-brand-navy">{cls.shortName}</span>
                            <span className="text-[8px] font-bold px-1.5 py-px rounded" style={{ backgroundColor: lc.bgColor, color: lc.color }}>
                              {lc.label}
                            </span>
                            {cls.isPopular && <span className="text-[8px] bg-brand-orange/10 text-brand-orange font-bold px-1 py-px rounded">人気</span>}
                          </div>
                          <div className="text-[11px] text-gray-600 mt-0.5">{cls.oneLiner}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{cls.day} {cls.time} ｜ {cls.venue}</div>
                        </div>
                        <span className="text-brand-orange text-sm flex-shrink-0 ml-2">詳細 →</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            <button onClick={reset} className="text-[10px] text-gray-400 hover:text-brand-orange mt-3 block mx-auto">
              もう一度やり直す
            </button>
          </div>
        )}
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
// Footer (enhanced with SNS links and footer nav)
// ============================================================
function Footer() {
  return (
    <footer className="bg-brand-navy px-5 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="font-display text-white font-bold text-sm mb-1">STARTUS sports academy</div>
          <p className="text-white/35 text-[10px] leading-relaxed">
            運営：特定非営利活動法人 かなざわ総合スポーツクラブ
            <br />〒921-8022 金沢市中村町26-43 VIDA金沢2階
            <br />TEL 076-287-3789（10:00〜16:00）
          </p>
        </div>

        {/* SNS links */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://www.instagram.com/startus_sports/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </div>

        {/* Footer nav */}
        <div className="flex justify-center gap-4 text-[10px] text-white/40">
          <a href="#price" className="hover:text-white/70 transition-colors">料金</a>
          <a href="#map" className="hover:text-white/70 transition-colors">会場一覧</a>
          <a href="#faq" className="hover:text-white/70 transition-colors">よくある質問</a>
          <Link href="/taiken" className="hover:text-white/70 transition-colors">体験申込</Link>
        </div>
      </div>
    </footer>
  )
}

// ============================================================
// Main LP Component (reordered sections)
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

      {/* 2. Season Banner */}
      <div className="bg-gradient-to-r from-brand-orange to-amber-500 text-white text-center px-4 py-3">
        <p className="text-sm font-bold">🎁 体験当日の入会で入会金(¥5,500)無料 + STARTUSオリジナルTシャツプレゼント</p>
      </div>

      {/* 3. About - 3 key features */}
      <AboutSection />

      {/* 4. Social Proof (enhanced) */}
      <SocialProof />

      {/* 5. Instructor Profiles (new) */}
      <InstructorProfiles />

      {/* 6. Parent Voices (new) */}
      <ParentVoices />

      {/* 7. Quick Quiz */}
      <ClassFinderQuiz onClassSelect={setSelectedClass} />

      {/* 8. Map Section */}
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

      {/* 9. Matrix Section */}
      <section id="matrix" className="px-5 py-10 bg-brand-orange-light max-w-3xl mx-auto">
        <p className="section-label">step 2</p>
        <h2 className="section-title mb-1">曜日と教室をくらべる</h2>
        <p className="text-sm text-gray-500 mb-4">教室をタップすると詳細情報・指導者が確認できます</p>
        <ClassMatrix activeVenue={activeVenue} onClassSelect={setSelectedClass} />
      </section>

      {/* 10. Growth / Data Section */}
      <section className="px-5 py-10 max-w-3xl mx-auto">
        <p className="section-label">成長の見える化</p>
        <h2 className="section-title mb-2">データで成長が見える指導</h2>
        <p className="text-sm text-gray-500 mb-6">
          定期的なフィードバックシートで、お子様の成長を可視化。
          一人ひとりの目標と成長をコーチが丁寧に記録します。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="4" width="20" height="24" rx="2" />
                  <path d="M10 12h12M10 16h8M10 20h10" strokeLinecap="round" />
                </svg>
              ),
              title: 'フィードバックシート',
              desc: '定期的に目標と改善点を可視化。お子様の成長を実感できます。',
            },
            {
              icon: (
                <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4h20v24H6z" strokeLinejoin="round" />
                  <path d="M10 10h6M10 14h8M10 18h4M20 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              title: 'シートのサンプル公開',
              desc: '実際のフィードバックシートをサンプルで公開中。どんな指導を受けられるか事前にわかります。',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-warm-50 rounded-xl p-5 flex gap-4 items-start">
              <div className="flex-shrink-0">{icon}</div>
              <div>
                <div className="font-bold text-sm text-brand-navy mb-1">{title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Price */}
      <PriceSection />

      {/* 12. Enrollment Flow (new) */}
      <EnrollmentFlow />

      {/* 13. Age Guide */}
      <AgeGuide />

      {/* 14. FAQ */}
      <section id="faq">
        <FAQ />
      </section>

      {/* 15. Instagram (new) */}
      <InstagramSection />

      {/* 16. Bottom CTA (enhanced) */}
      <section className="bg-brand-navy px-5 py-12 text-center">
        <p className="text-white/80 text-base mb-2">
          まずは気軽に<span className="font-bold text-brand-orange">無料体験</span>から。
        </p>
        <p className="text-white/50 text-sm mb-6">お子様の「やってみたい」を応援します。</p>

        <Link href="/taiken" className="btn-primary text-lg px-12 py-4">
          無料体験に申し込む
        </Link>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            勧誘はありません
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            各教室1回ずつ無料
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            当日入会で入会金無料
          </span>
        </div>

        <p className="text-white/30 text-xs mt-4">ネットが苦手な方はお電話でも → 076-287-3789</p>
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
