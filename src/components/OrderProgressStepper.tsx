import type { OrderStatus } from '../types/order'

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
]

export type StepState = 'completed' | 'active' | 'upcoming'

export function getStepState(
  stepIndex: number,
  currentStatus: OrderStatus,
): StepState {
  const currentIndex = ORDER_STATUS_FLOW.indexOf(currentStatus)
  if (stepIndex < currentIndex) return 'completed'
  if (stepIndex === currentIndex) return 'active'
  return 'upcoming'
}

function ProcessingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  )
}

function ShippedIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}

function OutForDeliveryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function DeliveredIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

const STEP_META: Record<
  OrderStatus,
  { description: string; Icon: typeof ProcessingIcon }
> = {
  Processing: {
    description: 'Order confirmed and being prepared',
    Icon: ProcessingIcon,
  },
  Shipped: {
    description: 'Package left the warehouse',
    Icon: ShippedIcon,
  },
  'Out for Delivery': {
    description: 'Courier is on the way to you',
    Icon: OutForDeliveryIcon,
  },
  Delivered: {
    description: 'Package handed off successfully',
    Icon: DeliveredIcon,
  },
}

const STATE_STYLES: Record<
  StepState,
  {
    marker: string
    icon: string
    title: string
    description: string
    connector: string
  }
> = {
  completed: {
    marker: 'border-emerald-500 bg-emerald-500 text-white',
    icon: 'text-white',
    title: 'text-slate-900',
    description: 'text-slate-500',
    connector: 'bg-emerald-400',
  },
  active: {
    marker:
      'border-emerald-500 bg-white text-emerald-600 shadow-[0_0_0_3px_rgba(16,185,129,0.16)]',
    icon: 'text-emerald-600',
    title: 'text-slate-900',
    description: 'text-slate-600',
    connector: 'bg-slate-200',
  },
  upcoming: {
    marker: 'border-slate-200 bg-slate-50 text-slate-400',
    icon: 'text-slate-400',
    title: 'text-slate-400',
    description: 'text-slate-400',
    connector: 'bg-slate-200',
  },
}

interface OrderProgressStepperProps {
  currentStatus: OrderStatus
  className?: string
}

export function OrderProgressStepper({
  currentStatus,
  className = '',
}: OrderProgressStepperProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgb(15_23_42/0.04)] min-[390px]:p-5 ${className}`}
      aria-label="Order progress"
    >
      <h2 className="mb-4 text-[13px] font-semibold text-slate-900 min-[390px]:mb-5 min-[390px]:text-sm">
        Delivery progress
      </h2>

      <ol className="relative">
        {ORDER_STATUS_FLOW.map((status, index) => {
          const state = getStepState(index, currentStatus)
          const styles = STATE_STYLES[state]
          const { description, Icon } = STEP_META[status]
          const isLast = index === ORDER_STATUS_FLOW.length - 1

          return (
            <li
              key={status}
              className="relative flex gap-3 pb-6 last:pb-0 min-[390px]:gap-3.5 min-[390px]:pb-7"
            >
              {!isLast && (
                <span
                  className={`absolute top-9 left-[17px] h-[calc(100%-1.25rem)] w-0.5 min-[390px]:top-10 min-[390px]:left-[19px] min-[390px]:h-[calc(100%-1.5rem)] ${styles.connector}`}
                  aria-hidden="true"
                />
              )}

              <div
                className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 min-[390px]:size-10 ${styles.marker}`}
              >
                {state === 'completed' ? (
                  <CheckIcon className="size-4 min-[390px]:size-5" />
                ) : (
                  <Icon className={`size-4 min-[390px]:size-5 ${styles.icon}`} />
                )}
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <p className={`text-[13px] font-semibold min-[390px]:text-sm ${styles.title}`}>
                    {status}
                  </p>
                  {state === 'active' && (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-800 uppercase">
                      Current
                    </span>
                  )}
                </div>
                <p
                  className={`mt-0.5 text-[12px] leading-snug min-[390px]:text-[13px] ${styles.description}`}
                >
                  {description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
