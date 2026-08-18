import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  alternates: { canonical: '/izumi-junior' },
  title: '陸上泉（木）ジュニアクラス（小4〜中学生）',
  description:
    '金沢市営陸上競技場で毎週木曜に開講する陸上ジュニアクラス。エビデンスに基づく理論的な指導と、フィードバックシートによる手厚い個別指導が特長です。18:00〜19:00・月会費6,600円。',
  openGraph: {
    title: '陸上泉（木）ジュニアクラス（小4〜中学生）| STARTUS',
    description:
      '金沢市営陸上競技場で毎週木曜18:00〜。データと理論でタイムを伸ばす、小4〜中学生の陸上クラスです。',
    url: 'https://startus-kanazawa.org/izumi-junior',
  },
}

export default function IzumiJuniorPage() {
  return <ClassLp slug="izumi-junior" />
}
