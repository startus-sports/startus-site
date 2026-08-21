import { testimonials } from '@/lib/classes-data'

/**
 * 保護者の声。
 *
 * データは classes-data.ts の testimonials にあったが /rikujo でしか使っておらず、
 * トップページには信頼形成のパーツが1つも無かったので共通化して両方から使う。
 */
export default function ParentVoices({ className = '' }: { className?: string }) {
  return (
    <section className={`px-5 py-12 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <p className="section-label">保護者の声</p>
        <h2 className="section-title mb-6">「通わせてよかった」</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white rounded-2xl p-5 border border-warm-200 relative">
              <span className="absolute top-3 left-4 text-5xl text-brand-orange/15 font-display font-bold leading-none select-none">
                &ldquo;
              </span>

              <p className="text-sm text-brand-navy leading-relaxed mt-5 mb-4 relative">
                {t.quote}
              </p>

              <div className="border-t border-warm-200 pt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="10" cy="7" r="3" />
                    <path d="M4 17c0-3 2-5 6-5s6 2 6 5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-navy">{t.parent}</div>
                  <div className="text-xs text-gray-500">{t.classRef}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
