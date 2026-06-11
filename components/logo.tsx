import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 12a8 8 0 0 1 16 0" />
          <path d="M12 4a8 8 0 0 0-8 8" />
          <path d="M12 20a8 8 0 0 0 8-8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      <div className="font-serif">
        <div className="text-secondary text-xl font-bold leading-tight">Drop</div>
        <div className="text-secondary text-xl font-bold leading-tight">Me</div>
      </div>
    </Link>
  )
}
