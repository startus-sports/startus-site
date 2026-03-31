'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchCalendarDates, type CalendarEvent } from '@/lib/supabase'

type ParsedEvent = CalendarEvent & {
  dateKey: string
  year: number
  month: number
  day: number
}

type Props = {
  classId: string
  className: string
  value: string
  onChange: (dateStr: string) => void
  disabled?: boolean
}

const DOWS = ['日', '月', '火', '水', '木', '金', '土']

export default function CalendarPicker({ classId, className, value, onChange, disabled }: Props) {
  const [events, setEvents] = useState<ParsedEvent[]>([])
  const [months, setMonths] = useState<Date[]>([])
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [detailDate, setDetailDate] = useState('')

  const load = useCallback(async () => {
    if (!classId || !className) return
    setLoading(true)
    setError('')
    setEvents([])
    onChange('')
    setDetailDate('')

    try {
      const data = await fetchCalendarDates(classId, className)
      if (!data || data.length === 0) {
        setError('直近2ヶ月で体験可能な日程が見つかりませんでした。')
        return
      }

      const parsed: ParsedEvent[] = data.map(item => {
        const m = item.dateStr.match(/(\d{4})\/(\d{2})\/(\d{2})/)
        return {
          ...item,
          dateKey: m ? `${m[1]}-${m[2]}-${m[3]}` : '',
          year: m ? parseInt(m[1]) : 0,
          month: m ? parseInt(m[2]) - 1 : 0,
          day: m ? parseInt(m[3]) : 0,
        }
      })
      setEvents(parsed)

      const monthSet = new Map<string, Date>()
      parsed.forEach(ev => {
        const key = `${ev.year}-${ev.month}`
        if (!monthSet.has(key)) monthSet.set(key, new Date(ev.year, ev.month, 1))
      })
      const sorted = [...monthSet.values()].sort((a, b) => a.getTime() - b.getTime())
      setMonths(sorted)
      if (sorted.length > 0) setCurrentMonth(sorted[0])
    } catch (err) {
      setError('日程の取得に失敗しました。時間をおいてお試しください。')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [classId, className, onChange])

  useEffect(() => { load() }, [load])

  if (!classId || !className) {
    return (
      <p className="text-sm text-gray-400">上の「1. 参加希望の教室」を選択すると、ここに候補日が表示されます。</p>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-4 text-brand-orange text-sm border border-warm-200 rounded-xl bg-white">
        カレンダーを確認中...
      </div>
    )
  }

  if (error) {
    return <p className="text-sm text-gray-500">{error}</p>
  }

  if (!currentMonth || events.length === 0) return null

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const monthIdx = months.findIndex(m => m.getTime() === currentMonth.getTime())

  // Group events by date
  const eventsByDate = new Map<string, ParsedEvent[]>()
  events.forEach(ev => {
    if (ev.year === year && ev.month === month) {
      const list = eventsByDate.get(ev.dateKey) || []
      list.push(ev)
      eventsByDate.set(ev.dateKey, list)
    }
  })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const detailEvents = detailDate
    ? events.filter(ev => ev.dateKey === detailDate && ev.year === year && ev.month === month)
    : []

  return (
    <div className={`border border-warm-200 rounded-xl bg-white overflow-hidden ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-warm-50 border-b border-warm-200">
        <button
          type="button"
          disabled={monthIdx <= 0}
          onClick={() => setCurrentMonth(months[monthIdx - 1])}
          className="px-3 py-1 border border-warm-200 rounded-lg text-sm disabled:opacity-30"
        >
          &lt;
        </button>
        <span className="font-bold text-brand-navy">{year}年 {month + 1}月</span>
        <button
          type="button"
          disabled={monthIdx >= months.length - 1}
          onClick={() => setCurrentMonth(months[monthIdx + 1])}
          className="px-3 py-1 border border-warm-200 rounded-lg text-sm disabled:opacity-30"
        >
          &gt;
        </button>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 py-2 bg-warm-50 border-b border-warm-200 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" /> 体験OK
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> 受付なし
        </span>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 text-center text-xs">
        {DOWS.map((d, i) => (
          <div key={d} className={`py-2 font-bold ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'}`}>
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1
          const dow = (firstDay + d - 1) % 7
          const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
          const dayEvents = eventsByDate.get(dateKey) || []
          const hasOk = dayEvents.some(e => e.status === 'OK')
          const hasNg = dayEvents.some(e => e.status === 'NG')
          const isSelected = hasOk && dayEvents.some(e => e.status === 'OK' && e.dateStr === value)

          return (
            <div
              key={d}
              onClick={() => {
                if (dayEvents.length > 0 && !disabled) setDetailDate(dateKey)
              }}
              className={`py-1.5 flex flex-col items-center gap-0.5 ${
                dayEvents.length > 0 ? 'cursor-pointer' : ''
              } ${dow === 0 ? 'text-red-400' : dow === 6 ? 'text-blue-400' : 'text-gray-600'}`}
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                isSelected
                  ? 'bg-brand-orange text-white shadow-md ring-2 ring-brand-orange/30'
                  : hasOk
                    ? 'bg-brand-orange text-white hover:bg-brand-orange/80'
                    : hasNg
                      ? 'bg-gray-200 text-gray-400'
                      : ''
              }`}>
                {d}
              </span>
              {(hasOk || hasNg) && (
                <span className={`w-1.5 h-1.5 rounded-full ${hasOk ? 'bg-brand-orange' : 'bg-gray-300'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Detail panel */}
      {detailEvents.length > 0 && (
        <div className="border-t border-warm-200 bg-warm-50 p-3">
          <div className="text-sm font-bold text-brand-navy mb-2">
            {(() => {
              const p = detailDate.split('-')
              const dateObj = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]))
              return `${parseInt(p[1])}月${parseInt(p[2])}日（${DOWS[dateObj.getDay()]}）の日程`
            })()}
          </div>
          <ul className="space-y-1.5">
            {detailEvents.map((ev, i) => {
              const timeMatch = ev.dateStr.match(/\d{2}:\d{2}$/)
              const timeStr = timeMatch ? timeMatch[0] : ''
              const isChosen = ev.dateStr === value && ev.status === 'OK'

              return (
                <li
                  key={i}
                  onClick={() => {
                    if (ev.status === 'OK' && !disabled) onChange(ev.dateStr)
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    ev.status === 'OK'
                      ? isChosen
                        ? 'bg-brand-orange text-white border-brand-orange cursor-pointer'
                        : 'bg-white border-l-[3px] border-l-brand-orange border-warm-200 cursor-pointer hover:bg-brand-orange-light'
                      : 'bg-white border-l-[3px] border-l-gray-300 border-warm-200 opacity-60'
                  }`}
                >
                  <div>
                    <div className={`text-sm font-bold ${isChosen ? 'text-white' : ev.status === 'OK' ? 'text-brand-navy' : 'text-gray-400'}`}>
                      {ev.title}
                    </div>
                    <div className={`text-xs ${isChosen ? 'text-white/80' : 'text-gray-400'}`}>{timeStr}</div>
                  </div>
                  {ev.status === 'OK' ? (
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      isChosen ? 'bg-white/25 text-white' : 'bg-brand-orange-light text-brand-orange'
                    }`}>
                      {isChosen ? '✓ 選択中' : '選択'}
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-400">
                      {ev.reason || 'NG'}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
