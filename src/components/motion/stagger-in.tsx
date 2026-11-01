"use client"

import { animate, createScope, stagger } from "animejs"
import * as React from "react"

interface StaggerInProps {
  children: React.ReactNode
  className?: string
  selector?: string
}

export function StaggerIn({
  children,
  className,
  selector = ":scope > *",
}: StaggerInProps) {
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

      animate(targets, {
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 360,
        delay: stagger(40),
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
