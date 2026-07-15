import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'クラブについて | STARTUS sports academy',
  description: 'NPO法人かなざわ総合スポーツクラブSTARTUSの理念・ポリシー・沿革・会員数推移。スポーツの力で「元気とうるおいある生活」を創造します。',
  openGraph: {
    title: 'クラブについて | STARTUS',
    description: 'NPO法人かなざわ総合スポーツクラブSTARTUSの理念・ポリシー・沿革。',
    url: 'https://startus-kanazawa.org/about',
  },
}

const history = [
  { date: '2006年4月', event: '金沢市内の有志により設立準備委員会発足' },
  { date: '2008年3月', event: '設立総会' },
  { date: '2008年9月', event: 'NPO法人登記' },
  { date: '2009年6月', event: '事務所移転（金沢市泉本町）' },
  { date: '2017年4月', event: 'スタジオ運営（ジョイスタジオ）' },
  { date: '2018年1月', event: '事務所移転（金沢市中村町 VIDA金沢2階）' },
  { date: '2018年12月', event: '設立10周年イベント開催' },
]

// 年度末時点の定期教室会員数推移
const memberTrend = [
  { year: '2009', classes: 5, members: 134 },
  { year: '2010', classes: 5, members: 220 },
  { year: '2011', classes: 17, members: 304 },
  { year: '2012', classes: 15, members: 359 },
  { year: '2013', classes: 15, members: 315 },
  { year: '2014', classes: 17, members: 290 },
  { year: '2015', classes: 23, members: 382 },
  { year: '2016', classes: 23, members: 431 },
  { year: '2017', classes: 38, members: 493 },
  { year: '2018', classes: 33, members: 447 },
  { year: '2019', classes: 32, members: 459 },
  { year: '2020', classes: 35, members: 413 },
  { year: '2021', classes: 36, members: 260 },
  { year: '2022', classes: 38, members: 286 },
  { year: '2023', classes: 32, members: 304 },
  { year: '2024', classes: 30, members: 297 },
  { year: '2025', classes: 31, members: 347 },
]

