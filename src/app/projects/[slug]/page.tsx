import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Suspense } from "react"
import remarkGfm from "remark-gfm"
import { Container } from "@/components/layout/container"
import { createMdxComponents, sanitizeUrl } from "@/components/mdx/mdx-components"
import { ProjectDossierHeader } from "@/components/projects/project-dossier-header"
import { ProjectResources } from "@/components/projects/project-resources"
import { ProjectTOC } from "@/components/projects/project-toc"
import { DossierFooter } from "@/components/projects/related-projects"
import { areCaseStudiesEnabled } from "@/lib/case-studies-config"
import { getProject, getProjects, type ProjectFrontmatter } from "@/lib/content"
import { getPublicImageDimensions } from "@/lib/image-dimensions"
import { extractTocFromMdx } from "@/lib/project-toc"
import {
  resolveProjectResources,
  selectPrimaryHeaderActions,
} from "@/lib/resource-utils"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  if (!areCaseStudiesEnabled()) {
    return {
      title: "404 | Project Not Found",
    }
  }

  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {
      title: "404 | Project Not Found",
    }
  }

  const description =
    project.summary ?? `Case study for ${project.title} by Aditya Chandrasa.`
  const ogImage = project.thumbnail
    ? `https://adityac.dev${project.thumbnail}`
    : "https://adityac.dev/images/web-thumbnail.png"

  return {
    title: project.title,
    description,
    openGraph: {
      type: "article",
      title: `${project.title} | Aditya Chandrasa`,
      description,
      url: `https://adityac.dev/projects/${project.slug}`,
      publishedTime: project.start ? `${project.start}-01` : undefined,
      authors: ["Aditya Chandrasa"],
      tags: project.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - Aditya Chandrasa`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aditya Chandrasa`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  }
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  if (!areCaseStudiesEnabled()) {
    notFound()
  }

  return (
    <Suspense
      fallback={
        <Container className="pt-20 sm:pt-24 pb-12 sm:pb-16">
          <p className="font-mono text-xs text-muted-foreground">
            Loading project dossier...
          </p>
        </Container>
      }
    >
      <ProjectDetail params={params} />
    </Suspense>
  )
}

async function ProjectDetail({ params }: ProjectPageProps) {
  if (!areCaseStudiesEnabled()) {
    notFound()
  }

  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const allProjects: ProjectFrontmatter[] = getProjects().map(
    ({ content: _content, ...rest }) => {
      void _content
      return rest
    }
  )

  const resources = resolveProjectResources({
    resources: project.resources,
    links: project.links,
  })
  const primaryActions = selectPrimaryHeaderActions(resources, 3)
  const tocItems = extractTocFromMdx(project.content)

  // Resolve optional cover image:
  // 1. Explicit `project.cover` takes precedence.
  // 2. Otherwise, if `project.thumbnail` is present AND is not already embedded in the MDX body,
  //    render it with safe `contain` sizing for technical projects (hardware/software/research)
  //    and `cover` for event/business photography.
  const isThumbnailInMdx =
    project.thumbnail && project.content.includes(project.thumbnail)

  const rawCoverSource = project.cover
    ? project.cover
    : project.thumbnail && !isThumbnailInMdx
      ? {
          src: project.thumbnail,
          alt: `${project.title} overview`,
          fit:
            project.type === "event" || project.type === "business"
              ? ("cover" as const)
              : ("contain" as const),
        }
      : null

  const safeCoverSrc = rawCoverSource ? sanitizeUrl(rawCoverSource.src) : "#"
  const coverDims =
    rawCoverSource && safeCoverSrc !== "#"
      ? await getPublicImageDimensions(safeCoverSrc)
      : null

  const coverImage =
    rawCoverSource && safeCoverSrc !== "#" && coverDims
      ? {
          src: safeCoverSrc,
          alt: rawCoverSource.alt,
          caption: rawCoverSource.caption,
          fit: rawCoverSource.fit,
          dims: coverDims,
        }
      : null

  const hasToc = tocItems.length > 0

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `https://adityac.dev/projects/${project.slug}/#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `https://adityac.dev/projects/${project.slug}`,
          },
        ],
      },
      {
        "@type": ["TechArticle", "CreativeWork"],
        "@id": `https://adityac.dev/projects/${project.slug}/#article`,
        headline: project.title,
        description:
          project.summary ??
          `Technical case study for ${project.title} by Aditya Chandrasa.`,
        image: project.thumbnail
          ? `https://adityac.dev${project.thumbnail}`
          : "https://adityac.dev/images/web-thumbnail.png",
        datePublished: project.start ? `${project.start}-01` : undefined,
        dateModified: project.updated
          ? `${project.updated}-01`
          : undefined,
        author: {
          "@type": "Person",
          name: "Aditya Chandrasa",
          url: "https://adityac.dev",
        },
        publisher: {
          "@id": "https://adityac.dev/#person",
        },
        isPartOf: {
          "@id": "https://adityac.dev/#website",
        },
        keywords: project.tags?.join(", "),
        about: project.tools,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e"),
        }}
      />
      <Container className="space-y-8 sm:space-y-12 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <ProjectDossierHeader
          project={project}
          primaryActions={primaryActions}
          coverImage={coverImage}
        />

        {/* Mobile/Tablet Resource & TOC Access (below lg breakpoint) */}
        <div className="space-y-3.5 lg:hidden">
          <ProjectResources
            resources={resources}
            headingId="project-resources-mobile-heading"
          />
          {hasToc && <ProjectTOC items={tocItems} variant="mobile" />}
        </div>

        {/* Responsive Dossier Two-Column Grid on Desktop (>= lg) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_288px] xl:grid-cols-[minmax(0,760px)_304px] lg:justify-between lg:gap-12 xl:gap-14">
          <div className="min-w-0">
            <article className="min-w-0">
              <MDXRemote
                source={project.content}
                components={createMdxComponents()}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </article>

            <DossierFooter
              currentProject={project}
              allProjects={allProjects}
            />
          </div>

          <aside
            aria-label="Project navigation and resources"
            className="hidden lg:block"
          >
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-3.5 overflow-y-auto">
              <ProjectResources
                resources={resources}
                headingId="project-resources-desktop-heading"
              />
              {hasToc && <ProjectTOC items={tocItems} variant="desktop" />}
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
