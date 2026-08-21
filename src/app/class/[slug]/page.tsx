import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import SportIcon, { type SportIconKey } from '@/components/SportIcon'
import {
  classCategories,
  getCategory,
  getCategoryClasses,
  getCategoryVenues,
  getCategoryPriceLabel,
} from '@/lib/class-categories'

const SITE = 'https://startus-kanazawa.org'

export function generateStaticParams() {
  return classCategories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategory(slug)
  if (!cat) return {}

  return {
    title: cat.heading,
    description: cat.description,
    alternates: { canonical: `/class/${cat.slug}` },
    openGraph: {
      title: `${cat.heading} | STARTUS sports academy`,
      description: cat.description,
      url: `${SITE}/class/${cat.slug}`,
    },
  }
}

export default async function ClassCategoryPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const cat = getCategory(slug)
  if (!cat) notFound()

  const classes = getCategoryClasses(cat)
  const catVenues = getCategoryVenues(cat)
  const priceLabel = getCategoryPriceLabel(cat)
  const days = [...new Set(classes.map(c => c.day))].join('・')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: `STARTUS ${cat.name}教室`,
    url: `${SITE}/class/${cat.slug}`,
    description: cat.description,
    areaServed: { '@type': 'City', name: '金沢市' },
    parentOrganization: {
      '@type': 'SportsOrganization',
      name: 'STARTUS sports academy',
      url: SITE,
    },
    location: catVenues.map(v => ({
      '@type': 'Place',
      name: v.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: v.address,
        addressLocality: '金沢市',
        addressRegion: '石川県',
        addressCountry: 'JP',
      },
      geo: { '@type': 'GeoCoordinates', latitude: v.lat, longitude: v.lng },
    })),
  }

  return (
    <main className="bg-white min-h-screen">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="max-w-3xl mx-auto px-5 py-10">
        <nav className="text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-brand-orange">ホーム</Link>
          <span className="mx-1.5">›</span>
          <Link href="/#classes" className="hover:text-brand-orange">教室一覧</Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-600">{cat.name}</span>
        </nav>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange-light text-brand-orange flex items-center justify-center flex-shrink-0">
            <SportIcon name={cat.slug as SportIconKey} className="w-7 h-7" />
          </div>
          <div>
            <p className="section-label">{cat.name}</p>
            <h1 className="font-display font-bold text-2xl text-brand-navy leading-snug">
              {cat.heading}
            </h1>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-loose mb-6">{cat.lead}</p>

        {/* 基本情報 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {[
            { label: 'クラス数', value: `${classes.length}クラス` },
            { label: '開催曜日', value: `${days}曜` },
            { label: '会場', value: `${catVenues.length}会場` },
            { label: '月会費', value: priceLabel.replace('月額 ', '') },
          ].map(({ label, value }) => (
            <div key={label} className="bg-warm-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-0.5">{label}</div>
              <div className="font-display font-bold text-sm text-brand-navy">{value}</div>
            </div>
          ))}
        </div>

        {/* 特徴 */}
        <h2 className="font-display font-bold text-lg text-brand-navy mb-4">この教室の特徴</h2>
        <div className="space-y-3 mb-8">
          {cat.points.map((pt, i) => (
            <div key={pt.title} className="flex gap-3 bg-warm-50 rounded-2xl p-4">
              <span className="w-7 h-7 rounded-full bg-brand-orange text-white font-display font-bold text-sm flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-sm text-brand-navy mb-1">{pt.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pt.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* クラス一覧 */}
        <h2 className="font-display font-bold text-lg text-brand-navy mb-4">クラス・日程</h2>
        <div className="space-y-3 mb-8">
          {classes.map(cls => (
            <div key={cls.id} className="border border-warm-200 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-bold text-brand-navy">{cls.name}</h3>
                <span className="text-xs font-bold text-brand-orange whitespace-nowrap">
                  月額 ¥{cls.price.toLocaleString()}
                </span>
              </div>
              <dl className="text-sm text-gray-600 space-y-1">
                <div className="flex gap-2">
                  <dt className="text-gray-500 w-14 flex-shrink-0">日時</dt>
                  <dd>{cls.day}曜 {cls.time}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-gray-500 w-14 flex-shrink-0">対象</dt>
                  <dd>{cls.age}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-gray-500 w-14 flex-shrink-0">会場</dt>
                  <dd>
                    {cls.venueId ? (
                      <Link href={`/venue/${cls.venueId}`} className="text-brand-orange font-bold hover:underline">
                        {cls.venue} →
                      </Link>
                    ) : (
                      cls.venue
                    )}
                  </dd>
                </div>
              </dl>
              {cls.priceNote && (
                <p className="text-xs text-gray-500 mt-2">※ {cls.priceNote}</p>
              )}
            </div>
          ))}
        </div>

        {cat.notice && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed mb-8">
            <span className="font-bold">ご注意：</span>{cat.notice}
          </div>
        )}

        {/* 会場 */}
        <h2 className="font-display font-bold text-lg text-brand-navy mb-4">会場</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {catVenues.map(v => (
            <Link
              key={v.id}
              href={`/venue/${v.id}`}
              className="group border border-warm-200 rounded-2xl p-4 hover:border-brand-orange hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-[11px] bg-brand-navy text-white font-bold px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                  {v.area}
                </span>
                <span className="font-bold text-sm text-brand-navy group-hover:text-brand-orange transition-colors">
                  {v.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{v.address}</p>
              <span className="inline-block mt-2 text-xs text-brand-orange font-bold">
                この会場の教室を見る →
              </span>
            </Link>
          ))}
        </div>

        {/* 料金 */}
        <h2 className="font-display font-bold text-lg text-brand-navy mb-4">料金</h2>
        <div className="border border-warm-200 rounded-2xl overflow-hidden mb-8 text-sm">
          <div className="bg-brand-navy text-white px-4 py-2.5 font-display font-bold">
            入会時にかかる費用（すべて税込）
          </div>
          <div className="divide-y divide-warm-200">
            {[
              { item: '月会費', price: priceLabel.replace('月額 ', ''), note: '兄弟割引あり（2人目20%OFF・3人目以降半額）' },
              { item: '入会手数料', price: '¥5,500', note: '同一世帯2人目以降 ¥2,750' },
              { item: '年度会費', price: '¥5,500/年', note: '障がいのある方は ¥2,750/年' },
              { item: 'スポーツ安全保険', price: '¥800〜¥1,850/年', note: '中学生以下 ¥800／大人 ¥1,850' },
            ].map(({ item, price, note }) => (
              <div key={item} className="flex items-start justify-between gap-3 px-4 py-3">
                <div>
                  <span className="font-bold text-brand-navy">{item}</span>
                  <span className="text-xs text-gray-500 block">{note}</span>
                </div>
                <span className="font-display font-bold text-brand-navy whitespace-nowrap">{price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-brand-orange-light to-amber-50 border border-brand-orange/20 rounded-2xl p-6 text-center">
          <p className="font-bold text-brand-navy mb-1">まずは無料体験から</p>
          <p className="text-xs text-gray-600 mb-4">
            {cat.slug === 'skating'
              ? 'この教室は無料体験の対象外です。見学・ご相談はお気軽にどうぞ。'
              : '体験当日の入会で入会金(¥5,500)が無料 + STARTUSオリジナルTシャツプレゼント'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/taiken" className="btn-primary !text-sm">
              {cat.slug === 'skating' ? '見学・相談を申し込む' : '無料体験に申し込む'}
            </Link>
            <Link
              href="/#classes"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-warm-200 text-brand-navy font-display font-bold text-sm rounded-full hover:bg-white transition-all"
            >
              ほかの教室を見る
            </Link>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link href="/faq" className="text-sm text-brand-orange font-bold hover:underline">
            費用・体験・対象年齢など、入会前のよくある質問 →
          </Link>
        </p>
      </section>
    </main>
  )
}
