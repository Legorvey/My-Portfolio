import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { ProjectResources } from "@/components/projects/project-resources"
import {
  ProjectFrontmatterSchema,
  ProjectResourceSchema,
} from "@/lib/content"
import {
  getResourceHostLabel,
  inferResourceMetadataFromLegacyLink,
  normalizeResourceUrl,
  resolveProjectResources,
  selectPrimaryHeaderActions,
} from "@/lib/resource-utils"

describe("ProjectResourceSchema & Resource Utilities", () => {
  it("accepts categorized resources with optional description and format", () => {
    const parsed = ProjectResourceSchema.parse({
      label: "Firmware & backend source",
      url: "https://github.com/Legorvey/AquaFeeder",
      kind: "repository",
      description: "ESP32 firmware and Python Flask server",
    })

    expect(parsed.label).toBe("Firmware & backend source")
    expect(parsed.kind).toBe("repository")
    expect(parsed.description).toBe("ESP32 firmware and Python Flask server")
  })

  it("defaults kind to 'other' when omitted", () => {
    const parsed = ProjectResourceSchema.parse({
      label: "Reference link",
      url: "https://example.com/reference",
    })
    expect(parsed.kind).toBe("other")
  })

  it("rejects javascript:, data:, vbscript:, and file: resource URLs", () => {
    for (const unsafeUrl of [
      "javascript:alert(1)",
      "data:text/html,<script>alert(1)</script>",
      "vbscript:MsgBox(1)",
      "file:///etc/passwd",
      "//evil.example.com/open-redirect",
    ]) {
      expect(
        ProjectResourceSchema.safeParse({
          label: "Unsafe",
          url: unsafeUrl,
        }).success
      ).toBe(false)
    }
  })

  it("maps legacy links into categorized resources and infers sensible kinds", () => {
    expect(
      inferResourceMetadataFromLegacyLink({
        label: "GitHub",
        url: "https://github.com/Legorvey/SITL-PID-Simulator",
      })
    ).toEqual({ kind: "repository" })

    expect(
      inferResourceMetadataFromLegacyLink({
        label: "Read Full Proposal (Drive)",
        url: "https://drive.google.com/file/d/13STwXBmcwxu7gDYvkN1gC62pV1HBX_jF/view?usp=sharing",
      })
    ).toEqual({ kind: "report", format: undefined })

    expect(
      inferResourceMetadataFromLegacyLink({
        label: "Dashboard",
        url: "https://kiiin.pythonanywhere.com/",
      })
    ).toEqual({ kind: "demo" })
  })

  it("deduplicates identical URLs across resources and legacy links, preferring structured resources", () => {
    const resolved = resolveProjectResources({
      resources: [
        {
          label: "Full Proposal (PDF)",
          url: "https://drive.google.com/file/d/13STwXBmcwxu7gDYvkN1gC62pV1HBX_jF/view?usp=sharing",
          kind: "report",
          format: "PDF",
          description: "Complete competition dossier",
        },
      ],
      links: [
        {
          label: "Read Full Proposal (Drive)",
          url: "https://drive.google.com/file/d/13STwXBmcwxu7gDYvkN1gC62pV1HBX_jF/view?usp=sharing",
        },
        {
          label: "GitHub Repository",
          url: "https://github.com/Legorvey/Gardapati/",
        },
      ],
    })

    expect(resolved).toHaveLength(2)
    expect(resolved[0]?.label).toBe("Full Proposal (PDF)")
    expect(resolved[0]?.format).toBe("PDF")
    expect(resolved[0]?.description).toBe("Complete competition dossier")
    expect(resolved[1]?.label).toBe("GitHub Repository")
    expect(resolved[1]?.kind).toBe("repository")
  })

  it("filters out unsafe URLs passed into resolveProjectResources at runtime", () => {
    const resolved = resolveProjectResources({
      links: [
        { label: "Bad", url: "javascript:alert(1)" },
        { label: "Valid", url: "https://adityac.dev/docs" },
      ],
    })
    expect(resolved).toHaveLength(1)
    expect(resolved[0]?.label).toBe("Valid")
  })

  it("returns an empty array when neither resources nor links are provided", () => {
    expect(resolveProjectResources({})).toEqual([])
  })

  it("normalizes resource URLs consistently", () => {
    expect(normalizeResourceUrl("https://GitHub.com/Legorvey/Repo/")).toBe(
      "https://github.com/Legorvey/Repo"
    )
  })

  it("extracts readable host labels", () => {
    expect(getResourceHostLabel("https://github.com/Legorvey/Repo")).toBe(
      "GitHub"
    )
    expect(
      getResourceHostLabel("https://drive.google.com/file/d/123/view")
    ).toBe("Google Drive")
  })

  it("selects primary header actions in priority order", () => {
    const actions = selectPrimaryHeaderActions(
      [
        {
          label: "Dataset",
          url: "https://example.com/data",
          kind: "dataset",
        },
        {
          label: "Source Code",
          url: "https://github.com/example/repo",
          kind: "repository",
        },
        {
          label: "Live Demo",
          url: "https://demo.example.com",
          kind: "demo",
        },
        {
          label: "Photos",
          url: "https://drive.google.com/photos",
          kind: "photos",
        },
      ],
      2
    )

    expect(actions.map((a) => a.kind)).toEqual(["repository", "demo"])
  })

  it("supports optional subtitle, outcome, updated, cover, and resources in ProjectFrontmatterSchema", () => {
    const parsed = ProjectFrontmatterSchema.parse({
      title: "AquaFeeder IoT",
      slug: "aquafeeder",
      type: "hardware",
      subtitle: "Connected automatic fish-feeding system",
      outcome: "End-to-end prototype validated with ESP32 and Flask.",
      updated: "2025-07",
      cover: {
        src: "/projects/aquafeeder/5-product.webp",
        alt: "AquaFeeder prototype and mobile dashboard",
        fit: "cover",
      },
      resources: [
        {
          label: "Source Repository",
          url: "https://github.com/Legorvey/AquaFeeder",
          kind: "repository",
        },
      ],
    })

    expect(parsed.subtitle).toBe("Connected automatic fish-feeding system")
    expect(parsed.cover?.fit).toBe("cover")
    expect(parsed.resources).toHaveLength(1)
  })

  it("renders ProjectResources empty state card when no resources are linked", () => {
    const html = renderToStaticMarkup(
      React.createElement(ProjectResources, { resources: [] })
    )

    expect(html).toContain("Project resources")
    expect(html).toContain("No public resources linked yet.")
    expect(html).toContain("rounded-xl")
    expect(html).not.toContain("<a ")
  })

  it("renders ProjectResources rows with category icons, titles, and secondary descriptions", () => {
    const html = renderToStaticMarkup(
      React.createElement(ProjectResources, {
        resources: [
          {
            label: "Simulator Source Code",
            url: "https://github.com/Legorvey/SITL-PID-Simulator",
            kind: "repository",
            description: "Next.js, TypeScript, and Plotly.js repository",
          },
          {
            label: "Original Photos",
            url: "https://drive.google.com/drive/folders/example",
            kind: "photos",
          },
        ],
      })
    )

    expect(html).toContain("Project resources")
    expect(html).toContain("Simulator Source Code")
    expect(html).toContain("Next.js, TypeScript, and Plotly.js repository")
    expect(html).toContain("Original Photos")
    expect(html).toContain("Google Drive · Photos &amp; Media")
    expect(html).not.toContain("No public resources linked yet.")
  })
})
