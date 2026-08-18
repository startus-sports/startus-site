import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import { trackClasses, venuesWithClasses } from '@/lib/classes-data'
import { otherClasses } from '@/lib/other-classes'

const SITE = 'https://startus-kanazawa.org'

export const metadata: Metadata = {
  title: '入会前によくある質問（料金・体験・対象年齢）',
  description:
    'STARTUS sports academy（NPO法人かなざわ総合スポーツクラブ）の入会前によくある質問。月会費・入会手数料・年度会費・スポーツ安全保険といった費用、無料体験の受け方、対象年齢、兄弟割引、教室の振替について、金沢市で教室を探している方向けにまとめました。',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: '入会前によくある質問 | STARTUS',
    description:
      '費用・無料体験・対象年齢・兄弟割引・振替について。金沢市のスポーツ教室選びの疑問にお答えします。',
    url: `${SITE}/faq`,
  },
}

const allClasses = [
  ...trackClasses.map(c => ({ price: c.price, age: c.age })),
  ...otherClasses.map(c => ({ price: c.price, age: c.age })),
]

const minPrice = Math.min(...allClasses.map(c => c.price))
const maxPrice = Math.max(...allClasses.map(c => c.price))

type Faq = { q: string; a: string }

const faqs: Faq[] = [
  {
    q: '月会費はいくらですか？',
    a: `教室によって異なり、月額${minPrice.toLocaleString()}円から${maxPrice.toLocaleString()}円です。かけっこ塾・陸上・バドミントンなど多くの教室は6,600円（税込）、インクルーシブ陸上と大人のマラソン塾は3,300円、キンボールスポーツは4,100円です。会場によっては別途施設使用料がかかる教室があります。`,
  },
  {
    q: '月会費のほかに費用はかかりますか？',
    a: '入会時に入会手数料5,500円、年度会費が5,500円／年かかります。あわせてスポーツ安全保険（800円〜2,000円／年、加入区分により異なります）にご加入いただきます。すべて税込です。チアリーディングはユニフォーム代、アイススケートはレンタル靴代など、教室固有の費用がかかる場合があります。',
  },
  {
    q: '兄弟で通うと割引はありますか？',
    a: '入会手数料は同一世帯の2人目以降が半額（2,750円）になります。教室によって兄弟割引の扱いが異なる場合があるため、詳しくはお問い合わせください。',
  },
  {
    q: '何歳から通えますか？',
    a: '教室によって異なります。年中・年長から参加できるのは、かけっこ塾（水）、陸上スポレク（キッズ）、キッズバレエ、キッズヒップホップ、キッズチアリーディング、キッズダンスです。小学生からの教室が最も多く、大人のマラソン塾やバドミントン（ビギナー）は中学生以上が対象です。',
  },
  {
    q: '運動が苦手でも大丈夫ですか？',
    a: '大丈夫です。学年や走力に応じてクラスを分けている教室が多く、初めての方も参加しています。まずは無料体験で雰囲気をご覧ください。',
  },
  {
    q: '無料体験はどう申し込みますか？',
    a: 'サイトの体験申込フォームからお申し込みいただけます。教室と希望日を選んで送信すると、担当から連絡いたします。体験は各教室1回まで無料です（アイススケート教室は対象外）。',
  },
  {
    q: '体験に必要な持ち物はありますか？',
    a: '動きやすい服装、運動できる靴、タオル、飲み物をご用意ください。教室によって指定がある場合は、申込後のご案内でお伝えします。',
  },
  {
    q: '入会するとお得になる特典はありますか？',
    a: '体験当日にご入会いただくと、入会手数料5,500円が無料になります。',
  },
  {
    q: '休んだ日の振替はできますか？',
    a: '振替申請フォームから、別の教室・日程への振替をお申し込みいただけます。欠席日から一定期間内での申請が必要で、教室によっては振替の対象外となる場合があります。',
  },
  {
    q: '年度の途中からでも入会できますか？',
    a: 'できます。多くの教室で随時受け付けています。ただし定員に達している教室はキャンセル待ちとなる場合があります。',
  },
  {
    q: 'どこで開催していますか？',
    a: `金沢市内の${venuesWithClasses().length}会場で開催しています。金沢市営陸上競技場、稲置学園総合運動場、石川県西部緑地公園陸上競技場、中村町小学校、健民スポレクプラザ、金沢市総合体育館などです。会場ごとの教室一覧もご覧いただけます。`,
  },
  {
    q: '障がいがあっても参加できますか？',
    a: 'インクルーシブ陸上、春風クラブ、ソーシャルフットボールは、障がいの有無にかかわらず参加できる教室です。ほかの教室についてもお気軽にご相談ください。',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="max-w-3xl mx-auto px-5 py-10">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-brand-orange">ホーム</Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-500">よくある質問</span>
        </nav>

        <p className="section-label">入会前のご不安に</p>
        <h1 className="font-display font-bold text-2xl text-brand-navy mb-2">
          よくある質問
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          費用・無料体験・対象年齢など、教室を検討されている段階でよくいただくご質問をまとめました。
          教室ごとの内容については、各教室の紹介ページにも質問コーナーがあります。
        </p>

        <div className="border-t border-warm-200">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border-b border-warm-200 py-5">
              <h2 className="font-bold text-brand-navy text-base mb-2">{q}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-warm-50 border border-warm-200 rounded-2xl p-6 text-center">
          <p className="font-bold text-brand-navy mb-1">解決しないことがあれば</p>
          <p className="text-sm text-gray-600 mb-4">
            公式LINEからお気軽にご質問いただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/taiken" className="btn-primary text-center">
              無料体験に申し込む
            </Link>
            <a
              href="https://lin.ee/BQKtTDq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-warm-200 text-brand-navy font-display font-bold rounded-full hover:bg-warm-50 transition-all"
            >
              LINEで質問する
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
