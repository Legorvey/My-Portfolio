import type * as React from "react"
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  Code2Icon,
  CpuIcon,
  DatabaseIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  PresentationIcon,
} from "lucide-react"
import type { ProjectResource, ResourceKind } from "@/lib/content"
import {
  getResourceHostLabel,
  RESOURCE_KIND_LABELS,
} from "@/lib/resource-utils"
import { cn } from "@/lib/utils"

const KIND_ICONS: Record<ResourceKind, React.ComponentType<{ className?: string }>> = {
  repository: Code2Icon,
  documentation: BookOpenIcon,
  photos: ImageIcon,
  diagram: CpuIcon,
  report: FileTextIcon,
  dataset: DatabaseIcon,
  presentation: PresentationIcon,
  demo: GlobeIcon,
  download: DownloadIcon,
  other: ExternalLinkIcon,
}

export interface ProjectResourcesProps {
  resources: readonly ProjectResource[]
  className?: string
  headingId?: string
}

export function ProjectResources({
  resources,
  className,
  headingId = "project-resources-heading",
}: ProjectResourcesProps) {
  if (!resources || resources.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "rounded-sm border border-border bg-surface p-4",
        className
      )}
    >
      <h2
        id={headingId}
        className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Project resources
      </h2>

      <ul role="list" className="mt-3 divide-y divide-border">
        {resources.map((resource) => {
          const Icon = KIND_ICONS[resource.kind] ?? ExternalLinkIcon
          const hostLabel = getResourceHostLabel(resource.url)
          const kindLabel = RESOURCE_KIND_LABELS[resource.kind] ?? "Resource"
          const metaParts = [
            hostLabel,
            resource.format ?? kindLabel,
          ].filter(Boolean)

          return (
            <li key={resource.url} className="py-2.5 first:pt-0 last:pb-0">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-sm py-1 -my-1 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <div className="font-sans text-sm font-medium text-foreground group-hover:text-primary group-hover:underline underline-offset-4 break-words">
                      {resource.label}
                    </div>
                    {resource.description && (
                      <p className="font-sans text-xs text-muted-foreground leading-snug break-words">
                        {resource.description}
                      </p>
                    )}
                    {metaParts.length > 0 && (
                      <p className="font-mono text-xs text-muted-foreground/85">
                        {metaParts.join(" · ")}
                      </p>
                    )}
                  </div>
                </div>

                <ArrowUpRightIcon
                  className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
