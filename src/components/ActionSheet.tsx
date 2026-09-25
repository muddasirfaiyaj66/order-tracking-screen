import { useEffect, useId, useRef, type ReactNode } from 'react'

interface ActionSheetProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}

/** Mobile bottom action sheet / modal overlay. */
export function ActionSheet({
  open,
  title,
  description,
  onClose,
  children,
}: ActionSheetProps) {
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="relative z-10 flex max-h-[min(92dvh,720px)] w-full max-w-[430px] flex-col rounded-t-3xl border border-slate-200 bg-white shadow-2xl outline-none sm:mx-4 sm:rounded-3xl"
      >
        <div className="flex justify-center pt-3 sm:hidden" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-slate-200" />
        </div>

        <div className="tracking-screen-gutter flex shrink-0 items-start justify-between gap-3 pt-3 pb-2">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-[15px] font-semibold tracking-tight text-slate-900 min-[390px]:text-base"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-1 truncate text-[13px] text-slate-500"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="tracking-screen-gutter min-h-0 flex-1 overflow-y-auto overscroll-contain pt-1 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>
  )
}
