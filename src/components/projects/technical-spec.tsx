import type * as React from "react"
import { cn } from "@/lib/utils"

export interface TechnicalSpecEntry {
  label: string
  value: React.ReactNode
  mono?: boolean
}

export interface TechnicalSpecProps {
  title?: string
  items: readonly TechnicalSpecEntry[]
  columns?: 1 | 2
  className?: string
}

export function TechnicalSpec({
  title,
  items,
  columns = 2,
  className,
}: TechnicalSpecProps) {
  if (!items || items.length === 0) return null

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-sm border border-border bg-surface",
        className
      )}
    >
      {title && (
        <div className="border-b border-border bg-surface px-4 py-2.5">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </h4>
        </div>
      )}

      <dl
        className={cn(
          "divide-y divide-border bg-background",
          columns === 2 &&
            "sm:grid sm:grid-cols-2 sm:divide-y-0 sm:[&>div]:border-b sm:[&>div]:border-border sm:[&>div:nth-child(odd)]:border-r"
        )}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 px-4 py-3 sm:justify-between"
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {item.label}
            </dt>
            <dd
              className={cn(
                "text-sm text-foreground break-words",
                item.mono !== false && "font-mono text-xs"
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export { TechnicalSpec as KeyValueTable }
