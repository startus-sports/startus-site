'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LINE_URL, NAV_ITEMS } from './site-links'
import { ArrowIcon, CloseIcon, GiftIcon, LineIcon } from './icons'

/**
 * トップページのヘッダーと特典の帯。
 * スマホでもヘッダーに「無料体験」を常に出す（画面下の追従バーはやめ、ここに一本化した）。
 */
export default function TopHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-star-sand">
        <div className="max-w-[1200px] mx-auto h-[60px] lg:h-[72px] pl-4 pr-2 lg:px-10 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-star-navy shrink-0">
            <Image src="/img/top/logo-mark.svg" alt="" width={36} height={36} className="w-[34px] h-[34px] lg:w-9 lg:h-9 rounded-[9px]" />
            <span className="flex flex-col leading-[1.15]">
              <span className="font-display font-extrabold text-[19px] lg:text-xl">STARTUS</span>
              <span className="text-[10px] font-bold text-star-sub">かなざわ総合スポーツクラブ</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-bold text-star-navy" aria-label="ページ内のメニュー">
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} className="hover:text-star-ink transition-colors">{item.label}</a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border-2 border-star-line text-star-line-text text-[13px] font-bold hover:bg-[#f0fbf4] transition-colors"
            >
              <LineIcon className="w-[18px] h-[18px] text-star-line" />LINEで相談
            </a>
            <Link
              href="/taiken"
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-star-deep text-white text-[13px] font-bold shadow-[0_3px_0_#8f3900] hover:brightness-110 transition"
            >
              無料体験を申し込む
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <Link href="/taiken" className="flex items-center h-9 px-3.5 rounded-full bg-star-navy text-white text-[13px] font-bold">
              無料体験
            </Link>
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="top-menu"
              aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
              className="w-11 h-11 flex items-center justify-center text-star-navy"
            >
              {open ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div id="top-menu" className="lg:hidden border-t border-star-sand bg-white px-5 pt-2 pb-5">
            <nav className="grid grid-cols-2 gap-x-4" aria-label="ページ内のメニュー">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-star-peach text-[15px] font-bold text-star-navy"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                href="/taiken"
                onClick={() => setOpen(false)}
                className="h-[52px] flex items-center justify-center gap-2 rounded-full bg-star-orange text-white font-display font-extrabold text-lg shadow-[0_4px_0_#b84a00]"
              >
                無料体験を申し込む<ArrowIcon className="w-5 h-5" />
              </Link>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 flex items-center justify-center gap-2 rounded-full border-2 border-star-line text-star-line-text font-bold"
              >
                <LineIcon className="w-[22px] h-[22px] text-star-line" />LINEで気軽に相談する
              </a>
            </div>
          </div>
        )}
      </header>

      <Link
        href="/taiken"
        data-ga-location="banner"
        className="flex items-center justify-center gap-1.5 h-10 bg-star-yellow text-star-navy text-[13px] lg:text-sm font-bold"
      >
        <GiftIcon />
        体験当日の入会で<span className="font-black">入会金0円</span>＋<span className="hidden sm:inline">オリジナル</span>Tシャツ<span className="hidden sm:inline">プレゼント</span>
      </Link>
    </>
  )
}
