'use client'

import { useEffect, useRef } from 'react'
import Header from '@/components/Header'

export default function TaikenPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data && e.data.type === 'stx-resize' && iframeRef.current) {
        iframeRef.current.style.height = e.data.height + 'px'
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <>
      <Header variant="rikujo" />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <iframe
          ref={iframeRef}
          src="https://startus-system.startus.workers.dev/taiken/"
          className="w-full border-none"
          style={{ minHeight: '800px', overflow: 'hidden' }}
          scrolling="no"
          loading="lazy"
          title="体験申込フォーム"
        />
      </main>
    </>
  )
}
