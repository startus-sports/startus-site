'use client'

import { useState } from 'react'
import Link from 'next/link'

// ============================================================
// Header / Navigation
// ============================================================
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'クラブについて', href: '#about' },
    { label: '定期教室', href: '#classes' },
    { label: '会場案内', href: '#venue' },
    { label: 'お問い合わせ', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="font-display font-bold text-brand-navy text-lg leading-tight">
            <span className="text-brand-orange">STARTUS</span>
            <span className="text-xs text-gray-400 block font-normal">かなざわ総合スポーツクラブ</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-brand-navy">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="hover:text-brand-orange transition-colors">
              {item.label}
            </a>
          ))}
          <Link href="/taiken" className="btn-primary !py-2 !px-5 !text-sm">
            無料体験
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-brand-navy"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-warm-200 px-5 py-4 space-y-4">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="block text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link href="/taiken" className="btn-primary w-full text-center" onClick={() => setMenuOpen(false)}>
            無料体験に申し込む
          </Link>
        </div>
      )}
    </header>
  )
}

// ============================================================
// Hero Section
// ============================================================
function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-navy to-brand-navy-light overflow-hidden">
      <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-brand-orange opacity-[0.08]" />
      <div className="absolute bottom-[-60px] left-[-30px] w-48 h-48 rounded-full bg-brand-orange opacity-[0.05]" />

      <div className="relative max-w-4xl mx-auto px-5 py-16 md:py-28 text-center">
        <span className="inline-block bg-white/10 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
          NPO法人 かなざわ総合スポーツクラブ
        </span>

        <h1 className="font-display text-white text-3xl md:text-5xl font-bold leading-relaxed mb-4">
          スポーツで、<span className="text-brand-orange">もっと輝こう</span>。
        </h1>

        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
          金沢市で30以上のスポーツ教室を運営。<br />
          かけっこから陸上・バスケ・チアまで、<br className="md:hidden" />
          専門コーチが一人ひとりに寄り添います。
        </p>

        <div className="flex justify-center gap-8 md:gap-16 mb-10">
          {[
            { num: '30+', label: 'スポーツ教室' },
            { num: '5', label: '会場' },
            { num: '2004', label: '年設立' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-brand-orange text-2xl md:text-3xl font-bold">{num}</div>
              <div className="text-white/50 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/taiken" className="btn-primary text-base px-10 py-4">
            無料体験に申し込む
          </Link>
          <a href="#classes" className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 text-white font-display font-bold text-base rounded-full hover:bg-white/10 transition-all">
            教室を見る
          </a>
        </div>
        <p className="text-white/30 text-xs mt-3">体験当日の入会で入会金(¥5,500)が無料</p>
      </div>
    </section>
  )
}

// ============================================================
// Notice Banner
// ============================================================
function NoticeBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-orange to-amber-500 text-white text-center px-4 py-3">
      <p className="text-sm font-bold">🎁 体験当日の入会で入会金(¥5,500)無料 + STARTUSオリジナルTシャツプレゼント</p>
    </div>
  )
}

