import type { ReactNode } from 'react'

type StatusMessageProps = {
  tone: 'idle' | 'loading' | 'success' | 'error'
  children: ReactNode
}

function StatusMessage({ tone, children }: StatusMessageProps) {
  if (tone === 'idle') return null

  return (
    <p className={`status-message status-message--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </p>
  )
}

export default StatusMessage
