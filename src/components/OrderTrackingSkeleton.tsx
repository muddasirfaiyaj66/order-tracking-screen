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
      <header className="border-b border-slate-200 bg-white">
        <div className="tracking-screen-gutter pt-4">
          <SkeletonBlock className="h-3 w-28" />
        </div>
        <div className="tracking-screen-gutter flex items-start gap-3 pt-3 pb-4">
          <SkeletonBlock className="size-14 shrink-0 rounded-xl min-[390px]:size-16 min-[390px]:rounded-2xl" />
          <div className="min-w-0 flex-1 space-y-2 pt-0.5">
            <SkeletonBlock className="h-5 w-24 rounded-full" />
            <SkeletonBlock className="h-4 w-full max-w-[210px]" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        </div>
      </header>

      <main className="tracking-screen-gutter flex flex-1 flex-col gap-3.5 py-4 min-[390px]:gap-4 min-[390px]:py-5">
        <section className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
          <SkeletonBlock className="h-3 w-32" />
          <SkeletonBlock className="mt-2.5 h-6 w-44" />
          <SkeletonBlock className="mt-2 h-3 w-32" />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 min-[390px]:p-5">
          <SkeletonBlock className="mb-4 h-3.5 w-32" />
          <div className="space-y-6">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex gap-3">
                <SkeletonBlock className="size-9 shrink-0 rounded-full min-[390px]:size-10" />
                <div className="flex-1 space-y-2 pt-1">
                  <SkeletonBlock className="h-3.5 w-28" />
                  <SkeletonBlock className="h-3 w-full max-w-[180px]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="tracking-screen-gutter mt-auto border-t border-slate-200 bg-white pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <SkeletonBlock className="h-11 w-full rounded-2xl" />
      </footer>

      <span className="sr-only">Loading order tracking details</span>
    </TrackingScreenFrame>
  )
}
