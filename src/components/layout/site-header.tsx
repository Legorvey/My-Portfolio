"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Container } from "@/components/layout/container"
import { MobileNav } from "@/components/layout/mobile-nav"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Contact", href: "/#contact" },
] as const

function subscribeScroll(callback: () => void): () => void {
  window.addEventListener("scroll", callback, { passive: true })
  return () => window.removeEventListener("scroll", callback)
}

function getScrollSnapshot(): boolean {
  return window.scrollY > 80
}

function getScrollServerSnapshot(): boolean {
  return false
}

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isScrolled = React.useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  )

  const isVisible = !isHome || isScrolled
  const positionClass = isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"

  return (
    <header
      className={`${positionClass} z-50 border-b border-border bg-background transition-transform duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Home"
            className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-sans font-semibold tracking-tight">Aditya Chandrasa</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-sm border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted-foreground sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-sm bg-primary" aria-hidden="true" />
            <span>Open to Engineering Roles</span>
          </div>
        </div>

        {/* Desktop navigation (>= sm) */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 sm:flex"
        >
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="h-4 w-px bg-border" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Legorvey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/adityachandrasa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              LinkedIn
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-foreground transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>Résumé</span>
              <span className="text-[10px] text-primary" aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>

        {/* Mobile navigation (< sm, including 360px) */}
        <MobileNav items={NAV_ITEMS} />
      </Container>
    </header>
  )
}
