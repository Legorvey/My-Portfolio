"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ReactLenis, useLenis, type LenisRef } from "lenis/react"

function RouteScrollReset() {
  const pathname = usePathname()
  const lenis = useLenis()

  React.useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      lenis?.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  return null
}

export interface LenisProviderProps {
  children: React.ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = React.useRef<LenisRef>(null)

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        touchInertiaExponent: 1.7,
        anchors: true,
        respectReducedMotion: true,
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  )
}

export { useLenis }

