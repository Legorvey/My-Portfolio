import Link from "next/link"
import { Container } from "@/components/layout/container"
import { MobileNav } from "@/components/layout/mobile-nav"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Contact", href: "/#contact" },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-colors">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Home"
            className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="text-primary font-bold">&lt;A&gt;</span>
            <span className="font-sans font-semibold tracking-tight">Aditya Chandrasa</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-border bg-surface/80 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Available for HW/SW</span>
          </div>
        </div>

        {/* Desktop navigation (>= sm) */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 sm:flex"
        >
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="h-4 w-px bg-border" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Legorvey"
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
              className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-foreground transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>Résumé</span>
              <span className="text-[10px] text-primary" aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>

        {/* Mobile navigation (< sm, including 360px) */}
        <MobileNav items={NAV_ITEMS} />
      </Container>
    </header>
  )
}
