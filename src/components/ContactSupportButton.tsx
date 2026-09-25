interface ContactSupportButtonProps {
  onClick: () => void
  label?: string
  className?: string
}

export function ContactSupportButton({
  onClick,
  label = 'Contact Support',
  className = '',
}: ContactSupportButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`touch-target flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 min-[390px]:text-sm ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      {label}
    </button>
  )
}