// ============================================================
// News Section
// ============================================================
function NewsSection() {
  const news = [
    { date: '2026.04', tag: 'お知らせ', title: '体験→即入会でおトク！当日入会特典がはじまりました' },
    { date: '2026.03', tag: 'イベント', title: '春の短期教室・特別プログラムのお知らせ' },
    { date: '2026.03', tag: 'お知らせ', title: '2026年度 会員向け新クラス開講について' },
  ]

  return (
    <section className="px-5 py-10 max-w-5xl mx-auto">
      <p className="section-label">最新情報</p>
      <h2 className="section-title mb-6">お知らせ</h2>

      <div className="space-y-3">
        {news.map(({ date, tag, title }) => (
          <div key={title} className="flex items-start gap-4 p-4 bg-warm-50 rounded-xl">
            <span className="text-xs text-gray-400 w-16 flex-shrink-0 pt-0.5">{date}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
              tag === 'イベント' ? 'bg-blue-50 text-blue-600' : 'bg-brand-orange/10 text-brand-orange'
            }`}>
              {tag}
            </span>
            <p className="text-sm text-brand-navy font-medium leading-relaxed">{title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// Classes Section
// ============================================================
function ClassesSection() {
  const categories = [
    {
      icon: '🏃',
      name: '陸上教室',
      desc: 'かけっこ塾・ジュニア陸上・マラソン塾など17教室。市内5会場で週6日開催。',
      count: '17教室',
      href: '/rikujo',
      available: true,
    },
    {
      icon: '🏊',
      name: '水泳教室',
      desc: '子どもから大人まで対応。初心者から上級者まで幅広いクラス。',
      count: '複数教室',
      href: null,
      available: false,
    },
    {
      icon: '🏀',
      name: 'バスケットボール',
      desc: 'ミニバスから一般まで。チームワークと技術を磨きます。',
      count: '複数教室',
      href: null,
      available: false,
    },
    {
      icon: '📣',
      name: 'チア・ダンス',
      desc: 'チアリーディングやダンスで表現力を育てます。',
      count: '複数教室',
      href: null,
      available: false,
    },
    {
      icon: '⚽',
      name: 'サッカー教室',
      desc: 'ボールの基礎から試合形式まで。楽しく続けられる教室。',
      count: '複数教室',
      href: null,
      available: false,
    },
    {
      icon: '🎯',
      name: 'その他の教室',
      desc: '体操・卓球・太極拳など、30以上の多彩な教室を展開中。',
      count: '多数',
      href: null,
      available: false,
    },
  ]

  return (
    <section id="classes" className="px-5 py-12 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">定期教室</p>
        <h2 className="section-title mb-2">30以上のスポーツ教室</h2>
        <p className="text-sm text-gray-500 mb-6">年齢・目的・レベルに合わせた豊富なラインアップ。</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map(({ icon, name, desc, count, href, available }) =>
            available && href ? (
              <Link
                key={name}
                href={href}
                className="bg-white rounded-2xl p-5 border-2 border-brand-orange/30 hover:border-brand-orange hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[10px] bg-brand-orange/10 text-brand-orange font-bold px-2 py-0.5 rounded-full">{count}</span>
                </div>
                <h3 className="font-display font-bold text-brand-navy text-sm md:text-base mb-1 group-hover:text-brand-orange transition-colors">{name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-2 hidden md:block">{desc}</p>
                <span className="text-xs text-brand-orange font-bold">詳しく見る →</span>
              </Link>
            ) : (
              <div
                key={name}
                className="bg-white rounded-2xl p-5 border border-warm-200 opacity-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-400 font-bold px-2 py-0.5 rounded-full">準備中</span>
                </div>
                <h3 className="font-display font-bold text-brand-navy text-sm md:text-base mb-1">{name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed hidden md:block">{desc}</p>
              </div>
            )
          )}
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          ※ 陸上教室以外のページは順次公開予定です。詳細はお電話（076-287-3789）でもお問い合わせいただけます。
        </p>
      </div>
    </section>
  )
}

// ============================================================
// About Section
// ============================================================
function AboutSection() {
  return (
    <section id="about" className="px-5 py-12 max-w-5xl mx-auto">
      <p className="section-label">クラブについて</p>
      <h2 className="section-title mb-6">NPO法人 かなざわ総合スポーツクラブ</h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-sm text-gray-600 leading-loose mb-4">
            私たちSTARTUSは、金沢市を拠点とするNPO法人のスポーツクラブです。
            2004年の設立以来、「スポーツを通じて、地域の人々が健やかで豊かな生活を送れるよう」という理念のもと、
            乳幼児から高齢者まで幅広い世代に向けた教室を展開してきました。
          </p>
          <p className="text-sm text-gray-600 leading-loose">
            現在は30以上のスポーツ教室を運営。かけっこ塾・陸上・バスケ・チア・水泳など、
            専門コーチが一人ひとりのペースに合わせて丁寧に指導しています。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '設立年', value: '2004年' },
            { label: '法人格', value: 'NPO法人' },
            { label: '教室数', value: '30以上' },
            { label: '会場数', value: '5会場' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-warm-50 rounded-xl p-4 text-center">
              <div className="text-[10px] text-gray-400 mb-1">{label}</div>
              <div className="font-display font-bold text-xl text-brand-navy">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Venue Section
// ============================================================
function VenueSection() {
  const venues = [
    '金沢市営陸上競技場（泉野）',
    '中村町スポーツ広場',
    '金沢市西部体育館',
    '猪木スポーツアリーナ',
    'スポレクプラザ',
  ]

  return (
    <section id="venue" className="px-5 py-12 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">会場案内</p>
        <h2 className="section-title mb-6">事務局・主な会場</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-warm-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange flex-shrink-0" />
              <span className="font-bold text-brand-navy text-sm">事務局（VIDA金沢）</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="leading-relaxed">〒921-8022 金沢市中村町26-43<br />VIDA金沢 2階</p>
              <p>TEL:&nbsp;
                <a href="tel:0762873789" className="text-brand-orange font-bold hover:underline">
                  076-287-3789
                </a>
              </p>
              <p className="text-xs text-gray-400">受付時間: 10:00〜16:00（平日）</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-warm-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="font-bold text-brand-navy text-sm">主な教室会場</span>
            </div>
            <div className="space-y-2">
              {venues.map(v => (
                <div key={v} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-200 flex-shrink-0" />
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Contact Section
// ============================================================
function ContactSection() {
  return (
    <section id="contact" className="px-5 py-12 max-w-5xl mx-auto">
      <p className="section-label">お問い合わせ</p>
      <h2 className="section-title mb-6">お気軽にご連絡ください</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-warm-50 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 mb-1">お電話でのお問い合わせ</p>
          <a href="tel:0762873789" className="font-display font-bold text-2xl text-brand-navy hover:text-brand-orange transition-colors">
            076-287-3789
          </a>
          <p className="text-xs text-gray-400 mt-1">受付時間: 10:00〜16:00（平日）</p>
        </div>

        <div className="bg-brand-navy rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-xs text-white/50 mb-1">体験レッスンのお申し込み</p>
          <p className="font-display font-bold text-white text-lg mb-3">無料体験に申し込む</p>
          <Link href="/taiken" className="btn-primary !py-2.5 !px-8 !text-sm">
            体験申込フォームへ
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer className="bg-brand-navy px-5 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="md:flex md:justify-between md:items-start mb-8">
          <div className="mb-6 md:mb-0">
            <div className="font-display text-white font-bold text-xl mb-0.5">STARTUS</div>
            <div className="text-white/40 text-xs">sports academy</div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="text-white/60 font-bold mb-2">教室</div>
              <div className="space-y-1.5">
                <Link href="/rikujo" className="block text-white/40 hover:text-white/70 transition-colors">陸上教室</Link>
                <span className="block text-white/20">水泳教室（準備中）</span>
                <span className="block text-white/20">バスケットボール（準備中）</span>
              </div>
            </div>
            <div>
              <div className="text-white/60 font-bold mb-2">クラブ情報</div>
              <div className="space-y-1.5">
                <a href="#about" className="block text-white/40 hover:text-white/70 transition-colors">クラブについて</a>
                <a href="#venue" className="block text-white/40 hover:text-white/70 transition-colors">会場案内</a>
                <a href="#contact" className="block text-white/40 hover:text-white/70 transition-colors">お問い合わせ</a>
                <Link href="/taiken" className="block text-white/40 hover:text-white/70 transition-colors">体験申込</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex justify-center gap-4 mb-4">
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

          <p className="text-white/30 text-[10px] text-center leading-relaxed">
            特定非営利活動法人 かなざわ総合スポーツクラブ<br />
            〒921-8022 金沢市中村町26-43 VIDA金沢2階<br />
            TEL 076-287-3789（10:00〜16:00）
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================
// Main HomeLP
// ============================================================
export default function HomeLP() {
  return (
    <main>
      <Header />
      <Hero />
      <NoticeBanner />
      <NewsSection />
      <ClassesSection />
      <AboutSection />
      <VenueSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
