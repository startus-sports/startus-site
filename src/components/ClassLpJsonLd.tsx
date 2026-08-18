import { trackClasses, venues } from '@/lib/classes-data'

const SITE = 'https://startus-kanazawa.org'

/**
 * 教室紹介ページの構造化データ（schema.org Course）。
 *
 * classes-data.ts の lpHref からその教室を引き当てて生成するので、
 * 教室情報を直せば構造化データも自動で追従する。
 * LP側のHTMLが既に ld+json を持っている場合は二重になるため出力しない。
 */
export default function ClassLpJsonLd({ slug }: { slug: string }) {
  const cls = trackClasses.find(c => c.lpHref === `/${slug}`)
  if (!cls) return null

  const venue = venues.find(v => v.id === cls.venueId)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: cls.name,
    description: cls.description,
    url: `${SITE}/${slug}`,
    inLanguage: 'ja',
    provider: {
      '@type': 'SportsOrganization',
      name: 'STARTUS sports academy（NPO法人かなざわ総合スポーツクラブ）',
      url: SITE,
      address: {
        '@type': 'PostalAddress',
        addressLocality: '金沢市',
        addressRegion: '石川県',
        addressCountry: 'JP',
      },
    },
    audience: { '@type': 'EducationalAudience', educationalRole: cls.age },
    offers: {
      '@type': 'Offer',
      price: cls.price,
      priceCurrency: 'JPY',
      category: '月会費',
      url: `${SITE}/taiken`,
      availability: cls.description.includes('満員')
        ? 'https://schema.org/LimitedAvailability'
        : 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P1W',
        byDay: cls.day,
      },
      location: venue
        ? {
            '@type': 'Place',
            name: venue.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: venue.address,
              addressLocality: '金沢市',
              addressRegion: '石川県',
              addressCountry: 'JP',
            },
            geo: { '@type': 'GeoCoordinates', latitude: venue.lat, longitude: venue.lng },
          }
        : undefined,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
