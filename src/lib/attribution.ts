// 流入元（どのリンク・どこから来たか）を、管理システムの公開フォームと同じ規則で記録する。
// 規則を揃えているのは、管理画面「統計 → 流入元」で手動タグ（?src=）と自動推定が
// 同じ行にまとまるようにするため。元の実装: startus sistem #1/public/taiken/index.html の
// stxCaptureAttribution()。表記を変えるときは両方を直すこと。
//
//   src      : ?src=（配布リンク作成ツールが付ける「配布先-補足」）/ ?utm_source= / LINE公式ボタン経由（?line_uid=）
//              どれも無ければ document.referrer から推定（検索 / Instagram / Facebook / LINE / X / YouTube / HP(クラブ) …）
//   explicit : src がリンクに付けたタグ由来なら true（referrer からの推定なら false）
//
// セッション中の最初の着地を保存し、あとから明示タグ付きのリンクで来たらそれで上書きする。
// 体験申込・お問い合わせの送信時に form_data.attribution として一緒に送る。

export type Attribution = {
  src: string
  explicit: boolean
  medium: string
  campaign: string
  referrer: string
  landing: string
}

const KEY = 'stx_attr'

function clean(v: string | null | undefined) {
  return String(v ?? '').replace(/[<>"'\\]/g, '').trim().slice(0, 60)
}

function computeAttribution(): Attribution {
  const q = new URLSearchParams(window.location.search)
  let src = clean(q.get('src') || q.get('utm_source'))
  // LINE公式のボタン経由は ?line_uid= が付く（LINE内ブラウザは referrer を送らない）
  if (!src && q.get('line_uid')) src = 'LINE'

  let refHost = ''
  try {
    refHost = new URL(document.referrer).hostname.replace(/^www\./, '')
  } catch {
    // referrer なし（直接入力・QR・アプリ内ブラウザなど）
  }
  const selfHost = window.location.hostname.replace(/^www\./, '')

  let auto = ''
  if (!src && refHost && refHost !== selfHost) {
    if (/(^|\.)(google|yahoo|bing|duckduckgo)\./.test(refHost)) auto = '検索'
    else if (/instagram\.com$/.test(refHost)) auto = 'Instagram'
    else if (/facebook\.com$/.test(refHost)) auto = 'Facebook'
    else if (/(^|\.)line\.me$/.test(refHost)) auto = 'LINE'
    else if (/(^|\.)(x|twitter)\.com$/.test(refHost)) auto = 'X'
    else if (/(youtube\.com|youtu\.be)$/.test(refHost)) auto = 'YouTube'
    // HPは2サイトあるので区別する（connect 等のサブドメインを巻き込まないよう完全一致）
    else if (refHost === 'startus-kanazawa.org') auto = 'HP(アカデミー)'
    else if (refHost === 'kanazawa-ssc.jp') auto = 'HP(クラブ)'
    else auto = refHost
  }

  return {
    src: src || auto,
    explicit: !!src,
    medium: clean(q.get('utm_medium')),
    campaign: clean(q.get('utm_campaign') || q.get('cmp')),
    referrer: refHost,
    landing: window.location.pathname,
  }
}

function readStored(): Attribution | null {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}

/** ページを開くたびに呼ぶ。最初の着地を残し、明示タグ付きで来たときだけ上書きする */
export function captureAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  const now = computeAttribution()
  const stored = readStored()
  if (!stored || now.explicit) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(now))
    } catch {
      // プライベートブラウズ等で保存できなくても、その場の値は返す
    }
    return now
  }
  return stored
}

/** 申込の送信時に使う */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  return readStored() ?? captureAttribution()
}
