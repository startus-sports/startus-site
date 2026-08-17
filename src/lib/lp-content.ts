import fs from 'fs'
import path from 'path'

/**
 * hp-lp（WordPress貼り付け用）の教室紹介ページHTMLを読み込む。
 *
 * 素材のマスタは「startus management system」リポジトリの hp-lp/ 配下。
 * こちらにコピーしたものを src/content/lp/ に置いている（体験申込リンクのみ
 * kanazawa-ssc.jp/taiken → /taiken に書き換え済み）。
 *
 * dangerouslySetInnerHTML では <script> が実行されないため、
 * 構造化データ(ld+json)以外のスクリプトは切り出して next/script で読み込む。
 */
export function loadLpContent(slug: string): { html: string; script: string } {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'src/content/lp', `${slug}.html`),
    'utf-8'
  )

  const scripts: string[] = []
  const html = raw.replace(
    /<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/gi,
    (_match, body: string) => {
      scripts.push(body)
      return ''
    }
  )

  return { html, script: scripts.join('\n') }
}
