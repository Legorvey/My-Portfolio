"use client"

import * as React from "react"

function getBandungTime(): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date())
  } catch {
    return "13:30"
  }
}

function getServerSnapshot(): string {
  return "13:30"
}

function subscribe(callback: () => void): () => void {
  const timer = setInterval(callback, 30000)
  return () => clearInterval(timer)
}

export function LocationTime() {
  const timeStr = React.useSyncExternalStore(
    subscribe,
    getBandungTime,
    getServerSnapshot
  )

  return (
    <div className="shrink-0 text-right font-sans text-xs sm:text-sm leading-snug">
      <div className="font-medium text-foreground">
        Based in Bandung, Indonesia
      </div>
      <div>
        <time className="font-mono text-xs text-muted-foreground">
          {timeStr} GMT+7 · 24°C
        </time>
      </div>
    </div>
  )
}
