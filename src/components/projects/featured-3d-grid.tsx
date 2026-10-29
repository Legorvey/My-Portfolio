"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import type { ProjectFrontmatter } from "@/lib/content"
import { cn } from "@/lib/utils"

export interface FeaturedBentoProject extends ProjectFrontmatter {
  dims?: { width: number; height: number } | null
}

export interface Featured3DGridProps {
  projects: FeaturedBentoProject[]
  className?: string
}

const FEATURED_SLOT_PRIORITY: readonly string[] = [
  "gardapati",
  "motosense",
  "aquafeeder",
  "pid-control-simulator",
  "pln-thermography-internship",
]

const BENTO_LAYOUT: readonly {
  colSpan: string
  minHeight: string
  isHero?: boolean
}[] = [
  {
    colSpan: "col-span-12 md:col-span-7",
    minHeight: "min-h-[240px] md:min-h-[280px]",
    isHero: true,
  },
  {
    colSpan: "col-span-12 md:col-span-5",
    minHeight: "min-h-[220px] md:min-h-[260px]",
  },
  {
    colSpan: "col-span-12 md:col-span-5",
    minHeight: "min-h-[220px] md:min-h-[260px]",
  },
  {
    colSpan: "col-span-12 md:col-span-7",
    minHeight: "min-h-[220px] md:min-h-[260px]",
  },
  {
    colSpan: "col-span-12 md:col-span-12",
    minHeight: "min-h-[240px] md:min-h-[280px]",
    isHero: true,
  },
]

interface ProjectCard3DProps {
  project: FeaturedBentoProject
  index: number
  colSpan: string
  minHeight: string
  isHero?: boolean
}

function ProjectCard3D({
  project,
  index,
  colSpan,
  minHeight,
  isHero,
}: ProjectCard3DProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [hovered, setHovered] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePos({ x, y })
    },
    [shouldReduceMotion]
  )

  const handleMouseEnter = React.useCallback(() => {
    setHovered(true)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setHovered(false)
    setMousePos({ x: 0, y: 0 })
  }, [])

  const watermarkNumber = String(index + 1).padStart(2, "0")
  const rotateX = shouldReduceMotion ? 0 : mousePos.y * -14
  const rotateY = shouldReduceMotion ? 0 : mousePos.x * 14

  return (
    <div
      ref={cardRef}
      className={cn("relative group", colSpan)}
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-30 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${project.title}`}
      />

      <motion.div
        className={cn(
          "relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-7 md:p-9 lg:p-10 text-card-foreground transition-all duration-300 ease-out group-hover:border-primary/50 group-hover:bg-primary/[0.02] dark:group-hover:bg-primary/[0.04]",
          minHeight
        )}
        animate={{
          rotateX,
          rotateY,
          z: !shouldReduceMotion && hovered ? 12 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.6,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background Visual Layer */}
        {project.thumbnail ? (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
            style={{ transform: "translateZ(-8px)" }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-15 dark:opacity-10 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-card/60 dark:from-card dark:via-card/95 dark:to-card/70" />
          </div>
        ) : null}

        {/* Specular Light Reflection Follower */}
        {!shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute -inset-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 350px at ${
                50 + mousePos.x * 40
              }% ${50 + mousePos.y * 40}%, rgba(255,255,255,0.05), transparent 70%)`,
              transform: "translateZ(10px)",
            }}
          />
        )}

        {/* Top-Right Clean Arrow */}
        <span
          className="absolute top-6 right-6 z-20 font-mono text-base text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary md:top-8 md:right-8"
          style={{ transform: "translateZ(20px)" }}
          aria-hidden="true"
        >
          ↗
        </span>

        {/* Main Content Stack */}
        <div
          className="relative z-10 flex h-full flex-col justify-between pb-4"
          style={{ transform: "translateZ(24px)" }}
        >
          <div>
            <h3 className="pr-8 font-heading text-xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary md:pr-10 md:text-2xl">
              {project.title}
            </h3>

            {project.summary && (
              <p
                className={cn(
                  "mt-3 font-sans text-sm leading-relaxed text-muted-foreground",
                  isHero ? "max-w-2xl lg:max-w-3xl" : "max-w-md lg:max-w-lg"
                )}
              >
                {project.summary}
              </p>
            )}
          </div>
        </div>

        {/* Bottom-Right Number Watermark */}
        <div
          className="pointer-events-none absolute -right-2 -bottom-3 z-0 select-none font-mono text-7xl font-black leading-none tracking-tighter text-foreground/[0.04] transition-all duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-primary/20 md:-right-3 md:-bottom-5 md:text-9xl dark:text-primary/10 dark:group-hover:text-primary/30"
          style={{ transform: "translateZ(6px)" }}
          aria-hidden="true"
        >
          {watermarkNumber}
        </div>
      </motion.div>
    </div>
  )
}

export function Featured3DGrid({ projects, className }: Featured3DGridProps) {
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
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6", className)}>
      {sortedProjects.map((project, idx) => {
        const config = BENTO_LAYOUT[idx] ?? {
          colSpan: "col-span-12 md:col-span-6",
          minHeight: "min-h-[220px] md:min-h-[260px]",
        }

        return (
          <ProjectCard3D
            key={project.slug}
            project={project}
            index={idx}
            colSpan={config.colSpan}
            minHeight={config.minHeight}
            isHero={config.isHero}
          />
        )
      })}
    </div>
  )
}
