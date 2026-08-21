import { fetchClassrooms } from './supabase'

/**
 * 体験の受付状況（満員かどうか）を Supabase から取る。
 *
 * 背景:
 *   これまでサイト側は classes-data.ts の説明文に「満員」という文字が
 *   含まれるかどうかで判定していた。実際に 2026-08-21 時点で、
 *     - Supabase public_classrooms.trial_open … 30教室すべて true（受付中）
 *     - classes-data.ts の説明文             … かけっこ塾（水）は「満員」
 *   と食い違い、/taiken は申込を受け付ける一方で、教室ページの構造化データは
 *   Google に LimitedAvailability（売り切れ）を送っていた。
 *
 *   受付状況はスタッフが管理画面で動かす運用データなので、
 *   ハードコードではなく Supabase を唯一の情報源にする。
 *
 * 突き合わせ:
 *   public_classrooms 側は日本語の教室名しか持たず表記ゆれがあるため、
 *   ASCIIで安定している calendar_tag をキーにする。
 *   （教室を増やしたらここに1行足す。未登録の教室は「受付中」として扱うので、
 *     追加を忘れても表示が消えることはない）
 */

/** サイト側の教室id → Supabase public_classrooms.calendar_tag */
export const CALENDAR_TAGS: Record<string, string> = {
  // 陸上・マラソン
  'kakekko-wed': 'kakekojyuku-w-rikujo',
  'kakekko-monday': 'kakekojyuku-m-rikujo',
  'hashiri-juku': 'hashirijyuku-rikujo',
  'izumi-kids': 'izumi-k-rikujo',
  'izumi-junior': 'izumi-j-rikujo',
  'marathon-juku': 'marathonjyuku-rikujo',
  'otona-marathon': 'otonamarathon-rikujo',
  'inclusive-running': 'inclusive-rikujo',
  'shunpu': 'shunpu-rikujo',
  'rubugeru': 'rubugeru-rikujo',
  'seibu-kids': 'seibu-k-rikujo',
  'seibu-junior': 'seibu-j-rikujo',
  'sporec-kids': 'suporeku-k-rikujo',
  'sporec-junior': 'suporeku-j-rikujo',
  'nakamura-kakekko': 'nakamurakakeko-rikujo',
  'nakamura-marathon': 'nakamuramarathon-rikujo',
  // それ以外
  'badminton-takaodai-jr': 'badminton-takaodai-jr',
  'badminton-takaodai-bg': 'badminton-takaodai-bg',
  'badminton-ougidai': 'badminton-ougidai',
  'oyako-badminton': 'oyakobadminton',
  'tennis': 'tennis',
  'kinball': 'kinballsports',
  'ballet': 'ballet',
  'hiphop': 'hiphop',
  'cheer-izumino': 'cheer-f-izumino',
  'cheer-yonaizumi': 'cheer-w-yonaizumi',
  'kidsdance': 'kidsdance',
  'socialfootball': 'socialfootball',
  'ice-skating': 'ice-skating',
}

/** 教室id → 体験を受け付けているか。false のものだけを入れる */
export type TrialOpenMap = Record<string, boolean>

/**
 * 受付状況を取得する。取得に失敗したら空を返す＝全教室「受付中」扱い。
 * 満員表示が出ないだけで済み、教室そのものが消えることはない。
 */
export async function fetchTrialOpenMap(): Promise<TrialOpenMap> {
  try {
    const rooms = await fetchClassrooms()
    const byTag = new Map(rooms.map(r => [r.calendar_tag, r.trial_open]))

    const map: TrialOpenMap = {}
    for (const [classId, tag] of Object.entries(CALENDAR_TAGS)) {
      // 未設定(null/undefined)は受付中とみなす。明示的に false のときだけ満員
      if (byTag.get(tag) === false) map[classId] = false
    }
    return map
  } catch {
    return {}
  }
}

/** 未登録・取得失敗は「受付中」に倒す */
export function isTrialOpen(map: TrialOpenMap | undefined, classId: string): boolean {
  return map?.[classId] !== false
}
