import Link from "next/link"
import * as React from "react"
import type { ProjectFrontmatter } from "@/lib/content"
import { cn } from "@/lib/utils"

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

const BENTO_CONFIG: readonly {
  colSpan: string
  minHeight: string
  isHero?: boolean
}[] = [
  {
    colSpan: "md:col-span-7",
    minHeight: "min-h-[240px] md:min-h-[280px]",
    isHero: true,
  },
  {
    colSpan: "md:col-span-5",
    minHeight: "min-h-[220px] md:min-h-[260px]",
  },
  {
    colSpan: "md:col-span-5",
    minHeight: "min-h-[220px] md:min-h-[260px]",
  },
  {
    colSpan: "md:col-span-7",
    minHeight: "min-h-[220px] md:min-h-[260px]",
  },
  {
    colSpan: "md:col-span-12",
    minHeight: "min-h-[240px] md:min-h-[280px]",
    isHero: true,
  },
]

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
      {sortedProjects.map((project, idx) => {
        const config = BENTO_CONFIG[idx] ?? {
          colSpan: "md:col-span-6",
          minHeight: "min-h-[220px] md:min-h-[260px]",
        }
        const watermarkNumber = String(idx + 1).padStart(2, "0")

        return (
          <article
            key={project.slug}
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-7 text-card-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/[0.02] dark:hover:bg-primary/[0.04] md:p-9 lg:p-10 motion-reduce:transform-none motion-reduce:transition-none",
              config.colSpan,
              config.minHeight
            )}
          >
            {/* Clickable Overlay Link */}
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 z-20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View ${project.title}`}
            />

            {/* Top-Right Arrow */}
            <span
              className="absolute top-6 right-6 z-10 font-mono text-base text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary md:top-8 md:right-8"
              aria-hidden="true"
            >
              ↗
            </span>

            {/* Main Content Vertical Stack */}
            <div className="relative z-10 flex h-full flex-col justify-between pb-8">
              <div>
                {/* Title */}
                <h3 className="pr-8 font-heading text-xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary md:pr-10 md:text-2xl">
                  {project.title}
                </h3>

                {/* Description */}
                {project.summary && (
                  <p
                    className={cn(
                      "mt-3 font-sans text-sm leading-relaxed text-muted-foreground",
                      config.isHero
                        ? "max-w-2xl lg:max-w-3xl"
                        : "max-w-md lg:max-w-lg"
                    )}
                  >
                    {project.summary}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom-Right Number Watermark */}
            <div
              className="pointer-events-none absolute -right-2 -bottom-3 z-0 select-none font-mono text-7xl font-black leading-none tracking-tighter text-foreground/[0.04] transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-primary/20 md:-right-3 md:-bottom-5 md:text-9xl dark:text-primary/10 dark:group-hover:text-primary/30 motion-reduce:transform-none"
              aria-hidden="true"
            >
              {watermarkNumber}
            </div>
          </article>
        )
      })}
    </div>
  )
}
