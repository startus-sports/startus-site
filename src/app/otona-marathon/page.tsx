import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  alternates: { canonical: '/otona-marathon' },
  title: '大人のマラソン塾（中学生〜大人）',
  description:
    '金沢市営陸上競技場で毎週木曜19:30〜21:00に開講する大人向けランニング教室。サブ5・フルマラソン完走を目指す方から健康のために走りたい方まで。会話ができるペースが中心で、故障予防を最優先にした練習です。月会費3,300円・スポット参加1,500円/回。',
  openGraph: {
    title: '大人のマラソン塾（中学生〜大人）| STARTUS',
    description:
      '金沢市営陸上競技場で毎週木曜の夜。置いていかれない、ケガをさせない大人のランニング教室です。',
    url: 'https://startus-kanazawa.org/otona-marathon',
  },
}

export default function OtonaMarathonPage() {
  return <ClassLp slug="otona-marathon" />
}
