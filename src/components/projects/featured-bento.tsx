import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import type { ProjectFrontmatter } from "@/lib/content"

export interface FeaturedBentoProject extends ProjectFrontmatter {
  dims?: { width: number; height: number } | null
}

interface FeaturedBentoProps {
  projects: FeaturedBentoProject[]
}

const FEATURED_SLOT_PRIORITY: readonly string[] = [
  "gardapati",
  "motosense",
  "aquafeeder",
  "pid-control-simulator",
  "pln-thermography-internship",
]

function MotosenseVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between p-2.5">
      <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        ADXL345 · I2C
      </span>
      <svg
        viewBox="0 0 120 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-full stroke-primary/80"
        aria-hidden="true"
      >
        <path
          d="M0 24h20l4-8 4 16 6-22 6 26 6-18 6 12 4-6h44"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex items-center justify-between font-mono text-[8px] text-muted-foreground/60">
        <span>VIB_HZ</span>
        <span className="text-primary font-bold">2.4g PK</span>
      </div>
    </div>
  )
}

function PidVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between p-2.5">
      <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        SITL · STEP
      </span>
      <svg
        viewBox="0 0 120 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-full"
        aria-hidden="true"
      >
        {/* Setpoint dotted line */}
        <line
          x1="0"
          y1="14"
          x2="120"
          y2="14"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
          className="stroke-muted-foreground/40"
        />
        {/* Underdamped PID step response curve */}
        <path
          d="M0 44 C20 44 26 6 42 6 C56 6 62 18 78 18 C92 18 100 14 120 14"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="stroke-primary/80"
        />
      </svg>
      <div className="flex items-center justify-between font-mono text-[8px] text-muted-foreground/60">
        <span>RESPONSE</span>
        <span className="text-primary font-bold">SETTLED</span>
      </div>
    </div>
  )
}

export function FeaturedBento({ projects }: FeaturedBentoProps) {
  if (!projects || projects.length === 0) return null

  const sortedProjects = [...projects].sort((a, b) => {
    const idxA = FEATURED_SLOT_PRIORITY.indexOf(a.slug)
    const idxB = FEATURED_SLOT_PRIORITY.indexOf(b.slug)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return 0
  })

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
      {sortedProjects.map((project, idx) => {
        const isFullWidth = idx === 4

        if (isFullWidth) {
          return (
            <article
              key={project.slug}
              className="group relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl border border-border bg-surface/40 p-6 sm:p-7 md:col-span-2 sm:flex-row sm:items-center transition-all duration-200 hover:border-border/90 hover:bg-surface/70"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`View ${project.title}`}
              />

              <div className="max-w-2xl space-y-1.5 pr-8">
                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                  {project.title}
                </h3>
                {project.summary && (
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                )}
              </div>

              <span
                className="font-mono text-base text-muted-foreground/60 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 self-end sm:self-center"
                aria-hidden="true"
              >
                ↗
              </span>
            </article>
          )
        }

        return (
          <article
            key={project.slug}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface/40 p-5 sm:p-6 transition-all duration-200 hover:border-border/90 hover:bg-surface/70"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 z-20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View ${project.title}`}
            />

            <span
              className="absolute top-5 right-5 font-mono text-sm text-muted-foreground/60 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              {/* Preview frame on left */}
              <div className="relative shrink-0 overflow-hidden rounded-lg border border-border/70 bg-background/80 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                ) : project.slug === "motosense" ? (
                  <MotosenseVisual />
                ) : project.slug === "pid-control-simulator" ? (
                  <PidVisual />
                ) : (
                  <span className="font-mono text-xs text-muted-foreground/50">
                    &lt;/&gt;
                  </span>
                )}
              </div>

              {/* Title & Description on right */}
              <div className="min-w-0 flex-1 space-y-1.5 pr-6 sm:pr-8">
                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                  {project.title}
                </h3>
                {project.summary && (
                  <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
