import { otherClasses, type OtherClassData } from './other-classes'
import { venues } from './classes-data'

/**
 * 陸上以外の教室のカテゴリページ（/class/[slug]）用の定義。
 *
 * 背景:
 *   トップページの教室カード8枚のうち6枚が href なしの行き止まりで、
 *   「金沢 バドミントン 教室」「金沢 チアリーディング」等の検索に対して
 *   受け皿になるページが1枚も無かった（陸上だけ /rikujo がある状態）。
 *
 *   教室データ自体は other-classes.ts に曜日・時間・対象・月会費まで
 *   揃っているので、それを元にカテゴリ単位のページを生成する。
 *
 * 指導者名について:
 *   other-classes.ts は instructor を持っているが、この定義では使わない。
 *   会場ページ(/venue/[id])も指導者名を出していないため、公開範囲を揃えている。
 */

export type CategoryPoint = {
  title: string
  body: string
}

export type ClassCategory = {
  slug: string
  /** カード・パンくず用の短い名前 */
  name: string
  /** ページのh1 */
  heading: string
  /** h1直下のリード文 */
  lead: string
  /** meta description */
  description: string
  /** other-classes.ts から拾う教室のid */
  classIds: string[]
  points: CategoryPoint[]
  /** 無料体験の対象外など、料金・体験まわりの注意 */
  notice?: string
  /** トップページのカードに出すタグ */
  tag?: string
}

