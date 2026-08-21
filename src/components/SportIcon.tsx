/**
 * 種目アイコン。
 *
 * 以前はカテゴリの識別に絵文字（🏸 🎾 🔵 など）を使っていたが、
 * Windows の Chrome では 🏸 と 🎾 がほぼ同じ形に見え、🔵 は
 * ただの青い丸で意味を持たなかったため、SVGに置き換えた。
 *
 * currentColor で描くので、親側の text-* で色を決める。
 */
export type SportIconKey =
  | 'track'
  | 'badminton'
  | 'tennis'
  | 'dance'
  | 'soccer'
  | 'kinball'
  | 'skating'
  | 'other'

const paths: Record<SportIconKey, React.ReactNode> = {
  // 走る人
  track: (
    <>
      <circle cx="15.5" cy="4.5" r="2" />
      <path d="M13.5 8.5L9 11l1.5 4L8 21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 8.5l3 2.5 3.5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 15l4 1 1.5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11L4 12" strokeLinecap="round" />
    </>
  ),
  // シャトル
  badminton: (
    <>
      <path d="M12 3l3.5 6h-7L12 3z" strokeLinejoin="round" />
      <path d="M8.5 9h7l1 4h-9l1-4z" strokeLinejoin="round" />
      <circle cx="12" cy="17" r="3.2" />
      <path d="M10 9v4M12 9v4M14 9v4" />
    </>
  ),
  // テニスボール（縫い目）
  tennis: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M4 8.5c4.5.5 7 3 7.5 7.5" strokeLinecap="round" />
      <path d="M20 8.5c-4.5.5-7 3-7.5 7.5" strokeLinecap="round" />
    </>
  ),
  // 踊る人
  dance: (
    <>
      <circle cx="13" cy="4.5" r="2" />
      <path d="M13 8.5l-1.5 5" strokeLinecap="round" />
      <path d="M13 8.5l5-2.5" strokeLinecap="round" />
      <path d="M11.5 13.5L7 21M11.5 13.5L15 21" strokeLinecap="round" />
      <path d="M8.5 10.5l3-1" strokeLinecap="round" />
    </>
  ),
  // サッカーボール
  soccer: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5l3.5 2.5-1.3 4.2h-4.4L8.5 10 12 7.5z" strokeLinejoin="round" />
      <path d="M12 3.5v4M19.5 10l-4 0M16.5 19l-2.3-4.8M7.5 19l2.3-4.8M4.5 10l4 0" strokeLinecap="round" />
    </>
  ),
  // 大きなボール（キンボール）
  kinball: (
    <>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M4.8 10.5c4.5 2 9.9 2 14.4 0" strokeLinecap="round" />
      <path d="M12 5.5c-2.4 4.6-2.4 10.4 0 15" strokeLinecap="round" />
      <path d="M3 6l1.5 1.5M21 6l-1.5 1.5" strokeLinecap="round" />
    </>
  ),
  // スケート靴
  skating: (
    <>
      <path d="M7 3v9l7 2.5v2H6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19.5h16" strokeLinecap="round" />
      <path d="M6 17v2.5M18 17v2.5" strokeLinecap="round" />
      <path d="M7 7h3M7 10h4" strokeLinecap="round" />
    </>
  ),
  // その他（きらめき）
  other: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" strokeLinejoin="round" />
      <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" strokeLinejoin="round" />
    </>
  ),
}

export default function SportIcon({
  name,
  className = 'w-6 h-6',
}: {
  name: SportIconKey
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
