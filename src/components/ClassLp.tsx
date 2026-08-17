import Link from 'next/link'
import Script from 'next/script'
import Header from '@/components/Header'
import { loadLpContent } from '@/lib/lp-content'

/**
 * hp-lp の教室紹介ページ（WordPress用HTML）をそのまま表示する共通コンポーネント。
 * LP側のCSSは .kjlp 配下にスコープされているため、サイト本体のスタイルとは干渉しない。
 */
export default function ClassLp({ slug }: { slug: string }) {
  const { html, script } = loadLpContent(slug)

  return (
    <main className="bg-white">
      <Header variant="rikujo" />

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/taiken" className="btn-primary text-center">
          無料体験に申し込む
        </Link>
        <Link
          href="/rikujo"
          className="inline-flex items-center justify-center px-8 py-3 border-2 border-warm-200 text-brand-navy font-display font-bold rounded-full hover:bg-warm-50 transition-all"
        >
          ほかの陸上教室を見る
        </Link>
      </div>

      {script && (
        <Script
          id={`lp-${slug}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: script }}
        />
      )}
    </main>
  )
}
