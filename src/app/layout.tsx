import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'STARTUS sports academy | かなざわ総合スポーツクラブ',
    template: '%s | STARTUS sports academy',
  },
  description: '金沢で30以上のスポーツ教室を運営。かけっこから陸上・バスケ・チアまで、専門コーチが一人ひとりに寄り添います。無料体験受付中。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://kanazawa-ssc.jp',
    siteName: 'STARTUS sports academy',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
