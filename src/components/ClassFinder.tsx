'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { trackClasses, venues } from '@/lib/classes-data'
import { otherClasses } from '@/lib/other-classes'
import { classCategories } from '@/lib/class-categories'
import SportIcon, { type SportIconKey } from '@/components/SportIcon'
import { isTrialOpen, CALENDAR_TAGS, type TrialOpenMap } from '@/lib/availability'
import { trackEvent } from '@/lib/gtag'

/**
 * 「なにを・だれが・いつ・どこで」で教室を絞り込むファインダー。
 *
 * 背景:
 *   約30教室あるのにトップページには絞り込み手段が無く、
 *   カテゴリカードを上から読ませるだけだった。
 *   保護者が最初に知りたい「うちの子の年齢で、通える曜日に、近くでやっているか」に
 *   答えられていなかった。
 *
 * 対象年齢の判定について:
 *   age は '年長〜中学生' のような自由文字列なので、パースはせず
 *   実データに存在するパターンを AGE_BUCKETS の対応表で明示的に割り当てている。
 *   パースで取りこぼして「該当なし」を出すと、本当は通える教室を隠すことになるため。
 *   新しい age 文字列が増えたらここに追記する（未登録は全年齢扱いで必ず表示される）。
 */

type AgeBucket = 'preschool' | 'lower' | 'upper' | 'junior' | 'adult'

const AGE_OPTIONS: { id: AgeBucket; label: string }[] = [
  { id: 'preschool', label: '未就学' },
  { id: 'lower', label: '小1〜3' },
  { id: 'upper', label: '小4〜6' },
  { id: 'junior', label: '中学生' },
  { id: 'adult', label: '大人' },
]

const AGE_BUCKETS: Record<string, AgeBucket[]> = {
  // 陸上・マラソン
  '幼児〜小3': ['preschool', 'lower'],
  '年長〜中学生': ['preschool', 'lower', 'upper', 'junior'],
  '小1〜小3': ['lower'],
  '小3〜小6': ['lower', 'upper'],
  '小4〜小6': ['upper'],
  '小1〜中学生': ['lower', 'upper', 'junior'],
  '小4〜中学生': ['upper', 'junior'],
  '小5〜中学生': ['upper', 'junior'],
  '小学〜中学生': ['lower', 'upper', 'junior'],
  '小学〜大人': ['lower', 'upper', 'junior', 'adult'],
  '中学〜大人': ['junior', 'adult'],
  // それ以外の教室
  '年中〜小学校低学年': ['preschool', 'lower'],
  '年中〜小学生': ['preschool', 'lower', 'upper'],
  '小学生〜中学生': ['lower', 'upper', 'junior'],
  '小学生以上': ['lower', 'upper', 'junior', 'adult'],
  '小学生以上の子と保護者': ['lower', 'upper', 'junior', 'adult'],
  '小学生以上（障がいの有無を問わず参加できます）': ['lower', 'upper', 'junior', 'adult'],
  '中学生以上': ['junior', 'adult'],
}

const DAY_OPTIONS = ['月', '火', '水', '木', '金', '土', '日'] as const

/** 種目チップの表示順とラベル。SportIcon のキーと揃えている */
const SPORT_ORDER: SportIconKey[] = [
  'track', 'badminton', 'tennis', 'dance', 'kinball', 'soccer', 'skating', 'other',
]
const SPORT_LABELS: Record<SportIconKey, string> = {
  track: '陸上・かけっこ',
  badminton: 'バドミントン',
  tennis: 'テニス',
  dance: 'ダンス・チア',
  kinball: 'キンボール',
  soccer: 'フットボール',
  skating: 'スケート',
  other: 'その他',
}

/** other-classes.ts の category 文字列を種目キーに寄せる */
function sportOfOther(id: string, category: string): SportIconKey {
  if (id === 'ice-skating') return 'skating'
  switch (category) {
    case 'バドミントン': return 'badminton'
    case 'テニス': return 'tennis'
    case 'バレエ・ダンス・チア': return 'dance'
    case 'キンボールスポーツ': return 'kinball'
    case 'サッカー・フットボール': return 'soccer'
    default: return 'other'
  }
}

type FinderClass = {
  id: string
  name: string
  sport: SportIconKey
  day: string
  time: string
  age: string
  price: number
  venueId?: string
  venue: string
  href: string
}

