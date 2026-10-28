import Link from "next/link"
import { ExperienceTimeline } from "@/components/experience/experience-timeline"
import { HeroSection } from "@/components/hero/hero-section"
import { Container } from "@/components/layout/container"
import { TextSpotlight } from "@/components/ui/text-spotlight"
import { FeaturedBento } from "@/components/projects/featured-bento"
import { getFeatured } from "@/lib/content"
import { getPublicImageDimensions } from "@/lib/image-dimensions"

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
      <Container className="space-y-28 py-16 sm:space-y-32 sm:py-20 lg:space-y-36 lg:py-24">
        {/* Featured Projects Section */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="space-y-8"
        >
          <div className="flex items-baseline justify-between">
            <h2 id="projects-heading" className="inline-flex">
              <TextSpotlight
                textClassName="font-sans text-3xl font-bold tracking-tight sm:text-4xl"
                baseClassName="text-muted-foreground/45"
                spotlightClassName="text-foreground"
                spotlightSize={120}
                spotlightArea={65}
                animateOnPhone={true}
              >
                <span>Some projects</span>
                <span className="text-primary">.</span>
              </TextSpotlight>
            </h2>

            <Link
              href="/projects"
              className="group flex w-fit items-center gap-1 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>All projects</span>
              <span
                className="text-primary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          </div>

          <FeaturedBento projects={featuredProjects} />
        </section>

        {/* Experiences Section */}
        <section
          id="experiences"
          aria-labelledby="experiences-heading"
          className="space-y-8"
        >
          <div className="flex items-baseline justify-between">
            <h2
              id="experiences-heading"
              className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Experience<span className="text-primary">.</span>
            </h2>

            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-1 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>Full résumé</span>
              <span
                className="text-primary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>

          <ExperienceTimeline />
        </section>
    </Container>
    </>
  )
}
