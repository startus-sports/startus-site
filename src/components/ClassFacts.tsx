import Link from 'next/link'
import { trackClasses, venues } from '@/lib/classes-data'

/**
 * 教室ページ末尾の基本情報ブロック。
 *
 * LP本文（hp-lp からのコピー）には手を入れず、教室マスタから生成する。
 * ねらいは2つ:
 *   - 会場名・住所・学年・曜日といった、実際に検索される語をテキストで持たせる
 *   - 会場ページへの内部リンクをつくる
 */
export default function ClassFacts({ slug }: { slug: string }) {
  const cls = trackClasses.find(c => c.lpHref === `/${slug}`)
  if (!cls) return null

  const venue = venues.find(v => v.id === cls.venueId)

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: '会場',
      value: venue ? (
        <>
          <Link href={`/venue/${venue.id}`} className="text-brand-orange font-bold hover:underline">
            {venue.name}
          </Link>
          <span className="block text-xs text-gray-500 mt-0.5">{venue.address}</span>
        </>
      ) : (
        cls.venue
      ),
    },
    { label: '開催曜日', value: `${cls.day}曜日` },
    { label: '時間', value: cls.time },
    { label: '対象', value: cls.age },
    { label: '月会費', value: `${cls.price.toLocaleString()}円（税込）` },
    { label: '指導者', value: cls.instructor },
  ]

  return (
    <section className="max-w-3xl mx-auto px-5 py-10">
      <h2 className="font-display font-bold text-lg text-brand-navy mb-1">
        {cls.name}の基本情報
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        石川県金沢市で開催しているスポーツ教室です。
      </p>

      <dl className="border border-warm-200 rounded-2xl overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex gap-4 px-5 py-3 text-sm ${i % 2 === 1 ? 'bg-warm-50' : 'bg-white'}`}
          >
            <dt className="w-20 flex-shrink-0 font-bold text-brand-navy">{label}</dt>
            <dd className="text-gray-600">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-sm text-gray-600 leading-relaxed mt-4">
        {cls.recommendFor}にはとくに向いています。
        {venue && `${venue.area}エリアにお住まいの方が通いやすい会場です。`}
        無料体験は1回まで受けられます。
      </p>
    </section>
  )
}
