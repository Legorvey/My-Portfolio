import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import type { ProjectFrontmatter } from "@/lib/content"
import { formatPeriod, formatProjectTypeLabel } from "@/lib/utils"

export interface FeaturedBentoProject extends ProjectFrontmatter {
  dims?: { width: number; height: number } | null
}

interface FeaturedBentoProps {
  projects: FeaturedBentoProject[]
}

const BENTO_SLOT_PRIORITY: readonly string[] = [
  "gardapati",
  "motosense",
  "aquafeeder",
  "pid-control-simulator",
  "pln-thermography-internship",
]

export function FeaturedBento({ projects }: FeaturedBentoProps) {
  if (!projects || projects.length === 0) return null

  const sortedProjects = [...projects].sort((a, b) => {
    const idxA = BENTO_SLOT_PRIORITY.indexOf(a.slug)
    const idxB = BENTO_SLOT_PRIORITY.indexOf(b.slug)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return 0
  })

  const [heroCard, spotlightCard, ...bottomCards] = sortedProjects

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-border">
      {/* 12-column Bento Grid with 1px border gap */}
      <div className="grid grid-cols-1 gap-px md:grid-cols-12">
        {/* Card 01: Hero Rectangle (Spans 8 columns on large screens) */}
        {heroCard && (
          <article className="group relative flex flex-col justify-between bg-surface p-6 sm:p-8 md:col-span-12 lg:col-span-8 transition-colors duration-200 hover:bg-surface/80">
            <Link
              href={`/projects/${heroCard.slug}`}
              className="absolute inset-0 z-20 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`View ${heroCard.title}`}
            />

            <div>
              {/* Header: Index, Badge & Arrow */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-primary">
                    01
                  </span>
                  <Badge variant="default">
                    {formatProjectTypeLabel(heroCard.type)}
                  </Badge>
                  {heroCard.status && (
                    <Badge variant="outline" className="hidden sm:inline-flex">
                      {heroCard.status}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1 font-mono text-xs font-semibold text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary">
                  <span>View Project</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-6 max-w-2xl space-y-2">
                <h3 className="font-sans text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                  {heroCard.title}
                </h3>
                {heroCard.summary && (
                  <p className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
                    {heroCard.summary}
                  </p>
                )}
              </div>
            </div>

            {/* Thumbnail preview */}
            {heroCard.thumbnail && (
              <div className="my-6 overflow-hidden rounded-sm border border-border bg-background">
                <Image
                  src={heroCard.thumbnail}
                  alt={heroCard.title}
                  width={heroCard.dims?.width || 800}
                  height={heroCard.dims?.height || 450}
                  className="max-h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                />
              </div>
            )}

            {/* Footer tags & timeline */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {(heroCard.tools && heroCard.tools.length > 0
                  ? heroCard.tools
                  : heroCard.tags ?? []
                )
                  .slice(0, 5)
                  .map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-border bg-background/60 px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                    >
                      {t}
                    </span>
                  ))}
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {formatPeriod(heroCard.start, heroCard.end)}
              </span>
            </div>
          </article>
        )}

        {/* Card 02: Spotlight Card (Spans 4 columns on large screens) */}
        {spotlightCard && (
          <article className="group relative flex flex-col justify-between bg-surface p-6 sm:p-8 md:col-span-12 lg:col-span-4 transition-colors duration-200 hover:bg-surface/80">
            <Link
              href={`/projects/${spotlightCard.slug}`}
              className="absolute inset-0 z-20 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`View ${spotlightCard.title}`}
            />

            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-primary">
                    02
                  </span>
                  <Badge variant="default">
                    {formatProjectTypeLabel(spotlightCard.type)}
                  </Badge>
                </div>
                <span className="font-mono text-xs text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary">
                  ↗
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-sans text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {spotlightCard.title}
                </h3>
                {spotlightCard.summary && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {spotlightCard.summary}
                  </p>
                )}
              </div>
            </div>

            {spotlightCard.thumbnail && (
              <div className="my-6 overflow-hidden rounded-sm border border-border bg-background">
                <Image
                  src={spotlightCard.thumbnail}
                  alt={spotlightCard.title}
                  width={spotlightCard.dims?.width || 600}
                  height={spotlightCard.dims?.height || 400}
                  className="max-h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {(spotlightCard.tools && spotlightCard.tools.length > 0
                  ? spotlightCard.tools
                  : spotlightCard.tags ?? []
                )
                  .slice(0, 3)
                  .map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-border bg-background/60 px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                    >
                      {t}
                    </span>
                  ))}
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {formatPeriod(spotlightCard.start, spotlightCard.end)}
              </span>
            </div>
          </article>
        )}

        {/* Cards 03, 04, 05: Bottom Row (3 Equal Columns, Spanning 4 cols each on md/lg screens) */}
        {bottomCards.slice(0, 3).map((project, idx) => {
          const indexNumber = `0${idx + 3}`
          return (
            <article
              key={project.slug}
              className="group relative flex flex-col justify-between bg-surface p-6 sm:p-7 md:col-span-6 lg:col-span-4 transition-colors duration-200 hover:bg-surface/80"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-20 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`View ${project.title}`}
              />

              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold tracking-widest text-primary">
                      {indexNumber}
                    </span>
                    <Badge variant="outline">
                      {formatProjectTypeLabel(project.type)}
                    </Badge>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary">
                    ↗
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                  )}
                </div>
              </div>

              {project.thumbnail && (
                <div className="my-5 overflow-hidden rounded-sm border border-border bg-background">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={project.dims?.width || 500}
                    height={project.dims?.height || 300}
                    className="h-32 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                  />
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/80 pt-3">
                <div className="flex flex-wrap gap-1">
                  {(project.tools && project.tools.length > 0
                    ? project.tools
                    : project.tags ?? []
                  )
                    .slice(0, 3)
                    .map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-border bg-background/60 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {formatPeriod(project.start, project.end)}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
