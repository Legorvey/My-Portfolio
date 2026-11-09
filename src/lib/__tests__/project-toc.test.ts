import * as React from "react"
import { describe, expect, it } from "vitest"
import {
  createHeadingIdGenerator,
  extractNodeText,
  extractTocFromMdx,
  slugifyHeadingText,
} from "@/lib/project-toc"

describe("Project TOC & Heading Slug Generation", () => {
  it("generates stable slugs matching existing heading ID conventions", () => {
    expect(slugifyHeadingText("System Architecture & Communication")).toBe(
      "system-architecture-communication"
    )
    expect(slugifyHeadingText("The Technical Edge: Multithreaded Backend")).toBe(
      "the-technical-edge-multithreaded-backend"
    )
    expect(slugifyHeadingText("Phase 1: The Roadshow Marathon")).toBe(
      "phase-1-the-roadshow-marathon"
    )
  })

  it("strips inline markdown formatting such as code, emphasis, and links before slugifying", () => {
    expect(
      slugifyHeadingText("Running `motosense.service` in **Production**")
    ).toBe("running-motosenseservice-in-production")
  })

  it("extracts text from nested React elements matching plain markdown text", () => {
    const reactTree = React.createElement(
      React.Fragment,
      null,
      "Running ",
      React.createElement("code", null, "motosense.service"),
      " in ",
      React.createElement("strong", null, "Production")
    )
    expect(extractNodeText(reactTree)).toBe(
      "Running motosense.service in Production"
    )
  })

  it("assigns deterministic unique IDs to repeated headings", () => {
    const slugger = createHeadingIdGenerator()
    expect(slugger.slug("Testing & Results")).toBe("testing-results")
    expect(slugger.slug("Testing & Results")).toBe("testing-results-2")
    expect(slugger.slug("Testing & Results")).toBe("testing-results-3")
  })

  it("extracts H2 and H3 headings from MDX while ignoring code blocks and MDX comments", () => {
    const sampleMdx = `
## Overview

Introductory paragraph.

\`\`\`bash
## This comment inside a code fence is not a heading
### Neither is this
\`\`\`

{/* ## Hidden Comment Heading */}

## System Architecture

### Firmware \`HTTPClient\` Loop

## Testing

### Testing
`

    const toc = extractTocFromMdx(sampleMdx)
    expect(toc).toEqual([
      { id: "overview", text: "Overview", level: 2 },
      { id: "system-architecture", text: "System Architecture", level: 2 },
      { id: "firmware-httpclient-loop", text: "Firmware HTTPClient Loop", level: 3 },
      { id: "testing", text: "Testing", level: 2 },
      { id: "testing-2", text: "Testing", level: 3 },
    ])
  })
})
