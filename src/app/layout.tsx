import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata: Metadata = {
  title: {
    default: 'STARTUS sports academy | かなざわ総合スポーツクラブ',
    template: '%s | STARTUS sports academy',
  },
  description: '金沢で30以上のスポーツ教室を運営。かけっこから陸上・バスケ・チアまで、専門コーチが一人ひとりに寄り添います。無料体験受付中。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://startus-kanazawa.org',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
