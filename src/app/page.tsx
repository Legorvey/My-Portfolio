import Image from "next/image"
import Link from "next/link"
import { ContactSection } from "@/components/contact/contact-section"
import { Container } from "@/components/layout/container"
import { getPublicImageDimensions } from "@/components/mdx/mdx-components"
import { Badge } from "@/components/ui/badge"
import { getFeatured } from "@/lib/content"
import { formatPeriod, formatProjectTypeLabel } from "@/lib/utils"

const HERO_METRICS = [
  {
    value: "4",
    suffix: "th",
    label: "Semester EE Student",
    context: "Padjadjaran University (Unpad)",
  },
  {
    value: "70",
    suffix: "%",
    label: "ROI Achieved",
    context: "Matcha Craft Expansion",
  },
  {
    value: "230",
    suffix: "+",
    label: "National Participants",
    context: "Futura Robotics & Seminar",
  },
] as const

const EXPERIENCES_TIMELINE = [
  {
    date: "Jan 2026 — Present",
    badge: "Organization",
    title: "Head of Kominfo · HMTE Unpad",
    description:
      "Directing strategy for External Relations and Media departments. Optimizing internal workflows, focusing on narrative-driven copywriting, and managing external university relations to strengthen the organization's digital and public presence.",
  },
  {
    date: "2026",
    badge: "Business",
    title: "Co-Founder · Matcha Craft Expansion",
    description:
      "Lead the branch expansion in Tasikmalaya. Managed end-to-end bazaar operations and financial tracking, successfully hitting a 70% ROI through disciplined execution and aggressive sales strategies.",
  },
  {
    date: "Feb — Nov 2025",
    badge: "Event Management",
    title: "Vice Project Officer · Futura National Event",
    description:
      "Managed a 9-month operational timeline for HMTE's largest external megaproject. Scaled the National Robotics Competition capacity by 60%, orchestrating logistics for 230+ participants and executing a high-level Tech Seminar bridging academic and industry experts.",
  },
  {
    date: "Nov '24 — Feb '25",
    badge: "Event Management",
    title: "Project Officer · PKMT Goes to School",
    description:
      "Revived a discontinued flagship roadshow across 25 schools. Secured IDR 10M in sponsorships within an accelerated 3-week timeline, exceeding participant targets by 53% and earning official local press coverage.",
  },
] as const

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://adityac.dev/#website",
      url: "https://adityac.dev",
      name: "Aditya Chandrasa",
      description:
        "Portfolio of Aditya Chandrasa. Electrical Engineering Student at Unpad specializing in hardware logic, data analytics, and real-world business execution.",
      publisher: {
        "@id": "https://adityac.dev/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://adityac.dev/#person",
      name: "Aditya Chandrasa",
      alternateName: ["Aditya Cakti Chandrasa", "Aditya Cakti"],
      url: "https://adityac.dev",
      image: "https://adityac.dev/images/web-thumbnail.png",
      jobTitle: "Electrical Engineering Student",
      sameAs: [
        "https://linkedin.com/in/adityachandrasa",
        "https://github.com/Legorvey",
      ],
    },
  ],
}

export default function HomePage() {
  const featuredProjects = getFeatured()

  return (
    <Container className="space-y-16 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero Section */}
      <section id="hero" aria-labelledby="hero-heading" className="space-y-8">
        <div className="space-y-3">
          <div className="h-0.5 w-10 bg-primary" aria-hidden="true" />
          <h1
            id="hero-heading"
            className="font-sans text-xl font-semibold tracking-tight text-foreground"
          >
            Aditya Chandrasa
          </h1>
          <p className="font-mono text-sm font-medium text-foreground">
            Building Logic <span className="text-primary">from</span> Schematic{" "}
            <span className="text-primary">to</span> Hardware
          </p>
          <p className="max-w-[72ch] text-base text-muted-foreground">
            Electrical Engineering student focused on practical logic behind physical systems. I build prototypes that work in the lab and stay reliable in the field.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {HERO_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-sm border border-border bg-surface p-4"
            >
              <div className="font-mono text-xl font-semibold text-foreground">
                {metric.value}
                <span className="text-sm text-primary">{metric.suffix}</span>
              </div>
              <div className="mt-1 font-sans text-sm font-medium text-foreground">
                {metric.label}
              </div>
              <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                {metric.context}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experiences Section */}
      <section
        id="experiences"
        aria-labelledby="experiences-heading"
        className="border-t border-border pt-12"
      >
        <div className="mb-6">
          <h2
            id="experiences-heading"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            EXPERIENCES
          </h2>
          <p className="mt-1 max-w-[72ch] text-base text-foreground">
            Operational timeline and leadership milestones.
          </p>
        </div>

        <div className="divide-y divide-border rounded-sm border border-border bg-background">
          {EXPERIENCES_TIMELINE.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 gap-3 p-4 md:grid-cols-12 md:gap-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 md:col-span-4 md:flex-col md:justify-start">
                <span className="font-mono text-xs text-muted-foreground">
                  {item.date}
                </span>
                <Badge variant="outline">{item.badge}</Badge>
              </div>
              <div className="space-y-1.5 md:col-span-8">
                <h3 className="font-sans text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="max-w-[72ch] text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline"
          >
            Download Full Résumé <span aria-hidden="true">➔</span>
          </a>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="border-t border-border pt-12"
      >
        <div className="mb-6">
          <h2
            id="projects-heading"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            PROJECTS
          </h2>
          <p className="mt-1 max-w-[72ch] text-base text-foreground">
            Hardware architecture, systems, and execution case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => {
            const dims = project.thumbnail
              ? getPublicImageDimensions(project.thumbnail)
              : null

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-colors duration-150 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {project.thumbnail && dims && (
                  <div className="border-b border-border bg-background">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={dims.width}
                      height={dims.height}
                      className="h-44 w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant="default">
                        {formatProjectTypeLabel(project.type)}
                      </Badge>
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatPeriod(project.start, project.end)}
                      </span>
                    </div>
                    <h3 className="font-sans text-base font-semibold text-foreground group-hover:text-primary">
                      {project.title}
                    </h3>
                    {project.summary && (
                      <p className="text-sm text-muted-foreground">
                        {project.summary}
                      </p>
                    )}
                  </div>

                  {(project.tools && project.tools.length > 0) ||
                  (project.tags && project.tags.length > 0) ? (
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
                      {(project.tools && project.tools.length > 0
                        ? project.tools
                        : project.tags ?? []
                      ).map((label) => (
                        <Badge key={label} variant="outline">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline"
          >
            View Full Deployment Archive <span aria-hidden="true">➔</span>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </Container>
  )
}
