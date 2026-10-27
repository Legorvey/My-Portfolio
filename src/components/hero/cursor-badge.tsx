import { cn } from "cn"

interface CursorBadgeProps {
  label?: string
  className?: string
}

export function CursorBadge({
  label = "Aditya",
  className,
}: CursorBadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center select-none transition-transform duration-300 hover:scale-105",
        className
      )}
      aria-label={`Cursor indicator: ${label}`}
    >
      {/* Caret tail pointing down-left */}
      <svg
        className="absolute -bottom-2 left-0 h-2.5 w-2.5 text-primary fill-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <polygon points="0,10 10,0 0,0" />
      </svg>

      {/* Cursor label pill */}
      <span className="relative z-10 rounded-sm bg-primary px-2.5 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-primary-foreground shadow-sm">
        {label}
      </span>
    </div>
  )
}
