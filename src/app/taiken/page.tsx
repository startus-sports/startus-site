import type { Metadata } from 'next'
import Header from '@/components/Header'
import TaikenForm from './TaikenForm'

export const metadata: Metadata = {
  title: '体験申込フォーム | STARTUS sports academy',
  description: 'STARTUSの教室を無料で体験できます。体験後の当日入会で入会金無料＋Tシャツプレゼント！',
}

export default function TaikenPage() {
  return (
    <>
      <Header variant="rikujo" />
      <main className="max-w-lg mx-auto px-5 py-8">
        <h1 className="font-display text-xl font-bold text-brand-navy text-center mb-1">体験申込フォーム</h1>
        <p className="text-sm text-gray-400 text-center mb-8">以下の項目にご記入の上、送信してください。</p>
        <TaikenForm />
      </main>
    </>
  )
}
