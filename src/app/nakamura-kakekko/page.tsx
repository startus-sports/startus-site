import type { Metadata } from 'next'
import ClassLp from '@/components/ClassLp'

export const metadata: Metadata = {
  alternates: { canonical: '/nakamura-kakekko' },
  title: '中村町かけっこ教室（月曜・小1〜中学生）',
  description:
    '金沢・中村町小学校で毎週月曜に開講するかけっこ教室。学校のグラウンド・体育館で放課後にそのまま参加できる地域密着型の教室です。17:00〜18:00・月会費6,600円。',
  openGraph: {
    title: '中村町かけっこ教室（月曜・小1〜中学生）| STARTUS',
    description:
      '金沢・中村町小学校で毎週月曜17:00〜。放課後にそのまま通える、地域密着のかけっこ教室です。',
    url: 'https://startus-kanazawa.org/nakamura-kakekko',
  },
}

export default function NakamuraKakekkoPage() {
  return <ClassLp slug="nakamura-kakekko" />
}
