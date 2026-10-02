'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { trackClasses, venues } from '@/lib/classes-data'
import { otherClasses } from '@/lib/other-classes'
import { classCategories } from '@/lib/class-categories'
import type { SportIconKey } from '@/components/SportIcon'
import { isTrialOpen, CALENDAR_TAGS, type TrialOpenMap } from '@/lib/availability'
import { trackEvent } from '@/lib/gtag'
import { LINE_URL } from '@/components/top/site-links'
import { CheckIcon, ChevronIcon, CloseIcon, LineIcon, StarIcon } from '@/components/top/icons'

/**
 * 「だれが・なにを・いつ・どこで」で教室を絞り込むファインダー（トップページ）。
 *
 * 背景:
 *   GA4（2026-08-21〜09-30）でトップを見た人の約3人に1人が使う、サイトでいちばん使われている機能。
 *   一方で約1割が「0件」に当たっていたので、0件のときは条件を1つ外した候補を出す。
 *
 * 対象年齢の判定について:
 *   age は '年長〜中学生' のような自由文字列なので、パースはせず
 *   実データに存在するパターンを AGE_BUCKETS の対応表で明示的に割り当てている。
 *   パースで取りこぼして「該当なし」を出すと、本当は通える教室を隠すことになるため。
 *   新しい age 文字列が増えたらここに追記する（未登録は全年齢扱いで必ず表示される）。
 */

type AgeBucket = 'preschool' | 'lower' | 'upper' | 'junior' | 'adult'

