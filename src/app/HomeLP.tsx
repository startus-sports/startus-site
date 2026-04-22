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
    { label: '入会の流れ', href: '#flow' },
    { label: '会場案内', href: '#venue' },
    { label: 'お問い合わせ', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="font-display font-bold text-brand-navy leading-tight">
            <span className="text-brand-orange text-lg">STARTUS</span>
            <span className="text-[10px] text-gray-400 block font-normal">かなざわ総合スポーツクラブ</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-xs font-bold text-brand-navy">
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
      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-80 h-80 rounded-full bg-white opacity-[0.02]" />

      <div className="relative max-w-4xl mx-auto px-5 py-16 md:py-28 text-center">
        <span className="inline-block bg-white/10 text-white/80 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
          NPO法人 かなざわ総合スポーツクラブ
        </span>

        <h1 className="font-display text-white text-3xl md:text-5xl font-bold leading-relaxed mb-4">
          スポーツで、<span className="text-brand-orange">もっと輝こう</span>。
        </h1>

        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
          金沢市で30以上のスポーツ教室を運営。<br />
          かけっこから陸上・バドミントン・チアまで、<br />
          専門コーチが一人ひとりに寄り添います。
        </p>

        <div className="flex justify-center gap-8 md:gap-16 mb-10">
          {[
            { num: '30+', label: 'スポーツ教室' },
            { num: '5', label: '会場' },
            { num: '2008', label: '年設立' },
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
    { date: '2026.03', tag: 'お知らせ', title: '2026年度 新クラス開講・クラス変更について' },
    { date: '2026.02', tag: 'キャンペーン', title: 'ランニングアカデミー入会キャンペーン（2/28締切）' },
    { date: '2026.01', tag: 'お知らせ', title: '2026年度 年間スケジュール・休講日のご案内' },
  ]

  const tagColors: Record<string, string> = {
    'イベント': 'bg-blue-50 text-blue-600',
    'キャンペーン': 'bg-green-50 text-green-600',
    'お知らせ': 'bg-brand-orange/10 text-brand-orange',
  }

  return (
    <section className="px-5 py-12 max-w-5xl mx-auto">
      <p className="section-label">最新情報</p>
      <h2 className="section-title mb-6">お知らせ</h2>

      <div className="space-y-2">
        {news.map(({ date, tag, title }) => (
          <div key={title} className="flex items-start gap-4 p-4 bg-warm-50 rounded-xl hover:bg-warm-100 transition-colors">
            <span className="text-xs text-gray-400 w-16 flex-shrink-0 pt-0.5">{date}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${tagColors[tag] ?? 'bg-gray-100 text-gray-500'}`}>
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
// SNS / LINE Section
// ============================================================
function SnsSection() {
  const links = [
    {
      name: 'LINE公式',
      desc: '教室の質問・お問い合わせはLINEが便利です',
      href: 'https://line.me/R/ti/p/@startus',
      bg: 'bg-[#06C755]',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      desc: '活動の様子・最新情報を発信中',
      href: 'https://www.instagram.com/startus_sports/',
      bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      desc: 'イベント情報・活動報告を掲載',
      href: 'https://www.facebook.com/startus.kanazawa',
      bg: 'bg-[#1877F2]',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      desc: '教室の様子・イベント動画を公開',
      href: 'https://www.youtube.com/@startus_sports',
      bg: 'bg-[#FF0000]',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="px-5 py-12 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">フォローする</p>
        <h2 className="section-title mb-2">SNS・公式アカウント</h2>
        <p className="text-sm text-gray-500 mb-6">最新情報・お問い合わせはSNSでも受け付けています。</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {links.map(({ name, desc, href, bg, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 border border-warm-200 hover:shadow-md transition-all flex flex-col items-center text-center gap-3 group"
            >
              <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <div>
                <div className="font-bold text-sm text-brand-navy">{name}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Classes Section - all sports
// ============================================================
function ClassesSection() {
  const [activeTab, setActiveTab] = useState<string>('all')

  const categories = [
    {
      id: 'track',
      icon: '🏃',
      name: '陸上・マラソン',
      tag: '人気No.1',
      tagColor: 'bg-brand-orange/10 text-brand-orange',
      desc: 'かけっこ塾・ジュニア陸上・マラソン塾・インクルーシブランニングなど17教室。市内5会場で週6日開催。',
      classes: ['かけっこ塾（年中〜小3）', 'ジュニア陸上（小1〜中学）', 'るぶげる親子陸上', 'インクルーシブランニング', '大人のマラソン塾'],
      price: '月額 ¥3,300〜¥9,900',
      href: '/rikujo',
      available: true,
    },
    {
      id: 'badminton',
      icon: '🏸',
      name: 'バドミントン',
      tag: '初心者歓迎',
      tagColor: 'bg-blue-50 text-blue-600',
      desc: '大人向け初心者クラスからジュニア競技クラスまで。親子で参加できる教室も。',
      classes: ['大人バドミントン（初心者）', 'ジュニアバドミントン', '親子バドミントン（隔週）'],
      price: '月額 ¥3,300〜',
      href: null,
      available: false,
    },
    {
      id: 'tennis',
      icon: '🎾',
      name: 'テニス',
      tag: '大学コーチ在籍',
      tagColor: 'bg-green-50 text-green-600',
      desc: '大学テニス部コーチによる本格指導。小学生〜中学生対象のジュニアクラスを開催。',
      classes: ['ジュニアテニス（小学生〜中学生）'],
      price: '月額 ¥3,300〜',
      href: null,
      available: false,
    },
    {
      id: 'dance',
      icon: '💃',
      name: 'バレエ・ダンス・チア',
      tag: '表現力UP',
      tagColor: 'bg-pink-50 text-pink-600',
      desc: 'キッズヒップホップ・K-POPダンス・バレエ・チアリーディングなど。表現力と自信を育てます。',
      classes: ['キッズヒップホップ', 'K-POPダンス', 'バレエ（初心者）', 'チアリーディング'],
      price: '月額 ¥3,300〜',
      href: null,
      available: false,
    },
    {
      id: 'soccer',
      icon: '⚽',
      name: 'サッカー・フットサル',
      tag: '',
      tagColor: '',
      desc: '大人向けソーシャルフットサル。心身のリフレッシュを目的とした楽しめる教室です。',
      classes: ['大人フットサル（初心者〜中級）'],
      price: '月額 ¥3,300〜',
      href: null,
      available: false,
    },
    {
      id: 'kinball',
      icon: '🔵',
      name: 'キンボールスポーツ',
      tag: '親子・家族OK',
      tagColor: 'bg-purple-50 text-purple-600',
      desc: '大きなボールを使う誰でも参加できるスポーツ。家族・親子での参加も大歓迎。',
      classes: ['キンボール（家族・親子）'],
      price: '月額 ¥3,300〜',
      href: null,
      available: false,
    },
    {
      id: 'skating',
      icon: '⛸️',
      name: 'アイススケート',
      tag: 'シーズン開催',
      tagColor: 'bg-cyan-50 text-cyan-600',
      desc: '冬季シーズン開催のアイススケート教室。※無料体験なし・体験入会が有料扱いとなります。',
      classes: ['アイススケート（子ども〜大人）'],
      price: '別途ご相談',
      href: null,
      available: false,
    },
    {
      id: 'other',
      icon: '🎯',
      name: 'その他の教室',
      tag: '多数開講中',
      tagColor: 'bg-gray-100 text-gray-600',
      desc: '体操・卓球・太極拳など、多彩な教室を展開中。詳細はお問い合わせください。',
      classes: ['体操', '卓球', '太極拳', 'その他多数'],
      price: '月額 ¥3,300〜',
      href: null,
      available: false,
    },
  ]

  return (
    <section id="classes" className="px-5 py-12 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">定期教室</p>
        <h2 className="section-title mb-2">30以上のスポーツ教室</h2>
        <p className="text-sm text-gray-500 mb-6">年齢・目的・レベルに合わせた豊富なラインアップ。まずは無料体験から。</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map(({ id, icon, name, tag, tagColor, desc, classes, price, href, available }) => (
            <div
              key={id}
              className={`bg-white rounded-2xl p-5 border-2 transition-all ${
                available ? 'border-brand-orange/30 hover:border-brand-orange hover:shadow-md' : 'border-warm-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <h3 className={`font-display font-bold text-base ${available ? 'text-brand-navy' : 'text-gray-400'}`}>
                    {name}
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {!available && (
                    <span className="text-[10px] bg-gray-100 text-gray-400 font-bold px-2 py-0.5 rounded-full">準備中</span>
                  )}
                  {tag && available && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
                  )}
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-3 ${available ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>

              <div className="space-y-1 mb-3">
                {classes.map(c => (
                  <div key={c} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${available ? 'bg-brand-orange' : 'bg-gray-300'}`} />
                    {c}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-warm-200">
                <span className={`text-xs font-bold ${available ? 'text-brand-navy' : 'text-gray-400'}`}>{price}</span>
                {available && href ? (
                  <Link href={href} className="text-xs text-brand-orange font-bold hover:underline">
                    詳しく見る →
                  </Link>
                ) : (
                  <span className="text-[10px] text-gray-400">詳細はお問い合わせを</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border border-warm-200 rounded-2xl p-5 text-center">
          <p className="text-sm text-brand-navy font-bold mb-1">上記以外の教室もあります</p>
          <p className="text-xs text-gray-500 mb-3">全教室の最新スケジュール・空き状況はお電話またはLINEでご確認ください。</p>
          <a href="tel:0762873789" className="btn-outline !text-sm">
            📞 076-287-3789
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Enrollment Flow Section
// ============================================================
function EnrollmentFlow() {
  const steps = [
    {
      num: '1',
      title: '無料体験に申し込む',
      desc: 'このサイトから申し込み。3営業日以内に事務局からご連絡します。LINEやお電話でも受付中。',
      note: '各教室1回ずつ無料',
    },
    {
      num: '2',
      title: '体験レッスンに参加',
      desc: '運動できる服装と飲み物だけでOK。見学だけでも大歓迎です。',
      note: '勧誘はありません',
    },
    {
      num: '3',
      title: '入会手続き',
      desc: '体験当日にその場で入会OK！窓口でご説明します。',
      note: '当日入会で入会金無料',
    },
    {
      num: '4',
      title: 'レッスン開始',
      desc: '翌月から正式会員としてスタート。振替制度もあります。',
      note: '月額¥3,300〜',
    },
  ]

  return (
    <section id="flow" className="px-5 py-12 max-w-5xl mx-auto">
      <p className="section-label">入会の流れ</p>
      <h2 className="section-title mb-2">かんたん4ステップ</h2>
      <p className="text-sm text-gray-500 mb-8">はじめての方も安心。ご不明な点はお気軽にご相談ください。</p>

      <div className="grid md:grid-cols-4 gap-4">
        {steps.map(({ num, title, desc, note }, i) => (
          <div key={num} className="relative">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-brand-orange/20 z-0" style={{ width: 'calc(100% - 48px)', left: '100%' }} />
            )}
            <div className="bg-warm-50 rounded-2xl p-5 text-center relative z-10">
              <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-3 shadow-md shadow-brand-orange/20">
                {num}
              </div>
              <h3 className="font-bold text-sm text-brand-navy mb-2">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">{desc}</p>
              <span className="inline-block text-[10px] bg-white border border-brand-orange/20 text-brand-orange font-bold px-2 py-0.5 rounded-full">
                {note}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-brand-orange-light to-amber-50 border border-brand-orange/20 rounded-2xl p-5 text-center">
        <p className="font-bold text-brand-navy mb-1">体験当日の入会で入会金(¥5,500)が無料！</p>
        <p className="text-xs text-gray-500">+ STARTUSオリジナルTシャツプレゼント</p>
        <Link href="/taiken" className="btn-primary mt-4 !text-sm">
          体験レッスンに申し込む
        </Link>
      </div>
    </section>
  )
}

// ============================================================
// Fee Section
// ============================================================
function FeeSection() {
  return (
    <section className="px-5 py-12 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">料金</p>
        <h2 className="section-title mb-2">わかりやすい月額制</h2>
        <p className="text-sm text-gray-500 mb-6">月額¥3,300〜。追加料金なし。兄弟割引あり。</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: '一般教室', price: '¥6,600', note: '/月', sub: '陸上・バドミントン等' },
            { label: '親子・特別', price: '¥9,900', note: '/月', sub: '親子参加の陸上教室' },
            { label: 'インクルーシブ', price: '¥3,300', note: '/月', sub: '障がいの有無を問わず' },
            { label: 'マラソン等', price: '¥3,300', note: '/月', sub: '中学生〜大人対象' },
          ].map(({ label, price, note, sub }) => (
            <div key={label} className="bg-white rounded-xl p-4 text-center border border-warm-200">
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
      </div>
    </section>
  )
}

// ============================================================
// About Section with history
// ============================================================
function AboutSection() {
  const history = [
    { year: '2006', event: '設立準備委員会を発足' },
    { year: '2008', event: 'NPO法人設立総会・法人登記完了' },
    { year: '2009', event: '事務局を現在地（VIDA金沢2階）に移転' },
    { year: '2014', event: '会員数が100名を超え、教室数も拡大' },
    { year: '2018', event: '法人設立10周年記念イベントを開催' },
    { year: '2024', event: '会員数約500名、30以上の教室を運営' },
  ]

  return (
    <section id="about" className="px-5 py-12 max-w-5xl mx-auto">
      <p className="section-label">クラブについて</p>
      <h2 className="section-title mb-2">NPO法人 かなざわ総合スポーツクラブ</h2>
      <p className="text-sm text-gray-500 mb-8">スポーツの力で、地域を元気に。</p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="font-bold text-brand-navy mb-3">クラブの理念</h3>
          <p className="text-sm text-gray-600 leading-loose mb-4">
            私たちSTARTUSは、「スポーツを通じて、地域の人々が健やかで豊かな生活を送れるよう」という理念のもと設立されたNPO法人です。
          </p>
          <p className="text-sm text-gray-600 leading-loose mb-4">
            乳幼児から高齢者まで、障がいの有無を問わず、誰もが気軽にスポーツに親しめる環境づくりを目指しています。
          </p>
          <p className="text-sm text-gray-600 leading-loose">
            現在は30以上のスポーツ教室を運営し、専門コーチが一人ひとりのペースに合わせて丁寧に指導しています。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '設立年', value: '2008年' },
            { label: '法人格', value: 'NPO法人' },
            { label: '教室数', value: '30以上' },
            { label: '会員数', value: '約500名' },
            { label: '会場数', value: '5会場' },
            { label: '対象年齢', value: '乳幼児〜大人' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-warm-50 rounded-xl p-3 text-center">
              <div className="text-[10px] text-gray-400 mb-0.5">{label}</div>
              <div className="font-display font-bold text-base text-brand-navy">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* History timeline */}
      <div>
        <h3 className="font-bold text-brand-navy mb-4">クラブの歩み</h3>
        <div className="relative">
          <div className="absolute left-14 top-0 bottom-0 w-0.5 bg-warm-200" />
          <div className="space-y-4">
            {history.map(({ year, event }) => (
              <div key={year} className="flex items-start gap-4">
                <span className="w-12 text-right text-xs font-bold text-brand-orange flex-shrink-0 pt-0.5">{year}</span>
                <div className="relative z-10">
                  <div className="w-3 h-3 rounded-full bg-brand-orange mt-0.5 ring-2 ring-white" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Instructor Section
// ============================================================
function InstructorSection() {
  const instructors = [
    { name: '井波 義明', role: '理事長', sport: '陸上・マラソン', color: '#1B2A4A' },
    { name: '宮本 コーチ', role: '陸上コーチ', sport: '大学陸上部出身', color: '#E8740C' },
    { name: '田中 コーチ', role: 'バドミントンコーチ', sport: 'バドミントン', color: '#2A3F6A' },
    { name: '佐藤 コーチ', role: 'ダンスインストラクター', sport: 'チア・ダンス', color: '#D06A0B' },
  ]

  return (
    <section className="px-5 py-12 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">指導者紹介</p>
        <h2 className="section-title mb-2">専門の指導者が在籍</h2>
        <p className="text-sm text-gray-500 mb-6">各教室に専門の指導者が在籍。安心してお任せください。</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {instructors.map(({ name, role, sport, color }) => (
            <div key={name} className="bg-white rounded-2xl p-5 text-center border border-warm-200">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-display font-bold text-xl shadow-md"
                style={{ backgroundColor: color }}
              >
                {name[0]}
              </div>
              <div className="font-bold text-sm text-brand-navy">{name}</div>
              <div className="text-[10px] text-brand-orange font-bold mt-0.5">{role}</div>
              <div className="text-[10px] text-gray-400 mt-1">{sport}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center">※ 各教室の指導者詳細はお問い合わせください</p>
      </div>
    </section>
  )
}

// ============================================================
// FAQ Section
// ============================================================
function FaqSection() {
  const faqs = [
    { q: '運動が苦手でも大丈夫ですか？', a: 'はい、大歓迎です。年齢・レベルに合わせた教室を多数ご用意しています。楽しく体を動かすことから始められます。' },
    { q: '無料体験は何回できますか？', a: '各教室につき1回ずつ無料体験いただけます。複数の教室を体験して比較するのもおすすめです。' },
    { q: '体験だけで入会しなくても大丈夫ですか？', a: 'もちろんです。体験後に勧誘はありません。ご自身のペースでご検討ください。' },
    { q: '途中で教室を変えることはできますか？', a: 'はい。同じ月額内で別の教室への振替・変更が可能です。スケジュールに合わせて柔軟に対応します。' },
    { q: '兄弟で通う場合、割引はありますか？', a: 'はい。同一世帯2人目以降は入会手数料が半額（¥2,750）になります。' },
    { q: '障がいがあっても参加できますか？', a: 'はい。インクルーシブランニングをはじめ、障がいの有無を問わず参加できる教室があります。お気軽にご相談ください。' },
    { q: '大人でも参加できますか？', a: 'はい。マラソン塾・バドミントン・フットサルなど大人向けの教室も充実しています。' },
    { q: '見学だけでもできますか？', a: 'はい、見学も大歓迎です。体験申込フォームの備考欄に「見学希望」とお書きいただくか、お電話でご連絡ください。' },
  ]

  return (
    <section className="px-5 py-12 max-w-5xl mx-auto">
      <p className="section-label">よくある質問</p>
      <h2 className="section-title mb-6">Q&A</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group bg-warm-50 rounded-xl overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-brand-navy flex items-start justify-between list-none gap-2">
              <span>Q. {q}</span>
              <svg className="w-4 h-4 text-brand-orange transition-transform group-open:rotate-180 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="px-4 pb-3 text-sm text-gray-500 leading-relaxed border-t border-warm-200 mt-0 pt-2">
              A. {a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// Venue Section
// ============================================================
function VenueSection() {
  const venues = [
    { name: '金沢市営陸上競技場', area: '泉野', access: '金沢市泉野出町3丁目' },
    { name: '中村町スポーツ広場', area: '中村町', access: '金沢市中村町（事務局そば）' },
    { name: '金沢市西部体育館', area: '西部', access: '金沢市西部' },
    { name: '猪木スポーツアリーナ', area: '南部', access: '金沢市南部' },
    { name: 'スポレクプラザ', area: '中心部', access: '屋内施設（雨天OK）' },
  ]

  return (
    <section id="venue" className="px-5 py-12 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">会場案内</p>
        <h2 className="section-title mb-2">事務局・教室会場</h2>
        <p className="text-sm text-gray-500 mb-6">市内5会場で開催中。お近くの会場をお選びください。</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Main office */}
          <div className="bg-white rounded-2xl p-6 border-2 border-brand-orange/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange flex-shrink-0" />
              <span className="font-bold text-brand-navy">事務局（VIDA金沢2階）</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="leading-relaxed">〒921-8022<br />金沢市中村町26-43 VIDA金沢2階</p>
              <p>
                TEL:&nbsp;
                <a href="tel:0762873789" className="text-brand-orange font-bold hover:underline">076-287-3789</a>
                &nbsp;/ FAX: 076-287-3789
              </p>
              <p>
                Email:&nbsp;
                <a href="mailto:kssports@friend.ocn.ne.jp" className="text-brand-orange hover:underline">kssports@friend.ocn.ne.jp</a>
              </p>
              <p className="text-xs text-gray-400">受付時間: 10:00〜16:00（平日）<br />不在時は留守電にメッセージをどうぞ</p>
            </div>
          </div>

          {/* Venue list */}
          <div className="bg-white rounded-2xl p-6 border border-warm-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="font-bold text-brand-navy">主な教室会場</span>
            </div>
            <div className="space-y-3">
              {venues.map(({ name, area, access }) => (
                <div key={name} className="flex items-start gap-2">
                  <span className="text-[10px] bg-brand-navy text-white font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">{area}</span>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">{name}</div>
                    <div className="text-[10px] text-gray-400">{access}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          <span className="font-bold">アクセス詳細について：</span>
          各会場への詳しいアクセス方法は、お電話またはLINEにてお知らせします。
          体験申込後に担当者よりご案内いたします。
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Contact Section with form
// ============================================================
function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('お問い合わせ（STARTUSウェブサイトより）')
    const bodyText = encodeURIComponent(
      `お名前: ${name}\nメール: ${email}\nお電話: ${phone}\n\nお問い合わせ内容:\n${body}`
    )
    window.location.href = `mailto:kssports@friend.ocn.ne.jp?subject=${subject}&body=${bodyText}`
    setSent(true)
  }

  return (
    <section id="contact" className="px-5 py-12 max-w-5xl mx-auto">
      <p className="section-label">お問い合わせ</p>
      <h2 className="section-title mb-2">お気軽にご連絡ください</h2>
      <p className="text-sm text-gray-500 mb-8">ご不明な点はどんな小さなことでもお気軽にどうぞ。</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="space-y-4">
          <div className="bg-warm-50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-400">お電話</div>
                <a href="tel:0762873789" className="font-display font-bold text-xl text-brand-navy hover:text-brand-orange transition-colors">
                  076-287-3789
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-400">受付時間: 10:00〜16:00（平日）<br />不在時は留守電にメッセージをどうぞ</p>
          </div>

          <div className="bg-warm-50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#06C755]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#06C755]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-400">LINE公式アカウント</div>
                <div className="font-bold text-brand-navy text-sm">@startus で検索</div>
              </div>
            </div>
            <p className="text-xs text-gray-400">営業時間内に順次ご返信します</p>
          </div>

          <div className="bg-warm-50 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-400">メール</div>
                <a href="mailto:kssports@friend.ocn.ne.jp" className="font-bold text-brand-navy text-sm hover:text-brand-orange transition-colors break-all">
                  kssports@friend.ocn.ne.jp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-warm-50 rounded-2xl p-6">
          <h3 className="font-bold text-brand-navy mb-4">メールフォーム</h3>
          {sent ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold text-brand-navy">メールアプリが開きました</p>
              <p className="text-xs text-gray-400 mt-1">送信後、担当者よりご連絡いたします</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">お名前 <span className="text-brand-orange">*</span></label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="山田 太郎"
                  className="w-full border border-warm-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">メールアドレス <span className="text-brand-orange">*</span></label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full border border-warm-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">電話番号</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="076-xxx-xxxx"
                  className="w-full border border-warm-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">お問い合わせ内容 <span className="text-brand-orange">*</span></label>
                <textarea
                  required
                  rows={4}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder="ご質問・ご相談内容をご記入ください"
                  className="w-full border border-warm-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange bg-white resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full !text-sm">
                メールで送信する
              </button>
              <p className="text-[10px] text-gray-400 text-center">送信後、メールアプリが開きます</p>
            </form>
          )}
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
            <div className="text-white/40 text-xs mb-3">sports academy</div>
            <p className="text-white/30 text-[10px] leading-relaxed">
              特定非営利活動法人 かなざわ総合スポーツクラブ<br />
              〒921-8022 金沢市中村町26-43 VIDA金沢2階<br />
              TEL 076-287-3789（10:00〜16:00）
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="text-white/60 font-bold mb-2">教室</div>
              <div className="space-y-1.5">
                <Link href="/rikujo" className="block text-white/40 hover:text-white/70 transition-colors">陸上・マラソン教室</Link>
                <span className="block text-white/20">バドミントン（準備中）</span>
                <span className="block text-white/20">テニス（準備中）</span>
                <span className="block text-white/20">ダンス・チア（準備中）</span>
              </div>
            </div>
            <div>
              <div className="text-white/60 font-bold mb-2">クラブ情報</div>
              <div className="space-y-1.5">
                <a href="#about" className="block text-white/40 hover:text-white/70 transition-colors">クラブについて</a>
                <a href="#flow" className="block text-white/40 hover:text-white/70 transition-colors">入会の流れ</a>
                <a href="#venue" className="block text-white/40 hover:text-white/70 transition-colors">会場案内</a>
                <a href="#contact" className="block text-white/40 hover:text-white/70 transition-colors">お問い合わせ</a>
                <Link href="/taiken" className="block text-white/40 hover:text-white/70 transition-colors">体験申込</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex justify-center gap-3 mb-4">
            {[
              { href: 'https://line.me/R/ti/p/@startus', label: 'LINE', bg: 'bg-[#06C755]' },
              { href: 'https://www.instagram.com/startus_sports/', label: 'IG', bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
              { href: 'https://www.facebook.com/startus.kanazawa', label: 'FB', bg: 'bg-[#1877F2]' },
              { href: 'https://www.youtube.com/@startus_sports', label: 'YT', bg: 'bg-[#FF0000]' },
            ].map(({ href, label, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full ${bg} hover:opacity-80 transition-opacity flex items-center justify-center text-white text-[9px] font-bold`}
                aria-label={label}
              >
                {label}
              </a>
            ))}
          </div>
          <p className="text-white/20 text-[10px] text-center">
            © {new Date().getFullYear()} NPO法人 かなざわ総合スポーツクラブ STARTUS All rights reserved.
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
      <SnsSection />
      <ClassesSection />
      <EnrollmentFlow />
      <FeeSection />
      <AboutSection />
      <InstructorSection />
      <FaqSection />
      <VenueSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
