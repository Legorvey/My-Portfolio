"use client"

import * as React from "react"

const BASE_VISITOR_COUNT = 42892

function getVisitorSnapshot(): string {
  if (typeof window === "undefined") return String(BASE_VISITOR_COUNT)
  try {
    const val = localStorage.getItem("aditya_visitor_count")
    if (val) return val
    localStorage.setItem("aditya_visitor_count", String(BASE_VISITOR_COUNT))
    return String(BASE_VISITOR_COUNT)
  } catch {
    return String(BASE_VISITOR_COUNT)
  }
}

function getServerSnapshot(): string {
  return String(BASE_VISITOR_COUNT)
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

export function VisitorBadge() {
  const countStr = React.useSyncExternalStore(
    subscribe,
    getVisitorSnapshot,
    getServerSnapshot
  )

  const num = parseInt(countStr, 10)
  const formatted = isNaN(num) ? "42,892" : num.toLocaleString()

  return (
    <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted-foreground">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">Visitor</span>
      <span className="font-semibold text-primary">#{formatted}</span>
    </div>
  )
}
