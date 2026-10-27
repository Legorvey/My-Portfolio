import Link from "next/link"
import { CursorBadge } from "@/components/hero/cursor-badge"
import { LocationTime } from "@/components/hero/location-time"

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex h-[calc(100vh-3rem)] min-h-[580px] max-h-[960px] w-full flex-col justify-between py-4 sm:py-8"
    >
      {/* Top Bar: Brand Mark (Left) & Location / Clock (Right) */}
      <header className="flex items-start justify-between gap-4">
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center font-mono text-xl sm:text-2xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>&lt;A&gt;</span>
        </Link>

        <LocationTime />
      </header>

      {/* Center Stage: Giant Display Headline & Cursor Tag */}
      <div className="my-auto py-8 sm:py-12">
        <div className="relative inline-block">
          {/* Floating Cursor Tag */}
          <div className="absolute -top-7 sm:-top-9 right-1 sm:right-4 md:right-8 z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CursorBadge label="Aditya" />
          </div>

          <h1
            id="hero-heading"
            className="font-sans text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] sm:leading-[0.92] select-none"
          >
            <span className="block">Hi there</span>
            <span className="block">
              I am Aditya<span className="text-primary font-bold">.</span>
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Bar: Status / University & Scroll Cue */}
      <footer className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-t border-border/40 pt-4 sm:pt-6">
        <div className="space-y-1 font-sans text-sm sm:text-base text-muted-foreground">
          <p>
            Designing stuff since{" "}
            <span className="font-medium text-foreground">2024</span>
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

        {/* Scroll Cue to Work */}
        <div>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>VIEW WORK</span>
            <span aria-hidden="true" className="text-primary">
              ↓
            </span>
          </a>
        </div>
      </footer>
    </section>
  )
}
