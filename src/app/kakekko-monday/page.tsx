import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  title: '月曜かけっこ塾（小学3〜6年生）',
  description:
    '金沢・稲置学園総合運動場で毎週月曜に開講するかけっこ塾。対象は小学3〜6年生、定員10〜15名程度の少人数制。金沢星稜大学陸上競技部の学生コーチが走り方の基本から指導します。19:30〜20:30・月会費6,600円。',
  openGraph: {
    title: '月曜かけっこ塾（小学3〜6年生）| STARTUS',
    description:
      '金沢・稲置学園総合運動場で毎週月曜19:30〜。小学3〜6年生向け、少人数制のかけっこ塾です。',
    url: 'https://startus-kanazawa.org/kakekko-monday',
  },
}

export default function KakekkoMondayPage() {
  return <ClassLp slug="kakekko-monday" />
}
