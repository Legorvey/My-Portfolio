import Link from "next/link"
import { Container } from "@/components/layout/container"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
] as const

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <Container className="flex min-h-14 flex-wrap items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Home"
            className="font-mono text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            &lt;A&gt; <span className="font-sans font-medium">Aditya Chandrasa</span>
          </Link>
        </div>

        <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-4 sm:gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="hidden h-4 w-px bg-border sm:inline-block" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Legorvey/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/adityachandrasa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              LinkedIn
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center rounded-sm border border-border bg-surface px-2 py-1 font-mono text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Résumé
            </a>
          </div>
        </nav>
      </Container>
    </header>
  )
}
