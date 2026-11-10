import Link from "next/link"
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Project, ProjectFrontmatter } from "@/lib/content"
import { formatPeriod, formatProjectTypeLabel } from "@/lib/utils"

export interface RelatedProjectsProps {
  currentProject: Project
  allProjects: readonly ProjectFrontmatter[]
  maxCount?: number
}

/**
 * Computes up to `maxCount` genuinely related projects based on shared tags,
 * shared tools, or matching project domain (`type`). Projects with zero overlap
 * are excluded rather than shown as filler.
 */
export function selectRelatedProjects(
  current: ProjectFrontmatter,
  candidates: readonly ProjectFrontmatter[],
  maxCount = 2
): ProjectFrontmatter[] {
  const currentTags = new Set(
    (current.tags ?? []).map((t) => t.toLowerCase())
  )
  const currentTools = new Set(
    (current.tools ?? []).map((t) => t.toLowerCase())
  )

  const scored = candidates
    .filter((candidate) => candidate.slug !== current.slug)
    .map((candidate) => {
      let score = 0
      if (candidate.type === current.type) {
        score += 2
      }
      for (const tag of candidate.tags ?? []) {
        if (currentTags.has(tag.toLowerCase())) {
          score += 3
        }
      }
      for (const tool of candidate.tools ?? []) {
        if (currentTools.has(tool.toLowerCase())) {
          score += 2
        }
      }
      return { candidate, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, maxCount).map((entry) => entry.candidate)
}

export function DossierFooter({
  currentProject,
  allProjects,
  maxCount = 2,
}: RelatedProjectsProps) {
  const related = selectRelatedProjects(currentProject, allProjects, maxCount)

  return (
    <footer className="mt-14 space-y-8 border-t border-border pt-8">
      {related.length > 0 && (
        <section aria-labelledby="related-projects-heading" className="space-y-4">
          <h2
            id="related-projects-heading"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Related dossiers
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col justify-between gap-3 rounded-sm border border-border bg-surface p-4 transition-colors hover:border-primary/50 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {formatProjectTypeLabel(project.type)}
                    </Badge>
                    <ArrowUpRightIcon
                      className="size-3.5 text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-sans text-sm font-semibold text-foreground group-hover:text-primary">
                    {project.title}
                  </h3>

                  {project.summary && (
                    <p className="line-clamp-2 font-sans text-xs text-muted-foreground leading-relaxed text-justify">
                      {project.summary}
                    </p>
                  )}
                </div>

                {project.start && (
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatPeriod(project.start, project.end)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/projects"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-sm border border-border bg-surface px-3.5 py-2 font-mono text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeftIcon className="size-3.5 shrink-0" aria-hidden="true" />
          <span>Back to all projects</span>
        </Link>
      </div>
    </footer>
  )
}
