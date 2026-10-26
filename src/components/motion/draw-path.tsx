"use client"

import { animate, createScope, svg } from "animejs"
import * as React from "react"

interface DrawPathProps {
  children: React.ReactNode
  className?: string
  selector?: string
}

export function DrawPath({
  children,
  className,
  selector = "path, line, polyline, polygon, rect, circle",
}: DrawPathProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = rootRef.current
    if (!element) return

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const scope = createScope({ root: element }).add(() => {
      const targets = element.querySelectorAll(selector)
      if (targets.length === 0) return

      const drawables = svg.createDrawable(targets)
      if (drawables.length === 0) return

      animate(drawables, {
        draw: ["0 0", "0 1"],
        duration: 480,
        ease: "outQuad",
      })
    })

    return () => {
      scope.revert()
    }
  }, [selector])

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  )
}