/** icon は年齢が上がるほどマスコットを大きく描くための幅(px) */
const AGE_OPTIONS: { id: AgeBucket; label: string; long: string; icon: number }[] = [
  { id: 'preschool', label: '年中・年長', long: '年中・年長', icon: 28 },
  { id: 'lower', label: '小1〜3', long: '小学1〜3年', icon: 36 },
  { id: 'upper', label: '小4〜6', long: '小学4〜6年', icon: 44 },
  { id: 'junior', label: '中学生', long: '中学生', icon: 50 },
  { id: 'adult', label: '大人', long: '大人', icon: 56 },
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

/** 種目タイルの並び・ラベル・絵・色。キーは SportIcon と同じ */
const SPORTS: { id: SportIconKey; label: string; long: string; img: string; tile: string }[] = [
  { id: 'track', label: '陸上', long: '陸上・かけっこ', img: '/img/top/m-run.webp', tile: 'bg-[#fff0e0] border-[#ffd2a8]' },
  { id: 'badminton', label: 'バドミントン', long: 'バドミントン', img: '/img/top/sport-badminton.webp', tile: 'bg-[#eef6ff] border-[#cfe3fb]' },
  { id: 'tennis', label: 'テニス', long: 'テニス', img: '/img/top/m-tennis.webp', tile: 'bg-[#f1f9ec] border-[#d3ecc5]' },
  { id: 'dance', label: 'ダンス・チア', long: 'ダンス・チア', img: '/img/top/sport-dance.webp', tile: 'bg-[#fff0f4] border-[#ffd3df]' },
  { id: 'soccer', label: 'フットボール', long: 'フットボール', img: '/img/top/m-soccer.webp', tile: 'bg-[#eefaf6] border-[#c8eee0]' },
  { id: 'kinball', label: 'キンボール', long: 'キンボール', img: '/img/top/sport-kinball.webp', tile: 'bg-[#f5f1ff] border-[#ddd3fb]' },
  { id: 'skating', label: 'スケート', long: 'アイススケート', img: '/img/top/m-skate.webp', tile: 'bg-[#edf8fd] border-[#c9e9f7]' },
]

/** エリアの並び（中心から外へ）。データに増えたエリアは末尾に足される */
const AREA_ORDER = ['中心部', '東部', '西部', '南部', '泉野', '北部', '中村町']

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
  return venueId ? `/venue/${venueId}` : '/#finder'
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

export const FINDER_CLASS_COUNT = ALL_CLASSES.length

// 実際に教室がある種目・エリアだけを出す
const SPORT_OPTIONS = SPORTS.filter(s => ALL_CLASSES.some(c => c.sport === s.id))
const DATA_AREAS: string[] = [...new Set(venues.map(v => String(v.area)))]
const AREA_OPTIONS: string[] = [
  ...AREA_ORDER.filter(a => DATA_AREAS.includes(a)),
  ...DATA_AREAS.filter(a => !AREA_ORDER.includes(a)),
]

type Filters = { sport: SportIconKey | null; age: AgeBucket | null; day: string | null; area: string | null }
type FilterKey = keyof Filters

const FILTER_LABELS: Record<FilterKey, string> = { age: '年齢', sport: '種目', day: '曜日', area: 'エリア' }
/** 0件のとき、外す候補にする順（同じ件数なら先にある方を出す） */
const RELAX_ORDER: FilterKey[] = ['area', 'day', 'sport', 'age']

function matches(c: FinderClass, f: Filters): boolean {
  if (f.sport && c.sport !== f.sport) return false
  if (f.age) {
    // 対応表に無い age は絞り込みの対象外＝常に表示する（取りこぼし防止）
    const buckets = AGE_BUCKETS[c.age]
    if (buckets && !buckets.includes(f.age)) return false
  }
  if (f.day && !c.day.split('・').includes(f.day)) return false
  if (f.area) {
    const v = venues.find(v => v.id === c.venueId)
    if (!v || v.area !== f.area) return false
  }
  return true
}

function filterLabel(key: FilterKey, f: Filters): string {
  if (key === 'age') return AGE_OPTIONS.find(o => o.id === f.age)?.long ?? ''
  if (key === 'sport') return SPORTS.find(s => s.id === f.sport)?.long ?? ''
  if (key === 'day') return `${f.day}曜`
  return f.area ?? ''
}

const INITIAL_ROWS = 5

export default function ClassFinder({ trialOpen }: { trialOpen?: TrialOpenMap }) {
  const [filters, setFilters] = useState<Filters>({ sport: null, age: null, day: null, area: null })
  const [showAll, setShowAll] = useState(false)
  const [ready, setReady] = useState(false)
  const { sport, age, day, area } = filters

  // URLの条件を復元する。useSearchParams はページ全体をCSRに落としてしまうので
  // マウント後に location から直接読む
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const s = q.get('sport')
    const a = q.get('age')
    const d = q.get('day')
    const ar = q.get('area')
    setFilters({
      sport: s && SPORT_OPTIONS.some(o => o.id === s) ? (s as SportIconKey) : null,
      age: a && AGE_OPTIONS.some(o => o.id === a) ? (a as AgeBucket) : null,
      day: d && (DAY_OPTIONS as readonly string[]).includes(d) ? d : null,
      area: ar && AREA_OPTIONS.includes(ar) ? ar : null,
    })
    setReady(true)
  }, [])

  const results = useMemo(() => ALL_CLASSES.filter(c => matches(c, filters)), [filters])
  const active = (Object.keys(filters) as FilterKey[]).filter(k => filters[k] !== null)
  const hasFilter = active.length > 0

  // 0件のとき「どの条件を外せば見つかるか」。いちばん多く見つかる条件を1つ選ぶ
  const relax = useMemo(() => {
    if (results.length > 0) return null
    let best: { key: FilterKey; list: FinderClass[] } | null = null
    for (const key of RELAX_ORDER) {
      if (filters[key] === null) continue
      const list = ALL_CLASSES.filter(c => matches(c, { ...filters, [key]: null }))
      if (list.length > 0 && (!best || list.length > best.list.length)) best = { key, list }
    }
    return best
  }, [filters, results.length])

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
    const params = { sport: sport ?? 'all', age: age ?? 'all', day: day ?? 'all', area: area ?? 'all' }
    trackEvent('class_finder_filter', { ...params, result_count: String(results.length) })
    if (results.length === 0) trackEvent('class_finder_no_result', params)
  }, [ready, sport, age, day, area, hasFilter, results.length])

  function set<K extends FilterKey>(key: K, value: Filters[K]) {
    setFilters(f => ({ ...f, [key]: f[key] === value ? null : value }))
    setShowAll(false)
  }
  function clearAll() {
    setFilters({ sport: null, age: null, day: null, area: null })
    setShowAll(false)
  }
  function remove(key: FilterKey, via: 'chip' | 'relax') {
    setFilters(f => ({ ...f, [key]: null }))
    if (via === 'relax') trackEvent('finder_relax_click', { removed: key })
  }

  const visible = showAll ? results : results.slice(0, INITIAL_ROWS)
  const rest = results.length - visible.length

  return (
    <section id="finder" className="bg-white pt-3.5 pb-8 lg:pt-6 lg:pb-16">
      {/* 以前の「#classes」へのリンク（他ページのメニュー等）もここに着くように */}
      <span id="classes" className="block" aria-hidden="true" />
      <div className="max-w-[680px] lg:max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between gap-2 mb-[18px] lg:mb-6">
          <div>
            <p className="flex items-center gap-1 text-[13px] font-bold text-star-ink">
              <StarIcon className="w-3.5 h-3.5 text-star-orange" />教室をさがす
            </p>
            <h2 className="mt-0.5 font-display font-extrabold text-2xl lg:text-[32px] leading-[1.35]">
              ぴったりの教室を<br className="lg:hidden" /><span className="hidden lg:inline">、</span>30秒でさがす
            </h2>
          </div>
          <span className="shrink-0 text-xs font-bold bg-star-peach rounded-full px-2.5 py-1">
            全{ALL_CLASSES.length}教室<span className="hidden lg:inline">・市内{new Set(ALL_CLASSES.map(c => c.venueId).filter(Boolean)).size}会場</span>
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:items-start">
          {/* ── 条件 ── */}
          <div className="flex flex-col gap-[18px] lg:border-2 lg:border-star-sand lg:rounded-[22px] lg:p-6">
            <fieldset>
              <legend className="flex items-center gap-1.5 text-[15px] font-black mb-2.5">
                <StepNo n={1} />だれが通う？
              </legend>
              <div className="flex justify-between items-end">
                {AGE_OPTIONS.map(o => {
                  const on = age === o.id
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set('age', o.id)}
                      className={`relative w-[66px] lg:w-[78px] flex flex-col items-center gap-1.5 ${on ? 'text-star-ink' : 'text-star-navy'}`}
                    >
                      <span
                        className={`w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full flex items-end justify-center overflow-hidden transition-colors ${
                          on ? 'bg-star-sand border-[3px] border-star-orange' : 'bg-star-peach border-2 border-star-apricot hover:border-star-orange/60'
                        }`}
                      >
                        <Image
                          src="/img/top/m-base.webp"
                          alt=""
                          width={o.icon * 2}
                          height={Math.round(o.icon * 1.85)}
                          style={{ width: o.icon, height: 'auto', marginBottom: Math.max(2, 12 - o.icon / 5) }}
                        />
                      </span>
                      {on && <Tick className="absolute right-0 -top-[3px]" />}
                      <span className={`text-xs ${on ? 'font-black' : 'font-bold'}`}>
                        <span className="lg:hidden">{o.label}</span>
                        <span className="hidden lg:inline">{o.long}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="flex items-center gap-1.5 text-[15px] font-black mb-2.5">
                <StepNo n={2} />なにをやりたい？
              </legend>
              <div className="grid grid-cols-4 gap-2 lg:gap-2.5">
                <SportTile
                  label="すべて"
                  img="/img/top/m-group.webp"
                  imgClass="w-[66px]"
                  tile="bg-[#f3f5f8] border-[#e1e6ec]"
                  on={sport === null}
                  onClick={() => { setFilters(f => ({ ...f, sport: null })); setShowAll(false) }}
                />
                {SPORT_OPTIONS.map(s => (
                  <SportTile
                    key={s.id}
                    label={s.label}
                    longLabel={s.long}
                    img={s.img}
                    tile={s.tile}
                    on={sport === s.id}
                    onClick={() => set('sport', s.id)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="flex items-center gap-1.5 text-[15px] font-black mb-2.5">
                <StepNo n={3} />いつ・どこで？
              </legend>
              <div className="flex justify-between mb-2.5" role="group" aria-label="曜日">
                {DAY_OPTIONS.map(d => {
                  const on = day === d
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={on}
                      aria-label={`${d}曜日`}
                      onClick={() => set('day', d)}
                      className={`w-10 h-10 lg:w-11 lg:h-11 rounded-full border-2 text-sm transition-colors ${
                        on ? 'bg-star-navy border-star-navy text-white font-black' : 'bg-white border-[#d8dee6] text-star-navy font-bold hover:border-star-navy/50'
                      }`}
                    >
                      {d}
                    </button>
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="エリア">
                <AreaChip label="すべてのエリア" on={area === null} onClick={() => { setFilters(f => ({ ...f, area: null })); setShowAll(false) }} />
                {AREA_OPTIONS.map(a => (
                  <AreaChip key={a} label={a} on={area === a} onClick={() => set('area', a)} />
                ))}
              </div>
            </fieldset>
          </div>

          {/* ── 結果 ── */}
          <div className="mt-[18px] lg:mt-0 lg:sticky lg:top-[96px]" aria-live="polite">
            {results.length === 0 ? (
              <NoResult filters={filters} active={active} relax={relax} onRemove={remove} onClear={clearAll} trialOpen={trialOpen} />
            ) : (
              <div className="bg-star-cream rounded-[18px] lg:rounded-[22px] px-3 pt-3.5 pb-2.5 lg:p-5 flex flex-col gap-2">
                {hasFilter ? (
                  <>
                    <div className="flex items-baseline justify-between px-1">
                      <p className="text-sm font-bold">
                        <span className="font-display font-extrabold text-[26px] lg:text-[32px] text-star-orange">{results.length}</span> 件の教室が見つかりました
                      </p>
                      <button type="button" onClick={clearAll} className="p-1 text-xs font-bold text-[#34465a] underline">
                        条件をクリア
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-1 pb-1">
                      {active.map(k => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => remove(k, 'chip')}
                          aria-label={`「${filterLabel(k, filters)}」を外す`}
                          className="inline-flex items-center gap-1 h-7 pl-2.5 pr-2 rounded-full border-2 border-star-navy bg-white text-[11px] font-bold"
                        >
                          {filterLabel(k, filters)}<CloseIcon className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </>
                ) : showAll ? (
                  <div className="flex items-baseline justify-between px-1">
                    <p className="text-sm font-bold">
                      <span className="font-display font-extrabold text-[26px] lg:text-[32px] text-star-orange">{results.length}</span> 教室（すべて）
                    </p>
                    <button type="button" onClick={() => setShowAll(false)} className="p-1 text-xs font-bold text-[#34465a] underline">
                      とじる
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-1 pb-1">
                    <Image src="/img/top/m-jump.webp" alt="" width={120} height={99} className="w-[60px] h-auto shrink-0" />
                    <p className="text-sm font-bold leading-relaxed">
                      <span className="lg:hidden">上の</span><span className="hidden lg:inline">左の</span>①〜③をえらぶと、<br />通える教室がここに出ます。
                    </p>
                  </div>
                )}

                {(hasFilter || showAll) && (
                  <ul className="flex flex-col gap-2">
                    {visible.map(c => (
                      <ResultRow key={c.id} c={c} open={isTrialOpen(trialOpen, c.id)} />
                    ))}
                  </ul>
                )}

                {hasFilter && rest > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="self-center flex items-center gap-1 px-1 pt-1.5 pb-0.5 text-[13px] font-bold text-star-ink"
                  >
                    残り{rest}件も見る<ChevronIcon className="w-4 h-4 rotate-90" />
                  </button>
                )}
                {!hasFilter && !showAll && (
                  <button
                    type="button"
                    onClick={() => { setShowAll(true); trackEvent('finder_show_all', {}) }}
                    className="self-center flex items-center gap-1 px-1 pt-1.5 pb-0.5 text-[13px] font-bold text-star-ink"
                  >
                    全{ALL_CLASSES.length}教室を一覧で見る<ChevronIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <Link
          href="/inclusive-rikujo"
          className="mt-[18px] lg:mt-6 flex items-center gap-2.5 py-2.5 pl-2.5 pr-3.5 lg:px-5 rounded-2xl bg-[#fff9e6] border-2 border-dashed border-[#f2c94c] text-star-navy"
        >
          <Image src="/img/top/m-group.webp" alt="いろいろな色の星のマスコットたち" width={224} height={92} className="w-[112px] h-auto shrink-0" />
          <span className="text-[13px] lg:text-sm leading-relaxed">
            <span className="font-black">障がいの有無を問わず</span>参加できる教室もあります
            <span className="hidden lg:inline">（インクルーシブ陸上・ソーシャルフットボール）</span>
          </span>
          <ChevronIcon className="hidden lg:block w-4 h-4 ml-auto shrink-0 text-star-ink" />
        </Link>
      </div>
    </section>
  )
}

function StepNo({ n }: { n: number }) {
  return (
    <span className="w-[22px] h-[22px] rounded-full bg-star-navy text-white font-display font-extrabold text-[13px] flex items-center justify-center">
      {n}
    </span>
  )
}

function Tick({ className = '' }: { className?: string }) {
  return (
    <span className={`w-5 h-5 rounded-full bg-star-deep text-white flex items-center justify-center ${className}`} aria-hidden="true">
      <CheckIcon className="w-[13px] h-[13px]" />
    </span>
  )
}

function SportTile({
  label, longLabel, img, imgClass = 'w-[62px]', tile, on, onClick,
}: {
  label: string
  longLabel?: string
  img: string
  imgClass?: string
  tile: string
  on: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`relative h-[90px] lg:h-[100px] flex flex-col items-center justify-end gap-[3px] px-0.5 pt-1.5 pb-2 rounded-[14px] transition-colors ${
        on ? 'bg-[#fff0e0] border-[3px] border-star-orange text-star-ink' : `${tile} border-2 text-star-navy hover:brightness-[0.98]`
      }`}
    >
      <Image src={img} alt="" width={132} height={104} className={`${imgClass} h-12 lg:h-[54px] object-contain`} />
      <span className={`text-[11px] lg:text-xs whitespace-nowrap ${on ? 'font-black' : 'font-bold'}`}>
        {longLabel ? (
          <>
            <span className="lg:hidden">{label}</span>
            <span className="hidden lg:inline">{longLabel}</span>
          </>
        ) : label}
      </span>
      {on && <Tick className="absolute -right-1 -top-1.5" />}
    </button>
  )
}

function AreaChip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-[34px] px-3 rounded-full border-2 text-xs font-bold transition-colors ${
        on ? 'bg-star-navy border-star-navy text-white' : 'bg-white border-[#e1e6ec] text-star-navy hover:border-star-navy/40'
      }`}
    >
      {label}
    </button>
  )
}

function shortVenue(c: FinderClass): string {
  const v = venues.find(v => v.id === c.venueId)
  return v ? v.shortName : c.venue
}

function ResultRow({ c, open }: { c: FinderClass; open: boolean }) {
  const tag = CALENDAR_TAGS[c.id] || ''
  return (
    <li className="flex items-center gap-2.5 py-3 pl-3.5 pr-2.5 lg:py-3.5 lg:pl-5 lg:pr-4 bg-white rounded-[14px] shadow-[0_2px_8px_rgba(23,50,74,0.06)]">
      <span className="flex flex-col gap-[3px] grow min-w-0">
        <Link
          href={c.href}
          onClick={() => trackEvent('finder_detail_click', { class_name: c.name, class_tag: tag })}
          className="text-[15px] lg:text-base font-black text-star-navy hover:text-star-ink leading-snug"
        >
          {c.name}
        </Link>
        <span className="text-xs lg:text-[13px] text-star-sub">{c.day} {c.time}・{shortVenue(c)}</span>
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold bg-[#eef2f6] rounded-full px-2 py-px">{c.age.replace('（障がいの有無を問わず参加できます）', '')}</span>
          <span className="text-[11px] text-star-sub">月{c.price.toLocaleString()}円</span>
          {!open && <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-2">満員</span>}
        </span>
      </span>
      <Link
        href={tag ? `/taiken?from=finder&class_tag=${tag}` : '/taiken?from=finder'}
        onClick={() => trackEvent('finder_taiken_click', { class_name: c.name, class_tag: tag })}
        className={`shrink-0 text-[13px] font-bold text-white rounded-full px-3 py-[9px] lg:px-4 lg:py-2.5 whitespace-nowrap ${
          open ? 'bg-star-deep hover:bg-[#a84300]' : 'bg-[#6b5a2e] hover:bg-[#59491f]'
        }`}
      >
        {open ? '体験申込' : 'キャンセル待ち'}
      </Link>
    </li>
  )
}

function NoResult({
  filters, active, relax, onRemove, onClear, trialOpen,
}: {
  filters: Filters
  active: FilterKey[]
  relax: { key: FilterKey; list: FinderClass[] } | null
  onRemove: (key: FilterKey, via: 'chip' | 'relax') => void
  onClear: () => void
  trialOpen?: TrialOpenMap
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[13px] font-bold text-star-sub">えらんだ条件（×で外せます）</span>
      <div className="flex flex-wrap gap-1.5">
        {active.map(k => (
          <button
            key={k}
            type="button"
            onClick={() => onRemove(k, 'chip')}
            aria-label={`「${filterLabel(k, filters)}」を外す`}
            className="inline-flex items-center gap-1 h-8 pl-3 pr-2.5 rounded-full bg-star-navy text-white text-[13px] font-bold"
          >
            {filterLabel(k, filters)}<CloseIcon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
      <div className="bg-star-cream rounded-[18px] px-3.5 py-4 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Image src="/img/top/m-coach.webp" alt="クリップボードを持ったコーチ姿のマスコット" width={176} height={141} className="w-[88px] h-auto shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="font-display font-extrabold text-lg leading-snug">この条件の教室は、<br />まだありません</p>
            <p className="text-[13px] leading-relaxed">
              {relax ? '条件をひとつ外すと、見つかります。' : '条件を減らすか、LINEでご相談ください。'}
            </p>
          </div>
        </div>
        {relax && (
          <>
            <div className="bg-white rounded-[14px] py-3 pl-3.5 pr-2.5 flex flex-col gap-2 shadow-[0_2px_8px_rgba(23,50,74,0.06)]">
              <span className="self-start text-xs font-bold text-white bg-star-deep rounded-full px-2.5 py-0.5">
                {FILTER_LABELS[relax.key]}を外すと {relax.list.length}件
              </span>
              <ul className="flex flex-col divide-y divide-star-peach">
                {relax.list.slice(0, 2).map(c => (
                  <ResultRowPlain key={c.id} c={c} open={isTrialOpen(trialOpen, c.id)} />
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onRemove(relax.key, 'relax')}
              className="h-[46px] rounded-full border-2 border-star-deep bg-white text-sm font-bold text-star-ink"
            >
              {FILTER_LABELS[relax.key]}の条件を外して見る
            </button>
          </>
        )}
        {!relax && (
          <button type="button" onClick={onClear} className="h-[46px] rounded-full border-2 border-star-deep bg-white text-sm font-bold text-star-ink">
            条件をすべてクリア
          </button>
        )}
      </div>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-white border-2 border-star-line text-star-navy"
      >
        <LineIcon className="w-[30px] h-[30px] text-star-line shrink-0" />
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-black text-star-line-text">公式LINEで相談する</span>
          <span className="text-xs leading-normal text-star-sub">新しい教室の開講予定をご案内できる場合があります</span>
        </span>
      </a>
    </div>
  )
}

/** 0件のときの候補（白いカードの中に並べる簡易版） */
function ResultRowPlain({ c, open }: { c: FinderClass; open: boolean }) {
  const tag = CALENDAR_TAGS[c.id] || ''
  return (
    <li className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
      <span className="flex flex-col gap-[3px] grow min-w-0">
        <Link
          href={c.href}
          onClick={() => trackEvent('finder_detail_click', { class_name: c.name, class_tag: tag })}
          className="text-[15px] font-black text-star-navy hover:text-star-ink leading-snug"
        >
          {c.name}
        </Link>
        <span className="text-xs text-star-sub">{c.day} {c.time}・{shortVenue(c)}</span>
      </span>
      <Link
        href={tag ? `/taiken?from=finder&class_tag=${tag}` : '/taiken?from=finder'}
        onClick={() => trackEvent('finder_taiken_click', { class_name: c.name, class_tag: tag })}
        className="shrink-0 text-[13px] font-bold text-white bg-star-deep rounded-full px-3 py-[9px] whitespace-nowrap"
      >
        {open ? '体験申込' : 'キャンセル待ち'}
      </Link>
    </li>
  )
}