/** その教室の詳しいページ。陸上はLPか/rikujo、それ以外はカテゴリページ */
function hrefForOther(id: string, venueId?: string): string {
  const cat = classCategories.find(c => c.classIds.includes(id))
  if (cat) return `/class/${cat.slug}`
  if (id === 'socialfootball') return '/socialfootball'
  return venueId ? `/venue/${venueId}` : '/#classes'
}

const ALL_CLASSES: FinderClass[] = [
  ...trackClasses.map(c => ({
    id: c.id,
    name: c.name,
    sport: 'track' as SportIconKey,
    day: c.day,
    time: c.time,
    age: c.age,
    price: c.price,
    venueId: c.venueId as string,
    venue: c.venue,
    href: c.lpHref ?? '/rikujo',
  })),
  ...otherClasses.map(c => ({
    id: c.id,
    name: c.name,
    sport: sportOfOther(c.id, c.category),
    day: c.day,
    time: c.time,
    age: c.age,
    price: c.price,
    venueId: c.venueId as string | undefined,
    venue: c.venue,
    href: hrefForOther(c.id, c.venueId),
  })),
]

// 実際に教室が存在する種目だけをチップに出す
const SPORT_OPTIONS = SPORT_ORDER.filter(s => ALL_CLASSES.some(c => c.sport === s))
const AREA_OPTIONS: string[] = [...new Set(venues.map(v => String(v.area)))]

