"use client"

import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container className="flex min-h-[calc(100vh-16rem)] flex-col items-start justify-center pt-24 pb-16">
      <div className="max-w-md space-y-4 rounded-sm border border-border bg-surface p-6">
        <p className="font-mono text-xl font-semibold text-primary">500</p>
        <h1 className="font-sans text-base font-semibold text-foreground">
          Unexpected System Fault.
        </h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred while executing this request. Internal diagnostic details have been suppressed for security.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => reset()}
          >
            Retry Request
          </Button>
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-sm border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Container>
  )
}
