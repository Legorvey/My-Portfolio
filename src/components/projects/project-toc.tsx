"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import {
  formatTocSectionNumbers,
  type TocHeadingItem,
} from "@/lib/project-toc"
import { cn } from "@/lib/utils"

export interface ProjectTOCProps {
  items: readonly TocHeadingItem[]
  variant?: "desktop" | "mobile"
  className?: string
}

const HEADER_SCROLL_OFFSET = 112
const BOTTOM_THRESHOLD_PX = 36
const CLICK_LOCK_DURATION_MS = 750

export function ProjectTOC({
  items,
  variant = "desktop",
  className,
}: ProjectTOCProps) {
  const numberedItems = React.useMemo(
    () => formatTocSectionNumbers(items),
    [items]
  )

  const [activeId, setActiveId] = React.useState<string | null>(
    numberedItems[0]?.id ?? null
  )
  const detailsRef = React.useRef<HTMLDetailsElement>(null)
  const clickLockRef = React.useRef<{ id: string; until: number } | null>(null)

  const handleSelectHeading = React.useCallback(
    (id: string, closeMobileDisclosure = false) => {
      clickLockRef.current = {
        id,
        until: Date.now() + CLICK_LOCK_DURATION_MS,
      }
      setActiveId(id)
      if (closeMobileDisclosure && detailsRef.current) {
        detailsRef.current.open = false
      }
    },
    []
  )

  React.useEffect(() => {
    if (!numberedItems || numberedItems.length === 0 || typeof window === "undefined") {
      return
    }

    const validIds = new Set(numberedItems.map((item) => item.id))

    const syncFromLocationHash = () => {
      const rawHash = window.location.hash.replace(/^#/, "")
      if (!rawHash) return false
      let decoded = rawHash
      try {
        decoded = decodeURIComponent(rawHash)
      } catch {
        decoded = rawHash
      }
      if (validIds.has(decoded)) {
        clickLockRef.current = {
          id: decoded,
          until: Date.now() + CLICK_LOCK_DURATION_MS,
        }
        setActiveId(decoded)
        return true
      }
      return false
    }

    // Initialize from URL hash if present on load/reload
    const hasHashMatch = syncFromLocationHash()

    if (numberedItems.length < 2) {
      if (!hasHashMatch) {
        setActiveId(numberedItems[0]?.id ?? null)
      }
      window.addEventListener("hashchange", syncFromLocationHash)
      return () => {
        window.removeEventListener("hashchange", syncFromLocationHash)
      }
    }

    const headingElements = numberedItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headingElements.length === 0) {
      if (!hasHashMatch) {
        setActiveId(numberedItems[0]?.id ?? null)
      }
      window.addEventListener("hashchange", syncFromLocationHash)
      return () => {
        window.removeEventListener("hashchange", syncFromLocationHash)
      }
    }

    const computeActiveByPosition = (): string | null => {
      const docEl = document.documentElement
      const scrollHeight = docEl.scrollHeight
      const clientHeight = window.innerHeight

      // When near the bottom of a scrollable document, highlight the final section
      if (
        scrollHeight > clientHeight + BOTTOM_THRESHOLD_PX &&
        clientHeight + Math.ceil(window.scrollY) >=
          scrollHeight - BOTTOM_THRESHOLD_PX
      ) {
        return headingElements[headingElements.length - 1]?.id ?? null
      }

      // Find the last heading whose top has crossed or reached the reading offset
      let candidateId: string | null = null
      for (const el of headingElements) {
        const top = el.getBoundingClientRect().top
        if (top <= HEADER_SCROLL_OFFSET) {
          candidateId = el.id
        } else {
          break
        }
      }

      return candidateId ?? headingElements[0]?.id ?? null
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          clickLockRef.current &&
          Date.now() < clickLockRef.current.until
        ) {
          return
        }

        // Check if DOM layout geometry is active (non-zero bounding rects or scrollHeight)
        const hasLayoutGeometry =
          document.documentElement.scrollHeight > 0 ||
          headingElements.some((el) => {
            const rect = el.getBoundingClientRect()
            return rect.top !== 0 || rect.bottom !== 0 || rect.height !== 0
          })

        if (hasLayoutGeometry) {
          const nextId = computeActiveByPosition()
          if (nextId) {
            setActiveId(nextId)
            return
          }
        }

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
        rootMargin: "-96px 0px -60% 0px",
        threshold: [0, 1],
      }
    )

    for (const el of headingElements) {
      observer.observe(el)
    }

    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        if (
          clickLockRef.current &&
          Date.now() < clickLockRef.current.until
        ) {
          return
        }
        const nextId = computeActiveByPosition()
        if (nextId) {
          setActiveId(nextId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("hashchange", syncFromLocationHash)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", syncFromLocationHash)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [numberedItems])

  if (!numberedItems || numberedItems.length === 0) {
    return null
  }

  if (variant === "mobile") {
    return (
      <nav
        aria-label="On this page"
        className={cn(
          "rounded-xl border border-border bg-surface",
          className
        )}
      >
        <details ref={detailsRef} className="group">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-4 py-3 font-sans text-sm font-medium text-foreground select-none transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <span>On this page</span>
            <ChevronDownIcon
              className="size-4 text-muted-foreground transition-transform duration-150 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <ol className="space-y-1 border-t border-border/80 px-4 py-3">
            {numberedItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <li
                  key={item.id}
                  className={cn(item.level === 3 && "pl-4")}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleSelectHeading(item.id, true)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "group/item -mx-1.5 flex items-baseline gap-2.5 rounded-md px-1.5 py-1.5 font-sans text-[13px] leading-snug transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0 font-mono text-[11px] leading-snug tabular-nums transition-colors",
                        item.level === 3
                          ? "min-w-[1.75rem]"
                          : "min-w-[1.25rem]",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground/75 group-hover/item:text-muted-foreground"
                      )}
                    >
                      {item.number}
                    </span>
                    <span className="min-w-0 flex-1 break-words">
                      {item.text}
                    </span>
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
    <nav
      aria-label="On this page"
      className={cn(
        "rounded-xl border border-border bg-surface p-4",
        className
      )}
    >
      <h2 className="font-sans text-sm font-medium text-foreground">
        On this page
      </h2>

      <ol className="mt-3 space-y-1 border-t border-border/80 pt-3">
        {numberedItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <li
              key={item.id}
              className={cn(item.level === 3 && "pl-4")}
            >
              <a
                href={`#${item.id}`}
                onClick={() => handleSelectHeading(item.id, false)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group -mx-1.5 flex items-baseline gap-2.5 rounded-md px-1.5 py-1 font-sans text-[13px] leading-snug transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "shrink-0 font-mono text-[11px] leading-snug tabular-nums transition-colors",
                    item.level === 3 ? "min-w-[1.75rem]" : "min-w-[1.25rem]",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground/75 group-hover:text-muted-foreground"
                  )}
                >
                  {item.number}
                </span>
                <span className="min-w-0 flex-1 break-words">
                  {item.text}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
