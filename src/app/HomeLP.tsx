import Link from 'next/link'
import Image from 'next/image'
import type { TrialOpenMap } from '@/lib/availability'
import { testimonials, trackClasses, venuesWithClasses, getVenueClasses } from '@/lib/classes-data'
import { otherClasses } from '@/lib/other-classes'
import type { NewsItem } from '@/lib/news'
import ClassFinder from '@/components/ClassFinder'
import TopHeader from '@/components/top/TopHeader'
import ContactPanel from '@/components/top/ContactPanel'
import {
  ArrowIcon, ChevronIcon, FacebookIcon, InstagramIcon, LineIcon, MapPin, PersonIcon, PhoneIcon, PinIcon, StarIcon,
} from '@/components/top/icons'
import {
  FACEBOOK_URL, INSTAGRAM_URL, LINE_URL, RULES_URL, TEL, TEL_HOURS, TEL_HREF,
} from '@/components/top/site-links'

/**
 * トップページ（2026-10 リデザイン「キャラが案内する」）。
 * デザインの元: Claude Design キャンバス「STARTUS サイト リデザイン案」の案A。
 *
 * 並び順: 何ができるか（ヒーロー）→ 教室をさがす → 続けやすさ → 保護者の声 → 入会の流れ
 *         → 料金 → 会場 → よくある質問 → お知らせ → 最後のひと押し
 * 教室検索をヒーローの直後に置くのは、GA4 でトップを見た人の約3人に1人が使う、いちばん使われている機能だから。
 *
 * 動きが要る部分（ヘッダーのメニュー・教室検索・メールフォーム）だけをクライアント部品にして、
 * それ以外はサーバーで描画する。section の id は GA4 の section_view とページ内リンクに使っている。
 * 変更前のトップは git タグ top-v1-2026-09 に残してある。
 */

const ALL_DAYS = ['月', '火', '水', '木', '金', '土', '日']
const OPEN_DAYS = new Set([...trackClasses, ...otherClasses].flatMap(c => c.day.split('・')))

// ============================================================
// 共通の小部品
// ============================================================
function Eyebrow({ children, tone = 'orange', className = '' }: { children: React.ReactNode; tone?: 'orange' | 'green'; className?: string }) {
  return (
    <p className={`flex items-center gap-1 text-[13px] font-bold ${tone === 'green' ? 'text-star-green' : 'text-star-ink'} ${className}`}>
      <StarIcon className="w-3.5 h-3.5 text-star-orange" />
      {children}
    </p>
  )
}

function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`mt-0.5 font-display font-extrabold text-2xl lg:text-[32px] leading-[1.4] ${className}`}>{children}</h2>
}

function MoreLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = 'self-center inline-flex items-center gap-1 px-1 py-2 text-sm font-bold text-star-ink hover:text-[#8f3900]'
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}<ChevronIcon className="w-[18px] h-[18px]" /></a>
  ) : (
    <Link href={href} className={cls}>{children}<ChevronIcon className="w-[18px] h-[18px]" /></Link>
  )
}

function TaikenButton({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/taiken"
      className={`h-[60px] flex items-center justify-center gap-2 rounded-full bg-star-orange text-white font-display font-extrabold text-xl shadow-[0_5px_0_#b84a00] hover:brightness-105 active:translate-y-[2px] active:shadow-[0_3px_0_#b84a00] transition ${className}`}
    >
      無料体験を申し込む<ArrowIcon className="w-5 h-5" />
    </Link>
  )
}

function LineButton({ className = '', label = 'LINEで気軽に相談する' }: { className?: string; label?: string }) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 rounded-full bg-white border-2 border-star-line text-star-line-text text-[15px] font-bold hover:bg-[#f0fbf4] transition-colors ${className}`}
    >
      <LineIcon className="w-[22px] h-[22px] text-star-line" />{label}
    </a>
  )
}

/** 体験無料などの丸いスタンプ */
function Stamp({ top, big, className = '' }: { top: string; big: string; className?: string }) {
  return (
    <div className={`rounded-full bg-star-deep flex items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] ${className}`}>
      <span className="w-[86%] h-[86%] rounded-full border-2 border-dashed border-white/80 flex flex-col items-center justify-center text-white leading-[1.05]">
        <span className="text-[13px] font-bold">{top}</span>
        <span className="font-display font-extrabold text-2xl">{big}</span>
      </span>
    </div>
  )
}

