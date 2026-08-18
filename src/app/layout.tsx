import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Search Console の「HTMLタグ」方式で所有権を確認するための値。
// Vercel の環境変数に入れれば反映される（未設定ならタグ自体を出力しない）。
// GA4 が入っているので「Googleアナリティクス」方式が使えればこれは不要。
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  // canonical を各ページで相対指定できるようにする基点
  metadataBase: new URL('https://startus-kanazawa.org'),
  alternates: { canonical: '/' },
  title: {
    default: 'STARTUS sports academy | かなざわ総合スポーツクラブ',
    template: '%s | STARTUS sports academy',
  },
  description: '金沢で約30のスポーツ教室を運営。かけっこから陸上・バドミントン・チアまで、専門コーチが一人ひとりに寄り添います。無料体験受付中。',
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
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
