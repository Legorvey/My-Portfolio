"use client"

import Link from "next/link"
import * as React from "react"

interface NavItem {
  readonly label: string
  readonly href: string
}

interface MobileNavProps {
  items: readonly NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-9 items-center justify-center rounded-sm border border-border bg-surface px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <nav
          id="mobile-navigation-panel"
          aria-label="Mobile navigation"
          className="absolute right-0 left-0 top-full z-40 border-b border-border bg-background px-4 py-4"
        >
          <ul className="flex flex-col space-y-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block font-mono text-xs font-medium uppercase tracking-wider text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <a
              href="https://github.com/Legorvey"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/adityachandrasa"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              LinkedIn
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 items-center rounded-sm border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Résumé ↗
            </a>
          </div>
        </nav>
      )}
    </div>
  )
}