// ============================================================
// ヒーロー
// ============================================================
function Hero({ venueCount }: { venueCount: number }) {
  return (
    <section id="hero" className="relative top-dots overflow-hidden">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-5 pb-7 lg:py-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:items-center">
        <div>
          <span className="inline-block text-xs font-bold text-white bg-star-navy rounded-full px-[11px] py-1">
            金沢市内{venueCount}会場・約30教室
          </span>
          <h1 className="mt-2.5 font-display font-extrabold text-[38px] lg:text-[60px] leading-[1.3] text-star-navy">
            スポーツで、<br />もっと<span className="text-star-orange top-marker px-0.5">輝こう。</span>
          </h1>
          <p className="mt-3 text-sm lg:text-base font-medium leading-[1.7]">
            かけっこ・バドミントン・ダンス・スケート…<br />
            年中さんから大人まで<span className="lg:hidden">通えます。</span><span className="hidden lg:inline">、約30の教室から選べます。</span>
          </p>

          {/* PC は左の列に数字とボタンを置く */}
          <div className="hidden lg:block">
            <Stats venueCount={venueCount} />
            <div className="mt-6 flex items-center gap-3">
              <TaikenButton className="w-[300px]" />
              <LineButton className="h-[52px] px-6" label="LINEで気軽に相談" />
            </div>
          </div>
        </div>

        <HeroVisual />

        <div className="lg:hidden">
          <Stats venueCount={venueCount} />
          <TaikenButton className="mt-4" />
          <LineButton className="mt-3 h-12" />
        </div>
      </div>
      {/* 下のセクションへ波でつなぐ */}
      <svg viewBox="0 0 390 28" preserveAspectRatio="none" className="block w-full h-7 lg:h-10" aria-hidden="true">
        <path d="M0 14 C 65 30, 130 0, 195 14 S 325 28, 390 12 L390 28 L0 28 Z" fill="#ffffff" />
      </svg>
    </section>
  )
}

function Stats({ venueCount }: { venueCount: number }) {
  const num = 'font-display font-extrabold text-2xl lg:text-[28px] text-star-orange'
  return (
    <div className="mt-4 lg:mt-7 h-[52px] lg:h-[60px] lg:max-w-[440px] bg-white rounded-2xl flex items-center justify-around shadow-[0_4px_12px_rgba(23,50,74,0.08)]">
      <span className="flex items-baseline gap-0.5 text-xs font-bold">約<span className={num}>30</span>教室</span>
      <span className="w-0.5 h-[26px] bg-star-sand" />
      <span className="flex items-baseline gap-0.5 text-xs font-bold"><span className={num}>{venueCount}</span>会場</span>
      <span className="w-0.5 h-[26px] bg-star-sand" />
      <span className="flex items-baseline gap-0.5 text-xs font-bold"><span className={num}>350</span>人以上<span className="hidden lg:inline">が在籍</span></span>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto mt-4 lg:mt-0 w-full max-w-[350px] md:max-w-[440px] lg:max-w-[560px] aspect-[350/262] lg:aspect-[560/470]">
      <Image
        src="/img/top/hero-run.jpg"
        alt="競技場のトラックを走る子どもたち"
        width={750}
        height={1000}
        priority
        sizes="(min-width: 1024px) 400px, 210px"
        className="absolute left-0 top-[6%] w-[59%] h-[90%] lg:left-[9%] lg:top-[3%] lg:w-[68%] lg:h-[92%] object-cover object-[50%_30%] top-blob border-[6px] lg:border-8 border-white shadow-[0_10px_24px_rgba(23,50,74,0.18)]"
      />
      <Stamp top="体験は" big="無料" className="absolute left-0 top-[73%] w-[23.4%] lg:left-[5%] lg:top-[3%] lg:w-[18%] aspect-square -rotate-[10deg]" />
      <div className="absolute right-0 top-[3%] lg:right-[1%] lg:top-[33%] bg-white border-2 border-star-orange rounded-2xl px-3 py-2 font-display font-extrabold text-[15px] lg:text-lg leading-[1.35] text-star-ink text-center">
        はじめてさん<br />大かんげい！
        <span className="absolute left-[30px] -bottom-2 w-[13px] h-[13px] bg-white border-r-2 border-b-2 border-star-orange rotate-45" aria-hidden="true" />
      </div>
      <Image
        src="/img/top/m-base.webp"
        alt="STARTUSの星のマスコット"
        width={560}
        height={519}
        priority
        sizes="(min-width: 1024px) 260px, 180px"
        className="absolute left-[51.4%] top-[31%] w-[51%] lg:left-auto lg:right-[-3%] lg:top-auto lg:bottom-[-2%] lg:w-[46%] h-auto"
      />
      <StarIcon className="absolute left-[100%] -ml-[10%] top-[86%] w-[26px] h-[26px] text-star-yellow lg:left-[3%] lg:ml-0 lg:top-[88%]" />
      <StarIcon className="absolute left-[55%] top-[17%] w-4 h-4 text-star-orange lg:left-[80%] lg:top-[6%] lg:w-5 lg:h-5" />
    </div>
  )
}

