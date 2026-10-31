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
  const timer = setInterval(() => {
    if (typeof document !== "undefined" && document.hidden) {
      return
    }
    callback()
  }, 30000)

  const handleVisibilityChange = () => {
    if (typeof document !== "undefined" && !document.hidden) {
      callback()
    }
  }

  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", handleVisibilityChange)
  }

  return () => {
    clearInterval(timer)
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }
}

export function LocationTime() {
  const [temp, setTemp] = React.useState<string>("24°C")
  const timeStr = React.useSyncExternalStore(
    subscribe,
    getBandungTime,
    getServerSnapshot
  )

  React.useEffect(() => {
    let isMounted = true

    fetch("/api/weather")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then((data: { temp?: string }) => {
        if (isMounted && data.temp) {
          setTemp(data.temp)
        }
      })
      .catch(() => {
        // Fallback remains 24°C
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="shrink-0 text-right font-sans text-xs sm:text-sm leading-snug">
      <div className="font-medium text-foreground">
        Based in Bandung, Indonesia
      </div>
      <div>
        <time className="font-mono text-xs text-muted-foreground">
          {timeStr} GMT+7 · {temp}
        </time>
      </div>
    </div>
  )
}
