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
      className={`mx-auto flex min-h-dvh w-full min-w-0 max-w-[430px] flex-col overflow-x-hidden bg-slate-50 text-[15px] text-slate-900 shadow-[0_0_0_1px_rgb(226_232_240)] sm:min-h-[100dvh] sm:shadow-lg ${className}`}
      aria-busy={ariaBusy}
      aria-live={ariaLive}
    >
      {children}
    </div>
  )
}
