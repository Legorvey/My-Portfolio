import Image from "next/image"
import { ArrowUpRightIcon, CalendarIcon, CheckCircle2Icon, UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Project, ProjectResource } from "@/lib/content"
import type { ImageDimensions } from "@/lib/image-dimensions"
import { cn, formatPeriod, formatProjectTypeLabel } from "@/lib/utils"

export interface ProjectDossierHeaderProps {
  project: Project
  primaryActions: ProjectResource[]
  coverImage?: {
    src: string
    alt: string
    caption?: string
    fit: "cover" | "contain"
    dims: ImageDimensions
  } | null
}

export function ProjectDossierHeader({
  project,
  primaryActions,
  coverImage,
}: ProjectDossierHeaderProps) {
  const typeLabel = formatProjectTypeLabel(project.type)
  const eyebrowParts = [typeLabel, ...(project.tags ?? []).slice(0, 2)]
  const hasDate = Boolean(project.start)
  const periodLabel = hasDate ? formatPeriod(project.start, project.end) : null
  const roleLabel = project.role?.trim() || null
  const statusLabel = project.status?.trim() || null
  const updatedLabel = project.updated ? formatPeriod(project.updated, project.updated) : null

  const hasInlineMeta = Boolean(periodLabel || roleLabel || statusLabel || updatedLabel)

  // Combine tools and remaining tags (avoiding repeating tags already in the eyebrow if desired, or showing all tools + tags cleanly)
  const techItems = [
    ...(project.tools ?? []),
    ...(project.tags ?? []).filter(
      (tag) => !(project.tools ?? []).some((t) => t.toLowerCase() === tag.toLowerCase())
    ),
  ]

  const hasActionsOrTech = primaryActions.length > 0 || techItems.length > 0

  return (
    <header className="space-y-6 border-b border-border pb-8 sm:pb-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects?type=${project.type}`}>
              {typeLabel}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[200px] sm:max-w-[360px] md:max-w-none truncate">
              {project.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Classification Eyebrow + H1 + Subtitle + Summary */}
      <div className="space-y-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrowParts.join(" · ")}
        </p>

        <h1 className="max-w-[26ch] font-sans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight break-words">
          {project.title}
        </h1>

        {project.subtitle && (
          <p className="max-w-[68ch] font-sans text-base sm:text-xl font-normal text-foreground/90 leading-snug">
            {project.subtitle}
          </p>
        )}

        {project.summary && (
          <p className="max-w-[72ch] font-sans text-base text-muted-foreground leading-relaxed text-justify">
            {project.summary}
          </p>
        )}

        {project.outcome && (
          <p className="max-w-[72ch] border-l-2 border-primary/60 pl-3 font-sans text-sm text-foreground/90 text-justify">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
              Outcome:
            </span>
            {project.outcome}
          </p>
        )}
      </div>

      {/* Compact Primary Metadata Row (Date, Role, Status - rendered once, omitted if absent) */}
      {hasInlineMeta && (
        <dl
          aria-label="Project metadata"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 font-mono text-xs text-muted-foreground"
        >
          {periodLabel && (
            <div className="inline-flex items-center gap-1.5">
              <dt className="sr-only">Period</dt>
              <CalendarIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <dd className="text-foreground">{periodLabel}</dd>
            </div>
          )}

          {roleLabel && (
            <div className="inline-flex items-center gap-1.5">
              <dt className="sr-only">Role</dt>
              <UserIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <dd className="font-sans text-xs sm:text-sm text-foreground">{roleLabel}</dd>
            </div>
          )}

          {statusLabel && (
            <div className="inline-flex items-center gap-1.5">
              <dt className="sr-only">Status</dt>
              <CheckCircle2Icon className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <dd className="text-foreground">{statusLabel}</dd>
            </div>
          )}

          {updatedLabel && (
            <div className="inline-flex items-center gap-1.5">
              <dt className="font-mono text-xs text-muted-foreground">Updated:</dt>
              <dd className="text-foreground">{updatedLabel}</dd>
            </div>
          )}
        </dl>
      )}

      {/* Primary Actions + Low-Emphasis Tools/Tags Row */}
      {hasActionsOrTech && (
        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {primaryActions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              {primaryActions.map((action, index) => (
                <a
                  key={action.url}
                  href={action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex min-h-[38px] sm:min-h-[34px] items-center gap-1.5 rounded-sm border px-3 py-1.5 font-mono text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    index === 0
                      ? "border-primary bg-primary text-primary-foreground hover:opacity-90"
                      : "border-border bg-surface text-foreground hover:border-primary/50 hover:bg-muted"
                  )}
                >
                  <span>{action.label}</span>
                  {action.format && (
                    <span
                      className={cn(
                        "rounded-sm px-1 py-0.5 text-[10px] uppercase",
                        index === 0
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-background text-muted-foreground"
                      )}
                    >
                      {action.format}
                    </span>
                  )}
                  <ArrowUpRightIcon className="size-3.5 shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}

          {techItems.length > 0 && (
            <div
              aria-label="Technologies and domains"
              className="flex flex-wrap items-center gap-1.5"
            >
              {techItems.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="rounded-sm border-border bg-surface/60 px-2 py-0.5 font-mono text-xs font-normal text-muted-foreground"
                >
                  {item}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Optional Genuine Cover Figure */}
      {coverImage && (
        <figure className="pt-2">
          <div className="overflow-hidden rounded-sm border border-border bg-surface">
            <Image
              src={coverImage.src}
              alt={coverImage.alt}
              width={coverImage.dims.width}
              height={coverImage.dims.height}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className={cn(
                "w-full",
                coverImage.fit === "contain"
                  ? "max-h-[520px] object-contain bg-background p-2 sm:p-4"
                  : "max-h-[460px] object-cover"
              )}
            />
          </div>
          {coverImage.caption && (
            <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
              {coverImage.caption}
            </figcaption>
          )}
        </figure>
      )}
    </header>
  )
}
