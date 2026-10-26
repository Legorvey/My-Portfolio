import Link from "next/link"
import { Container } from "@/components/layout/container"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-background py-10">
      <Container>
        <div className="grid grid-cols-1 gap-8 pb-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <span className="font-mono text-sm font-semibold text-foreground">
              Aditya<span className="text-primary">.</span>
            </span>
            <p className="mt-2 max-w-[44ch] text-sm text-muted-foreground">
              Electrical Engineering student bridging the gap between embedded hardware, data-driven logic, and business execution.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:col-span-2 sm:justify-items-end">
            <div className="flex flex-col gap-2">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Navigation
              </h2>
              <Link
                href="/#experiences"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Experiences
              </Link>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Projects
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Contact
              </Link>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Resume
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Connect
              </h2>
              <a
                href="https://github.com/Legorvey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/adityachandrasa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                LinkedIn
              </a>
              <a
                href="mailto:aditchandrasa1@gmail.com"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 font-mono text-xs text-muted-foreground">
          <p>© 2026 Aditya Cakti Chandrasa. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
