import type { Metadata } from "next"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { ProjectsTable } from "@/components/projects/projects-table"
import { getProjects, type ProjectFrontmatter } from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects | Aditya Chandrasa",
  description:
    "Portfolio of Aditya Cakti Chandrasa. Electrical Engineering Student at Unpad specializing in hardware logic, embedded systems, and technical leadership.",
  openGraph: {
    title: "Projects | Aditya Chandrasa",
    description:
      "A complete archive of hardware systems, technical projects, and organizational leadership by Aditya Chandrasa.",
    url: "https://adityac.dev/projects",
    images: ["https://adityac.dev/images/web-thumbnail.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://adityac.dev/projects",
  },
}

export default function ProjectsPage() {
  const projects: ProjectFrontmatter[] = getProjects().map((project) => ({
    title: project.title,
    slug: project.slug,
    type: project.type,
    summary: project.summary,
    role: project.role,
    start: project.start,
    end: project.end,
    status: project.status,
    tools: project.tools,
    tags: project.tags,
    links: project.links,
    thumbnail: project.thumbnail,
    featured: project.featured,
  }))

  return (
    <Container className="space-y-12 py-10">
      <header className="space-y-2 border-b border-border pb-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
          Complete Index of Technical Projects
        </p>
        <h1 className="font-sans text-xl font-semibold tracking-tight text-foreground">
          Project Archive
        </h1>
        <p className="max-w-[72ch] text-base text-muted-foreground">
          A comprehensive record of hardware systems, embedded firmware, research, and organizational initiatives. Filter by domain or sort chronologically.
        </p>
      </header>

      <section aria-label="Projects index">
        <Suspense
          fallback={
            <div className="rounded-sm border border-border bg-surface p-6 font-mono text-xs text-muted-foreground">
              Loading project archive...
            </div>
          }
        >
          <ProjectsTable projects={projects} />
        </Suspense>
      </section>
    </Container>
  )
}
