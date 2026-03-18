import type { Metadata } from 'next'
import Header from '@/components/Header'
import RikujoLP from './RikujoLP'

export const metadata: Metadata = {
  title: '金沢の陸上教室・かけっこ教室 | STARTUS sports academy',
  description: '金沢市内5会場で毎日開催。かけっこから陸上競技まで、曜日・会場を選べます。月額¥3,300〜。無料体験受付中。',
  openGraph: {
    title: '金沢の陸上教室・かけっこ教室 | STARTUS',
    description: '金沢市内6会場で毎日開催。12教室から曜日・会場を選べる陸上教室。月額¥3,300〜。無料体験受付中。',
    url: 'https://kanazawa-ssc.jp/rikujo',
  },
}

// JSON-LD 構造化データ
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: 'STARTUS 陸上教室',
  description: '金沢市内6会場で開催する陸上・かけっこ教室。年中〜大人まで対応。',
  url: 'https://kanazawa-ssc.jp/rikujo',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '金沢市',
    addressRegion: '石川県',
    postalCode: '921-8022',
    addressCountry: 'JP',
  },
  telephone: '076-287-3789',
  priceRange: '¥3,300〜¥9,900',
}

export default function RikujoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="rikujo" />
      <RikujoLP />
    </>
  )
}
