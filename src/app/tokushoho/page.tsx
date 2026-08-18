import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'

export const metadata: Metadata = {
  alternates: { canonical: '/tokushoho' },
  title: '特定商取引法に基づく表記 | STARTUS sports academy',
  description: 'NPO法人かなざわ総合スポーツクラブSTARTUSの特定商取引法に基づく表記。',
  robots: { index: true },
}

const items = [
  { label: '販売業者', value: '特定非営利活動法人 かなざわ総合スポーツクラブ' },
  { label: '運営統括責任者', value: '竹井 早葉子' },
  { label: '所在地', value: '〒921-8022 石川県金沢市中村町26-43 VIDA金沢2階' },
  { label: '電話番号', value: '076-287-3789（受付時間 10:00〜16:00）' },
  { label: 'メールアドレス', value: 'startus@startus-kanazawa.org' },
  { label: '販売価格', value: '各教室・イベントの案内ページに記載しています。' },
  {
    label: '商品代金以外の必要料金',
    value: '銀行振込手数料、年度会費、入会手数料、スポーツ安全保険料（年額）、会場利用料（一部教室）',
  },
  {
    label: 'お支払い方法',
    value: 'クレジットカード決済（Stripe・Square）、銀行振込、口座振替、現金',
  },
  {
    label: 'サービスの提供時期',
    value: '決済完了後、事務局にて確認のうえ受講資格を付与いたします。',
  },
  {
    label: '返金・キャンセルについて',
    value:
      'サービスの性質上、決済完了後の返金は原則としてお受けしておりません。退会をご希望の場合は、前月の所定期日までに事務局へご連絡ください。',
  },
]

export default function TokushohoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="px-5 py-12 max-w-3xl mx-auto">
          <p className="section-label">法定表記</p>
          <h1 className="section-title mb-6">特定商取引法に基づく表記</h1>

          <div className="bg-white border border-warm-200 rounded-2xl overflow-hidden text-sm divide-y divide-warm-200">
            {items.map(({ label, value }) => (
              <div key={label} className="flex flex-col md:flex-row md:items-start px-5 py-3.5 gap-1 md:gap-4">
                <span className="font-bold text-brand-navy md:w-44 flex-shrink-0">{label}</span>
                <span className="text-gray-600 leading-relaxed">{value}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            上記に記載のない事項については、お取引の際に事務局までお問い合わせいただければ遅滞なく開示いたします。
          </p>

          <div className="mt-8 text-center">
            <Link href="/" className="btn-outline">トップページへ戻る</Link>
          </div>
        </section>

        <footer className="bg-brand-navy px-5 py-8 text-center">
          <p className="text-white/30 text-[10px] leading-relaxed">
            特定非営利活動法人 かなざわ総合スポーツクラブ<br />
            〒921-8022 金沢市中村町26-43 VIDA金沢2階 / TEL 076-287-3789
          </p>
        </footer>
      </main>
    </>
  )
}
