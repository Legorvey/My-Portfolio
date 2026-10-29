"use client"

import Link from "next/link"
import * as React from "react"
import { LocationTime } from "@/components/layout/location-time"
import { cn } from "@/lib/utils"

function subscribeScroll(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  window.addEventListener("scroll", callback, { passive: true })
  return () => window.removeEventListener("scroll", callback)
}

function getScrollSnapshot(): boolean {
  if (typeof window === "undefined") return false
  return (window.scrollY || 0) > 20
}

function getScrollServerSnapshot(): boolean {
  return false
}

export function SiteHeader() {
  const isScrolled = React.useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300 ease-in-out",
        isScrolled
          ? "border-b border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent backdrop-blur-none"
      )}
    >
      <div className="flex w-full items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Brand Mark <A> */}
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex shrink-0 items-center font-mono text-xl sm:text-2xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>&lt;A&gt;</span>
        </Link>

        {/* Location & Time / Weather */}
        <LocationTime />
      </div>
    </header>
  )
}
