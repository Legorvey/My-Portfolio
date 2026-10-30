import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Suspense } from "react"
import remarkGfm from "remark-gfm"
import { Container } from "@/components/layout/container"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { Badge } from "@/components/ui/badge"
import { TextSpotlight } from "@/components/ui/text-spotlight"
import { getProject, getProjects } from "@/lib/content"
import { getPublicImageDimensions } from "@/lib/image-dimensions"
import { formatPeriod, formatProjectTypeLabel } from "@/lib/utils"

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
  return (
    <Suspense
      fallback={
        <Container className="pt-20 sm:pt-24 pb-12 sm:pb-16">
          <p className="font-mono text-xs text-muted-foreground">
            Loading project...
          </p>
        </Container>
      }
    >
      <ProjectDetail params={params} />
    </Suspense>
  )
}

async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const thumbnailDims = project.thumbnail
    ? await getPublicImageDimensions(project.thumbnail)
    : null

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
        dateModified:
          project.end && project.end !== "present"
            ? `${project.end}-01`
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
      <Container className="space-y-10 pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Semantic Breadcrumbs (Datasheet style) */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground/50">
              /
            </li>
            <li>
              <Link
                href="/projects"
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground/50">
              /
            </li>
            <li
              aria-current="page"
              className="font-medium text-foreground max-w-[260px] sm:max-w-none truncate"
            >
              {project.title}
            </li>
          </ol>
        </nav>

      {/* Infobox-style Datasheet Header */}
      <header className="rounded-sm border border-border bg-surface p-6">
        <div className="space-y-2 border-b border-border pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">
              {formatProjectTypeLabel(project.type)}
            </Badge>
            {project.status && (
              <Badge variant="secondary">{project.status}</Badge>
            )}
          </div>
          <h1 className="inline-flex">
            <TextSpotlight
              textClassName="font-sans text-xl font-semibold tracking-tight sm:text-2xl"
              baseClassName="text-muted-foreground/45"
              spotlightClassName="text-foreground"
              spotlightSize={130}
              spotlightArea={65}
              animateOnPhone={true}
            >
              <span>{project.title}</span>
            </TextSpotlight>
          </h1>
          {project.summary && (
            <p className="max-w-[72ch] text-base text-muted-foreground">
              {project.summary}
            </p>
          )}
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Type
            </dt>
            <dd className="mt-1 font-mono text-xs text-foreground">
              {formatProjectTypeLabel(project.type)}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 font-sans text-sm text-foreground">
              {project.role ?? "—"}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Period
            </dt>
            <dd className="mt-1 font-mono text-xs text-foreground">
              {formatPeriod(project.start, project.end)}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1 font-mono text-xs text-foreground">
              {project.status || "—"}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tools
            </dt>
            <dd className="mt-1.5">
              {project.tools && project.tools.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
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
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </dt>
            <dd className="mt-1.5">
              {project.tags && project.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="font-mono text-xs text-muted-foreground">
                  —
                </span>
              )}
            </dd>
          </div>

          {project.links && project.links.length > 0 && (
            <div className="border-t border-border pt-4 sm:col-span-2 md:col-span-4">
              <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Links
              </dt>
              <dd className="mt-1.5 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    {link.label} ➔
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {project.thumbnail && thumbnailDims && (
          <div className="mt-6 overflow-hidden rounded-sm border border-border bg-background">
            <Image
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              width={thumbnailDims.width}
              height={thumbnailDims.height}
              priority
              className="max-h-96 w-full object-cover"
            />
          </div>
        )}
      </header>

      {/* MDX Case Study Body */}
      <article className="max-w-[72ch]">
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>
    </Container>
    </>
  )
}
