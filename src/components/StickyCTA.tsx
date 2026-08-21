import Link from 'next/link'

/**
 * 画面下に追従する体験申込CTA。
 *
 * トップページはスマホだとヘッダーがロゴとハンバーガーだけで、
 * スクロール中に申込ボタンが画面上に1つも無かった（8,000px近いページで
 * CTAが見えるのは最上部と最下部だけ）。/rikujo にだけ同様のバーがあったので
 * 共通コンポーネントとして切り出した。
 */
export default function StickyCTA({ from }: { from?: string }) {
  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-sm border-t border-warm-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="text-xs text-gray-600 min-w-0">
          <span className="font-bold text-brand-navy text-sm block">まずは無料体験から</span>
          <span className="hidden sm:inline">体験当日の入会で入会金(¥5,500)無料 + オリジナルTシャツ</span>
          <span className="sm:hidden">体験当日の入会で入会金無料</span>
        </div>
        <Link
          href={from ? `/taiken?from=${from}` : '/taiken'}
          className="btn-primary !py-2.5 !px-6 !text-sm whitespace-nowrap flex-shrink-0"
        >
          体験申込
        </Link>
      </div>
    </div>
  )
}