const guidelines = [
  {
    num: '01',
    title: '楽しさの育成',
    desc: 'スポーツを始めるきっかけを提供し、楽しく通い続けられる場を創造します。',
  },
  {
    num: '02',
    title: '個々の成長重視',
    desc: '技術の育成はもちろん、一人ひとりの能力と個性を伸ばす指導を大切にします。',
  },
  {
    num: '03',
    title: '仲間づくりの場',
    desc: 'お互いに成長し合い、コミュニケーションを育む場を提供します。',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-navy to-brand-navy-light px-5 py-14 md:py-20 text-center relative overflow-hidden">
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full bg-brand-orange opacity-[0.08]" />
          <div className="absolute bottom-[-60px] left-[-30px] w-48 h-48 rounded-full bg-brand-orange opacity-[0.05]" />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-brand-orange text-xs font-bold tracking-widest mb-3">ABOUT US</p>
            <h1 className="font-display text-white text-2xl md:text-4xl font-bold mb-4">クラブについて</h1>
            <p className="text-white/60 text-sm leading-relaxed">
              NPO法人 かなざわ総合スポーツクラブ STARTUS（スタータス）
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-5 py-12 max-w-3xl mx-auto text-center">
          <p className="section-label">ミッション</p>
          <h2 className="font-display text-brand-navy text-xl md:text-2xl font-bold leading-relaxed mb-6">
            スポーツの力で、<br className="md:hidden" />
            「<span className="text-brand-orange">元気とうるおいある生活</span>」を創造する
          </h2>
          <p className="text-sm text-gray-600 leading-loose max-w-xl mx-auto">
            スポーツをしたい人に、気軽にできるスポーツの身近な機会を提供することで、
            一人ひとりの挑戦による達成感を感じる場と、仲間とともに目標に向かう楽しさをクリエイトし、
            小さな感動の連続と明日への活力をサポートする<span className="font-bold text-brand-navy">「スポーツ元気パートナー」</span>です。
          </p>
        </section>

        {/* Policy */}
        <section className="px-5 py-12 bg-warm-50">
          <div className="max-w-4xl mx-auto">
            <p className="section-label">私たちのポリシー</p>
            <h2 className="section-title mb-2">3つの指針</h2>
            <p className="text-sm text-gray-500 mb-8">
              元気の源は心と体から。スポーツは体だけでなく、心も健康にします。<br />
              「やりたい」という気持ちを「できる」という喜びへ。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {guidelines.map(({ num, title, desc }) => (
                <div key={num} className="bg-white rounded-2xl p-6 border border-warm-200">
                  <div className="font-display text-brand-orange/30 text-3xl font-bold mb-2">{num}</div>
                  <h3 className="font-bold text-brand-navy mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-brand-navy rounded-2xl p-6 md:p-8 text-center">
              <p className="text-white/50 text-xs mb-2">スローガン</p>
              <p className="font-display text-white text-lg md:text-xl font-bold leading-relaxed">
                一人ひとりが<br className="md:hidden" />
                「<span className="text-brand-orange">スポーツのチカラでかがやける</span>」ように
              </p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="px-5 py-12 max-w-3xl mx-auto">
          <p className="section-label">沿革</p>
          <h2 className="section-title mb-6">クラブの歩み</h2>
          <div className="relative">
            <div className="absolute left-[104px] top-0 bottom-0 w-0.5 bg-warm-200" />
            <div className="space-y-4">
              {history.map(({ date, event }) => (
                <div key={date + event} className="flex items-start gap-4">
                  <span className="w-24 text-right text-xs font-bold text-brand-orange flex-shrink-0 pt-0.5">{date}</span>
                  <div className="relative z-10">
                    <div className="w-3 h-3 rounded-full bg-brand-orange mt-0.5 ring-2 ring-white" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Member trend */}
        <section className="px-5 py-12 bg-warm-50">
          <div className="max-w-4xl mx-auto">
            <p className="section-label">データで見るSTARTUS</p>
            <h2 className="section-title mb-2">定期教室 会員数の推移</h2>
            <p className="text-sm text-gray-500 mb-6">年度末時点の教室数・会員数です。</p>

            <div className="bg-white rounded-2xl border border-warm-200 overflow-x-auto">
              <table className="w-full text-xs min-w-[560px]">
                <thead>
                  <tr className="bg-brand-navy text-white">
                    <th className="px-3 py-2.5 text-left font-bold">年度</th>
                    <th className="px-3 py-2.5 text-right font-bold">教室数</th>
                    <th className="px-3 py-2.5 text-right font-bold">会員数</th>
                    <th className="px-3 py-2.5 text-left font-bold w-1/2">推移</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-200">
                  {memberTrend.map(({ year, classes, members }) => (
                    <tr key={year} className={year === '2025' ? 'bg-brand-orange-light' : ''}>
                      <td className="px-3 py-2 font-bold text-brand-navy">{year}年度</td>
                      <td className="px-3 py-2 text-right text-gray-500">{classes}</td>
                      <td className="px-3 py-2 text-right font-bold text-brand-navy">{members}名</td>
                      <td className="px-3 py-2">
                        <div
                          className="h-2.5 rounded-full bg-brand-orange/70"
                          style={{ width: `${Math.round((members / 493) * 100)}%` }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Organization info */}
        <section className="px-5 py-12 max-w-3xl mx-auto">
          <p className="section-label">団体概要</p>
          <h2 className="section-title mb-6">組織情報</h2>
          <div className="bg-white border border-warm-200 rounded-2xl overflow-hidden text-sm divide-y divide-warm-200">
            {[
              { label: '団体名', value: '特定非営利活動法人 かなざわ総合スポーツクラブ（愛称: STARTUS／スタータス）' },
              { label: '設立', value: '2008年（設立総会 2008年3月・NPO法人登記 2008年9月）' },
              { label: '所在地', value: '〒921-8022 石川県金沢市中村町26-43 VIDA金沢2階' },
              { label: 'TEL / FAX', value: '076-287-3789（受付時間 10:00〜16:00）' },
              { label: 'メール', value: 'startus@startus-kanazawa.org' },
              { label: '事業内容', value: '子どもから大人までを対象とした約30のスポーツ定期教室の運営、イベント・短期教室の開催' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col md:flex-row md:items-start px-5 py-3.5 gap-1 md:gap-4">
                <span className="font-bold text-brand-navy md:w-28 flex-shrink-0">{label}</span>
                <span className="text-gray-600 leading-relaxed">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            ※ 貸借対照表などの情報公開資料・クラブ会報誌は、事務局までお問い合わせください。
          </p>
        </section>

        {/* CTA */}
        <section className="px-5 py-12 bg-warm-50 text-center">
          <h2 className="font-display text-brand-navy text-xl font-bold mb-3">まずは気軽に体験から</h2>
          <p className="text-sm text-gray-500 mb-6">各教室1回ずつ無料で体験できます。見学だけでも大歓迎です。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/taiken" className="btn-primary">無料体験に申し込む</Link>
            <Link href="/" className="btn-outline">トップページへ戻る</Link>
          </div>
        </section>

        {/* Simple footer */}
        <footer className="bg-brand-navy px-5 py-8 text-center">
          <p className="text-white/30 text-[10px] leading-relaxed mb-2">
            特定非営利活動法人 かなざわ総合スポーツクラブ<br />
            〒921-8022 金沢市中村町26-43 VIDA金沢2階 / TEL 076-287-3789
          </p>
          <p className="text-white/20 text-[10px]">
            <Link href="/tokushoho" className="hover:text-white/50 transition-colors">特定商取引法に基づく表記</Link>
          </p>
        </footer>
      </main>
    </>
  )
}
