import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  title: 'ソーシャルフットボール（精神障がい者フットサル）',
  description:
    '障がいの有無・年齢を問わず参加できるフットボール教室。屋内人工芝のあめるんパークで毎週開催、経験がなくても大丈夫です。月会費のほかスポット（1回）参加も可能。',
  openGraph: {
    title: 'ソーシャルフットボール（精神障がい者フットサル）| STARTUS',
    description:
      '屋内人工芝のあめるんパークで毎週開催。障がいの有無・年齢を問わず参加できるフットボール教室です。',
    url: 'https://startus-kanazawa.org/socialfootball',
  },
}

export default function SocialFootballPage() {
  return <ClassLp slug="socialfootball" variant="main" />
}
