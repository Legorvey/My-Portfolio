import type { Metadata } from "next"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { ProjectsTable } from "@/components/projects/projects-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { areCaseStudiesEnabled } from "@/lib/case-studies-config"
import { getProjects, type ProjectFrontmatter } from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A complete archive of hardware systems, software architecture, technical research, and organizational leadership by Aditya Chandrasa.",
  openGraph: {
    type: "website",
    title: "Projects | Aditya Chandrasa",
    description:
      "A complete archive of hardware systems, software architecture, technical research, and organizational leadership by Aditya Chandrasa.",
    url: "https://adityac.dev/projects",
    images: [
      {
        url: "https://adityac.dev/images/web-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Project Archive - Aditya Chandrasa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Aditya Chandrasa",
    description:
      "A complete archive of hardware systems, software architecture, technical research, and organizational leadership by Aditya Chandrasa.",
    images: ["https://adityac.dev/images/web-thumbnail.png"],
  },
  alternates: {
    canonical: "/projects",
  },
}

export default function ProjectsPage() {
  const projects: ProjectFrontmatter[] = getProjects().map(
    ({ content: _content, ...rest }) => {
      void _content
      return rest
    }
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://adityac.dev/projects/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://adityac.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: "https://adityac.dev/projects",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": "https://adityac.dev/projects/#webpage",
        url: "https://adityac.dev/projects",
        name: "Project Archive | Aditya Chandrasa",
        description:
          "A comprehensive record of hardware systems, software architecture, technical research, and organizational initiatives.",
        breadcrumb: { "@id": "https://adityac.dev/projects/#breadcrumb" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: areCaseStudiesEnabled()
              ? `https://adityac.dev/projects/${project.slug}`
              : `https://adityac.dev/projects`,
            name: project.title,
            description: project.summary,
          })),
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e"),
        }}
      />
      <Container className="space-y-10 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Projects</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <header className="space-y-3 border-b border-border pb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Engineering Dossiers & Archive
          </p>
          <h1 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Project Archive<span className="text-primary">.</span>
          </h1>
          <p className="max-w-[72ch] text-base text-muted-foreground">
            Projects, engineering notes, and original documentation across hardware systems, software architecture, technical research, and organizational initiatives.
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
    </>
  )
}
