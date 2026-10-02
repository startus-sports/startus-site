'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/gtag'
import { getAttribution } from '@/lib/attribution'
import { submitContact } from '@/lib/supabase'
import { LINE_URL, MAIL } from './site-links'
import { MailIcon } from './icons'

/**
 * メールフォームでの問い合わせ。トップの最後（まずは1回、あそびに来てね）の下に畳んで置く。
 * 以前は mailto: でメールアプリを開くだけで、送信の成否に関わらず完了画面を出していた
 * （＝届かない問い合わせがあった）。applications に直接保存する。
 */
export default function ContactPanel() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [body, setBody] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      await submitContact({ name, email, phone, body, source: 'home_contact_form', attribution: getAttribution() })
      trackEvent('contact_form_submit')
      setState('sent')
    } catch {
      // 保存に失敗したら黙って成功を装わず、LINE・メールの代替導線を出す
      setState('error')
    }
  }

  const input = 'w-full border-2 border-[#e1e6ec] rounded-xl px-3 py-2.5 text-base text-star-navy bg-white focus:outline-none focus:border-star-orange'

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 underline underline-offset-4 hover:text-white"
      >
        <MailIcon className="w-[18px] h-[18px]" />メールフォームで問い合わせる
      </button>
    )
  }

  return (
    <div className="w-full max-w-[560px] bg-white text-star-navy rounded-[20px] p-5 lg:p-6 text-left">
      <h3 className="font-display font-extrabold text-lg mb-3">メールフォーム</h3>
      {state === 'sent' ? (
        <div className="text-center py-6">
          <p className="font-bold">送信しました</p>
          <p className="text-[13px] text-star-sub mt-1 leading-relaxed">
            3営業日以内に事務局よりご連絡いたします。<br />お急ぎの場合は公式LINEへどうぞ。
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-xs font-bold">
            <span>お名前 <span className="text-star-deep">*</span></span>
            <input type="text" required autoComplete="name" value={name} onChange={e => setName(e.target.value)} className={input} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-bold">
            <span>メールアドレス <span className="text-star-deep">*</span></span>
            <input type="email" required autoComplete="email" inputMode="email" value={email} onChange={e => setEmail(e.target.value)} className={input} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-bold">
            <span>電話番号</span>
            <input type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)} className={input} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-bold">
            <span>お問い合わせ内容 <span className="text-star-deep">*</span></span>
            <textarea required rows={4} value={body} onChange={e => setBody(e.target.value)} className={`${input} resize-none`} />
          </label>

          {state === 'error' && (
            <p className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 leading-relaxed">
              送信に失敗しました。お手数ですが{' '}
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline">公式LINE</a>
              {' '}または{' '}
              <a href={`mailto:${MAIL}`} className="font-bold underline">メール</a>
              {' '}でご連絡ください。
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'sending'}
            className="h-12 rounded-full bg-star-deep text-white font-bold disabled:opacity-60"
          >
            {state === 'sending' ? '送信中…' : '送信する'}
          </button>
          <p className="text-xs text-star-sub text-center">3営業日以内に事務局よりご連絡いたします</p>
        </form>
      )}
    </div>
  )
}
