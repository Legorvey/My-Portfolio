"use client"

import * as React from "react"

export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
      aria-label="Scroll back to top"
    >
      <span>Back to top</span>
      <span
        className="transition-transform duration-200 group-hover:-translate-y-0.5 text-primary"
        aria-hidden="true"
      >
        ↑
      </span>
    </button>
  )
}
