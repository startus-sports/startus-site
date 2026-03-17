import { redirect } from 'next/navigation'

// Phase 1: 陸上LPが集客のメインエンジン
// Phase 2以降でクラブ全体のトップページを構築
export default function Home() {
  redirect('/rikujo')
}
