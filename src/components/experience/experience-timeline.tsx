"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  category: string
  location?: string
  bullets: readonly string[]
  links?: readonly {
    label: string
    href: string
    isExternal?: boolean
  }[]
  logo: {
    src?: string
    text: string
    subtext?: string
    variant?: "primary" | "secondary" | "accent" | "neutral"
  }
}

export const EXPERIENCES: readonly ExperienceItem[] = [
  {
    id: "hmte-unpad",
    company: "HMTE Unpad",
    role: "Head of Kominfo",
    period: "Jan 2026 — Present",
    category: "Organization",
    location: "Universitas Padjadjaran",
    bullets: [
      "Directing operational and digital communication strategy across External Relations and Media departments.",
      "Optimizing internal publishing workflows and introducing structured, narrative-driven editorial standards.",
      "Managing institutional public relations and university-level partnerships to enhance digital reach.",
    ],
    links: [
      { label: "Instagram ↗", href: "https://instagram.com/hmte_unpad", isExternal: true },
      { label: "Department Docs ↗", href: "#", isExternal: true },
    ],
    logo: {
      text: "HMTE",
      subtext: "UNPAD",
      variant: "primary",
    },
  },
  {
    id: "matcha-craft",
    company: "Matcha Craft",
    role: "Co-Founder & Branch Lead",
    period: "2026",
    category: "Business",
    location: "Tasikmalaya Expansion",
    bullets: [
      "Spearheaded physical branch expansion into the Tasikmalaya culinary market from zero presence.",
      "Managed end-to-end bazaar ground operations, supply chain logistics, and daily cash flow auditing.",
      "Achieved 70% ROI through disciplined unit economics and targeted local marketing campaigns.",
    ],
    links: [
      { label: "Case Study", href: "/projects/matcha-tasikmalaya", isExternal: false },
      { label: "Brand Profile ↗", href: "#", isExternal: true },
    ],
    logo: {
      text: "MC",
      subtext: "CRAFT",
      variant: "accent",
    },
  },
  {
    id: "futura",
    company: "Futura National Event",
    role: "Vice Project Officer",
    period: "Feb — Nov 2025",
    category: "Event Management",
    location: "HMTE Megaproject",
    bullets: [
      "Directed 9-month operational schedule for HMTE's largest external technology megaproject.",
      "Scaled the National Robotics Competition capacity by 60%, managing logistics for 230+ participants.",
      "Orchestrated flagship Tech Seminar bridging academic research with prominent energy industry veterans.",
    ],
    links: [
      { label: "Case Study", href: "/projects/futura", isExternal: false },
      { label: "Robotics Recap ↗", href: "#", isExternal: true },
    ],
    logo: {
      text: "FUT",
      subtext: "2025",
      variant: "primary",
    },
  },
  {
    id: "pgs25",
    company: "PKMT Goes to School",
    role: "Project Officer",
    period: "Nov '24 — Feb '25",
    category: "Event Management",
    location: "West Java Outreach",
    bullets: [
      "Revived a discontinued flagship university roadshow reaching over 25 high schools across West Java.",
      "Secured IDR 10M in institutional sponsorships within an accelerated 3-week fundraising campaign.",
      "Exceeded participant attendance targets by 53% and obtained official regional press coverage.",
    ],
    links: [
      { label: "Case Study", href: "/projects/pgs25", isExternal: false },
      { label: "Press Coverage ↗", href: "#", isExternal: true },
    ],
    logo: {
      text: "PKMT",
      subtext: "ROAD",
      variant: "secondary",
    },
  },
] as const

interface ExperienceTimelineProps {
  items?: readonly ExperienceItem[]
}

