'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchClassrooms, submitApplication, sendEmail, type Classroom } from '@/lib/supabase'
import CalendarPicker from './CalendarPicker'

type ClassItem = { name: string; category: string; sort: number; id: string }

function toKatakana(str: string) {
  return str.replace(/[\u3041-\u3096]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  )
}

const ROUTES = ['友人・知人', 'ネット検索', 'HP', 'SNS', 'チラシ', 'その他']

export default function TaikenForm() {
  // --- State ---
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [classLoading, setClassLoading] = useState(true)
  const [selectedClassName, setSelectedClassName] = useState('')
  const [selectedClassId, setSelectedClassId] = useState('')

  const [nameSei, setNameSei] = useState('')
  const [nameMei, setNameMei] = useState('')
  const [kanaSei, setKanaSei] = useState('')
  const [kanaMei, setKanaMei] = useState('')
  const [sex, setSex] = useState('男性')
  const [age, setAge] = useState('')
  const [grade, setGrade] = useState('')
  const [school, setSchool] = useState('')
  const [guardian, setGuardian] = useState('')

  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')

  const [kiboubi, setKiboubi] = useState('')
  const [kibouUnknown, setKibouUnknown] = useState(false)
  const [omoi, setOmoi] = useState('')
  const [routes, setRoutes] = useState<string[]>([])
  const [routeDetail, setRouteDetail] = useState('')
  const [question, setQuestion] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const submitCountRef = useRef(0)
  const lastSubmitRef = useRef(0)
  const loadTimeRef = useRef(Date.now())

  // --- Load classrooms ---
  useEffect(() => {
    fetchClassrooms()
      .then((data: Classroom[]) => {
        setClasses(data.map(d => ({
          name: d.name,
          category: d.category,
          sort: d.display_order,
          id: d.calendar_tag || d.name,
        })))
      })
      .catch(err => console.error('教室リスト取得エラー:', err))
      .finally(() => setClassLoading(false))
  }, [])

  // --- Derived ---
  const rikujoClasses = classes.filter(c => c.category === '陸上・マラソン')

  const kanaPattern = /^[ァ-ヶー・\s\u3000]+$/

  // --- Handlers ---
  function handleKana(val: string, setter: (v: string) => void) {
    setter(toKatakana(val))
  }

  function handleClassSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const name = e.target.value
    setSelectedClassName(name)
    const opt = e.target.selectedOptions[0]
    setSelectedClassId(opt?.dataset.id || '')
    setKiboubi('')
  }

  function toggleRoute(r: string) {
    setRoutes(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError('')

    // Rate limiting
    const now = Date.now()
    if (submitCountRef.current >= 3) {
      setSubmitError('送信回数の上限に達しました。ページを再読み込みしてください。')
      return
    }
    if (now - lastSubmitRef.current < 30000) {
      setSubmitError('連続送信はできません。しばらくお待ちください。')
      return
    }

    // Timestamp check
    const elapsed = now - loadTimeRef.current
    if (elapsed < 3000 || elapsed > 1800000) {
      setSubmitError('セッションが無効です。ページを再読み込みしてください。')
      return
    }

    // Kana validation
    if ((kanaSei && !kanaPattern.test(kanaSei)) || (kanaMei && !kanaPattern.test(kanaMei))) {
      setSubmitError('フリガナはカタカナで入力してください。')
      return
    }

    // Date validation
    if (!kibouUnknown && !kiboubi) {
      setSubmitError('カレンダーから体験希望日を選択するか、「希望日が未定」にチェックを入れてください。')
      return
    }

    // Route validation
    if (routes.length === 0) {
      setSubmitError('ご存じになった経路を1つ以上選択してください。')
      return
    }

    lastSubmitRef.current = now
    submitCountRef.current++
    setSubmitting(true)

    const fullName = `${nameSei}\u3000${nameMei}`.trim()
    const fullKana = `${kanaSei}\u3000${kanaMei}`.trim()
    const gender = sex.replace('性', '')
    const routeStr = routes.join(', ')
    const dateValue = kibouUnknown ? '不明' : kiboubi

    try {
      await Promise.all([
        submitApplication({
          name: fullName,
          furigana: fullKana,
          gender,
          age,
          grade,
          school,
          guardian_name: guardian,
          phone: tel,
          email,
          desired_date: dateValue,
          desired_classes: selectedClassName ? [selectedClassName] : [],
          omoi,
          route: routeStr,
          route_detail: routeDetail,
          note: question,
        }),
        sendEmail({
          input2: selectedClassName,
          name_sei: nameSei,
          name_mei: nameMei,
          name1: fullName,
          kana_sei: kanaSei,
          kana_mei: kanaMei,
          name2: fullKana,
          sex1: sex,
          age1: age,
          year1: grade,
          school1: school,
          name3: guardian,
          tel1: tel,
          email1: email,
          kiboubi1: dateValue,
          omoi1: omoi,
          route: routeStr,
          text1: routeDetail,
          question1: question,
        }),
      ])
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('送信エラー:', err)
      setSubmitError('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  // ==================== Thanks Screen ====================
  if (submitted) {
    return (
      <div className="text-center animate-fadeIn">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" fill="none" stroke="#22C55E" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold text-brand-navy mb-2">送信完了</h2>
        <div className="text-left text-sm text-gray-600 leading-relaxed mb-6">
          お申し込みありがとうございます。<br />
          送信が正常に完了いたしました。<br />
          <span className="text-brand-orange font-bold">3営業日を目途に事務局から返信があります。</span><br /><br />
          ご入力いただいたメールアドレス宛に、自動返信メールをお送りしております。
          万が一届かない場合は、迷惑メールフォルダ等をご確認いただくか、事務局までご連絡ください。
        </div>

        <div className="border-2 border-dashed border-brand-orange rounded-xl p-5 bg-brand-orange-light mb-6">
          <div className="font-bold text-brand-orange mb-3 tracking-wide">＼ 体験後、そのまま入会するとお得！ ／</div>
          <ul className="text-left inline-block space-y-2">
            <li className="flex items-center text-sm font-bold text-brand-navy">
              <span className="mr-1.5">💰</span>入会金(5,500円相当) → <span className="ml-1 bg-gradient-to-t from-orange-200 to-transparent px-1">無料！</span>
            </li>
            <li className="flex items-center text-sm font-bold text-brand-navy">
              <span className="mr-1.5">👕</span>オリジナルTシャツ → <span className="ml-1 bg-gradient-to-t from-orange-200 to-transparent px-1">プレゼント！</span>
            </li>
          </ul>
          <div className="text-xs text-gray-500 mt-3">※体験日当日の23:59までに入会手続きを完了された方が対象です。</div>
        </div>

        <button onClick={() => location.reload()} className="btn-primary">
          新しい申込画面に戻る
        </button>
      </div>
    )
  }

  // ==================== Form ====================
  const inputClass = 'w-full border border-warm-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 bg-white'
  const labelClass = 'block text-sm font-bold text-brand-navy mb-1'
  const subLabelClass = 'block text-xs font-bold text-gray-500 mb-1 mt-3'
  const reqBadge = <span className="text-[10px] bg-brand-orange-light text-brand-orange font-bold px-1.5 py-0.5 rounded ml-1.5">必須</span>

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* ===== 1. 教室選択 ===== */}
      <section>
        <h3 className="text-sm font-bold text-brand-navy border-b-2 border-warm-200 pb-1 mb-3">
          1. 参加希望の教室 {reqBadge}
        </h3>

        {classLoading ? (
          <p className="text-xs text-gray-400">読み込み中...</p>
        ) : (
          <select
            className={inputClass}
            value={selectedClassName}
            onChange={handleClassSelect}
          >
            <option value="">▼ 教室を選んでください</option>
            {rikujoClasses.map(cls => (
              <option key={cls.id} value={cls.name} data-id={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        )}
      </section>

      {/* ===== 2. 参加者情報 ===== */}
      <section>
        <h3 className="text-sm font-bold text-brand-navy border-b-2 border-warm-200 pb-1 mb-3">
          2. 参加者ご本人について
        </h3>

        <div className={subLabelClass}>お名前 {reqBadge}</div>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" className={inputClass} placeholder="姓" value={nameSei}
            onChange={e => setNameSei(e.target.value)} required />
          <input type="text" className={inputClass} placeholder="名" value={nameMei}
            onChange={e => setNameMei(e.target.value)} required />
        </div>

        <div className={subLabelClass}>フリガナ {reqBadge}</div>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" className={inputClass} placeholder="セイ" value={kanaSei}
            onChange={e => handleKana(e.target.value, setKanaSei)} required />
          <input type="text" className={inputClass} placeholder="メイ" value={kanaMei}
            onChange={e => handleKana(e.target.value, setKanaMei)} required />
        </div>
        {((kanaSei && !kanaPattern.test(kanaSei)) || (kanaMei && !kanaPattern.test(kanaMei))) && (
          <p className="text-xs text-brand-orange mt-1">※カタカナで入力してください（ひらがなは自動変換されます）</p>
        )}

        <div className={subLabelClass}>性別 {reqBadge}</div>
        <div className="flex gap-3">
          {['男性', '女性'].map(s => (
            <label key={s} className={`flex-1 text-center py-2.5 rounded-xl border text-sm font-bold cursor-pointer transition-colors ${
              sex === s
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white text-gray-600 border-warm-200 hover:border-brand-orange'
            }`}>
              <input type="radio" name="sex" value={s} checked={sex === s}
                onChange={() => setSex(s)} className="hidden" />
              {s}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <div className={subLabelClass}>年齢 {reqBadge}</div>
            <input type="text" className={inputClass} placeholder="例：10" value={age}
              onChange={e => setAge(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric" required />
          </div>
          <div>
            <div className={subLabelClass}>学年</div>
            <input type="text" className={inputClass} placeholder="例：小学4年" value={grade}
              onChange={e => setGrade(e.target.value)} />
          </div>
        </div>

        <div className={subLabelClass}>学校名／園名</div>
        <input type="text" className={inputClass} value={school}
          onChange={e => setSchool(e.target.value)} />

        <div className={subLabelClass}>保護者氏名</div>
        <input type="text" className={inputClass} value={guardian}
          onChange={e => setGuardian(e.target.value)} />
      </section>

      {/* ===== 3. 連絡先 ===== */}
      <section>
        <h3 className="text-sm font-bold text-brand-navy border-b-2 border-warm-200 pb-1 mb-3">
          3. ご連絡先 {reqBadge}
        </h3>

        <div className={subLabelClass}>電話番号</div>
        <input type="tel" className={inputClass} placeholder="例：09012345678（ハイフンなし）"
          value={tel} onChange={e => setTel(e.target.value.replace(/[^0-9]/g, ''))}
          inputMode="numeric" required />

        <div className={subLabelClass}>メールアドレス</div>
        <input type="email" className={inputClass} placeholder="example@gmail.com"
          value={email} onChange={e => setEmail(e.target.value)} required />
        <p className="text-xs text-brand-orange mt-1">※このアドレスに連絡が届きます</p>
      </section>

      {/* ===== 4. アンケート ===== */}
      <section>
        <h3 className="text-sm font-bold text-brand-navy border-b-2 border-warm-200 pb-1 mb-3">
          4. アンケート・その他
        </h3>

        {/* 体験希望日 */}
        <div className={subLabelClass}>体験希望日 {reqBadge}</div>
        <label className="flex items-center gap-2 text-sm text-gray-600 font-bold mb-3 cursor-pointer">
          <input type="checkbox" checked={kibouUnknown}
            onChange={e => {
              setKibouUnknown(e.target.checked)
              if (e.target.checked) setKiboubi('')
            }}
            className="w-4 h-4 accent-brand-orange" />
          希望日が未定（不明）の場合はチェック
        </label>

        <CalendarPicker
          classId={selectedClassId}
          className={selectedClassName}
          value={kiboubi}
          onChange={setKiboubi}
          disabled={kibouUnknown}
        />

        {/* 教室に対する想い */}
        <div className={`${subLabelClass} mt-5`}>教室に対する想い {reqBadge}</div>
        <input type="text" className={inputClass} value={omoi}
          onChange={e => setOmoi(e.target.value)} required />

        {/* 経路 */}
        <div className={`${subLabelClass} mt-3`}>ご存じになった経路 {reqBadge}</div>
        <div className="flex flex-wrap gap-2">
          {ROUTES.map(r => (
            <label key={r} className={`px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
              routes.includes(r)
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white text-gray-600 border-warm-200 hover:border-brand-orange'
            }`}>
              <input type="checkbox" checked={routes.includes(r)}
                onChange={() => toggleRoute(r)} className="hidden" />
              {r}
            </label>
          ))}
        </div>

        <div className={`${subLabelClass} mt-3`}>その他の経路・詳細</div>
        <input type="text" className={inputClass} value={routeDetail}
          onChange={e => setRouteDetail(e.target.value)} />

        <div className={subLabelClass}>質問・報告事項等</div>
        <textarea className={`${inputClass} resize-none`} rows={4} value={question}
          onChange={e => setQuestion(e.target.value)} />
      </section>

      {/* ===== ポリシー ===== */}
      <div className="bg-warm-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed border border-warm-200">
        <p className="mb-2">
          <strong className="text-brand-orange">■個人情報の取り扱い</strong><br />
          ご記入いただいた内容は、お問合せにお答えするために利用いたします。
          詳しくは当クラブ「<a href="/privacy" target="_blank" className="text-brand-orange underline">個人情報保護方針</a>」をご覧ください。
        </p>
        <p>
          <strong className="text-brand-orange">■保険・保障について</strong><br />
          体験期間中はスポーツ安全保険が適用されません。
          万一の事故の際には、<strong className="text-brand-orange">応急処置以外の保障はできかねます</strong>のでご了承ください。
        </p>
      </div>

      {/* ===== エラー表示 ===== */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-bold">
          {submitError}
        </div>
      )}

      {/* ===== 送信ボタン ===== */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? '送信中...' : '上記に同意して送信する'}
      </button>
    </form>
  )
}