export const classCategories: ClassCategory[] = [
  {
    slug: 'badminton',
    name: 'バドミントン',
    heading: '金沢のバドミントン教室',
    lead: 'ジュニア・ビギナー・親子の4クラスを、高尾台中学校と扇台小学校の2会場で開催しています。ラケットの握り方から始められるので、初めてでも大丈夫です。',
    description:
      '金沢市でバドミントン教室を開催中。高尾台中学校・扇台小学校の2会場、ジュニア／ビギナー／親子の4クラス。小学生から大人まで、初心者歓迎。月額¥6,600、無料体験受付中。',
    classIds: ['badminton-takaodai-jr', 'badminton-takaodai-bg', 'badminton-ougidai', 'oyako-badminton'],
    tag: '初心者歓迎',
    points: [
      {
        title: '初めてでも入りやすい2クラス制',
        body: 'ジュニアクラスとビギナークラスを分けています。経験者に混ざって気後れすることなく、自分のレベルで練習できます。',
      },
      {
        title: '南部エリアの2会場',
        body: '高尾台中学校（土曜）と扇台小学校（木曜）。どちらも体育館なので、雨でも予定どおり練習できます。',
      },
      {
        title: '親子で一緒に打てる',
        body: '隔週日曜には保護者も一緒に参加できる親子クラスがあります。お子さんの様子を間近で見られます。',
      },
    ],
  },
  {
    slug: 'tennis',
    name: 'テニス',
    heading: '金沢のジュニアテニス教室',
    lead: '金沢星稜大学サブアリーナの屋内コートで、小学生〜中学生を対象に毎週水曜開催。天候に左右されず、年間を通して安定して練習できます。',
    description:
      '金沢市のジュニアテニス教室。金沢星稜大学サブアリーナの屋内コートで毎週水曜19:00〜20:30開催。小学生〜中学生対象、月額¥9,900。雨でも中止なし。無料体験受付中。',
    classIds: ['tennis'],
    tag: '屋内コート',
    points: [
      {
        title: '雨でも雪でも中止にならない',
        body: '屋内コートなので、金沢の冬でも予定どおり。「天気で流れて上達しない」ということがありません。',
      },
      {
        title: '大学のテニス部と一緒に',
        body: '金沢星稜大学テニス部の環境で練習します。年の近いお兄さん・お姉さんが相手をしてくれます。',
      },
      {
        title: '小学生から中学生まで',
        body: 'ラケットを握ったことがない子から、部活で伸ばしたい中学生まで、同じ場で段階に合わせて指導します。',
      },
    ],
  },
  {
    slug: 'dance',
    name: 'バレエ・ダンス・チア',
    heading: '金沢のキッズバレエ・ダンス・チアリーディング教室',
    lead: 'バレエ・ヒップホップ・チアリーディング・キッズダンスの5クラス。年中から始められて、金沢市総合体育館スタジオと米泉小学校で開催しています。',
    description:
      '金沢市のキッズバレエ・ヒップホップ・チアリーディング・ダンス教室。年中〜小学生対象の5クラスを金沢市総合体育館スタジオ・米泉小学校で開催。月額¥6,600、無料体験受付中。',
    classIds: ['ballet', 'hiphop', 'cheer-izumino', 'cheer-yonaizumi', 'kidsdance'],
    tag: '表現力UP',
    points: [
      {
        title: '4ジャンルから選べる',
        body: 'クラシックバレエ、ヒップホップ、チアリーディング、キッズダンス。同じ月額なので、迷ったら体験して決められます。',
      },
      {
        title: '年中から始められる',
        body: '未就学のうちから体を動かす楽しさに触れられます。低学年向けのキッズダンスもあります。',
      },
      {
        title: 'チアは2会場・2曜日',
        body: 'チアリーディングは金曜（金沢市総合体育館）と水曜（米泉小学校）。通いやすい方を選べます。',
      },
    ],
    notice: 'チアリーディングは月会費のほかにユニフォーム代（17,800円〜）が必要です。',
  },
  {
    slug: 'kinball',
    name: 'キンボールスポーツ',
    heading: '金沢のキンボールスポーツ教室',
    lead: '直径1.2mの大きなボールを使う、体格差や運動経験の差が出にくいスポーツです。高尾台中学校の体育館で毎週日曜に開催しています。',
    description:
      '金沢市のキンボールスポーツ教室。大きなボールを使う誰でも参加できるスポーツを高尾台中学校体育館で毎週日曜19:00〜21:00開催。小学生以上、月額¥4,100。無料体験受付中。',
    classIds: ['kinball'],
    tag: '親子・家族OK',
    points: [
      {
        title: '運動が得意でなくても差が出にくい',
        body: '大きなボールをみんなで扱う競技なので、走るのが速い・力が強いといった要素で勝負が決まりません。',
      },
      {
        title: '親子・家族で参加できる',
        body: '小学生以上なら大人も一緒に参加できます。家族で体を動かす習慣づくりにも向いています。',
      },
      {
        title: '日曜の夜、体育館で',
        body: '平日は習い事や部活で埋まっている子でも通いやすい日曜19:00〜21:00の開催です。',
      },
    ],
  },
  {
    slug: 'skating',
    name: 'アイススケート',
    heading: '金沢のアイススケート教室',
    lead: '健民スポレクプラザのスケートリンクで、石川県スケート連盟の指導員が指導します。毎週土曜の午前、通年で開催しています。',
    description:
      '金沢市のアイススケート教室。健民スポレクプラザのリンクで毎週土曜9:30〜11:30、石川県スケート連盟の指導員が指導。小学生以上、月額¥8,800。通年開催。',
    classIds: ['ice-skating'],
    tag: '通年開催',
    points: [
      {
        title: '県連盟の指導員が教える',
        body: '石川県スケート連盟の指導員が担当します。自己流にならず、立ち方・止まり方から順に身につきます。',
      },
      {
        title: '冬だけじゃなく通年',
        body: '通年営業のリンクなので、季節に関係なく続けられます。夏に始めて冬に差をつけることもできます。',
      },
      {
        title: '土曜の午前中',
        body: '9:30〜11:30なので、午後の予定を空けたまま通えます。',
      },
    ],
    notice:
      'この教室は月会費のほかに会場使用料・レンタル靴代がかかります。また、無料体験の対象外です。',
  },
]

export function getCategory(slug: string): ClassCategory | undefined {
  return classCategories.find(c => c.slug === slug)
}

/** カテゴリに属する教室を other-classes.ts から取り出す（定義順を維持） */
export function getCategoryClasses(cat: ClassCategory): OtherClassData[] {
  return cat.classIds
    .map(id => otherClasses.find(c => c.id === id))
    .filter((c): c is OtherClassData => Boolean(c))
}

/** そのカテゴリが使っている会場（会場ページへの導線用） */
export function getCategoryVenues(cat: ClassCategory) {
  const ids = [...new Set(getCategoryClasses(cat).map(c => c.venueId).filter(Boolean))]
  return ids
    .map(id => venues.find(v => v.id === id))
    .filter((v): v is (typeof venues)[number] => Boolean(v))
}

/** 月会費の表示レンジ。全部同じなら1つだけ返す */
export function getCategoryPriceLabel(cat: ClassCategory): string {
  const prices = [...new Set(getCategoryClasses(cat).map(c => c.price))].sort((a, b) => a - b)
  if (prices.length === 0) return ''
  if (prices.length === 1) return `月額 ¥${prices[0].toLocaleString()}`
  return `月額 ¥${prices[0].toLocaleString()}〜¥${prices[prices.length - 1].toLocaleString()}`
}
