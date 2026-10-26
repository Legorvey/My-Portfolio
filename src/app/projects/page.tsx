import type { Metadata } from "next"
import { ContactSection } from "@/components/contact/contact-section"
import { Container } from "@/components/layout/container"
import { ProjectsTable } from "@/components/projects/projects-table"
import { getProjects, type ProjectFrontmatter } from "@/lib/content"

export const metadata: Metadata = {
  title: "Aditya Chandrasa | Deployment Archive",
  description:
    "Portfolio of Aditya Cakti Chandrasa. Electrical Engineering Student at Unpad specializing in hardware logic, data analytics, and real-world business execution.",
  openGraph: {
    title: "Aditya Chandrasa | Deployment Archive",
    description:
      "A complete log of hardware architecture, team leadership, and business scaling deployments by Aditya Chandrasa.",
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
    links: project.links,
    thumbnail: project.thumbnail,
    featured: project.featured,
  }))

  return (
    <Container className="space-y-12 py-10">
      <header className="space-y-2 border-b border-border pb-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
          Complete Log of Systems &amp; Executions
        </p>
        <h1 className="font-sans text-xl font-semibold tracking-tight text-foreground">
          Deployment Archive
        </h1>
        <p className="max-w-[72ch] text-base text-muted-foreground">
          A deep dive into the hardware I&apos;ve architected, the teams I&apos;ve led, and the businesses I&apos;ve scaled. Use the filters to explore specific domains.
        </p>
      </header>

      <section aria-label="Projects index">
        <ProjectsTable projects={projects} />
      </section>

      <ContactSection />
    </Container>
  )
}
