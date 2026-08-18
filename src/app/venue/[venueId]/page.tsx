import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { venues, venuesWithClasses, getVenueClasses } from '@/lib/classes-data'

const SITE = 'https://startus-kanazawa.org'

export function generateStaticParams() {
  return venuesWithClasses().map(v => ({ venueId: v.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ venueId: string }> }
): Promise<Metadata> {
  const { venueId } = await params
  const venue = venues.find(v => v.id === venueId)
  if (!venue) return {}

  const classes = getVenueClasses(venue.id)
  const days = [...new Set(classes.map(c => c.day))].join('・')

  return {
    title: `${venue.name}のスポーツ教室`,
    description: `${venue.name}（${venue.address}）で開催しているSTARTUSの教室${classes.length}件をまとめました。${days}曜日に開催。かけっこ・陸上・マラソンなど、対象学年と時間・月会費を一覧で確認できます。無料体験受付中。`,
    alternates: { canonical: `/venue/${venue.id}` },
    openGraph: {
      title: `${venue.name}のスポーツ教室 | STARTUS`,
      description: `${venue.name}で開催している教室${classes.length}件の曜日・時間・対象・月会費をまとめました。`,
      url: `${SITE}/venue/${venue.id}`,
    },
  }
}

export default async function VenuePage(
  { params }: { params: Promise<{ venueId: string }> }
) {
  const { venueId } = await params
  const venue = venues.find(v => v.id === venueId)
  if (!venue) notFound()

  const classes = getVenueClasses(venue.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: venue.name,
    url: `${SITE}/venue/${venue.id}`,
    address: {
      '@type': 'PostalAddress',
      ...(venue.address ? { streetAddress: venue.address } : {}),
      addressLocality: '金沢市',
      addressRegion: '石川県',
      addressCountry: 'JP',
    },
    geo: { '@type': 'GeoCoordinates', latitude: venue.lat, longitude: venue.lng },
    containsPlace: undefined,
    subOrganization: undefined,
  }

  return (
    <main className="bg-white min-h-screen">
      <Header variant="rikujo" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="max-w-3xl mx-auto px-5 py-10">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-brand-orange">ホーム</Link>
          <span className="mx-1.5">›</span>
          <Link href="/rikujo" className="hover:text-brand-orange">陸上教室</Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-500">{venue.shortName}</span>
        </nav>

        <p className="section-label">{venue.area}エリア</p>
        <h1 className="font-display font-bold text-2xl text-brand-navy mb-2">
          {venue.name}のスポーツ教室
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          石川県金沢市の{venue.name}で開催している教室は{classes.length}件です。
          曜日・時間・対象学年・月会費をまとめました。どの教室も無料体験を1回受けられます。
        </p>

        <div className="bg-warm-50 border border-warm-200 rounded-2xl p-5 mb-8">
          <h2 className="font-bold text-brand-navy text-sm mb-2">会場の場所</h2>
          {venue.address && <p className="text-sm text-gray-600">{venue.address}</p>}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-brand-orange font-bold hover:underline"
          >
            Google Mapで見る →
          </a>
        </div>

        <h2 className="font-display font-bold text-lg text-brand-navy mb-4">
          この会場の教室一覧
        </h2>

        <div className="space-y-3">
          {classes.map(cls => (
            <div key={cls.id} className="border border-warm-200 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-brand-navy">{cls.name}</h3>
                <span className="text-xs font-bold text-brand-orange whitespace-nowrap">
                  月額 ¥{cls.price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {cls.day}曜 {cls.time} ｜ 対象 {cls.age}
              </p>
              {cls.priceNote && (
                <p className="text-xs text-gray-400 mb-2">※ {cls.priceNote}</p>
              )}
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{cls.oneLiner ?? `${cls.age}を対象にした教室です。`}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                {cls.lpHref && (
                  <Link href={cls.lpHref} className="text-brand-orange font-bold hover:underline">
                    詳しい紹介ページ →
                  </Link>
                )}
                <Link href="/taiken" className="text-brand-navy font-bold hover:underline">
                  無料体験に申し込む →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/taiken" className="btn-primary text-center">無料体験に申し込む</Link>
          <Link
            href="/rikujo"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-warm-200 text-brand-navy font-display font-bold rounded-full hover:bg-warm-50 transition-all"
          >
            ほかの会場を見る
          </Link>
        </div>
      </section>
    </main>
  )
}
