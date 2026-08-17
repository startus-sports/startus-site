/**
 * お知らせは WordPress（kanazawa-ssc.jp）の投稿をそのまま使う。
 *
 * クラブのお知らせは従来どおりWordPressに投稿されるため、こちらで手書きすると
 * 二重管理になる。REST API から取得して表示し、リンク先も元の投稿に返す。
 * 1時間ごとに再取得（ISR）。取得に失敗してもページは落とさず、お知らせ欄だけ隠す。
 */

const WP_API = 'https://kanazawa-ssc.jp/wp-json/wp/v2/posts'

/** WordPressのカテゴリID → サイト側の表示タグ */
const CATEGORY_TAGS: Record<number, string> = {
  2: 'イベント',
  3: '会場・日程',
  4: 'クラブについて',
  5: '教室',
}

export type NewsItem = {
  date: string
  tag: string
  title: string
  href: string
}

type WpPost = {
  date: string
  link: string
  title: { rendered: string }
  categories: number[]
}

/** WordPressが返すHTMLエンティティを戻す（タイトルに &amp; や &#8230; が入るため） */
function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_m, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

export async function fetchNews(limit = 5): Promise<NewsItem[]> {
  try {
    const res = await fetch(
      `${WP_API}?per_page=${limit}&_fields=date,link,title,categories`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []

    const posts: WpPost[] = await res.json()

    return posts.map(post => ({
      date: post.date.slice(0, 7).replace('-', '.'),
      tag: CATEGORY_TAGS[post.categories?.[0]] ?? 'お知らせ',
      title: decodeEntities(post.title.rendered),
      href: post.link,
    }))
  } catch {
    // WordPress側が落ちていてもトップページは表示できるようにする
    return []
  }
}
