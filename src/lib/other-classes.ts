import type { VenueId } from './classes-data'

/**
 * 陸上・マラソン以外の教室。
 *
 * trackClasses と分けているのは、/rikujo（陸上教室LP）が trackClasses を
 * そのまま使っているため。会場ページや一覧では両方をまとめて扱う。
 *
 * 出典:
 *   - 教室名・曜日・時間・月会費・指導者 … Supabase classrooms マスタ
 *   - 対象年齢 … kanazawa-ssc.jp の教室詳細ページ
 *     （マスタの target 列が全教室で空欄のため。2026-08-18 時点の内容）
 *
 * venueId は住所が分かっている会場にだけ設定する。
 * 高尾台中学校・扇台小学校・米泉小学校・金沢星稜大学サブアリーナ・
 * あめるんパークは住所データが無いため会場ページを作っていない。
 */
export type OtherClassData = {
  id: string
  name: string
  category: string
  venue: string
  venueId?: VenueId
  day: string
  time: string
  age: string
  price: number
  instructor: string
  /** 月会費以外にかかる費用など、料金の補足 */
  priceNote?: string
}

export const otherClasses: OtherClassData[] = [
  // ── バドミントン ──
  {
    id: 'badminton-takaodai-jr',
    name: 'バドミントン高尾台（ジュニア）',
    category: 'バドミントン',
    venue: '高尾台中学校',
    day: '土',
    time: '18:00〜19:30',
    age: '小学生以上',
    price: 6600,
    instructor: 'スタータスコーチ（現役選手）、竹井 早葉子',
  },
  {
    id: 'badminton-takaodai-bg',
    name: 'バドミントン高尾台（ビギナー）',
    category: 'バドミントン',
    venue: '高尾台中学校',
    day: '土',
    time: '19:30〜21:00',
    age: '中学生以上',
    price: 6600,
    instructor: 'スタータスコーチ（現役選手）、竹井 早葉子',
  },
  {
    id: 'badminton-ougidai',
    name: 'バドミントン扇台',
    category: 'バドミントン',
    venue: '扇台小学校 体育館',
    day: '木',
    time: '17:30〜19:00',
    age: '小学生以上',
    price: 6600,
    instructor: '坂井 彩',
  },
  {
    id: 'oyako-badminton',
    name: '親子バドミントン（日）高尾台',
    category: 'バドミントン',
    venue: '高尾台中学校',
    day: '日',
    time: '隔週 19:00〜20:30',
    age: '小学生以上の子と保護者',
    price: 6600,
    instructor: '竹井 早葉子 他',
  },

  // ── テニス ──
  {
    id: 'tennis',
    name: 'テニス塾',
    category: 'テニス',
    venue: '金沢星稜大学サブアリーナ',
    day: '水',
    time: '19:00〜20:30',
    age: '小学生〜中学生',
    price: 9900,
    instructor: '吉田 一宏、金沢星稜大学テニス部',
  },

  // ── キンボール ──
  {
    id: 'kinball',
    name: 'キンボールスポーツ',
    category: 'キンボールスポーツ',
    venue: '高尾台中学校 体育館',
    day: '日',
    time: '19:00〜21:00',
    age: '小学生以上',
    price: 4100,
    instructor: '田中 宏治',
  },

  // ── バレエ・ダンス・チア（金沢市総合体育館スタジオ） ──
  {
    id: 'ballet',
    name: 'キッズバレエ',
    category: 'バレエ・ダンス・チア',
    venue: '金沢市総合体育館 スタジオ',
    venueId: 'sogo',
    day: '金',
    time: '17:00〜18:00',
    age: '年中〜小学生',
    price: 6600,
    instructor: '髙島 怜美',
  },
  {
    id: 'hiphop',
    name: 'キッズヒップホップ',
    category: 'バレエ・ダンス・チア',
    venue: '金沢市総合体育館 スタジオ',
    venueId: 'sogo',
    day: '金',
    time: '18:00〜19:00',
    age: '年中〜小学生',
    price: 6600,
    instructor: '坂村 絵里',
  },
  {
    id: 'cheer-izumino',
    name: 'キッズチアリーディング（金）',
    category: 'バレエ・ダンス・チア',
    venue: '金沢市総合体育館 スタジオ',
    venueId: 'sogo',
    day: '金',
    time: '19:00〜20:00',
    age: '年中〜小学生',
    price: 6600,
    instructor: '前 ひとみ',
    priceNote: 'ほかにユニフォーム代（17,800円〜）',
  },
  {
    id: 'cheer-yonaizumi',
    name: 'キッズチアリーディング（水）米泉',
    category: 'バレエ・ダンス・チア',
    venue: '米泉小学校 体育館',
    day: '水',
    time: '19:00〜20:00',
    age: '年中〜小学生',
    price: 6600,
    instructor: '中塚 泰子',
    priceNote: 'ほかにユニフォーム代（17,800円〜）',
  },
  {
    id: 'kidsdance',
    name: 'キッズダンス',
    category: 'バレエ・ダンス・チア',
    venue: '金沢市総合体育館 スタジオ',
    venueId: 'sogo',
    day: '火',
    time: '18:00〜19:00',
    age: '年中〜小学校低学年',
    price: 6600,
    instructor: '坂村 絵里',
  },

  // ── その他 ──
  {
    id: 'socialfootball',
    name: 'ソーシャルフットボール（精神障がい者フットサル）',
    category: 'サッカー・フットボール',
    venue: 'あめるんパーク1F のびのび広場（全面人工芝）',
    day: '木',
    time: '17:00〜19:00',
    age: '小学生以上（障がいの有無を問わず参加できます）',
    price: 3300,
    instructor: '別宗 利哉 他',
    priceNote: 'スポット参加は1,500円／回',
  },
  {
    id: 'ice-skating',
    name: 'アイススケート教室',
    category: 'その他',
    venue: '健民スポレクプラザ スケートリンク',
    venueId: 'sporec',
    day: '土',
    time: '9:30〜11:30',
    age: '小学生以上',
    price: 8800,
    instructor: '石川県スケート連盟 指導員',
    priceNote: 'ほかに会場使用料・レンタル靴代。無料体験の対象外です',
  },
]
