import Link from "next/link"
import { CursorBadge } from "@/components/hero/cursor-badge"
import { LocationTime } from "@/components/hero/location-time"

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex h-screen min-h-[100dvh] w-full flex-col justify-between p-6 sm:p-8 lg:p-10 select-none overflow-hidden"
    >
      {/* Top Bar: Brand Mark (Corner Left) & Location / Clock (Corner Right) */}
      <header className="flex w-full items-start justify-between">
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center font-mono text-xl sm:text-2xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>&lt;A&gt;</span>
        </Link>

        <LocationTime />
      </header>

      {/* Center Stage: Display Headline + Close Metadata Group */}
      <div className="my-auto flex w-full flex-col items-center justify-center">
        <div className="relative inline-flex flex-col items-start max-w-full">
          {/* Floating Cursor Tag with smooth looping lane motion */}
          <div className="absolute -top-7 sm:-top-9 right-1 sm:right-4 md:right-8 z-10">
            <CursorBadge label="Aditya" />
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-sans text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] sm:leading-[0.92]"
          >
            <span className="block">Hi there</span>
            <span className="block">
              I am Aditya<span className="text-primary font-bold">.</span>
            </span>
          </h1>

          {/* Close-standing Metadata (No divider line) */}
          <div className="mt-6 sm:mt-8 space-y-1.5 font-sans text-sm sm:text-base text-muted-foreground">
            <p>
              Designing stuff since{" "}
              <span className="font-semibold text-foreground">2024</span>
            </p>
            <p>
              Electrical Engineering Student at{" "}
              <a
                href="https://www.unpad.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>Padjadjaran University</span>
                <span
                  className="text-xs text-primary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Optical bottom counter-balance spacer */}
      <div className="invisible h-6 w-full" aria-hidden="true" />
    </section>
  )
}
