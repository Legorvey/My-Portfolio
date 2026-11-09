"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { StaggerIn } from "@/components/motion/stagger-in"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { areCaseStudiesEnabled } from "@/lib/case-studies-config"
import type { ProjectFrontmatter, ProjectType } from "@/lib/content"
import { formatPeriod, formatProjectTypeLabel } from "@/lib/utils"

// Note: Defined locally so this client component does not pull server-only node:fs from content.ts
const ALL_PROJECT_TYPES: readonly ProjectType[] = [
  "hardware",
  "software",
  "research",
  "event",
  "business",
  "work",
]

type FilterType = "all" | ProjectType
type SortDirection = "desc" | "asc"

function isValidProjectType(value: string | null): value is ProjectType {
  if (!value) return false
  return (ALL_PROJECT_TYPES as readonly string[]).includes(value)
}

interface ProjectsTableProps {
  projects: ProjectFrontmatter[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const caseStudiesEnabled = areCaseStudiesEnabled()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryType = searchParams.get("type")
  const selectedType: FilterType = isValidProjectType(queryType)
    ? queryType
    : "all"

  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("desc")

  const typeCounts = React.useMemo(() => {
    const counts = new Map<ProjectType, number>()
    for (const project of projects) {
      counts.set(project.type, (counts.get(project.type) ?? 0) + 1)
    }
    return ALL_PROJECT_TYPES.filter((type) => (counts.get(type) ?? 0) > 0).map(
      (type) => ({
        value: type,
        label: formatProjectTypeLabel(type),
        count: counts.get(type) ?? 0,
      })
    )
  }, [projects])

  const filteredAndSorted = React.useMemo(() => {
    const filtered =
      selectedType === "all"
        ? projects
        : projects.filter((project) => project.type === selectedType)

    return [...filtered].sort((a, b) => {
      if (a.start && b.start) {
        if (a.start !== b.start) {
          return sortDirection === "desc"
            ? b.start.localeCompare(a.start)
            : a.start.localeCompare(b.start)
        }
        return a.slug.localeCompare(b.slug)
      }
      if (a.start && !b.start) return -1
      if (!a.start && b.start) return 1
      return a.slug.localeCompare(b.slug)
    })
  }, [projects, selectedType, sortDirection])

  function handleFilterChange(groupValue: string[]) {
    const val = groupValue[0]
    const next: FilterType = isValidProjectType(val) ? val : "all"
    const params = new URLSearchParams(searchParams.toString())

    if (next === "all") {
      params.delete("type")
    } else {
      params.set("type", next)
    }

    const queryString = params.toString()
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
  }

  function toggleSortDirection() {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-sm border border-border bg-surface p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:overflow-visible sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <ToggleGroup
            variant="outline"
            size="sm"
            value={[selectedType]}
            onValueChange={handleFilterChange}
            aria-label="Filter projects by type"
            className="flex-nowrap sm:flex-wrap"
          >
            <ToggleGroupItem value="all" className="h-8 min-h-[36px] px-2.5 sm:h-7 sm:min-h-0 sm:px-2">
              All ({projects.length})
            </ToggleGroupItem>
            {typeCounts.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className="h-8 min-h-[36px] px-2.5 sm:h-7 sm:min-h-0 sm:px-2"
              >
                {option.label} ({option.count})
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end shrink-0">
          <span className="font-mono text-xs text-muted-foreground">
            {filteredAndSorted.length} of {projects.length} entries
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleSortDirection}
            className="h-8 min-h-[36px] sm:h-7 sm:min-h-0"
            aria-label={`Sort by period (${sortDirection === "desc" ? "newest first" : "oldest first"})`}
          >
            {sortDirection === "desc" ? "Newest ↓" : "Oldest ↑"}
          </Button>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="rounded-sm border border-border bg-surface p-6 font-mono text-xs text-muted-foreground">
          No entries match the selected filter ({formatProjectTypeLabel(selectedType)}).
        </div>
      ) : (
        <StaggerIn selector="tbody > tr, article">
          {/* Desktop Table (>= md) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead
                    aria-sort={
                      sortDirection === "desc" ? "descending" : "ascending"
                    }
                  >
                    <button
                      type="button"
                      onClick={toggleSortDirection}
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Period {sortDirection === "desc" ? "↓" : "↑"}
                    </button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tools</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSorted.map((project) => (
                  <TableRow key={project.slug}>
                    <TableCell className="max-w-xs">
                      {caseStudiesEnabled ? (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-sans text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {project.title}
                        </Link>
                      ) : (
                        <span className="font-sans text-sm font-medium text-foreground">
                          {project.title}
                        </span>
                      )}
                      {project.summary && (
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {project.summary}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="default">
                        {formatProjectTypeLabel(project.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-sans text-xs text-muted-foreground">
                      {project.role ?? "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                      {formatPeriod(project.start, project.end)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {project.status ? (
                        <Badge variant="secondary">{project.status}</Badge>
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {project.tools && project.tools.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {project.tools.map((tool) => (
                            <Badge key={tool} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Stacked Entries (< md) */}
          <div className="divide-y divide-border rounded-sm border border-border bg-background md:hidden">
            {filteredAndSorted.map((project) => (
              <article key={project.slug} className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  {caseStudiesEnabled ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-sans text-sm font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring inline-flex items-center gap-1.5 py-1 -my-1"
                    >
                      <span>{project.title}</span>
                      <span className="text-primary text-xs" aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  ) : (
                    <span className="font-sans text-sm font-semibold text-foreground inline-flex items-center py-1 -my-1">
                      {project.title}
                    </span>
                  )}
                  <Badge variant="default" className="shrink-0">
                    {formatProjectTypeLabel(project.type)}
                  </Badge>
                </div>

                {project.summary && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {project.summary}
                  </p>
                )}

                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-border pt-3 text-xs">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Role
                    </dt>
                    <dd className="mt-0.5 text-foreground break-words text-[11px] xs:text-xs">
                      {project.role ?? "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Period
                    </dt>
                    <dd className="mt-0.5 font-mono text-[11px] xs:text-xs text-foreground">
                      {formatPeriod(project.start, project.end)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Status
                    </dt>
                    <dd className="mt-0.5">
                      {project.status ? (
                        <Badge variant="secondary">{project.status}</Badge>
                      ) : (
                        <span className="font-mono text-muted-foreground">
                          —
                        </span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Tools
                    </dt>
                    <dd className="mt-0.5">
                      {project.tools && project.tools.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {project.tools.map((tool) => (
                            <Badge key={tool} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="font-mono text-muted-foreground">
                          —
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </StaggerIn>
      )}
    </div>
  )
}
