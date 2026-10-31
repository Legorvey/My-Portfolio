"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text string to render in both base and spotlight layers. */
  text?: string
  /** Custom children to render in both layers if text is not a simple string. */
  children?: React.ReactNode
  /** Shared styling applied to both text layers (sizing, tracking, leading). */
  textClassName?: string
  /** Classes specific to the base (unfocused/dim) text layer. */
  baseClassName?: string
  /** Inline style overrides for the base layer. */
  baseStyle?: React.CSSProperties
  /** Classes specific to the spotlight (illuminated/focused) text layer. */
  spotlightClassName?: string
  /** Inline style overrides for the spotlight layer. */
  spotlightStyle?: React.CSSProperties
  /** Radius of the spotlight beam in pixels (default: 160). */
  spotlightSize?: number
  /** Falloff/softness area in pixels or percent (default: 80). */
  spotlightArea?: number
  /** Optional custom RGB color string (e.g. "255, 255, 255") for glow or inline tint. */
  spotlightColor?: string
  /** Automatically sweep light on touch-only devices without fine cursor. */
  animateOnPhone?: boolean
}

function subscribeCoarsePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const media = window.matchMedia("(pointer: coarse)")
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}

function getCoarseSnapshot() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(pointer: coarse)").matches
}

function getCoarseServerSnapshot() {
  return false
}

export function TextSpotlight({
  text,
  children,
  className,
  textClassName,
  baseClassName = "text-muted-foreground/45",
  baseStyle,
  spotlightClassName = "text-foreground",
  spotlightStyle,
  spotlightSize = 160,
  spotlightArea = 70,
  spotlightColor,
  animateOnPhone = true,
  ...props
}: TextSpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  const isCoarsePointer = React.useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarseSnapshot,
    getCoarseServerSnapshot
  )

  const updatePosition = React.useCallback((x: number, y: number) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--spotlight-x", `${x}px`)
      containerRef.current.style.setProperty("--spotlight-y", `${y}px`)
    }
  }, [])

  // Autonomous sweep for mobile/touch screens when animateOnPhone is enabled
  React.useEffect(() => {
    if (!animateOnPhone || !isCoarsePointer) return

    let rafId: number
    let startTime: number | null = null
    const cycleDuration = 4800 // 4.8s sweep cycle

    const loop = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % cycleDuration) / cycleDuration
      // Sine wave oscillation back and forth across container width
      const width = containerRef.current?.clientWidth ?? 300
      const height = containerRef.current?.clientHeight ?? 80
      const norm = (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2

      updatePosition(norm * width, height / 2)

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [animateOnPhone, isCoarsePointer, updatePosition])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    updatePosition(e.clientX - rect.left, e.clientY - rect.top)
    if (!isHovered) {
      setIsHovered(true)
    }
  }

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(e)
    if (!isHovered) {
      setIsHovered(true)
    }
  }

  const handlePointerLeave = () => {
    if (!isCoarsePointer) {
      setIsHovered(false)
    }
  }

  const isSpotlightActive = isHovered || (Boolean(animateOnPhone) && isCoarsePointer)
  const content = text ?? children

  const maskStyle: React.CSSProperties = {
    maskImage: isSpotlightActive
      ? `radial-gradient(circle ${spotlightSize}px at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black ${spotlightArea}%, transparent 100%)`
      : "radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)",
    WebkitMaskImage: isSpotlightActive
      ? `radial-gradient(circle ${spotlightSize}px at var(--spotlight-x, 0px) var(--spotlight-y, 0px), black ${spotlightArea}%, transparent 100%)`
      : "radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)",
    color: spotlightColor ? `rgb(${spotlightColor})` : undefined,
    ...spotlightStyle,
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn("relative inline-block select-none cursor-default", className)}
      {...props}
    >
      {/* Base Layer: Dimmed or Wireframe Text */}
      <div
        className={cn("transition-colors duration-300", textClassName, baseClassName)}
        style={baseStyle}
      >
        {content}
      </div>

      {/* Spotlight Layer: Masked High-Contrast Illuminated Text */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 select-none transition-opacity duration-300",
          textClassName,
          spotlightClassName,
          isSpotlightActive ? "opacity-100" : "opacity-0"
        )}
        style={maskStyle}
      >
        {content}
      </div>
    </div>
  )
}
