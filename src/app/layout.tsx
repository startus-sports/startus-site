import type { Metadata } from 'next'
import Script from 'next/script'
import AnalyticsListener from '@/components/AnalyticsListener'
import './globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// GA4 の初期設定。gtag('config') の前にURLを整えてから渡す。
//  ・?src=（管理画面の「配布リンク作成ツール」が付ける「配布先-補足」）を GA4 の参照元/メディア/キャンペーンに読み替える。
//    GA4 は ?src= を知らないので、読み替えないとチラシQRやLINE配信からの訪問がすべて「(direct)」になる。
//    例: ?src=チラシ-運動会 → utm_source=チラシ / utm_medium=offline / utm_campaign=運動会
//    配布先の表記（LINE / Instagram / HP(クラブ) …）は配布リンク作成ツール・src/lib/attribution.ts と同じ
//  ・?line_uid=（LINE公式のボタン経由で付く利用者ID）は GA4 に送らない
//  ・?internal=1 を一度開いた端末は traffic_type=internal（職員・制作者の閲覧を集計から外す。?internal=0 で解除）
//    GA4 管理画面のデータフィルタ「内部トラフィック」を有効にすると除外される
//  ・?ga_debug=1 で GA4 の DebugView に出す
function gaBootScript(id: string) {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    (function () {
      var cfg = {};
      try {
        var u = new URL(window.location.href), q = u.searchParams, changed = false;
        if (q.get('internal') === '1') localStorage.setItem('stx_internal', '1');
        if (q.get('internal') === '0') localStorage.removeItem('stx_internal');
        if (q.has('internal')) { q.delete('internal'); changed = true; }
        if (localStorage.getItem('stx_internal') === '1') cfg.traffic_type = 'internal';
        if (q.get('ga_debug') === '1') { cfg.debug_mode = true; q.delete('ga_debug'); changed = true; }
        if (q.has('line_uid')) {
          q.delete('line_uid');
          if (!q.get('src') && !q.get('utm_source')) q.set('src', 'LINE');
          changed = true;
        }
        var src = q.get('src');
        if (src && !q.get('utm_source')) {
          var i = src.indexOf('-');
          var base = i > 0 ? src.slice(0, i) : src;
          var camp = i > 0 ? src.slice(i + 1) : '';
          var media = { 'LINE': 'social', 'Instagram': 'social', 'Facebook': 'social', 'HP(アカデミー)': 'referral', 'HP(クラブ)': 'referral' };
          q.set('utm_source', base);
          q.set('utm_medium', media[base] || 'offline');
          if (camp) q.set('utm_campaign', camp);
          changed = true;
        }
        if (changed) cfg.page_location = u.toString();
      } catch (e) {}
      gtag('config', '${id}', cfg);
    })();
  `
}

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
    // OGP画像が無いとLINE・Facebook・Meta広告でサムネイルが出ず、
    // ただのテキストリンクになってしまう。
    // 画像は scripts/og/ のテンプレートを headless Chrome で
    // レンダリングして public/og/ に置いた静的ファイル。
    images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: 'STARTUS sports academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STARTUS sports academy | かなざわ総合スポーツクラブ',
    description: '金沢で約30のスポーツ教室を運営。かけっこから陸上・バドミントン・チアまで、専門コーチが一人ひとりに寄り添います。無料体験受付中。',
    images: ['/og/default.jpg'],
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
      <body>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {gaBootScript(GA_MEASUREMENT_ID)}
            </Script>
          </>
        )}
        <AnalyticsListener />
        {children}
      </body>
    </html>
  )
}
