import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  alternates: { canonical: '/kakekko-wednesday' },
  title: 'かけっこ塾（水曜・年長〜中学生）',
  description:
    '金沢・稲置学園総合運動場で毎週水曜に開講するかけっこ塾。年長〜小2のアプローチクラスからホップ・ステップ・ジャンプまで、年齢とレベルに合わせたクラス編成。金沢星稜大学陸上競技部の学生コーチが指導します。19:30〜20:30・月会費6,600円。※現在満員のためキャンセル待ちを受付中。',
  openGraph: {
    title: 'かけっこ塾（水曜・年長〜中学生）| STARTUS',
    description:
      '金沢・稲置学園総合運動場で毎週水曜19:30〜。年齢とレベルに合わせたクラス編成で、星稜大学陸上競技部の学生コーチが指導します。',
    url: 'https://startus-kanazawa.org/kakekko-wednesday',
  },
}

export default function KakekkoWednesdayPage() {
  return <ClassLp slug="kakekko-wednesday" />
}
