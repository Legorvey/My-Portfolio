"use client"

import * as React from "react"
import { ChevronDownIcon, ListTreeIcon } from "lucide-react"
import type { TocHeadingItem } from "@/lib/project-toc"
import { cn } from "@/lib/utils"

export interface ProjectTOCProps {
  items: readonly TocHeadingItem[]
  variant?: "desktop" | "mobile"
  className?: string
}

export function ProjectTOC({
  items,
  variant = "desktop",
  className,
}: ProjectTOCProps) {
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null
  )
  const detailsRef = React.useRef<HTMLDetailsElement>(null)

  React.useEffect(() => {
    if (!items || items.length < 2 || typeof window === "undefined") return

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headingElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          )

        if (visible.length > 0 && visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-88px 0px -65% 0px",
        threshold: [0, 1],
      }
    )

    for (const el of headingElements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (!items || items.length < 2) {
    return null
  }

  if (variant === "mobile") {
    return (
      <nav
        aria-label="On this page"
        className={cn(
          "rounded-sm border border-border bg-surface",
          className
        )}
      >
        <details ref={detailsRef} className="group">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              <ListTreeIcon
                className="size-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <span>On this page ({items.length})</span>
            </span>
            <ChevronDownIcon
              className="size-4 text-muted-foreground transition-transform duration-150 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <ol className="border-t border-border px-4 py-3 space-y-1.5">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <li
                  key={item.id}
                  className={cn(item.level === 3 && "pl-3.5")}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => {
                      if (detailsRef.current) {
                        detailsRef.current.open = false
                      }
                      setActiveId(item.id)
                    }}
                    className={cn(
                      "block rounded-sm py-1 font-sans text-xs leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              )
            })}
          </ol>
        </details>
      </nav>
    )
  }

  return (
    <nav aria-label="On this page" className={cn("space-y-2.5", className)}>
      <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </h2>

      <ol className="space-y-1 border-l border-border">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1 pr-2 font-sans text-xs leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring break-words",
                  item.level === 3 ? "pl-6" : "pl-3.5",
                  isActive
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
