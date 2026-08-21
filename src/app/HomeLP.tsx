'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { trackEvent } from '@/lib/gtag'
import { submitContact } from '@/lib/supabase'
import { venuesWithClasses, getVenueClasses } from '@/lib/classes-data'
import SportIcon, { type SportIconKey } from '@/components/SportIcon'
import ClassFinder from '@/components/ClassFinder'
import ParentVoices from '@/components/ParentVoices'
import StickyCTA from '@/components/StickyCTA'
import type { NewsItem } from '@/lib/news'

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
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="font-display font-bold text-brand-navy leading-tight">
            <span className="text-brand-orange text-lg">STARTUS</span>
            <span className="text-xs text-gray-600 block font-normal">かなざわ総合スポーツクラブ</span>
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

        {/* スマホではヘッダーがロゴとハンバーガーだけで、
            スクロール中に申込ボタンが画面上から消えていた */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/taiken" className="bg-brand-orange text-white text-xs font-bold px-3.5 py-2 rounded-full">
            体験申込
          </Link>
          <button
            className="p-2 text-brand-navy"
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

      <div className="relative max-w-6xl mx-auto px-5 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <span className="inline-block bg-white/15 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
              NPO法人 かなざわ総合スポーツクラブ
            </span>

            <h1 className="font-display text-white text-3xl md:text-5xl font-bold leading-relaxed mb-4">
              スポーツで、<br className="hidden md:block" />
              <span className="text-brand-orange">もっと輝こう</span>。
            </h1>

            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              金沢市で約30のスポーツ教室を運営。
              かけっこから陸上・バドミントン・チアまで、
              専門コーチが一人ひとりに寄り添います。
            </p>

            <div className="flex justify-center md:justify-start gap-8 md:gap-12 mb-8">
              {[
                { num: '30+', label: 'スポーツ教室' },
                { num: '350+', label: '会員数' },
                { num: '2008', label: '年設立' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center md:text-left">
                  <div className="font-display text-brand-orange text-2xl md:text-3xl font-bold">{num}</div>
                  <div className="text-white/70 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/taiken" className="btn-primary text-base px-10 py-4">
                無料体験に申し込む
              </Link>
              <a href="#classes" className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 text-white font-display font-bold text-base rounded-full hover:bg-white/10 transition-all">
                教室を見る
              </a>
            </div>
            <p className="text-white/70 text-xs mt-3">体験当日の入会で入会金(¥5,500)が無料</p>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -inset-3 bg-brand-orange/20 rounded-[2rem] rotate-2" />
            <Image
              src="/hero-running.png"
              alt="コーチと一緒に走る子どもたち"
              width={1408}
              height={768}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="relative rounded-3xl shadow-2xl ring-1 ring-white/10 object-cover w-full h-56 md:h-80"
            />
            <div className="absolute -bottom-3 left-4 md:left-6 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-brand-navy">無料体験 受付中</span>
            </div>
          </div>
        </div>
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
function NewsSection({ news }: { news: NewsItem[] }) {
  // WordPress側が取得できなかったときはセクションごと出さない
  if (news.length === 0) return null

  const tagColors: Record<string, string> = {
    'イベント': 'bg-blue-50 text-blue-600',
    'キャンペーン': 'bg-green-50 text-green-600',
    'お知らせ': 'bg-brand-orange/10 text-brand-orange',
  }

  return (
    <section className="px-5 py-12 max-w-6xl mx-auto">
      <p className="section-label">最新情報</p>
      <h2 className="section-title mb-6">お知らせ</h2>

      <div className="space-y-2">
        {news.map(({ date, tag, title, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 bg-warm-50 rounded-xl hover:bg-warm-100 transition-colors"
          >
            <span className="text-xs text-gray-600 w-16 flex-shrink-0 pt-0.5">{date}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${tagColors[tag] ?? 'bg-gray-100 text-gray-500'}`}>
              {tag}
            </span>
            <p className="text-sm text-brand-navy font-medium leading-relaxed">
              {title}
              <span className="text-brand-orange font-bold ml-1 whitespace-nowrap">詳しく見る →</span>
            </p>
          </a>
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
      href: 'https://lin.ee/BQKtTDq',
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
      href: 'https://www.instagram.com/kanazawa.sogo.sports.club/',
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
      href: 'https://www.facebook.com/kanazawa.sogo.sportsclub/',
      bg: 'bg-[#1877F2]',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="px-5 py-12 bg-warm-50">
      <div className="max-w-6xl mx-auto">
        <p className="section-label">フォローする</p>
        <h2 className="section-title mb-2">SNS・公式アカウント</h2>
        <p className="text-sm text-gray-500 mb-6">最新情報・お問い合わせはSNSでも受け付けています。</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">{desc}</div>
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
  // 以前は8枚中6枚が href なしで、クリックしても何も起きない行き止まりだった。
  // 非陸上の教室は /class/[slug] のカテゴリページを新設したので全カードが遷移先を持つ。
  // 「その他の教室」カードは price と リンク欄に同じ「詳細はお問い合わせを」が
  // 二重表示されていたため廃止し、下のLINEブロックに集約した。
  const categories: {
    id: string
    icon: SportIconKey
    name: string
    tag: string
    tagColor: string
    desc: string
    classes: string[]
    price: string
    href: string
  }[] = [
    {
      id: 'track',
      icon: 'track',
      name: '陸上・マラソン',
      tag: '人気No.1',
      tagColor: 'bg-brand-orange/10 text-brand-orange',
      desc: 'かけっこ塾・ジュニア陸上・マラソン塾・インクルーシブ陸上など16教室。市内5会場で週6日開催。',
      classes: ['かけっこ塾（年長〜中学生・水/月）', 'ジュニア陸上（小1〜中学）', '走り塾 初中級（小5〜中学生・2026年8月開講）', 'るぶげる親子陸上塾', 'インクルーシブ陸上・大人のマラソン塾'],
      price: '月額 ¥3,300〜¥9,900',
      href: '/rikujo',
    },
    {
      id: 'badminton',
      icon: 'badminton',
      name: 'バドミントン',
      tag: '初心者歓迎',
      tagColor: 'bg-blue-50 text-blue-700',
      desc: 'ジュニアからビギナー、親子参加まで。高尾台中学校・扇台小学校で開催中。',
      classes: ['高尾台ジュニア（土 18:00〜19:30）', '高尾台ビギナー（土 19:30〜21:00）', '扇台（木 17:30〜19:00）', '親子バドミントン（日・高尾台）'],
      price: '月額 ¥6,600',
      href: '/class/badminton',
    },
    {
      id: 'tennis',
      icon: 'tennis',
      name: 'テニス',
      tag: '屋内コート',
      tagColor: 'bg-green-50 text-green-700',
      desc: '金沢星稜大学サブアリーナで開催。天候を気にせず本格レッスン。',
      classes: ['テニス塾（水 19:00〜20:30）'],
      price: '月額 ¥9,900',
      href: '/class/tennis',
    },
    {
      id: 'dance',
      icon: 'dance',
      name: 'バレエ・ダンス・チア',
      tag: '表現力UP',
      tagColor: 'bg-pink-50 text-pink-700',
      desc: 'バレエ・ヒップホップ・チアリーディング・ダンス。金沢市総合体育館スタジオなどで開催中。',
      classes: ['キッズバレエ（金 17:00〜18:00）', 'キッズヒップホップ（金 18:00〜19:00）', 'キッズチアリーディング（金・泉野／水・米泉）', 'キッズダンス（火 18:00〜19:00）'],
      price: '月額 ¥6,600',
      href: '/class/dance',
    },
    {
      id: 'soccer',
      icon: 'soccer',
      name: 'ソーシャルフットボール',
      tag: '誰でも参加OK',
      tagColor: 'bg-cyan-50 text-cyan-700',
      desc: '障がいの有無・年齢を問わず参加できるフットボール教室。屋内人工芝のあめるんパークで毎週開催。スポット参加もOK。',
      classes: ['ソーシャルフットボール（木 17:00〜18:00・あめるんパーク）'],
      price: '月額 ¥3,300（スポット ¥1,500/回）',
      href: '/socialfootball',
    },
    {
      id: 'kinball',
      icon: 'kinball',
      name: 'キンボールスポーツ',
      tag: '親子・家族OK',
      tagColor: 'bg-purple-50 text-purple-700',
      desc: '大きなボールを使う誰でも参加できるスポーツ。高尾台中学校体育館で開催中。',
      classes: ['キンボールスポーツ（日 19:00〜21:00）'],
      price: '月額 ¥4,100',
      href: '/class/kinball',
    },
    {
      id: 'skating',
      icon: 'skating',
      name: 'アイススケート',
      tag: '通年開催',
      tagColor: 'bg-cyan-50 text-cyan-700',
      desc: '健民スポレクプラザのアイスリンクで開催。石川県スケート連盟の指導員が指導。※無料体験の対象外です。',
      classes: ['アイススケート教室（土 9:30〜11:30）'],
      price: '月額 ¥8,800',
      href: '/class/skating',
    },
  ]

  return (
    <section id="classes" className="px-5 py-12 bg-warm-50">
      <div className="max-w-6xl mx-auto">
        <p className="section-label">定期教室</p>
        <h2 className="section-title mb-2">約30のスポーツ教室</h2>
        <p className="text-sm text-gray-500 mb-6">年齢・目的・レベルに合わせた豊富なラインアップ。まずは無料体験から。</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map(({ id, icon, name, tag, tagColor, desc, classes, price, href }) => (
            // カード全体をリンクにする。以前は右下の12pxテキストだけがタップ領域だった
            <Link
              key={id}
              href={href}
              className="group flex flex-col bg-white rounded-2xl p-5 border-2 border-brand-orange/30 hover:border-brand-orange hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-10 h-10 rounded-xl bg-brand-orange-light text-brand-orange flex items-center justify-center flex-shrink-0">
                    <SportIcon name={icon} className="w-6 h-6" />
                  </span>
                  <h3 className="font-display font-bold text-base text-brand-navy group-hover:text-brand-orange transition-colors">
                    {name}
                  </h3>
                </div>
                {tag && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${tagColor}`}>
                    {tag}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-3">{desc}</p>

              {/* 教室名の一覧はスマホでは畳む。8カテゴリ分を縦に並べるとスクロールが
                  3〜4画面になるため。内容はカテゴリページ側で全部見られる */}
              <div className="hidden md:block space-y-1 mb-3">
                {classes.map(c => (
                  <div key={c} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span className="w-1 h-1 rounded-full flex-shrink-0 bg-brand-orange mt-1.5" />
                    {c}
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-warm-200">
                <span className="text-xs font-bold text-brand-navy">{price}</span>
                <span className="text-xs text-brand-orange font-bold whitespace-nowrap">詳しく見る →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 bg-white border border-warm-200 rounded-2xl p-5 text-center">
          <p className="text-sm text-brand-navy font-bold mb-1">上記以外の教室もあります</p>
          <p className="text-xs text-gray-600 mb-3">
            げんきワンレッスン（木曜）など。全教室の最新スケジュール・空き状況は公式LINEでお気軽にご確認ください。
          </p>
          <a
            href="https://lin.ee/BQKtTDq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#06C755] text-white font-display font-bold text-sm rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            公式LINEで質問する
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
    <section id="flow" className="px-5 py-12 max-w-6xl mx-auto">
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
              <span className="inline-block text-xs bg-white border border-brand-orange/20 text-brand-orange font-bold px-2 py-0.5 rounded-full">
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
      <div className="max-w-6xl mx-auto">
        <p className="section-label">料金</p>
        <h2 className="section-title mb-2">わかりやすい月額制</h2>
        <p className="text-sm text-gray-500 mb-6">月額¥3,300〜。兄弟割引あり（2人目は月会費20%OFF・3人目以降は半額）。</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: '一般教室', price: '¥6,600', sub: '陸上・バドミントン等' },
            { label: '親子・特別', price: '¥9,900', sub: '親子参加の陸上教室' },
            { label: 'インクルーシブ', price: '¥3,300', sub: '障がいの有無を問わず' },
            { label: 'マラソン等', price: '¥3,300', sub: '中学生〜大人対象' },
          ].map(({ label, price, sub }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-4 border border-warm-200 flex sm:flex-col items-center sm:items-stretch justify-between gap-3 sm:text-center"
            >
              <div>
                <div className="text-sm font-bold text-brand-navy sm:mb-0.5">{label}</div>
                <div className="text-xs text-gray-600 leading-tight">{sub}</div>
              </div>
              <div className="font-display font-bold text-xl text-brand-navy whitespace-nowrap">
                {price}
                <span className="text-xs text-gray-600 font-normal">/月</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-warm-200 rounded-xl overflow-hidden text-sm">
          <div className="bg-brand-navy text-white px-4 py-2.5 font-display font-bold text-sm">入会時にかかる費用（すべて税込）</div>
          <div className="divide-y divide-warm-200">
            {[
              { item: '入会手数料', price: '¥5,500', note: '※同一世帯2人目以降 ¥2,750' },
              { item: '年度会費', price: '¥5,500/年', note: '※障がいのある方は ¥2,750/年' },
              { item: 'スポーツ安全保険', price: '¥800〜¥1,850/年', note: '中学生以下 ¥800／大人 ¥1,850' },
            ].map(({ item, price, note }) => (
              <div key={item} className="flex items-center justify-between px-4 py-3">
                <div>
                  <span className="font-bold text-brand-navy">{item}</span>
                  {note && <span className="text-xs text-gray-600 block">{note}</span>}
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
    { year: '2006', event: '金沢市内の有志により設立準備委員会を発足' },
    { year: '2008', event: '設立総会・NPO法人登記完了' },
    { year: '2009', event: '事務所を金沢市泉本町に移転' },
    { year: '2017', event: 'スタジオ運営を開始（ジョイスタジオ）' },
    { year: '2018', event: '事務所を現在地（中村町 VIDA金沢2階）に移転、設立10周年イベントを開催' },
    { year: '2026', event: '約30教室・会員数350名以上に。月曜かけっこ塾／走り塾（初中級）など新教室も続々開講中' },
  ]

  return (
    <section id="about" className="px-5 py-12 max-w-6xl mx-auto">
      <p className="section-label">クラブについて</p>
      <h2 className="section-title mb-2">NPO法人 かなざわ総合スポーツクラブ</h2>
      <p className="text-sm text-gray-500 mb-8">スポーツの力で、地域を元気に。</p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="font-bold text-brand-navy mb-3">クラブの理念</h3>
          <p className="text-sm text-gray-600 leading-loose mb-4">
            私たちSTARTUSは、スポーツの力で「元気とうるおいある生活」を創造することをミッションに掲げるNPO法人です。気軽にできるスポーツの身近な機会を提供し、一人ひとりの挑戦と達成感をサポートする「スポーツ元気パートナー」を目指しています。
          </p>
          <p className="text-sm text-gray-600 leading-loose mb-4">
            乳幼児から高齢者まで、障がいの有無を問わず、誰もが気軽にスポーツに親しめる環境づくりを目指しています。
          </p>
          <p className="text-sm text-gray-600 leading-loose">
            現在は約30のスポーツ教室を運営し、専門コーチが一人ひとりのペースに合わせて丁寧に指導しています。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '設立年', value: '2008年' },
            { label: '法人格', value: 'NPO法人' },
            { label: '教室数', value: '約30' },
            { label: '会員数', value: '350名以上' },
            { label: '会場数', value: '市内多数' },
            { label: '対象年齢', value: '乳幼児〜大人' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-warm-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-600 mb-0.5">{label}</div>
              <div className="font-display font-bold text-base text-brand-navy">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-10">
        <Link href="/about" className="btn-outline !text-sm">
          クラブについて詳しく見る →
        </Link>
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
  // photo に public/ 配下のパス（例: '/img/instructors/matsui.jpg'）を入れると
  // 顔写真に切り替わる。未設定の間は姓の1文字を丸アバターで表示する。
  // 子どもを預ける判断で顔が見えないのは不利なので、写真が用意でき次第ここに追加する。
  const instructors: { name: string; role: string; sport: string; color: string; photo?: string }[] = [
    { name: '松井 久', role: 'ベテランコーチ（Qちゃん）', sport: '陸上・マラソン', color: '#2A7B5B' },
    { name: '山本 勝裕', role: '理論派コーチ（やまティー）', sport: '陸上・親子陸上', color: '#185FA5' },
    { name: '須田 崇', role: '陸上コーチ', sport: '陸上（基礎〜応用）', color: '#993C1D' },
    { name: '橋本 祐之', role: 'インクルーシブ専門', sport: 'インクルーシブスポーツ', color: '#534AB7' },
  ]

  return (
    <section className="px-5 py-12 bg-warm-50">
      <div className="max-w-6xl mx-auto">
        <p className="section-label">指導者紹介</p>
        <h2 className="section-title mb-2">専門の指導者が在籍</h2>
        <p className="text-sm text-gray-500 mb-6">各教室に専門の指導者が在籍。安心してお任せください。</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {instructors.map(({ name, role, sport, color, photo }) => (
            <div key={name} className="bg-white rounded-2xl p-5 text-center border border-warm-200">
              {photo ? (
                <Image
                  src={photo}
                  alt={`${name}コーチ`}
                  width={112}
                  height={112}
                  sizes="56px"
                  className="w-14 h-14 rounded-full mx-auto mb-3 object-cover shadow-md"
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-display font-bold text-xl shadow-md"
                  style={{ backgroundColor: color }}
                >
                  {name[0]}
                </div>
              )}
              <div className="font-bold text-sm text-brand-navy">{name}</div>
              <div className="text-xs text-brand-orange font-bold mt-0.5">{role}</div>
              <div className="text-xs text-gray-600 mt-1">{sport}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 text-center">※ かけっこ塾・走り塾（初中級）では金沢星稜大学陸上競技部の学生コーチも指導しています</p>
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
    { q: '兄弟で通う場合、割引はありますか？', a: 'はい。同一世帯2人目以降は入会手数料が半額（¥2,750）になるほか、月会費も2人目は20%OFF・3人目以降は半額になります。' },
    { q: '障がいがあっても参加できますか？', a: 'はい。インクルーシブランニングをはじめ、障がいの有無を問わず参加できる教室があります。お気軽にご相談ください。' },
    { q: '大人でも参加できますか？', a: 'はい。マラソン塾・バドミントン・フットサルなど大人向けの教室も充実しています。' },
    { q: '見学だけでもできますか？', a: 'はい、見学も大歓迎です。体験申込フォームの備考欄に「見学希望」とお書きいただくか、お電話でご連絡ください。' },
  ]

  return (
    <section className="px-5 py-12 max-w-6xl mx-auto">
      <p className="section-label">よくある質問</p>
      <h2 className="section-title mb-6">Q&A</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {faqs.map(({ q, a }, i) => (
          <details key={q} open={i === 0} className="group bg-warm-50 rounded-xl overflow-hidden">
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

      <p className="text-center mt-6">
        <Link href="/faq" className="text-sm text-brand-orange font-bold hover:underline">
          費用・体験・対象年齢など、入会前のよくある質問をもっと見る →
        </Link>
      </p>
    </section>
  )
}

// ============================================================
// Venue Section
// ============================================================
function VenueSection() {
  // 以前はこのセクション内にベタ書きの会場配列を持っていて、
  // 会場ページ(/venue/[id])へのリンクが1本も無く、場所は「電話かLINEで聞いてください」だった。
  // classes-data のマスタを使い、地図と会場ページに直接つなぐ。
  const list = venuesWithClasses()

  return (
    <section id="venue" className="px-5 py-12 bg-warm-50">
      <div className="max-w-6xl mx-auto">
        <p className="section-label">会場案内</p>
        <h2 className="section-title mb-2">事務局・教室会場</h2>
        <p className="text-sm text-gray-500 mb-6">
          市内{list.length}会場で開催中。会場名をタップすると、その会場の教室・曜日・時間・月会費が見られます。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {list.map(v => {
            const classes = getVenueClasses(v.id)
            const days = [...new Set(classes.map(c => c.day))].join('・')
            return (
              <Link
                key={v.id}
                href={`/venue/${v.id}`}
                className="group flex flex-col bg-white rounded-2xl p-5 border-2 border-warm-200 hover:border-brand-orange hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[11px] bg-brand-navy text-white font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                    {v.area}
                  </span>
                  <h3 className="font-display font-bold text-sm text-brand-navy leading-snug group-hover:text-brand-orange transition-colors">
                    {v.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-3">{v.address}</p>

                <div className="mt-auto pt-3 border-t border-warm-200 flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-600">
                    <span className="font-bold text-brand-navy">{classes.length}教室</span>
                    {days && <span className="text-gray-500">／{days}曜</span>}
                  </span>
                  <span className="text-xs text-brand-orange font-bold whitespace-nowrap">教室を見る →</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 事務局 */}
        <div className="bg-white rounded-2xl p-6 border-2 border-brand-orange/20">
          <div className="md:flex md:items-start md:justify-between md:gap-8">
            <div className="mb-5 md:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange flex-shrink-0" />
                <span className="font-bold text-brand-navy">事務局（VIDA金沢2階）</span>
              </div>
              <div className="space-y-1.5 text-sm text-gray-600">
                <p className="leading-relaxed">〒921-8022 金沢市中村町26-43 VIDA金沢2階</p>
                <p>
                  TEL:&nbsp;
                  <a href="tel:0762873789" className="text-brand-orange font-bold hover:underline">076-287-3789</a>
                  <span className="text-gray-500">&nbsp;/ FAX: 076-287-3789</span>
                </p>
                <p>
                  Email:&nbsp;
                  <a href="mailto:startus@startus-kanazawa.org" className="text-brand-orange hover:underline break-all">
                    startus@startus-kanazawa.org
                  </a>
                </p>
                <p className="text-xs text-gray-500 pt-1">
                  受付時間: 平日 10:00〜16:00／不在時は留守電にメッセージをどうぞ
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:w-56 md:flex-shrink-0">
              <a
                href="https://www.google.com/maps/search/?api=1&query=36.5609,136.6420"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy text-white font-display font-bold text-sm rounded-full hover:bg-brand-navy-light transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                事務局の地図を開く
              </a>
              <a
                href="https://lin.ee/BQKtTDq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#06C755] text-[#06C755] font-display font-bold text-sm rounded-full hover:bg-[#06C755] hover:text-white transition-colors"
              >
                LINEで場所を聞く
              </a>
            </div>
          </div>
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
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      await submitContact({ name, email, phone, body, source: 'home_contact_form' })
      trackEvent('contact_form_submit')
      setState('sent')
    } catch {
      // 保存に失敗したら黙って成功を装わず、LINE・メールの代替導線を出す
      setState('error')
    }
  }

  return (
    <section id="contact" className="px-5 py-12 max-w-6xl mx-auto">
      <p className="section-label">お問い合わせ</p>
      <h2 className="section-title mb-2">お気軽にご連絡ください</h2>
      <p className="text-sm text-gray-500 mb-8">ご不明な点はどんな小さなことでもお気軽にどうぞ。</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 連絡手段は「返信が早い順」に並べる。電話は平日10-16時しか繋がらないため最後 */}
        <div className="space-y-4">
          <a
            href="https://lin.ee/BQKtTDq"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-warm-50 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-full bg-[#06C755] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">LINE公式アカウント</div>
              <div className="font-bold text-brand-navy">友だち追加はこちら</div>
              <div className="text-xs text-gray-500 mt-0.5">24時間受付・いちばん返信が早い方法です</div>
            </div>
          </a>

          <a
            href="mailto:startus@startus-kanazawa.org"
            className="flex items-center gap-4 bg-warm-50 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-full bg-brand-navy flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-xs text-gray-500">メール</div>
              <div className="font-bold text-brand-navy break-all">startus@startus-kanazawa.org</div>
              <div className="text-xs text-gray-500 mt-0.5">24時間受付</div>
            </div>
          </a>

          <a
            href="tel:0762873789"
            className="flex items-center gap-4 bg-warm-50 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">お電話</div>
              <div className="font-display font-bold text-lg text-brand-navy">076-287-3789</div>
              <div className="text-xs text-gray-500 mt-0.5">平日 10:00〜16:00／不在時は留守電へどうぞ</div>
            </div>
          </a>
        </div>

        {/* メールフォーム。以前は mailto: でメールアプリを開くだけで、
            送信の成否に関わらず完了画面を出していた（＝届かない問い合わせがあった）。
            体験申込と同じく applications に直接保存する */}
        <div className="bg-warm-50 rounded-2xl p-6">
          <h3 className="font-bold text-brand-navy mb-4">メールフォーム</h3>
          {state === 'sent' ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-bold text-brand-navy">送信しました</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                3営業日以内に事務局よりご連絡いたします。<br />
                お急ぎの場合は公式LINEへどうぞ。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">お名前 <span className="text-brand-orange">*</span></label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="山田 太郎"
                  className="w-full border border-warm-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">メールアドレス <span className="text-brand-orange">*</span></label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full border border-warm-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-brand-orange bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1">電話番号</label>
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="076-xxx-xxxx"
                  className="w-full border border-warm-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-brand-orange bg-white"
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
                  className="w-full border border-warm-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-brand-orange bg-white resize-none"
                />
              </div>

              {state === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 leading-relaxed">
                  送信に失敗しました。お手数ですが{' '}
                  <a href="https://lin.ee/BQKtTDq" target="_blank" rel="noopener noreferrer" className="font-bold underline">公式LINE</a>
                  {' '}または{' '}
                  <a href="mailto:startus@startus-kanazawa.org" className="font-bold underline">メール</a>
                  {' '}でご連絡ください。
                </div>
              )}

              <button type="submit" disabled={state === 'sending'} className="btn-primary w-full !text-sm disabled:opacity-60">
                {state === 'sending' ? '送信中…' : '送信する'}
              </button>
              <p className="text-xs text-gray-500 text-center">3営業日以内に事務局よりご連絡いたします</p>
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
      <div className="max-w-6xl mx-auto">
        <div className="md:flex md:justify-between md:items-start mb-8">
          <div className="mb-6 md:mb-0">
            <div className="font-display text-white font-bold text-xl mb-0.5">STARTUS</div>
            <div className="text-white/60 text-xs mb-3">sports academy</div>
            <p className="text-white/60 text-xs leading-relaxed">
              特定非営利活動法人 かなざわ総合スポーツクラブ<br />
              〒921-8022 金沢市中村町26-43 VIDA金沢2階<br />
              TEL 076-287-3789（10:00〜16:00）
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="text-white/60 font-bold mb-2">教室</div>
              <div className="space-y-1.5">
                <Link href="/rikujo" className="block text-white/60 hover:text-white transition-colors">陸上・マラソン教室</Link>
                <Link href="/class/badminton" className="block text-white/60 hover:text-white transition-colors">バドミントン</Link>
                <Link href="/class/tennis" className="block text-white/60 hover:text-white transition-colors">テニス</Link>
                <Link href="/class/dance" className="block text-white/60 hover:text-white transition-colors">バレエ・ダンス・チア</Link>
                <Link href="/class/kinball" className="block text-white/60 hover:text-white transition-colors">キンボールスポーツ</Link>
                <Link href="/class/skating" className="block text-white/60 hover:text-white transition-colors">アイススケート</Link>
                <Link href="/socialfootball" className="block text-white/60 hover:text-white transition-colors">ソーシャルフットボール</Link>
              </div>
            </div>
            <div>
              <div className="text-white/60 font-bold mb-2">クラブ情報</div>
              <div className="space-y-1.5">
                <Link href="/about" className="block text-white/60 hover:text-white transition-colors">クラブについて</Link>
                <a href="#flow" className="block text-white/60 hover:text-white transition-colors">入会の流れ</a>
                <a href="#venue" className="block text-white/60 hover:text-white transition-colors">会場案内</a>
                <a href="#contact" className="block text-white/60 hover:text-white transition-colors">お問い合わせ</a>
                <Link href="/taiken" className="block text-white/60 hover:text-white transition-colors">体験申込</Link>
                <Link href="/tokushoho" className="block text-white/60 hover:text-white transition-colors">特定商取引法に基づく表記</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex justify-center gap-3 mb-4">
            {[
              { href: 'https://lin.ee/BQKtTDq', label: 'LINE', bg: 'bg-[#06C755]' },
              { href: 'https://www.instagram.com/kanazawa.sogo.sports.club/', label: 'IG', bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
              { href: 'https://www.facebook.com/kanazawa.sogo.sportsclub/', label: 'FB', bg: 'bg-[#1877F2]' },
            ].map(({ href, label, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full ${bg} hover:opacity-80 transition-opacity flex items-center justify-center text-white text-xs font-bold`}
                aria-label={label}
              >
                {label}
              </a>
            ))}
          </div>
          <p className="text-white/50 text-xs text-center">
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
export default function HomeLP({ news }: { news: NewsItem[] }) {
  return (
    <main>
      <Header />

      {/* 特典はファーストビューに置く（以前はHeroの下で埋もれていた） */}
      <NoticeBanner />
      <Hero />

      {/* 初見の人が知りたい順: どの教室か → 評判 → いくら → どう入るか → 誰が教えるか → どこで */}
      <ClassFinder />
      <ClassesSection />
      <ParentVoices className="bg-warm-50" />
      <FeeSection />
      <EnrollmentFlow />
      <InstructorSection />
      <VenueSection />
      <FaqSection />

      {/* ここから下は既存会員・検討が進んだ人向け。
          以前は「お知らせ」「SNS」がHero直後にあり、一番離脱しにくい位置を
          コンバージョンに寄与しないセクションで消費していた */}
      <NewsSection news={news} />
      <AboutSection />
      <SnsSection />
      <ContactSection />

      <StickyCTA />
      <Footer />
    </main>
  )
}