export default function ClassFinder({ trialOpen }: { trialOpen?: TrialOpenMap }) {
  const [sport, setSport] = useState<SportIconKey | null>(null)
  const [age, setAge] = useState<AgeBucket | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [area, setArea] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  // URLの条件を復元する。useSearchParams はページ全体をCSRに落としてしまうので
  // マウント後に location から直接読む
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const s = q.get('sport')
    const a = q.get('age')
    const d = q.get('day')
    const ar = q.get('area')
    if (s && SPORT_OPTIONS.includes(s as SportIconKey)) setSport(s as SportIconKey)
    if (a && AGE_OPTIONS.some(o => o.id === a)) setAge(a as AgeBucket)
    if (d && (DAY_OPTIONS as readonly string[]).includes(d)) setDay(d)
    if (ar && AREA_OPTIONS.includes(ar)) setArea(ar)
    setReady(true)
  }, [])

  const results = useMemo(() => {
    return ALL_CLASSES.filter(c => {
      if (sport && c.sport !== sport) return false
      if (age) {
        // 対応表に無い age は絞り込みの対象外＝常に表示する（取りこぼし防止）
        const buckets = AGE_BUCKETS[c.age]
        if (buckets && !buckets.includes(age)) return false
      }
      if (day) {
        const days = c.day.split('・')
        if (!days.includes(day)) return false
      }
      if (area) {
        const v = venues.find(v => v.id === c.venueId)
        if (!v || v.area !== area) return false
      }
      return true
    })
  }, [sport, age, day, area])

  const hasFilter = Boolean(sport || age || day || area)

  // 条件をURLに残して共有できるようにしつつ、GA4に送って需要を可視化する。
  // 「未就学×土曜で0件」が積み上がれば、それは新しい教室の需要シグナルになる
  useEffect(() => {
    if (!ready) return
    const q = new URLSearchParams()
    if (sport) q.set('sport', sport)
    if (age) q.set('age', age)
    if (day) q.set('day', day)
    if (area) q.set('area', area)
    const qs = q.toString()
    window.history.replaceState(null, '', qs ? `?${qs}#finder` : window.location.pathname)

    if (!hasFilter) return
    trackEvent('class_finder_filter', {
      sport: sport ?? 'all',
      age: age ?? 'all',
      day: day ?? 'all',
      area: area ?? 'all',
      result_count: String(results.length),
    })
    if (results.length === 0) {
      trackEvent('class_finder_no_result', {
        sport: sport ?? 'all',
        age: age ?? 'all',
        day: day ?? 'all',
        area: area ?? 'all',
      })
    }
  }, [ready, sport, age, day, area, hasFilter, results.length])

  function chip(active: boolean) {
    return `px-3.5 py-2 rounded-full text-sm font-bold border-2 transition-all ${
      active
        ? 'bg-brand-orange border-brand-orange text-white'
        : 'bg-white border-warm-200 text-brand-navy hover:border-brand-orange/50'
    }`
  }

  return (
    <section id="finder" className="px-5 py-12 max-w-6xl mx-auto">
      <p className="section-label">教室をさがす</p>
      <h2 className="section-title mb-2">条件から30秒でさがす</h2>
      <p className="text-sm text-gray-500 mb-6">
        種目・年齢・曜日・エリアを選ぶと、通える教室がすぐ分かります。（選ばなくてもOK）
      </p>

      <div className="bg-warm-50 rounded-2xl p-5 space-y-4">
        <div>
          <div className="text-xs font-bold text-brand-navy mb-2">どの種目にしますか？</div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setSport(null)} className={chip(sport === null)}>すべて</button>
            {SPORT_OPTIONS.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSport(sport === s ? null : s)}
                className={`${chip(sport === s)} inline-flex items-center gap-1.5`}
              >
                <SportIcon name={s} className="w-5 h-5" />
                {SPORT_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-brand-navy mb-2">だれが通いますか？</div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setAge(null)} className={chip(age === null)}>すべて</button>
            {AGE_OPTIONS.map(o => (
              <button key={o.id} type="button" onClick={() => setAge(age === o.id ? null : o.id)} className={chip(age === o.id)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-brand-navy mb-2">通える曜日は？</div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setDay(null)} className={chip(day === null)}>すべて</button>
            {DAY_OPTIONS.map(d => (
              <button key={d} type="button" onClick={() => setDay(day === d ? null : d)} className={chip(day === d)}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-brand-navy mb-2">エリアは？</div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setArea(null)} className={chip(area === null)}>すべて</button>
            {AREA_OPTIONS.map(a => (
              <button key={a} type="button" onClick={() => setArea(area === a ? null : a)} className={chip(area === a)}>
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-brand-navy">
            <span className="font-display font-bold text-xl text-brand-orange">{results.length}</span>
            <span className="font-bold">件の教室が見つかりました</span>
          </p>
          {hasFilter && (
            <button
              type="button"
              onClick={() => { setSport(null); setAge(null); setDay(null); setArea(null) }}
              className="text-xs text-gray-600 font-bold hover:text-brand-orange"
            >
              条件をクリア
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="bg-white border-2 border-warm-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-brand-navy font-bold mb-1">この条件に合う教室が見つかりませんでした</p>
            <p className="text-xs text-gray-600 mb-4">
              条件を減らすか、公式LINEでご相談ください。新しい教室の開講予定をご案内できる場合があります。
            </p>
            <a
              href="https://lin.ee/BQKtTDq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#06C755] text-white font-display font-bold text-sm rounded-full hover:opacity-90"
            >
              公式LINEで相談する
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map(c => {
              const v = venues.find(v => v.id === c.venueId)
              const open = isTrialOpen(trialOpen, c.id)
              return (
                // カード全体を詳細リンクにしつつ、体験申込ボタンだけ前面に出す
                <div
                  key={c.id}
                  className="group relative flex flex-col bg-white rounded-2xl p-4 border-2 border-warm-200 hover:border-brand-orange hover:shadow-md transition-all"
                >
                  <Link href={c.href} className="absolute inset-0 z-0 rounded-2xl" aria-label={`${c.name}の詳細を見る`} />

                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="text-brand-orange flex-shrink-0 mt-0.5">
                        <SportIcon name={c.sport} className="w-5 h-5" />
                      </span>
                      <h3 className="font-bold text-sm text-brand-navy leading-snug group-hover:text-brand-orange transition-colors">
                        {c.name}
                      </h3>
                    </div>
                    {v && (
                      <span className="text-[11px] bg-brand-navy text-white font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                        {v.area}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-0.5">{c.day}曜 {c.time}</p>
                  <p className="text-xs text-gray-600 mb-0.5">対象 {c.age}</p>
                  <p className="text-xs text-gray-600">{c.venue}</p>

                  {!open && (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 self-start">
                      満員・キャンセル待ち
                    </p>
                  )}

                  <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-brand-navy">月額 ¥{c.price.toLocaleString()}</span>
                    <Link
                      href={
                        CALENDAR_TAGS[c.id]
                          ? `/taiken?from=finder&class_tag=${CALENDAR_TAGS[c.id]}`
                          : '/taiken?from=finder'
                      }
                      onClick={() => trackEvent('finder_taiken_click', { class_name: c.name })}
                      className="relative z-10 bg-brand-orange text-white text-xs font-bold px-3.5 py-2 rounded-full hover:bg-brand-orange-hover transition-colors whitespace-nowrap"
                    >
                      {open ? '体験申込' : 'キャンセル待ち'}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
