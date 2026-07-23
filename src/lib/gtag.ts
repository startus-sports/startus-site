type GtagWindow = Window & {
  gtag?: (command: 'event', eventName: string, params?: Record<string, string>) => void
}

export function trackEvent(eventName: string, params?: Record<string, string>) {
  const w = window as GtagWindow
  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, params)
  }
}