// ============================================================
// STARTUS のいいところ
// ============================================================
function Points({ venueCount }: { venueCount: number }) {
  const everyDay = ALL_DAYS.every(d => OPEN_DAYS.has(d))
  const num = 'w-7 h-7 rounded-full bg-star-navy text-white font-display font-extrabold text-[15px] flex items-center justify-center shrink-0'
  const title = 'font-display font-extrabold text-[17px] lg:text-xl leading-[1.35]'
  return (
    <section id="points" className="bg-star-cream">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-[30px] pb-[34px] lg:py-16">
        <div className="lg:text-center">
          <Eyebrow className="lg:justify-center">STARTUSのいいところ</Eyebrow>
          <H2>はじめてでも、<br className="lg:hidden" />つづけやすい。</H2>
        </div>

        <ol className="mt-[22px] lg:mt-10 flex flex-col gap-[22px] lg:grid lg:grid-cols-3 lg:gap-8">
          <li className="flex items-center gap-3 lg:flex-col lg:text-center">
            <Image src="/img/top/m-cheer.webp" alt="ガッツポーズで応援するマスコット" width={236} height={206} className="w-[118px] lg:w-[150px] h-auto shrink-0 lg:h-[132px] lg:object-contain" />
            <div className="flex flex-col gap-1.5 lg:items-center">
              <span className="flex items-center gap-2"><span className={num}>1</span><span className={title}>運動が苦手でも、<br className="lg:hidden" />だいじょうぶ。</span></span>
              <span className="text-[13px] lg:text-sm leading-[1.7]">年齢やレベルに合わせたクラスで、楽しく体を動かすことから始めます。</span>
            </div>
          </li>

          <li className="flex items-center gap-3 flex-row-reverse lg:flex-col lg:text-center">
            <div className="w-[124px] lg:w-[170px] lg:h-[132px] lg:justify-center shrink-0 bg-white rounded-2xl px-2 py-2.5 flex flex-col items-center gap-1.5 shadow-[0_4px_12px_rgba(23,50,74,0.08)]">
              <span className="text-[11px] font-bold text-star-sub">{everyDay ? '毎日どこかで開講' : `週${OPEN_DAYS.size}日開講`}</span>
              <span className="grid grid-cols-4 lg:grid-cols-7 gap-1">
                {ALL_DAYS.map(d => (
                  <span
                    key={d}
                    className={`w-6 h-6 lg:w-[19px] lg:h-[19px] rounded-full text-white text-xs lg:text-[10px] font-bold flex items-center justify-center ${
                      !OPEN_DAYS.has(d) ? 'bg-gray-300' : d === '土' || d === '日' ? 'bg-star-deep' : 'bg-star-navy'
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </span>
              <span className="flex items-center gap-[3px] text-xs font-bold"><PinIcon className="w-[15px] h-[15px] text-star-ink" />市内{venueCount}会場</span>
            </div>
            <div className="flex flex-col gap-1.5 lg:items-center">
              <span className="flex items-center gap-2"><span className={num}>2</span><span className={title}>近くの会場で、<br className="lg:hidden" />通える曜日に。</span></span>
              <span className="text-[13px] lg:text-sm leading-[1.7]">平日の夕方〜夜と土日。通いやすい場所と曜日を選べます。</span>
            </div>
          </li>

          <li className="flex items-center gap-3 lg:flex-col lg:text-center">
            <Image src="/img/top/m-family.webp" alt="大中小3体のマスコット" width={248} height={116} className="w-[124px] lg:w-[190px] h-auto shrink-0 lg:h-[132px] lg:object-contain" />
            <div className="flex flex-col gap-1.5 lg:items-center">
              <span className="flex items-center gap-2"><span className={num}>3</span><span className={title}>きょうだいで<br className="lg:hidden" />通うとおトク。</span></span>
              <span className="text-[13px] lg:text-sm leading-[1.7]">2人目は月会費20%OFF、3人目からは半額。振替制度もあります。</span>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}

// ============================================================
// 保護者の声
// ============================================================
/** 声の中で黄色いマーカーを引く言葉（データは classes-data.ts の testimonials） */
const VOICE_MARKS: Record<string, string> = { t1: '1秒以上', t2: '「走りたい！」', t3: '親子で一緒に' }
const VOICE_AVATAR = ['bg-star-sand', 'bg-[#d9ecff]', 'bg-[#e3f5e8]']

function Voices() {
  // 先頭は「苦手だった子が…」の声にする（はじめての保護者にいちばん近い）
  const order = ['t2', 't1', 't3']
  const list = [...testimonials].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
  return (
    <section id="voices" className="bg-white">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-8 pb-[34px] lg:py-16 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
        <div>
          <Eyebrow>保護者の声</Eyebrow>
          <H2>「通わせて<br className="hidden lg:block" />よかった」</H2>
          <Image src="/img/top/m-pair.webp" alt="手をつないだ2体のマスコット" width={300} height={153} className="hidden lg:block mt-6 w-[240px] h-auto" />
        </div>
        <ul className="mt-3.5 lg:mt-0 flex flex-col gap-3.5 lg:gap-5">
          {list.map((t, i) => {
            const mark = VOICE_MARKS[t.id]
            const hit = Boolean(mark) && t.quote.includes(mark)
            const at = hit ? t.quote.indexOf(mark) : -1
            const before = hit ? t.quote.slice(0, at) : t.quote
            const after = hit ? t.quote.slice(at + mark.length) : ''
            const right = i % 2 === 1
            return (
              <li key={t.id} className={`flex gap-2.5 items-start ${right ? 'flex-row-reverse' : ''}`}>
                <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${VOICE_AVATAR[i % 3]}`}>
                  <PersonIcon className="w-6 h-6 text-star-navy" />
                </span>
                <div className={`flex flex-col gap-1 lg:max-w-[620px] ${right ? 'items-end' : ''}`}>
                  <p
                    className={`border-2 border-star-navy px-3.5 py-2.5 lg:px-5 lg:py-3.5 text-sm lg:text-[15px] leading-[1.7] ${
                      right ? 'bg-star-cream rounded-[18px_4px_18px_18px]' : 'bg-white rounded-[4px_18px_18px_18px]'
                    }`}
                  >
                    {before}
                    {hit && <span className="font-black top-marker">{mark}</span>}
                    {after}
                  </p>
                  <span className="text-[11px] text-star-sub">{t.parent}｜{t.classRef}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

// ============================================================
// 入会までの流れ
// ============================================================
const FLOW_STEPS = [
  { title: '無料体験を申し込む', body: 'このサイト・LINE・お電話で。3営業日以内にご連絡します。', tag: '各教室1回ずつ無料' },
  { title: '体験レッスンに参加', body: '動きやすい服と飲み物だけでOK。見学だけでも大歓迎。', tag: '勧誘はありません' },
  { title: 'その日に入会もOK', body: '体験当日の入会なら、入会金5,500円が0円に。', tag: 'Tシャツもプレゼント' },
  { title: '翌月からレッスン開始', body: '振替制度があるので、お休みしても安心です。', tag: '' },
]

function Flow() {
  const num = 'w-9 h-9 rounded-full bg-white border-[3px] border-star-navy font-display font-extrabold text-[17px] flex items-center justify-center'
  return (
    <section id="flow" className="relative bg-star-mint overflow-hidden">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-8 pb-[34px] lg:py-16">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <Eyebrow tone="green">入会までの流れ</Eyebrow>
            <H2>ゴールまで、4ステップ。</H2>
          </div>
          <p className="hidden lg:block text-sm font-bold text-star-green">はじめての方も安心。わからないことは気軽にどうぞ。</p>
        </div>

        {/* スマホ: 縦のトラック */}
        <div className="lg:hidden relative mt-4 flex flex-col gap-3.5 pt-[60px] pb-[118px] pl-[78px]">
          <div className="absolute left-1.5 top-0 bottom-0 w-[54px] top-lane rounded-t-[27px] rounded-b-[10px]" aria-hidden="true">
            <span className="absolute left-[26px] inset-y-0 w-0.5 bg-white/85" />
          </div>
          <Image src="/img/top/m-run.webp" alt="スタートするマスコット" width={168} height={138} className="absolute left-[66px] -top-1.5 w-[84px] h-auto" />
          <span className="absolute left-[156px] top-[18px] font-display font-extrabold text-sm text-star-green">よーい、スタート！</span>
          {FLOW_STEPS.map((s, i) => (
            <div key={s.title} className="relative bg-white rounded-2xl px-3.5 py-3 flex flex-col gap-1 shadow-[0_4px_12px_rgba(23,50,74,0.08)]">
              <span className={`absolute -left-16 top-2.5 ${num}`}>{i + 1}</span>
              <span className="font-display font-extrabold text-base">{s.title}</span>
              <span className="text-[13px] leading-[1.6]">{s.body}</span>
              {s.tag && <span className="self-start text-[11px] font-bold text-star-ink bg-star-peach rounded-full px-[9px] py-0.5">{s.tag}</span>}
            </div>
          ))}
          <div className="absolute left-1.5 bottom-0 w-[54px] h-4 top-checker" aria-hidden="true" />
          <Image src="/img/top/m-goal.webp" alt="メダルをもらって喜ぶマスコット" width={236} height={214} className="absolute left-[70px] bottom-0 w-[118px] h-auto" />
          <span className="absolute left-[194px] bottom-11 font-display font-extrabold text-[22px] text-star-orange">ゴール！</span>
        </div>

        {/* PC: 横のトラック */}
        <div className="hidden lg:block mt-8">
          <div className="relative h-[170px]">
            <Image src="/img/top/m-run.webp" alt="スタートするマスコット" width={240} height={197} className="absolute left-0 top-0 w-[120px] h-auto" />
            <span className="absolute left-[128px] top-6 font-display font-extrabold text-base text-star-green">よーい、スタート！</span>
            <span className="absolute right-[150px] top-8 font-display font-extrabold text-[28px] text-star-orange">ゴール！</span>
            <Image src="/img/top/m-goal.webp" alt="メダルをもらって喜ぶマスコット" width={280} height={253} className="absolute right-0 top-0 w-[140px] h-auto" />
            <div className="absolute left-0 right-[60px] bottom-0 h-[54px] top-lane-h rounded-l-[27px]" aria-hidden="true">
              <span className="absolute top-[26px] inset-x-0 h-0.5 bg-white/85" />
              {FLOW_STEPS.map((s, i) => (
                <span key={s.title} className={`absolute top-[9px] -ml-[18px] ${num}`} style={{ left: `${12.5 + i * 25}%` }}>{i + 1}</span>
              ))}
            </div>
            <div className="absolute right-11 bottom-0 w-4 h-[54px] top-checker" aria-hidden="true" />
          </div>
          <div className="mt-5 grid grid-cols-4 gap-4 pr-[60px]">
            {FLOW_STEPS.map(s => (
              <div key={s.title} className="bg-white rounded-2xl px-4 py-4 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(23,50,74,0.08)]">
                <span className="font-display font-extrabold text-[17px]">{s.title}</span>
                <span className="text-[13px] leading-[1.6]">{s.body}</span>
                {s.tag && <span className="self-start text-[11px] font-bold text-star-ink bg-star-peach rounded-full px-[9px] py-0.5">{s.tag}</span>}
              </div>
            ))}
          </div>
        </div>

        <TaikenButton className="mt-4 lg:mt-8 lg:w-[380px] lg:mx-auto" />
      </div>
    </section>
  )
}

// ============================================================
// 料金
// ============================================================
// 2026年10月の月会費改定後の金額（データの price と一致させること）
const PRICE_ROWS = [
  { label: 'インクルーシブ陸上・大人のマラソン塾・ソーシャルフットボール', price: '4,400' },
  { label: 'キンボール', price: '4,100' },
  { label: '春風クラブ（中学生〜大人）', price: '5,500' },
  { label: 'アイススケート', price: '8,800' },
  { label: 'るぶげる親子陸上塾・テニス塾', price: '9,900' },
]

function Price() {
  return (
    <section id="price" className="relative bg-star-cream">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-8 pb-[34px] lg:py-16 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="relative">
          <Stamp top="体験は" big="0円" className="absolute right-0 -top-2.5 w-[84px] aspect-square rotate-[10deg] lg:hidden" />
          <Eyebrow>料金（2026年10月〜・税込）</Eyebrow>
          <H2>月謝制で、<br />わかりやすい。</H2>
          <div className="hidden lg:flex items-center gap-4 mt-5">
            <Stamp top="体験は" big="0円" className="w-[96px] aspect-square rotate-[-8deg] shrink-0" />
            <p className="text-sm leading-[1.8]">体験は各教室1回ずつ無料。<br />体験当日の入会で、入会金5,500円も0円になります。</p>
          </div>
          <div className="hidden lg:block mt-6"><SiblingRibbon /><PriceNote /></div>
        </div>

        <div className="mt-3.5 lg:mt-0">
          <div className="bg-white rounded-[18px] border-2 border-star-apricot px-4 lg:px-6 py-1.5 flex flex-col">
            <div className="flex items-center justify-between gap-2.5 py-3 lg:py-4 border-b-2 border-dotted border-star-apricot">
              <span className="flex flex-col gap-0.5">
                <span className="text-sm lg:text-[15px] font-black">ほとんどの教室</span>
                <span className="text-xs text-star-sub">陸上・かけっこ／バドミントン／ダンス・チア など</span>
              </span>
              <span className="shrink-0 flex items-baseline">
                <span className="font-display font-extrabold text-[26px] lg:text-[32px] text-star-orange">6,600</span>
                <span className="text-xs font-bold">円/月</span>
              </span>
            </div>
            {PRICE_ROWS.map((r, i) => (
              <div key={r.label} className={`flex items-center justify-between gap-2.5 py-2.5 lg:py-3.5 ${i < PRICE_ROWS.length - 1 ? 'border-b-2 border-dotted border-star-apricot' : ''}`}>
                <span className="text-[13px] lg:text-sm leading-normal">{r.label}</span>
                <span className="shrink-0 flex items-baseline">
                  <span className="font-display font-extrabold text-xl lg:text-[22px]">{r.price}</span>
                  <span className="text-xs font-bold">円</span>
                </span>
              </div>
            ))}
          </div>
          <div className="lg:hidden mt-3.5"><SiblingRibbon /><PriceNote /></div>
        </div>
      </div>
    </section>
  )
}

function SiblingRibbon() {
  return (
    <div className="relative mx-2.5 h-12 bg-star-yellow flex items-center justify-center text-sm font-bold">
      <span className="absolute -left-3 top-0 border-y-[24px] border-y-star-yellow border-l-[12px] border-l-transparent" aria-hidden="true" />
      <span className="absolute -right-3 top-0 border-y-[24px] border-y-star-yellow border-r-[12px] border-r-transparent" aria-hidden="true" />
      きょうだい割引　2人目20%OFF・3人目から半額
    </div>
  )
}

function PriceNote() {
  return (
    <p className="mt-3.5 text-xs leading-[1.8] text-[#34465a]">
      入会時：入会手数料5,500円（体験当日の入会で0円）／年度会費5,500円／スポーツ安全保険800円〜<br />
      ※アイススケートは無料体験の対象外です。割引の詳しい条件は
      <a href={RULES_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold text-star-ink">会則</a>
      をご覧ください。
    </p>
  )
}

// ============================================================
// 会場
// ============================================================
/** 地図のピン位置（エリアごとのおおよその位置。正確な地図ではない） */
const AREA_PINS: Record<string, { x: number; y: number }> = {
  北部: { x: 38, y: 9 },
  西部: { x: 4, y: 31 },
  東部: { x: 64, y: 31 },
  中心部: { x: 42, y: 50 },
  中村町: { x: 8, y: 58 },
  泉野: { x: 17, y: 82 },
  南部: { x: 58, y: 78 },
}

function Venue() {
  const list = venuesWithClasses()
  const areas = [...new Set(list.map(v => String(v.area)))]
    .map(area => {
      const vs = list.filter(v => v.area === area)
      return { area, venues: vs, count: vs.reduce((n, v) => n + getVenueClasses(v.id).length, 0) }
    })
    .sort((a, b) => b.count - a.count)
  const top = areas[0]?.area

  return (
    <section id="venue" className="bg-white">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-8 pb-[34px] lg:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
        <div>
          <Eyebrow>会場</Eyebrow>
          <H2>市内{list.length}か所で開催中</H2>

          {/* PC: エリアごとの一覧 */}
          <table className="hidden lg:table mt-6 w-full text-[13px]">
            <tbody>
              {areas.map(a => (
                <tr key={a.area} className="border-b border-star-sand">
                  <th scope="row" className="py-2.5 pr-3 text-left font-black text-star-ink whitespace-nowrap align-top">{a.area}</th>
                  <td className="py-2.5 pr-3">
                    {a.venues.map((v, i) => (
                      <span key={v.id}>
                        {i > 0 && '／'}
                        <Link href={`/venue/${v.id}`} className="hover:text-star-ink hover:underline">{v.name}</Link>
                      </span>
                    ))}
                  </td>
                  <td className="py-2.5 text-right font-bold whitespace-nowrap align-top">{a.count}教室</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3.5 lg:mt-0">
          <div className="relative h-[320px] lg:h-[400px] rounded-[20px] bg-[#eef5ee] border-2 border-[#d6e8d6] overflow-hidden" role="img" aria-label="エリアごとの教室数のイメージ地図">
            <svg viewBox="0 0 350 320" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
              <path d="M352 212 C 300 200, 270 170, 232 176 S 170 150, 140 116 S 70 70, -4 58" fill="none" stroke="#a9d3ee" strokeWidth="12" strokeLinecap="round" />
              <path d="M352 86 C 318 92, 296 70, 262 78 S 214 64, 196 40 S 170 8, 150 -6" fill="none" stroke="#a9d3ee" strokeWidth="9" strokeLinecap="round" />
            </svg>
            <span className="absolute left-3 top-2.5 text-[11px] text-star-sub">※位置はイメージです</span>
            <Image src="/img/top/m-jump.webp" alt="" width={140} height={115} className="absolute right-2 top-3.5 w-[70px] lg:w-[84px] h-auto" />
            {areas.map(a => {
              const pos = AREA_PINS[a.area]
              if (!pos) return null
              const main = a.area === top
              return (
                <div key={a.area} className="absolute flex flex-col items-start gap-0.5" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                  <span className="flex items-center gap-1">
                    <MapPin className={main ? 'w-[34px] h-[34px]' : 'w-[26px] h-[26px]'} />
                    <span className={`rounded-lg font-bold whitespace-nowrap ${main ? 'bg-star-navy text-white text-[13px] px-2 py-[3px]' : 'bg-white text-xs px-[7px] py-0.5 shadow-[0_2px_6px_rgba(23,50,74,0.12)]'}`}>
                      {a.area} {a.count}教室
                    </span>
                  </span>
                  {a.area === '中村町' && (
                    <span className="ml-1 text-[11px] font-bold text-white bg-star-navy rounded-md px-1.5 py-px">事務局もここ</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* スマホ: 会場の一覧は畳んでおく */}
          <details className="lg:hidden group mt-2">
            <summary className="list-none cursor-pointer flex items-center justify-center gap-1 py-2 text-sm font-bold text-star-ink">
              会場ごとの教室・時間を見る<ChevronIcon className="w-[18px] h-[18px] rotate-90 group-open:-rotate-90 transition-transform" />
            </summary>
            <ul className="mt-1 flex flex-col divide-y divide-star-sand border-y border-star-sand">
              {areas.flatMap(a => a.venues.map(v => (
                <li key={v.id}>
                  <Link href={`/venue/${v.id}`} className="flex items-center gap-2 py-3">
                    <span className="text-[11px] font-bold text-white bg-star-navy rounded px-1.5 py-px shrink-0">{a.area}</span>
                    <span className="text-sm font-bold grow">{v.name}</span>
                    <span className="text-xs text-star-sub shrink-0">{getVenueClasses(v.id).length}教室</span>
                    <ChevronIcon className="w-4 h-4 text-star-ink shrink-0" />
                  </Link>
                </li>
              )))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// よくある質問
// ============================================================
const FAQS = [
  { q: '運動が苦手でも大丈夫？', a: '大歓迎です。年齢・レベルに合わせた教室で、楽しく体を動かすことから始めます。' },
  { q: '体験だけでもいいの？', a: 'もちろんです。体験後の勧誘はありません。ご自身のペースでご検討ください。' },
  { q: '見学だけでもできる？', a: 'できます。申込フォームの備考欄に「見学希望」とお書きいただくか、お電話ください。' },
  { q: '大人も参加できる？', a: 'はい。マラソン塾・バドミントン・フットサルなど大人向けの教室もあります。' },
]

function Faq() {
  return (
    <section id="faq" className="bg-star-cream">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-8 pb-[34px] lg:py-16 flex flex-col gap-3.5 lg:gap-6">
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow>よくある質問</Eyebrow>
            <H2>気になること、<br className="lg:hidden" />先にこたえます。</H2>
          </div>
          <Image src="/img/top/m-coach.webp" alt="帽子とクリップボードのコーチ姿のマスコット" width={250} height={200} className="w-[100px] lg:w-[125px] h-auto" />
        </div>
        <dl className="bg-white rounded-[18px] px-4 py-1 lg:bg-transparent lg:p-0 lg:grid lg:grid-cols-2 lg:gap-4">
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className={`flex flex-col gap-1.5 py-3.5 lg:bg-white lg:rounded-[18px] lg:px-5 lg:py-4 ${i < FAQS.length - 1 ? 'border-b-2 border-dashed border-star-sand lg:border-0' : ''}`}
            >
              <dt className="flex items-center gap-2 text-[15px] font-black">
                <span className="w-[26px] h-[26px] rounded-full bg-star-deep text-white font-display text-sm flex items-center justify-center shrink-0" aria-hidden="true">Q</span>
                {f.q}
              </dt>
              <dd className="text-[13px] leading-[1.7] pl-[34px]">{f.a}</dd>
            </div>
          ))}
        </dl>
        <MoreLink href="/faq">質問をもっと見る</MoreLink>
      </div>
    </section>
  )
}

// ============================================================
// お知らせ（WordPress の投稿）
// ============================================================
function News({ news }: { news: NewsItem[] }) {
  // WordPress 側が取得できなかったときはセクションごと出さない
  if (news.length === 0) return null
  const tagColor = (tag: string) => (tag === 'イベント' ? 'text-[#1d5fa8] bg-[#eaf2fd]' : 'text-star-ink bg-star-peach')
  return (
    <section id="news" className="bg-white">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 py-[30px] lg:py-14 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
        <h2 className="font-display font-extrabold text-[22px] lg:text-[28px] mb-1">お知らせ</h2>
        <ul className="flex flex-col">
          {news.slice(0, 3).map(n => (
            <li key={n.href}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 py-2.5 lg:py-3.5 border-b border-star-sand text-star-navy hover:text-star-ink"
              >
                <span className="flex items-center gap-2 text-xs text-star-sub shrink-0">
                  {n.date}
                  <span className={`text-[11px] font-bold rounded-full px-2 py-px ${tagColor(n.tag)}`}>{n.tag}</span>
                </span>
                <span className="text-sm font-bold">{n.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ============================================================
// 最後のひと押し（体験・LINE・電話・メールフォーム）
// ============================================================
function FinalCta() {
  return (
    <section id="contact" className="relative bg-star-navy text-white overflow-hidden">
      <StarIcon className="absolute left-5 top-6 w-[22px] h-[22px] text-star-yellow" />
      <StarIcon className="absolute left-16 top-[70px] w-3.5 h-3.5 text-star-orange" />
      <StarIcon className="absolute right-[30px] top-10 w-[18px] h-[18px] text-star-yellow" />
      <StarIcon className="absolute right-[74px] top-[104px] w-3 h-3 text-white/70" />
      <div className="max-w-[680px] lg:max-w-[1100px] mx-auto px-5 lg:px-10 py-[34px] lg:py-14 flex flex-col items-center gap-3.5 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_340px] lg:gap-10 lg:items-center">
        <div className="relative w-[200px] lg:w-[220px]">
          <Image src="/img/top/m-wave.webp" alt="「まってる」と書いた看板を持つマスコット" width={400} height={384} className="w-full h-auto" />
          <span className="absolute left-[29.5%] top-[57.3%] w-[27%] text-center font-display font-extrabold text-[11px] lg:text-xs leading-4 text-star-deep rotate-[5deg]" aria-hidden="true">
            まってる
          </span>
        </div>
        <div className="text-center lg:text-left">
          <h2 className="font-display font-extrabold text-[26px] lg:text-[34px] leading-[1.4]">まずは1回、<br />あそびに来てね。</h2>
          <p className="mt-2 text-[13px] lg:text-sm leading-[1.7] opacity-90">体験は各教室1回ずつ無料。見学だけでも大歓迎です。</p>
        </div>
        <div className="w-full max-w-[350px] flex flex-col items-center gap-3">
          <TaikenButton className="w-full" />
          <LineButton className="w-full h-[50px] border-white" />
          <a href={TEL_HREF} className="flex items-center gap-1.5 text-sm font-bold text-white">
            <PhoneIcon className="w-[18px] h-[18px]" />{TEL}（{TEL_HOURS}）
          </a>
        </div>
        <div className="lg:col-span-3 flex justify-center w-full">
          <ContactPanel />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// フッター
// ============================================================
const FOOTER_CLASSES = [
  { label: '陸上・かけっこ', href: '/rikujo' },
  { label: 'バドミントン', href: '/class/badminton' },
  { label: 'テニス', href: '/class/tennis' },
  { label: 'ダンス・チア', href: '/class/dance' },
  { label: 'フットボール', href: '/socialfootball' },
  { label: 'キンボール', href: '/class/kinball' },
  { label: 'アイススケート', href: '/class/skating' },
]
const FOOTER_CLUB = [
  { label: 'クラブについて', href: '/about' },
  { label: '入会の流れ', href: '#flow' },
  { label: '料金', href: '#price' },
  { label: 'よくある質問', href: '/faq' },
  { label: 'お問い合わせ', href: '#contact' },
  { label: '特定商取引法に基づく表記', href: '/tokushoho' },
]

function Footer() {
  const sns = 'w-11 h-11 rounded-full bg-white flex items-center justify-center hover:opacity-85 transition-opacity'
  return (
    <footer className="bg-star-night text-white">
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10 pt-7 pb-6 lg:pt-12 lg:pb-8 flex flex-col gap-[18px] lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-center gap-2.5">
            <Image src="/img/top/logo-mark.svg" alt="" width={40} height={40} className="w-10 h-10 rounded-[10px]" />
            <span className="flex flex-col leading-[1.3]">
              <span className="font-display font-extrabold text-xl">STARTUS</span>
              <span className="text-[11px] opacity-85">NPO法人 かなざわ総合スポーツクラブ</span>
            </span>
          </div>
          <p className="text-xs leading-[1.8] opacity-90">
            〒921-8022 金沢市中村町26-43 VIDA金沢2階<br />TEL {TEL}（{TEL_HOURS}）
          </p>
          <div className="flex gap-3">
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" aria-label="LINE公式アカウント" className={sns}><LineIcon className="w-6 h-6 text-star-line" /></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={sns}><InstagramIcon className="w-[22px] h-[22px] text-star-navy" /></a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={sns}><FacebookIcon className="w-[22px] h-[22px] text-star-navy" /></a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[13px]">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold opacity-70">教室</span>
            {FOOTER_CLASSES.map(l => <Link key={l.href} href={l.href} className="hover:underline">{l.label}</Link>)}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold opacity-70">クラブ</span>
            {FOOTER_CLUB.map(l => (l.href.startsWith('#')
              ? <a key={l.href} href={l.href} className="hover:underline">{l.label}</a>
              : <Link key={l.href} href={l.href} className="hover:underline">{l.label}</Link>))}
          </div>
        </div>
        <p className="lg:col-span-2 text-[11px] opacity-70 lg:text-center lg:pt-6 lg:border-t lg:border-white/10">
          © {new Date().getFullYear()} NPO法人 かなざわ総合スポーツクラブ STARTUS
        </p>
      </div>
    </footer>
  )
}

// ============================================================
// Main
// ============================================================
export default function HomeLP({ news, trialOpen }: { news: NewsItem[]; trialOpen?: TrialOpenMap }) {
  const venueCount = venuesWithClasses().length
  return (
    <main className="font-body text-star-navy bg-white">
      <TopHeader />
      <Hero venueCount={venueCount} />
      <ClassFinder trialOpen={trialOpen} />
      <Points venueCount={venueCount} />
      <Voices />
      <Flow />
      <Price />
      <Venue />
      <Faq />
      <News news={news} />
      <FinalCta />
      <Footer />
    </main>
  )
}
