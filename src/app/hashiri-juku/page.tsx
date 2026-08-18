import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  alternates: { canonical: '/hashiri-juku' },
  title: '走り塾 初中級（小5〜中学生の走り方教室）',
  description:
    '金沢・稲置学園総合運動場で開講する小学5年〜中学生向けの走り方・陸上（短距離）教室。金沢星稜大学陸上競技部の学生コーチが指導。初心者〜経験者歓迎、動画・50m計測で成長を見える化します。月曜19:30〜20:30・月3回・月会費6,600円。',
  openGraph: {
    title: '走り塾 初中級（小5〜中学生の走り方教室）| STARTUS',
    description:
      '金沢・稲置学園総合運動場で毎週月曜に開講。星稜大学陸上競技部の学生コーチが指導する、小5〜中学生の走り方教室です。',
    url: 'https://startus-kanazawa.org/hashiri-juku',
  },
}

export default function HashiriJukuPage() {
  return <ClassLp slug="hashiri-juku" />
}
