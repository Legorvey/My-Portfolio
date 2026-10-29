import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { TextSpotlight } from "@/components/ui/text-spotlight"

export const metadata: Metadata = {
  title: "404 | Page Not Found",
}

export default function NotFound() {
  return (
    <Container className="flex min-h-[calc(100vh-16rem)] flex-col items-start justify-center pt-24 pb-16">
      <div className="max-w-md space-y-4 rounded-sm border border-border bg-surface p-6">
        <p className="font-mono text-xl font-semibold text-primary">404</p>
        <h1 className="inline-flex">
          <TextSpotlight
            textClassName="font-sans text-base font-semibold"
            baseClassName="text-muted-foreground/45"
            spotlightClassName="text-foreground"
            spotlightSize={100}
            spotlightArea={65}
            animateOnPhone={true}
          >
            <span>Page Not Found</span>
            <span className="text-primary">.</span>
          </TextSpotlight>
        </h1>
        <p className="text-sm text-muted-foreground">
          The requested page or project does not exist. It may have been moved or archived.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-sm border border-primary bg-primary px-3 py-1 font-mono text-xs font-medium text-primary-foreground transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </Container>
  )
}
