import Link from "next/link"
import { ContactSection } from "@/components/contact/contact-section"
import { HeroSection } from "@/components/hero/hero-section"
import { Container } from "@/components/layout/container"
import { FeaturedBento } from "@/components/projects/featured-bento"
import { Badge } from "@/components/ui/badge"
import { getFeatured } from "@/lib/content"
import { getPublicImageDimensions } from "@/lib/image-dimensions"

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Fullscreen Hero Section */}
      <HeroSection />

      {/* Main Content below Hero */}
      <Container className="space-y-20 py-10 lg:py-14">
        {/* Featured Projects Bento Section */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="space-y-8 border-t border-border pt-12 lg:pt-16"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                SELECTED WORK · 5 FEATURED PROJECTS
              </p>
              <h2
                id="projects-heading"
                className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Featured Hardware &amp; Systems
              </h2>
              <p className="max-w-[72ch] text-sm text-muted-foreground sm:text-base">
                Physical prototypes, embedded firmware, and engineering case studies.
              </p>
            </div>

            <Link
              href="/projects"
              className="group flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>VIEW ALL PROJECTS (10+)</span>
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
                EXPERIENCE &amp; LEADERSHIP
              </p>
              <h2
                id="experiences-heading"
                className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Experience &amp; Leadership
              </h2>
              <p className="max-w-[72ch] text-sm text-muted-foreground sm:text-base">
                Leadership roles, technical management, and business operations.
              </p>
            </div>

            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-1.5 font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>VIEW FULL RÉSUMÉ</span>
              <span className="text-[10px] text-primary" aria-hidden="true">↗</span>
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
    </>
  )
}
