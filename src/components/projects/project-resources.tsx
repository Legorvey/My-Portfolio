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
  FolderIcon,
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
  const hasResources = Boolean(resources && resources.length > 0)

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "rounded-xl border border-border bg-surface p-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <FolderIcon
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <h2
          id={headingId}
          className="font-sans text-sm font-medium text-foreground"
        >
          Project resources
        </h2>
      </div>

      {!hasResources ? (
        <div className="mt-3 border-t border-border/80 pt-3">
          <p className="font-sans text-xs leading-relaxed text-muted-foreground">
            No public resources linked yet.
          </p>
        </div>
      ) : (
        <ul
          role="list"
          className="mt-3 divide-y divide-border/80 border-t border-border/80"
        >
          {resources.map((resource) => {
            const Icon = KIND_ICONS[resource.kind] ?? ExternalLinkIcon
            const hostLabel = getResourceHostLabel(resource.url)
            const kindLabel = RESOURCE_KIND_LABELS[resource.kind] ?? "Resource"
            const providerMeta = [
              hostLabel,
              resource.format ?? kindLabel,
            ]
              .filter(Boolean)
              .join(" · ")
            const secondaryText = resource.description
              ? resource.format &&
                !resource.description
                  .toLowerCase()
                  .includes(resource.format.toLowerCase())
                ? `${resource.format} · ${resource.description}`
                : resource.description
              : providerMeta

            return (
              <li key={resource.url} className="py-2 first:pt-2.5 last:pb-0">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-1.5 flex items-start justify-between gap-3 rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex min-w-0 items-start gap-2.5">
                    <Icon
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <div className="font-sans text-[13px] font-medium leading-snug text-foreground transition-colors group-hover:text-primary break-words">
                        {resource.label}
                      </div>
                      {secondaryText && (
                        <p className="font-sans text-xs leading-snug text-muted-foreground break-words">
                          {secondaryText}
                        </p>
                      )}
                    </div>
                  </div>

                  <ArrowUpRightIcon
                    className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
