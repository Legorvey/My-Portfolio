import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Container } from "@/components/layout/container"
import {
  getPublicImageDimensions,
  mdxComponents,
} from "@/components/mdx/mdx-components"
import { Badge } from "@/components/ui/badge"
import { getProject, getProjects } from "@/lib/content"
import { formatPeriod } from "@/lib/utils"

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
      title: "404 | Node Unreachable",
    }
  }

  const description =
    project.summary ?? `Case study for ${project.title} by Aditya Chandrasa.`
  const ogImage = project.thumbnail
    ? `https://adityac.dev${project.thumbnail}`
    : "https://adityac.dev/images/web-thumbnail.png"

  return {
    title: `${project.title} | Aditya Chandrasa`,
    description,
    openGraph: {
      title: `${project.title} | Aditya Chandrasa`,
      description,
      url: `https://adityac.dev/projects/${project.slug}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: `https://adityac.dev/projects/${project.slug}`,
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const thumbnailDims = project.thumbnail
    ? getPublicImageDimensions(project.thumbnail)
    : null

  return (
    <Container className="space-y-10 py-10">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 font-mono text-xs font-medium text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← Back to Deployment Archive
        </Link>
      </div>

      {/* Infobox-style Datasheet Header */}
      <header className="rounded-sm border border-border bg-surface p-6">
        <div className="space-y-2 border-b border-border pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{project.type}</Badge>
            {project.status && (
              <Badge variant="secondary">{project.status}</Badge>
            )}
          </div>
          <h1 className="font-sans text-xl font-semibold tracking-tight text-foreground">
            {project.title}
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
            <dd className="mt-1 font-mono text-xs uppercase text-foreground">
              {project.type}
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
              {project.status ?? "—"}
            </dd>
          </div>

          <div className="sm:col-span-2 md:col-span-4">
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
        <MDXRemote source={project.content} components={mdxComponents} />
      </article>
    </Container>
  )
}
