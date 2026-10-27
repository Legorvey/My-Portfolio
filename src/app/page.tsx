import Link from "next/link"
import { ContactSection } from "@/components/contact/contact-section"
import { Container } from "@/components/layout/container"
import { StaggerIn } from "@/components/motion/stagger-in"
import { FeaturedBento } from "@/components/projects/featured-bento"
import { Badge } from "@/components/ui/badge"
import { getFeatured } from "@/lib/content"
import { getPublicImageDimensions } from "@/lib/image-dimensions"

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

export default async function HomePage() {
  const featuredProjects = await Promise.all(
    getFeatured().map(async (project) => ({
      ...project,
      dims: project.thumbnail
        ? await getPublicImageDimensions(project.thumbnail)
        : null,
    }))
  )

  return (
    <Container className="space-y-24 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero Section */}
      <section id="hero" aria-labelledby="hero-heading" className="pt-4 sm:pt-8">
        <StaggerIn className="space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="font-semibold text-foreground">ELECTRICAL ENGINEERING</span>
              <span className="text-muted-foreground">·</span>
              <span>HARDWARE LOGIC &amp; SYSTEMS</span>
            </div>

            <div className="space-y-4">
              <h1
                id="hero-heading"
                className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-6xl max-w-4xl"
              >
                Building Logic <span className="text-primary font-normal">from</span> Schematic{" "}
                <span className="text-primary font-normal">to</span> Hardware<span className="text-primary">.</span>
              </h1>
              <p className="max-w-[72ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                Electrical Engineering student at Universitas Padjadjaran focused on practical logic behind physical systems. I design circuits that survive outside the laboratory and build scalable technical operations.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-mono text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>VIEW FEATURED WORK</span>
                <span aria-hidden="true">↓</span>
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-5 py-2.5 font-mono text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>EXPLORE ARCHIVE</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 font-mono text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>RÉSUMÉ</span>
                <span className="text-[10px] text-primary" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Key Impact Metrics */}
          <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3">
            {HERO_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-sm border border-border bg-surface p-5 transition-colors hover:border-primary/50"
              >
                <div className="font-mono text-2xl font-bold text-foreground">
                  {metric.value}
                  <span className="text-base text-primary">{metric.suffix}</span>
                </div>
                <div className="mt-1 font-sans text-sm font-semibold text-foreground">
                  {metric.label}
                </div>
                <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </StaggerIn>
      </section>

      {/* Featured Projects Bento Section */}
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="space-y-8 border-t border-border pt-16"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              SELECTED WORK · 5 HIGHLIGHTED DEPLOYMENTS
            </p>
            <h2
              id="projects-heading"
              className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Featured Hardware &amp; Systems
            </h2>
            <p className="max-w-[72ch] text-sm text-muted-foreground sm:text-base">
              A curated bento collection of physical prototypes, embedded firmware, and operational case studies.
            </p>
          </div>

          <Link
            href="/projects"
            className="group flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>VIEW FULL ARCHIVE (10+)</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        {/* Cohesive Bento Box */}
        <FeaturedBento projects={featuredProjects} />
      </section>

      {/* Experiences Section */}
      <section
        id="experiences"
        aria-labelledby="experiences-heading"
        className="space-y-8 border-t border-border pt-16"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              OPERATIONAL TIMELINE
            </p>
            <h2
              id="experiences-heading"
              className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Experiences &amp; Leadership
            </h2>
            <p className="max-w-[72ch] text-sm text-muted-foreground sm:text-base">
              Leadership milestones, technical management, and business expansion deployments.
            </p>
          </div>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>DOWNLOAD FULL RÉSUMÉ</span>
            <span aria-hidden="true">➔</span>
          </a>
        </div>

        <div className="divide-y divide-border rounded-sm border border-border bg-background">
          {EXPERIENCES_TIMELINE.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 gap-3 p-5 md:grid-cols-12 md:gap-6 transition-colors hover:bg-surface/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 md:col-span-4 md:flex-col md:justify-start">
                <span className="font-mono text-xs font-medium text-muted-foreground">
                  {item.date}
                </span>
                <Badge variant="outline">{item.badge}</Badge>
              </div>
              <div className="space-y-1.5 md:col-span-8">
                <h3 className="font-sans text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="max-w-[72ch] text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </Container>
  )
}
