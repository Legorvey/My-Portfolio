import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { createMdxComponents } from "@/components/mdx/mdx-components"
import { ProjectTOC } from "@/components/projects/project-toc"
import { getProject, getProjects } from "@/lib/content"
import {
  createHeadingIdGenerator,
  extractNodeText,
  extractTocFromMdx,
  formatTocSectionNumbers,
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

  it("computes hierarchical two-digit section numbers for AquaFeeder's actual MDX headings", () => {
    const aquafeeder = getProject("aquafeeder")
    expect(aquafeeder).toBeDefined()

    const toc = extractTocFromMdx(aquafeeder!.content)
    const numbered = formatTocSectionNumbers(toc)

    expect(numbered).toEqual([
      {
        id: "overview-mission",
        text: "Overview & Mission",
        level: 2,
        number: "01",
      },
      {
        id: "system-architecture-communication",
        text: "System Architecture & Communication",
        level: 2,
        number: "02",
      },
      {
        id: "implementation-multithreaded-backend-web-interface",
        text: "Implementation: Multithreaded Backend & Web Interface",
        level: 2,
        number: "03",
      },
      {
        id: "multithreaded-scheduler-loop",
        text: "Multithreaded Scheduler Loop",
        level: 3,
        number: "03.1",
      },
      {
        id: "dynamic-web-dashboard",
        text: "Dynamic Web Dashboard",
        level: 3,
        number: "03.2",
      },
      {
        id: "hardware-component-breakdown",
        text: "Hardware Component Breakdown",
        level: 2,
        number: "04",
      },
      {
        id: "technical-reference",
        text: "Technical Reference",
        level: 2,
        number: "05",
      },
      {
        id: "physical-integration-prototypes",
        text: "Physical Integration & Prototypes",
        level: 2,
        number: "06",
      },
      {
        id: "conclusion-lessons-learned",
        text: "Conclusion & Lessons Learned",
        level: 2,
        number: "07",
      },
    ])
  })

  it("handles orphan H3 headings before the first H2 and empty heading lists gracefully", () => {
    expect(formatTocSectionNumbers([])).toEqual([])
    expect(
      formatTocSectionNumbers([
        { id: "sub-first", text: "Sub First", level: 3 },
        { id: "main-section", text: "Main Section", level: 2 },
      ])
    ).toEqual([
      { id: "sub-first", text: "Sub First", level: 3, number: "01.1" },
      { id: "main-section", text: "Main Section", level: 2, number: "02" },
    ])
  })

  it("renders ProjectTOC as a rounded card with numbered items and no vertical left border rail", () => {
    const aquafeeder = getProject("aquafeeder")!
    const toc = extractTocFromMdx(aquafeeder.content)

    const desktopHtml = renderToStaticMarkup(
      React.createElement(ProjectTOC, { items: toc, variant: "desktop" })
    )

    expect(desktopHtml).toContain("On this page")
    expect(desktopHtml).toContain("rounded-xl")
    expect(desktopHtml).not.toContain("border-l-2")
    expect(desktopHtml).toContain("01")
    expect(desktopHtml).toContain("03.1")
    expect(desktopHtml).toContain("03.2")
    expect(desktopHtml).toContain("07")
    expect(desktopHtml).toContain('href="#multithreaded-scheduler-loop"')

    const mobileHtml = renderToStaticMarkup(
      React.createElement(ProjectTOC, { items: toc, variant: "mobile" })
    )
    expect(mobileHtml).toContain("<details")
    expect(mobileHtml).toContain("On this page")
    expect(mobileHtml).toContain("03.1")
  })

  it("returns null when ProjectTOC receives an empty items list", () => {
    expect(
      renderToStaticMarkup(
        React.createElement(ProjectTOC, { items: [], variant: "desktop" })
      )
    ).toBe("")
    expect(
      renderToStaticMarkup(
        React.createElement(ProjectTOC, { items: [], variant: "mobile" })
      )
    ).toBe("")
  })

  it("ensures TOC anchor IDs and section numbers are valid and match rendered MDX headings across all projects", () => {
    const projects = getProjects()
    expect(projects.length).toBeGreaterThan(0)

    for (const project of projects) {
      const toc = extractTocFromMdx(project.content)
      const numbered = formatTocSectionNumbers(toc)
      const mdxComponents = createMdxComponents()

      expect(numbered.length).toBe(toc.length)
      const seenIds = new Set<string>()

      for (const item of numbered) {
        expect(seenIds.has(item.id)).toBe(false)
        seenIds.add(item.id)

        if (item.level === 2) {
          expect(item.number).toMatch(/^\d{2,}$/)
          const h2Html = renderToStaticMarkup(
            React.createElement(mdxComponents.h2, null, item.text)
          )
          expect(h2Html).toContain(`id="${item.id}"`)
        } else {
          expect(item.number).toMatch(/^\d{2,}\.\d+$/)
          const h3Html = renderToStaticMarkup(
            React.createElement(mdxComponents.h3, null, item.text)
          )
          expect(h3Html).toContain(`id="${item.id}"`)
        }
      }
    }
  })
})
