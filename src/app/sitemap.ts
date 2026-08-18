import type { MetadataRoute } from 'next'
import { venuesWithClasses } from '@/lib/classes-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://startus-kanazawa.org'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/rikujo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // 教室紹介ページ（src/content/lp 配下のLP）
    ...[
      'hashiri-juku',
      'kakekko-monday',
      'kakekko-wednesday',
      'nakamura-kakekko',
      'izumi-junior',
      'inclusive-rikujo',
      'otona-marathon',
      'socialfootball',
    ].map(slug => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // 会場ページ（会場名での検索を拾う）
    ...venuesWithClasses().map(v => ({
      url: `${baseUrl}/venue/${v.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/taiken`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tokushoho`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
