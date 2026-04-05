'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header({ variant = 'main' }: { variant?: 'main' | 'rikujo' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href={variant === 'rikujo' ? '/rikujo' : '/'} className="flex items-center gap-1">
          <span className="font-display font-bold text-brand-orange text-base">STARTUS</span>
          <span className="font-display font-bold text-brand-navy text-sm">
            {variant === 'rikujo' ? '陸上教室' : 'sports academy'}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-brand-navy">
          {variant === 'rikujo' ? (
            <>
              <Link href="/rikujo#map" className="hover:text-brand-orange transition-colors">会場を探す</Link>
              <Link href="/rikujo#matrix" className="hover:text-brand-orange transition-colors">教室一覧</Link>
              <Link href="/rikujo#price" className="hover:text-brand-orange transition-colors">料金</Link>
              <Link href="/rikujo#faq" className="hover:text-brand-orange transition-colors">Q&A</Link>
            </>
          ) : (
            <>
              <Link href="/rikujo" className="hover:text-brand-orange transition-colors">陸上教室</Link>
              <Link href="/class" className="hover:text-brand-orange transition-colors">教室一覧</Link>
            </>
          )}
          <Link href="/taiken" className="btn-primary !py-2 !px-5 !text-sm">無料体験</Link>
        </nav>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/taiken" className="bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full">
            体験申込
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-brand-navy p-1"
            aria-label="メニュー"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-warm-200 bg-white px-4 py-3 space-y-3">
          {variant === 'rikujo' ? (
            <>
              <Link href="/rikujo#map" className="block text-sm text-brand-navy py-1" onClick={() => setMenuOpen(false)}>会場を探す</Link>
              <Link href="/rikujo#matrix" className="block text-sm text-brand-navy py-1" onClick={() => setMenuOpen(false)}>教室一覧</Link>
              <Link href="/rikujo#price" className="block text-sm text-brand-navy py-1" onClick={() => setMenuOpen(false)}>料金</Link>
              <Link href="/rikujo#faq" className="block text-sm text-brand-navy py-1" onClick={() => setMenuOpen(false)}>Q&A</Link>
            </>
          ) : (
            <>
              <Link href="/rikujo" className="block text-sm text-brand-navy py-1">陸上教室</Link>
              <Link href="/class" className="block text-sm text-brand-navy py-1">教室一覧</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