export function ExperienceTimeline({
  items = EXPERIENCES,
}: ExperienceTimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const firstBadgeRef = React.useRef<HTMLDivElement>(null)
  const lastBadgeRef = React.useRef<HTMLDivElement>(null)
  const [lineCoords, setLineCoords] = React.useState<{ top: number; height: number } | null>(null)
  const [progressHeight, setProgressHeight] = React.useState<number>(0)
  const [activeIndices, setActiveIndices] = React.useState<number[]>([])

  React.useEffect(() => {
    let animationFrameId: number

    const updateProgress = () => {
      const container = containerRef.current
      const firstBadge = firstBadgeRef.current
      const lastBadge = lastBadgeRef.current
      if (!container || !firstBadge || !lastBadge) return

      const containerRect = container.getBoundingClientRect()
      const firstBadgeRect = firstBadge.getBoundingClientRect()
      const lastBadgeRect = lastBadge.getBoundingClientRect()

      const firstCenter = firstBadgeRect.top + firstBadgeRect.height / 2
      const lastCenter = lastBadgeRect.top + lastBadgeRect.height / 2

      const topOffset = firstCenter - containerRect.top
      const totalLineHeight = Math.max(0, lastCenter - firstCenter)

      setLineCoords({ top: topOffset, height: totalLineHeight })

      // Viewport anchor point: center of the viewport
      const viewportAnchor = window.innerHeight * 0.5
      const scrolled = viewportAnchor - firstCenter

      const currentProgress = Math.max(0, Math.min(scrolled, totalLineHeight))
      setProgressHeight(currentProgress)

      const reached: number[] = []
      itemRefs.current.forEach((el, index) => {
        if (!el) return
        const itemRect = el.getBoundingClientRect()
        const itemCenter = itemRect.top + itemRect.height / 2
        if (itemCenter <= viewportAnchor) {
          reached.push(index)
        }
      })
      setActiveIndices(reached)
    }

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      handleScroll()
    })
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    updateProgress()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [items.length])

  return (
    <div ref={containerRef} className="relative w-full py-4">
      {lineCoords && (
        <>
          {/* Central Timeline Spine (Grey base line starting at first badge) */}
          <div
            className="absolute left-6 w-0.5 -translate-x-1/2 bg-border md:left-1/2"
            style={{
              top: `${lineCoords.top}px`,
              height: `${lineCoords.height}px`,
            }}
            aria-hidden="true"
          />

          {/* Scroll Progression Line (White / Foreground active line) */}
          <div
            className="absolute left-6 w-0.5 -translate-x-1/2 bg-foreground md:left-1/2 transition-[height] duration-75 ease-out will-change-[height]"
            style={{
              top: `${lineCoords.top}px`,
              height: `${progressHeight}px`,
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="space-y-12 md:space-y-16">
        {items.map((item, index) => {
          const isOdd = index % 2 === 0 // 0, 2 (1st and 3rd): Card on left, Company on right
          const isActive = activeIndices.includes(index)
          const isFirst = index === 0
          const isLast = index === items.length - 1

          return (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className="relative grid grid-cols-1 items-center md:grid-cols-2 md:gap-16"
            >
              {/* Timeline Center Badge */}
              <div
                ref={isFirst ? firstBadgeRef : isLast ? lastBadgeRef : undefined}
                className={cn(
                  "absolute left-6 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:left-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-sm border bg-card shadow-xs transition-all duration-300",
                  isActive
                    ? "border-foreground bg-surface text-foreground ring-1 ring-foreground/20"
                    : "border-border text-muted-foreground hover:border-foreground/40"
                )}
                aria-hidden="true"
              >
                {item.logo.src ? (
                  <Image
                    src={item.logo.src}
                    alt={item.company}
                    width={28}
                    height={28}
                    className={cn(
                      "h-7 w-7 object-contain transition-opacity",
                      isActive ? "opacity-100" : "opacity-80"
                    )}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center leading-none select-none">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold tracking-tight transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.logo.text}
                    </span>
                    {item.logo.subtext && (
                      <span
                        className={cn(
                          "font-mono text-[9px] font-semibold uppercase transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground/80"
                        )}
                      >
                        {item.logo.subtext}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop Left Slot */}
              <div
                className={cn(
                  "hidden md:block",
                  isOdd ? "order-1" : "order-1 text-right"
                )}
              >
                {isOdd ? (
                  /* Left Content Card */
                  <ExperienceCard item={item} align="left" isActive={isActive} />
                ) : (
                  /* Left Company Summary */
                  <CompanySummary item={item} align="right" isActive={isActive} />
                )}
              </div>

              {/* Desktop Right Slot */}
              <div
                className={cn(
                  "hidden md:block",
                  isOdd ? "order-2 text-left" : "order-2"
                )}
              >
                {isOdd ? (
                  /* Right Company Summary */
                  <CompanySummary item={item} align="left" isActive={isActive} />
                ) : (
                  /* Right Content Card */
                  <ExperienceCard item={item} align="right" isActive={isActive} />
                )}
              </div>

              {/* Mobile View (< md) */}
              <div className="pl-14 md:hidden space-y-3">
                <div className="flex flex-col justify-center min-h-[44px]">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={cn(
                        "font-sans text-base font-bold transition-colors",
                        isActive ? "text-foreground" : "text-foreground/90"
                      )}
                    >
                      {item.company}
                    </h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] transition-colors",
                        isActive ? "border-foreground/40 text-foreground" : ""
                      )}
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <span>{item.period}</span>
                    {item.location && (
                      <>
                        <span>·</span>
                        <span>{item.location}</span>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "relative rounded-sm border bg-card p-4 transition-colors duration-200",
                    isActive
                      ? "border-foreground/50 bg-surface/90"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
                    {item.role}
                  </div>
                  <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className={cn(
                            "mt-1 h-1 w-1 shrink-0 rounded-full transition-colors",
                            isActive ? "bg-primary" : "bg-muted-foreground/60"
                          )}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {item.links && item.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-3">
                      {item.links.map((link) => (
                        <ExperienceLink key={link.label} link={link} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface CompanySummaryProps {
  item: ExperienceItem
  align: "left" | "right"
  isActive: boolean
}

function CompanySummary({ item, align, isActive }: CompanySummaryProps) {
  return (
    <div
      className={cn(
        "space-y-1.5",
        align === "right" ? "pr-4 items-end text-right" : "pl-4 items-start text-left"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          align === "right" ? "justify-end" : "justify-start"
        )}
      >
        <span
          className={cn(
            "font-sans text-lg font-bold tracking-tight transition-colors",
            isActive ? "text-foreground" : "text-foreground/90"
          )}
        >
          {item.company}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] transition-colors",
            isActive ? "border-foreground/40 text-foreground" : ""
          )}
        >
          {item.category}
        </Badge>
      </div>

      <div className="font-mono text-xs text-muted-foreground">
        <span>{item.period}</span>
        {item.location && (
          <span className="text-muted-foreground/70"> · {item.location}</span>
        )}
      </div>
    </div>
  )
}

interface ExperienceCardProps {
  item: ExperienceItem
  align: "left" | "right"
  isActive: boolean
}

function ExperienceCard({ item, align, isActive }: ExperienceCardProps) {
  return (
    <div className="relative group">
      {/* Diego VZ style triangular pointer pointing to the center spine */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent z-10 transition-colors pointer-events-none",
          align === "left"
            ? cn(
                "-right-2 border-l-[8px]",
                isActive
                  ? "border-l-foreground"
                  : "border-l-border group-hover:border-l-foreground/30"
              )
            : cn(
                "-left-2 border-r-[8px]",
                isActive
                  ? "border-r-foreground"
                  : "border-r-border group-hover:border-r-foreground/30"
              )
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative rounded-sm border bg-card p-5 text-left transition-colors duration-200",
          isActive
            ? "border-foreground/50 bg-surface/90"
            : "border-border group-hover:border-foreground/30"
        )}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <h4
            className={cn(
              "font-sans text-sm font-semibold tracking-tight transition-colors",
              isActive ? "text-foreground" : "text-foreground/90"
            )}
          >
            {item.role}
          </h4>
        </div>

        <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className={cn(
                  "mt-1.5 h-1 w-1 shrink-0 rounded-full transition-colors",
                  isActive ? "bg-primary" : "bg-muted-foreground/60"
                )}
              />
              <span className="max-w-[65ch]">{bullet}</span>
            </li>
          ))}
        </ul>

        {item.links && item.links.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3">
            {item.links.map((link) => (
              <ExperienceLink key={link.label} link={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ExperienceLink({
  link,
}: {
  link: { label: string; href: string; isExternal?: boolean }
}) {
  const content = (
    <span className="group/link inline-flex items-center gap-1 font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary">
      <span>{link.label.replace(/ ↗$/, "")}</span>
      <span
        className="text-primary transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        aria-hidden="true"
      >
        ↗
      </span>
    </span>
  )

  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      href={link.href}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {content}
    </Link>
  )
}
