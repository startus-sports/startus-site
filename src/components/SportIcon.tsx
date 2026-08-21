/**
 * 種目アイコン。
 *
 * 経緯:
 *   1. もともと絵文字（🏸 🎾 🔵）を使っていたが、Windows の Chrome では
 *      🏸 と 🎾 がほぼ同じ形に見え、🔵 は意味を持たなかった。
 *   2. 細い線画のSVGに置き換えたが、16pxだと線が1px未満に潰れて判別不能。
 *      テニス＝虫眼鏡、フットボール＝五芒星、バドミントン＝しずくに見えていた。
 *   3. 塗り主体の太いシルエットに描き直し、16/20/24/40px で実際に
 *      レンダリングして目視確認したうえで確定させたのがこのファイル。
 *
 * 描き直すときは 16px での見え方を必ず確認すること。
 * 各形が別の物に見えないかも合わせて見る（円が3つ並ぶと区別できない等）。
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
  // 走る人。頭は円、手足は角丸の矩形を回転させて組む
  track: (
    <>
      <circle cx="15.6" cy="4.4" r="2.7" />
      <rect x="11.5" y="7.2" width="3.2" height="8.4" rx="1.6" transform="rotate(14 13.1 11.4)" />
      <rect x="12.4" y="13.8" width="3" height="8.6" rx="1.5" transform="rotate(-24 13.9 18.1)" />
      <rect x="7.6" y="13.4" width="3" height="8.4" rx="1.5" transform="rotate(38 9.1 17.6)" />
      <rect x="14.6" y="8.2" width="2.8" height="7.4" rx="1.4" transform="rotate(-68 16 11.9)" />
      <rect x="8.4" y="8.2" width="2.8" height="6.8" rx="1.4" transform="rotate(58 9.8 11.6)" />
    </>
  ),

  // シャトル。羽根は上辺が丸い扇形、コルクは隙間を空けた半円
  // （ギザギザの上辺は王冠に、隙間なしはしずくに見えた）
  badminton: (
    <>
      <path d="M8.7 12.6 L5.2 3.4 a11 11 0 0 1 13.6 0 L15.3 12.6 Z" />
      <path d="M8.2 14.6h7.6a1 1 0 0 1 1 1.13 4.8 4.8 0 0 1-9.6 0 1 1 0 0 1 1-1.13z" />
    </>
  ),

  // ラケット。必ず垂直に立てること。
  // 柄が右下に伸びる形（斜めのラケット）は、どのサイズでも虫眼鏡に見える。
  // 柄を左下にしても左右反転した虫眼鏡に見えるだけだった。
  tennis: (
    <>
      <ellipse cx="12" cy="7.6" rx="6.3" ry="6.9" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path
        d="M12 1.4v12.4M5.8 7.6h12.4M8.9 2v11M15.1 2v11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <rect x="10.4" y="14" width="3.2" height="8.4" rx="1.6" />
    </>
  ),

  // 音符。踊る人だと「走る人」と見分けがつかず、ポンポンはヤシの木に見えた
  dance: (
    <>
      <path d="M9.4 6.6 L20 4.1 V7.7 L9.4 10.2 Z" />
      <rect x="9.4" y="6.6" width="2.1" height="11.1" />
      <rect x="17.9" y="4.1" width="2.1" height="10.8" />
      <ellipse cx="7.6" cy="17.7" rx="3.6" ry="2.9" transform="rotate(-20 7.6 17.7)" />
      <ellipse cx="16.1" cy="14.9" rx="3.6" ry="2.9" transform="rotate(-20 16.1 14.9)" />
    </>
  ),

  // 大きなボール。塗りの円にすることで、線画のサッカーボールと対比させる
  kinball: (
    <path
      fillRule="evenodd"
      d="M12 2.8a9.4 9.4 0 1 0 0 18.8 9.4 9.4 0 0 0 0-18.8zM8.2 7.6a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2z"
    />
  ),

  // サッカーボール。縫い目の線を足すと五芒星に見えるので、円と中央の五角形だけにする
  soccer: (
    <>
      <circle cx="12" cy="12" r="9.3" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <path d="M12 5.0 L17.1 8.7 L15.15 14.7 H8.85 L6.9 8.7 Z" />
    </>
  ),

  // スケート靴
  skating: (
    <>
      <path d="M6.4 2.2h3a1.2 1.2 0 0 1 1.2 1.2v8.3l4.9 2.05a2.3 2.3 0 0 1 1.4 2.12v1.03a1.2 1.2 0 0 1-1.2 1.2H6.4a1.2 1.2 0 0 1-1.2-1.2V3.4a1.2 1.2 0 0 1 1.2-1.2z" />
      <rect x="3.4" y="19.6" width="17.2" height="2.2" rx="1.1" />
      <rect x="6.2" y="17.9" width="2.2" height="2.3" />
      <rect x="15.6" y="17.9" width="2.2" height="2.3" />
    </>
  ),

  other: (
    <>
      <path d="M12 2.2l1.95 5.65L19.6 9.8l-5.65 1.95L12 17.4l-1.95-5.65L4.4 9.8l5.65-1.95L12 2.2z" />
      <path d="M18.2 15.2l.95 2.55 2.55.95-2.55.95-.95 2.55-.95-2.55-2.55-.95 2.55-.95.95-2.55z" />
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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
