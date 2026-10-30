"use client"

import Image from "next/image"
import * as React from "react"
import { Code, Share2, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  WorkflowBuilderCard,
  type User,
  type Action,
} from "@/components/ui/workflow-builder-card"

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  category: string
  specification?: string
  description?: string
  location?: string
  bullets: readonly string[]
  tags?: readonly string[]
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
  // WorkflowBuilderCard visual fields (3D banner placeholders, users, actions)
  imageUrl: string
  imagePosition?: string
  status: "Active" | "Inactive"
  lastUpdated?: string
  users?: readonly User[]
  actions: readonly Action[]
}

const DEFAULT_USERS: readonly User[] = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    fallback: "U1",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    fallback: "U2",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    fallback: "U3",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    fallback: "+3",
  },
]

const DEFAULT_ACTIONS: readonly Action[] = [
  { Icon: Zap, bgColor: "bg-blue-500", label: "Active Project" },
  { Icon: Code, bgColor: "bg-zinc-700", label: "Tech Stack" },
  { Icon: Share2, bgColor: "bg-red-500", label: "Share" },
]

export const EXPERIENCES: readonly ExperienceItem[] = [
  {
    id: "hmte-unpad",
    company: "HMTE Unpad",
    role: "Head of Kominfo",
    period: "Jan 2026 — Present",
    category: "Organization",
    specification: "Media Strategy & Institutional Relations",
    description:
      "Directing operational communications, media publication standards, and university-level digital outreach.",
    location: "Universitas Padjadjaran",
    tags: ["Digital Strategy", "Editorial", "Public Relations"],
    bullets: [
      "Directing operational and digital communication strategy across External Relations and Media departments.",
      "Optimizing internal publishing workflows and introducing structured, narrative-driven editorial standards.",
      "Managing institutional public relations and university-level partnerships to enhance digital reach.",
    ],
    links: [
      { label: "Instagram ↗", href: "https://www.instagram.com/p/DW4Q1S-GH0x/", isExternal: true },
    ],
    logo: {
      text: "HMTE",
      subtext: "UNPAD",
      variant: "primary",
    },
    imageUrl: "/images/experience/hmte-experience.jpg",
    imagePosition: "object-center",
    status: "Active",
    lastUpdated: "Jan 2026 — Present",
    users: DEFAULT_USERS,
    actions: DEFAULT_ACTIONS,
  },
  {
    id: "pln-ultg",
    company: "PT PLN (Persero)",
    role: "Power Transmission Engineer Intern",
    period: "Jul — Aug 2026",
    category: "Engineering",
    specification: "High Voltage Transmission & Thermographic Diagnostics",
    description:
      "Conducted thermographic diagnostic inspections and quantitative thermal anomaly analysis across 150 kV electrical transmission networks.",
    location: "Bandung, Indonesia",
    tags: ["High Voltage", "Thermography", "Grid Diagnostics", "Preventive Maintenance"],
    bullets: [
      "Ran thermographic inspections on 150 kV transmission towers to find thermal anomalies on jumper clamps and repair sleeves.",
      "Calculated temperature differentials against a 32°C ambient baseline to classify severity and prioritize maintenance.",
      "Found a critical overheating fault at Tower 22 (35.18°C differential) and a warning at Tower 37 (18.00°C), recommending immediate corrective action.",
      "Traced the anomalies to mechanical vibration loosening and hydraulic crimping failures.",
    ],
    links: [
      { label: "Company Profile ↗", href: "https://www.instagram.com/ultg_bandungbarat/?hl=en", isExternal: true },
    ],
    logo: {
      text: "PLN",
      subtext: "ULTG",
      variant: "primary",
    },
    imageUrl: "/images/experience/pln.jpg",
    imagePosition: "object-center",
    status: "Inactive",
    lastUpdated: "Jul — Aug 2026",
    users: DEFAULT_USERS,
    actions: DEFAULT_ACTIONS,
  },
  {
    id: "futura",
    company: "Futura National Event",
    role: "Vice Project Officer",
    period: "Feb — Nov 2025",
    category: "Event Management",
    specification: "Event Management & Technical Programs",
    description:
      "Directing 9-month operational schedule for HMTE's largest external technology megaproject and national robotics competitions.",
    location: "HMTE Megaproject",
    tags: ["National Robotics", "Megaproject", "Tech Seminar", "Operations"],
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
    imageUrl: "/images/experience/futura.jpg",
    imagePosition: "object-center",
    status: "Inactive",
    lastUpdated: "Feb — Nov 2025",
    users: DEFAULT_USERS,
    actions: DEFAULT_ACTIONS,
  },
  {
    id: "technologist",
    company: "Technologist",
    role: "Technologist",
    period: "Aug 2024 — Present",
    category: "Engineering",
    specification: "Web Platforms, Connected Hardware & Data Systems",
    description:
      "Building and deploying end-to-end technical solutions across full-stack web platforms, connected IoT hardware, and data-driven systems.",
    location: "Full-Stack & Embedded",
    tags: ["Next.js", "React & Supabase", "ESP32 & Raspberry Pi", "Data Systems"],
    bullets: [
      "Developing scalable full-stack applications with Next.js, React, and Supabase to handle complex user scheduling, payments, and database architecture.",
      "Prototyping integrated IoT solutions using Raspberry Pi and ESP32 microcontrollers for continuous sensor data monitoring and cloud synchronization.",
      "Designing backend architecture and processing logic to translate raw data into actionable systems, ranging from credit risk profiling algorithms to real-time web dashboards.",
    ],
    links: [
      { label: "Featured Projects", href: "/projects", isExternal: false },
      { label: "GitHub ↗", href: "https://github.com/Legorvey", isExternal: true },
    ],
    logo: {
      text: "TECH",
      subtext: "SYS",
      variant: "secondary",
    },
    imageUrl: "/images/experience/technologist.jpg",
    imagePosition: "object-center",
    status: "Active",
    lastUpdated: "Aug 2024 — Present",
    users: DEFAULT_USERS,
    actions: DEFAULT_ACTIONS,
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
  const firstBadgeRef = React.useRef<HTMLDivElement | null>(null)
  const lastBadgeRef = React.useRef<HTMLDivElement | null>(null)
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

      // Viewport anchor point: center of the viewport (50% of window height)
      const viewportAnchor = window.innerHeight * 0.5
      const scrolled = viewportAnchor - firstCenter

      const currentProgress = Math.max(0, Math.min(scrolled, totalLineHeight))
      setProgressHeight(currentProgress)

      const reached: number[] = []
      itemRefs.current.forEach((el, index) => {
        if (!el) return
        const itemRect = el.getBoundingClientRect()
        // Badge is anchored at item's top banner level (72px from item top on desktop, 24px on mobile)
        const isMobile = window.innerWidth < 768
        const badgeOffset = isMobile ? 24 : 72
        const itemHeaderCenter = itemRect.top + badgeOffset
        if (itemHeaderCenter <= viewportAnchor) {
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
    <div ref={containerRef} className="relative w-full py-6">
      {lineCoords && (
        <>
          {/* Central Timeline Spine (Continuous grey base line starting at first badge) */}
          <div
            className="absolute left-6 w-0.5 -translate-x-1/2 bg-border md:left-1/2 pointer-events-none"
            style={{
              top: `${lineCoords.top}px`,
              height: `${lineCoords.height}px`,
            }}
            aria-hidden="true"
          />

          {/* Scroll Progression Line (Active white/foreground line, anchored at first badge) */}
          <div
            className="absolute left-6 w-0.5 -translate-x-1/2 bg-foreground md:left-1/2 transition-[height] duration-75 ease-out will-change-[height] pointer-events-none"
            style={{
              top: `${lineCoords.top}px`,
              height: `${progressHeight}px`,
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="space-y-28 md:space-y-40">
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
              className="relative grid grid-cols-1 items-start md:grid-cols-2 md:gap-16"
            >
              {/* Timeline Center Badge - Anchored to banner level (72px) so it never shifts on card hover */}
              <div
                ref={(el) => {
                  if (isFirst) firstBadgeRef.current = el
                  if (isLast) lastBadgeRef.current = el
                }}
                className={cn(
                  "absolute left-6 -translate-x-1/2 top-6 md:top-[72px] md:-translate-y-1/2 md:left-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-sm border bg-card shadow-xs transition-all duration-300",
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
                  <h3
                    className={cn(
                      "font-sans text-base font-bold transition-colors",
                      isActive ? "text-foreground" : "text-foreground/90"
                    )}
                  >
                    {item.company}
                  </h3>
                  {item.specification && (
                    <div className="font-sans text-xs text-muted-foreground/80">
                      {item.specification}
                    </div>
                  )}
                </div>

                <ExperienceCard item={item} align="mobile" isActive={isActive} />
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
        "h-36 flex flex-col justify-center space-y-1",
        align === "right" ? "pr-6 text-right items-end" : "pl-6 text-left items-start"
      )}
    >
      <h3
        className={cn(
          "font-sans text-xl md:text-2xl font-bold tracking-tight transition-colors",
          isActive ? "text-foreground" : "text-foreground/90"
        )}
      >
        {item.company}
      </h3>

      {item.specification && (
        <p
          className={cn(
            "font-sans text-xs text-muted-foreground/80 leading-relaxed max-w-xs",
            align === "right" ? "ml-auto" : "mr-auto"
          )}
        >
          {item.specification}
        </p>
      )}
    </div>
  )
}

interface ExperienceCardProps {
  item: ExperienceItem
  align: "left" | "right" | "mobile"
  isActive: boolean
}

function ExperienceCard({ item, align }: ExperienceCardProps) {
  return (
    <div
      className={cn(
        "w-full flex",
        align === "left"
          ? "justify-end"
          : align === "right"
            ? "justify-start"
            : "justify-start"
      )}
    >
      <WorkflowBuilderCard
        imageUrl={item.imageUrl}
        imagePosition={item.imagePosition}
        status={item.status}
        lastUpdated={item.lastUpdated ?? item.period}
        title={item.role}
        description={item.description ?? ""}
        actions={item.actions}
        bullets={item.bullets}
        links={item.links}
        className={cn(
          "w-full max-w-sm sm:max-w-[390px]",
          align === "left" ? "ml-auto" : align === "right" ? "mr-auto" : ""
        )}
      />
    </div>
  )
}
