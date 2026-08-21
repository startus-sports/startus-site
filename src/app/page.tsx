import HomeLP from './HomeLP'
import { fetchNews } from '@/lib/news'
import { fetchTrialOpenMap } from '@/lib/availability'
import { venues } from '@/lib/classes-data'

const SITE = 'https://startus-kanazawa.org'

// 団体としての構造化データ。「金沢 かけっこ教室」のような地域＋種目の検索で
// どこの誰なのかを検索エンジンに伝えるために置いている。
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'STARTUS sports academy',
  legalName: 'NPO法人 かなざわ総合スポーツクラブ',
  url: SITE,
  email: 'startus@startus-kanazawa.org',
  foundingDate: '2008',
  description:
    '金沢市で約30のスポーツ教室を運営するNPO法人。かけっこ・陸上・マラソンからバドミントン・テニス・チアリーディングまで、年齢と目的に合わせた教室を市内各所で開催しています。',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '金沢市',
    addressRegion: '石川県',
    addressCountry: 'JP',
  },
  areaServed: { '@type': 'City', name: '金沢市' },
  sameAs: ['https://www.instagram.com/kanazawa.sogo.sports.club/'],
  location: venues.map(v => ({
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

export default async function Home() {
  const news = await fetchNews()
  const trialOpen = await fetchTrialOpenMap()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeLP news={news} trialOpen={trialOpen} />
    </>
  )
}
