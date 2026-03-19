'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { trackClasses } from '@/lib/classes-data'

const steps = ['教室を選ぶ', 'お子様の情報', '保護者の情報', '確認']

export default function TaikenPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    classId: '',
    childName: '',
    childAge: '',
    childGrade: '',
    parentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
  })

  const selectedClass = trackClasses.find(c => c.id === form.classId)

  function update(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  if (submitted) {
    return (
      <>
        <Header variant="rikujo" />
        <main className="max-w-lg mx-auto px-5 py-16 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="none" stroke="#22C55E" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-display text-xl font-bold text-brand-navy mb-2">お申し込みありがとうございます</h1>
          <p className="text-sm text-gray-500 mb-6">3営業日以内にスタッフよりメールにてご連絡いたします。</p>
          <div className="bg-brand-orange-light border border-brand-orange/20 rounded-xl p-4 mb-6 text-sm">
            <p className="font-bold text-brand-orange mb-1">体験当日のご入会で入会金(¥5,500)が無料！</p>
            <p className="text-gray-500 text-xs">+ STARTUSオリジナルTシャツプレゼント</p>
          </div>

          {/* 当日の持ち物 */}
          <div className="bg-warm-50 border border-warm-200 rounded-xl p-4 mb-4 text-left">
            <div className="font-bold text-sm text-brand-navy mb-2">🎒 体験当日の持ち物</div>
            <ul className="text-sm text-gray-600 space-y-1.5">
              {[
                '運動できる服装（ジャージ・Tシャツ等）',
                '運動靴（外履き用）',
                '飲み物（水筒・ペットボトル）',
                'タオル',
                '着替え（必要に応じて）',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-orange mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 当日の流れ */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
            <div className="font-bold text-sm text-blue-700 mb-2">📋 体験当日の流れ</div>
            <ol className="text-sm text-blue-800 space-y-2">
              {[
                { time: '開始10分前', desc: '会場に到着・受付' },
                { time: '開始', desc: 'ウォーミングアップから一緒に参加' },
                { time: 'レッスン中', desc: '通常の教室に混ざって体験（約60分）' },
                { time: '終了後', desc: 'スタッフから入会のご案内（5分程度）' },
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
                  <div>
                    <span className="font-bold text-blue-700">{s.time}</span>
                    <span className="text-blue-600 ml-1">— {s.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Link href="/rikujo" className="btn-outline">陸上教室ページに戻る</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header variant="rikujo" />
      <main className="max-w-lg mx-auto px-5 py-8">
        <h1 className="font-display text-xl font-bold text-brand-navy text-center mb-2">無料体験に申し込む</h1>
        <p className="text-sm text-gray-500 text-center mb-6">3営業日以内にスタッフよりご連絡します</p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i <= step ? 'bg-brand-orange text-white' : 'bg-warm-100 text-gray-400'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] hidden sm:block ${i <= step ? 'text-brand-navy font-bold' : 'text-gray-400'}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="w-6 h-px bg-warm-200 mx-1" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select class */}
        {step === 0 && (
          <div className="space-y-3">
            <label className="block text-sm font-bold text-brand-navy mb-2">体験したい教室を選んでください</label>
            {trackClasses
              .filter(c => c.sport === 'track')
              .sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
              .map(cls => (
                <button
                  key={cls.id}
                  onClick={() => { update('classId', cls.id); setStep(1) }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    form.classId === cls.id
                      ? 'border-brand-orange bg-brand-orange-light'
                      : 'border-warm-200 bg-white hover:border-brand-orange hover:bg-warm-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-brand-navy">{cls.name}</span>
                        {cls.isPopular && (
                          <span className="text-[9px] bg-brand-orange/10 text-brand-orange font-bold px-1.5 py-0.5 rounded">人気No.1</span>
                        )}
                        {cls.isNew && (
                          <span className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded">NEW</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {cls.day} {cls.time} ｜ {cls.venue}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{cls.age} ｜ ¥{cls.price.toLocaleString()}/月</div>
                    </div>
                    <span className="text-brand-orange text-lg flex-shrink-0 ml-3">→</span>
                  </div>
                </button>
              ))}
          </div>
        )}

        {/* Step 2: Child info */}
        {step === 1 && (
          <div className="space-y-4">
            {selectedClass && (
              <div className="bg-brand-orange-light border border-brand-orange/20 rounded-xl p-3 mb-2">
                <div className="text-[10px] text-brand-orange font-bold">選択中の教室</div>
                <div className="text-sm font-bold text-brand-navy">{selectedClass.name}</div>
                <div className="text-xs text-gray-500">{selectedClass.day} {selectedClass.time} ｜ {selectedClass.venue}</div>
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-1">お子様のお名前 <span className="text-red-400 text-xs">必須</span></label>
              <input type="text" value={form.childName} onChange={e => update('childName', e.target.value)}
                className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                placeholder="スタータス 太郎" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-brand-navy mb-1">年齢</label>
                <input type="text" value={form.childAge} onChange={e => update('childAge', e.target.value)}
                  className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                  placeholder="8歳" />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-navy mb-1">学年 <span className="text-red-400 text-xs">必須</span></label>
                <select value={form.childGrade} onChange={e => update('childGrade', e.target.value)}
                  className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 bg-white">
                  <option value="">選択してください</option>
                  <option>年中</option><option>年長</option>
                  <option>小1</option><option>小2</option><option>小3</option>
                  <option>小4</option><option>小5</option><option>小6</option>
                  <option>中1</option><option>中2</option><option>中3</option>
                  <option>高校生以上</option><option>大人</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.childName || !form.childGrade}
              className="btn-primary w-full mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              次へ
            </button>
            <button onClick={() => setStep(0)} className="w-full text-sm text-gray-400 py-2 hover:text-brand-orange transition-colors">← 教室を選び直す</button>
          </div>
        )}

        {/* Step 3: Parent info */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-1">保護者のお名前 <span className="text-red-400 text-xs">必須</span></label>
              <input type="text" value={form.parentName} onChange={e => update('parentName', e.target.value)}
                className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                placeholder="スタータス 花子" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-1">メールアドレス <span className="text-red-400 text-xs">必須</span></label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-1">電話番号 <span className="text-red-400 text-xs">必須</span></label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                placeholder="090-1234-5678" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-1">体験希望日（任意）</label>
              <input type="text" value={form.preferredDate} onChange={e => update('preferredDate', e.target.value)}
                className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10"
                placeholder="例: 4月の水曜日希望" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-1">ご質問・ご要望（任意）</label>
              <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={3}
                className="w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 resize-none"
                placeholder="初心者ですが大丈夫でしょうか？ など" />
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!form.parentName || !form.email || !form.phone}
              className="btn-primary w-full mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              確認へ
            </button>
            <button onClick={() => setStep(1)} className="w-full text-sm text-gray-400 py-2 hover:text-brand-orange transition-colors">← 戻る</button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-warm-50 rounded-xl p-4 space-y-3 text-sm">
              <div className="pb-2 border-b border-warm-200">
                <span className="text-[10px] text-gray-400 block">教室</span>
                <span className="font-bold text-brand-navy">{selectedClass?.name}</span>
                <span className="text-xs text-gray-500 block">{selectedClass?.day} {selectedClass?.time} ｜ {selectedClass?.venue}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-[10px] text-gray-400 block">お子様</span><span className="font-bold">{form.childName}</span></div>
                <div><span className="text-[10px] text-gray-400 block">学年</span><span className="font-bold">{form.childGrade}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-[10px] text-gray-400 block">保護者</span><span className="font-bold">{form.parentName}</span></div>
                <div><span className="text-[10px] text-gray-400 block">電話</span><span>{form.phone}</span></div>
              </div>
              <div><span className="text-[10px] text-gray-400 block">メール</span><span>{form.email}</span></div>
              {form.preferredDate && <div><span className="text-[10px] text-gray-400 block">希望日</span><span>{form.preferredDate}</span></div>}
              {form.message && <div><span className="text-[10px] text-gray-400 block">メッセージ</span><span>{form.message}</span></div>}
            </div>

            <div className="bg-brand-orange-light border border-brand-orange/20 rounded-xl p-3 text-center text-sm">
              <span className="font-bold text-brand-orange">体験当日のご入会で入会金(¥5,500)が無料！</span>
              <br />
              <span className="text-xs text-gray-500">+ STARTUSオリジナルTシャツプレゼント</span>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="btn-primary w-full text-lg py-4"
            >
              この内容で申し込む
            </button>
            <p className="text-[10px] text-gray-400 text-center">※ 現在フロントエンドのみ。送信機能は後日実装予定。</p>
            <button onClick={() => setStep(2)} className="w-full text-sm text-gray-400 py-2 hover:text-brand-orange transition-colors">← 修正する</button>
          </div>
        )}
      </main>
    </>
  )
}
