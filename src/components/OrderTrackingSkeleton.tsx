import { TrackingScreenFrame } from './TrackingScreenFrame'

function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/90 ${className}`}
      aria-hidden="true"
    />
  )
}

/** Loading placeholder that mirrors the tracking screen layout. */
export function OrderTrackingSkeleton() {
  return (
    <TrackingScreenFrame aria-busy={true} aria-live="polite">
      <header className="border-b border-slate-200/80 bg-white px-5 pt-5 pb-4">
        <SkeletonBlock className="h-3 w-28" />
        <div className="mt-3 flex items-start gap-3.5">
          <SkeletonBlock className="size-[72px] shrink-0 rounded-2xl" />
          <div className="min-w-0 flex-1 space-y-2.5 pt-0.5">
            <SkeletonBlock className="h-6 w-24 rounded-full" />
            <SkeletonBlock className="h-4 w-full max-w-[220px]" />
            <SkeletonBlock className="h-3.5 w-28" />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-5 py-5">
        <section className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm">
          <SkeletonBlock className="h-3 w-32" />
          <SkeletonBlock className="mt-3 h-7 w-48" />
          <SkeletonBlock className="mt-2 h-3.5 w-36" />
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <SkeletonBlock className="mb-5 h-4 w-36" />
          <div className="space-y-7">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex gap-3.5">
                <SkeletonBlock className="size-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2 pt-1.5">
                  <SkeletonBlock className="h-4 w-32" />
                  <SkeletonBlock className="h-3.5 w-full max-w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-slate-200/80 bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <SkeletonBlock className="h-12 w-full rounded-2xl" />
      </footer>

      <span className="sr-only">Loading order tracking details</span>
    </TrackingScreenFrame>
  )
}
