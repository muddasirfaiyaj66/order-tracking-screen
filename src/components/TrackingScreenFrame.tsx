import type { ReactNode } from 'react'

interface TrackingScreenFrameProps {
  children: ReactNode
  className?: string
  'aria-busy'?: boolean
  'aria-live'?: 'off' | 'polite' | 'assertive'
}

/** Shared mobile frame (~360–430px) used by loading, error, and success views. */
export function TrackingScreenFrame({
  children,
  className = '',
  'aria-busy': ariaBusy,
  'aria-live': ariaLive,
}: TrackingScreenFrameProps) {
  return (
    <div
      className={`mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-slate-50 ${className}`}
      aria-busy={ariaBusy}
      aria-live={ariaLive}
    >
      {children}
    </div>
  )
}
