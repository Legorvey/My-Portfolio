import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "404 | Node Unreachable",
}

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-16">
      <div className="max-w-md space-y-4 rounded-sm border border-border bg-surface p-6">
        <p className="font-mono text-xl font-semibold text-primary">404</p>
        <h1 className="font-sans text-base font-semibold text-foreground">
          System Node Unreachable
        </h1>
        <p className="text-sm text-muted-foreground">
          The requested deployment or sector does not exist. It may have been archived or deleted.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-sm border border-primary bg-primary px-3 py-1 font-mono text-xs font-medium text-primary-foreground transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ← Return to Command Center
          </Link>
        </div>
      </div>
    </Container>
  )
}
