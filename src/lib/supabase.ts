const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

export type Classroom = {
  name: string
  category: string
  display_order: number
  calendar_tag: string | null
}

export async function fetchClassrooms(): Promise<Classroom[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/classrooms?select=name,category,display_order,calendar_tag&is_active=eq.true&order=display_order.asc`,
    { headers }
  )
  if (!res.ok) throw new Error('教室リストの取得に失敗しました')
  return res.json()
}

export async function submitApplication(formData: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'return=minimal' },
    body: JSON.stringify({
      type: 'trial',
      status: 'pending',
      form_data: formData,
    }),
  })
  if (!res.ok) throw new Error('Supabase応答エラー: ' + res.status)
}

const EMAIL_API_URL = 'https://startus-system.startus.workers.dev/api/taiken/send-email'

export async function sendEmail(data: Record<string, string>) {
  const res = await fetch(EMAIL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (json.result !== 'success') throw new Error(json.message || 'メール送信エラー')
}

const GAS_URL = 'https://script.google.com/macros/s/AKfycby2ieStmgX-lpspafi0Co9nyBD96vgmx2O_Dxacp46b_e6WvOEZrOa4Jmqai_Uuk2L1/exec'

export type CalendarEvent = {
  dateStr: string
  title: string
  status: 'OK' | 'NG'
  reason?: string
}

export async function fetchCalendarDates(classId: string, className: string): Promise<CalendarEvent[]> {
  const url = `${GAS_URL}?action=getDates&classId=${encodeURIComponent(classId)}&className=${encodeURIComponent(className)}&t=${Date.now()}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data
}
