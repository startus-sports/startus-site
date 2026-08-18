import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  alternates: { canonical: '/inclusive-rikujo' },
  title: 'インクルーシブランニング教室',
  description:
    '金沢市営陸上競技場で開講する、障がいの有無にかかわらず誰でも参加できるランニング教室。パラ・一般どちらのクラスもあり、月会費のほかスポット（1回）参加も可能です。',
  openGraph: {
    title: 'インクルーシブランニング教室 | STARTUS',
    description:
      '障がいの有無を問わず、みんなで一緒に走る教室。金沢市営陸上競技場で開催、スポット参加もできます。',
    url: 'https://startus-kanazawa.org/inclusive-rikujo',
  },
}

export default function InclusiveRikujoPage() {
  return <ClassLp slug="inclusive-rikujo" />
}
