import { useEffect, useId, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined

type CaptchaWidgetProps = {
  onToken: (token: string) => void
  onExpire: () => void
}

// Provider-neutral on the server; this component is the one place that would change if the provider changes.
function CaptchaWidget({ onToken, onExpire }: CaptchaWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetId = useId()

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    let cancelled = false
    let renderedWidgetId: string | undefined

    function renderWidget() {
      if (cancelled || !window.turnstile || !containerRef.current) return
      renderedWidgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onToken,
        'expired-callback': onExpire,
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      const script = document.createElement('script')
      script.src = TURNSTILE_SCRIPT_SRC
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
      if (renderedWidgetId && window.turnstile) window.turnstile.remove(renderedWidgetId)
    }
  }, [onExpire, onToken])

  if (!siteKey) return null

  return <div ref={containerRef} className="captcha-widget" id={widgetId} />
}

export default CaptchaWidget
