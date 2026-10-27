import Link from "next/link"
import { Container } from "@/components/layout/container"
import { BackToTop } from "@/components/ui/back-to-top"
import { VisitorBadge } from "@/components/ui/visitor-badge"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background py-12">
      <Container className="space-y-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Bio column */}
          <div className="space-y-4 md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-base font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              <span className="font-sans font-semibold">Aditya Chandrasa</span>
            </Link>
            <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
              Electrical Engineering student at Universitas Padjadjaran. Focused on hardware logic, embedded sensor ecosystems, and technical operations.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="rounded-sm border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted-foreground">
                Bandung / Tasikmalaya, ID
              </span>
              <span className="rounded-sm border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted-foreground">
                UTC+7
              </span>
            </div>
          </div>

          {/* Navigation & Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:col-span-7 md:justify-items-end">
            <div className="space-y-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Index
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#projects"
                    className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Featured Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Project Archive
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#experiences"
                    className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>Full Résumé</span>
                    <span className="text-xs text-primary" aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Connect
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/Legorvey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>GitHub</span>
                    <span className="text-xs text-primary" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/adityachandrasa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>LinkedIn</span>
                    <span className="text-xs text-primary" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:aditchandrasa1@gmail.com"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>Email Inquiries</span>
                    <span className="text-xs text-primary" aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Diegovz-inspired bottom bar with visitor counter & back to top */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Aditya Cakti Chandrasa. Engineered with Next.js &amp; Tailwind CSS.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <VisitorBadge />
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  )
}
