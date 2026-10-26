import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import {
  getFeatured,
  getProject,
  getProjects,
  ProjectFrontmatterSchema,
} from "@/lib/content"

describe("ProjectFrontmatterSchema", () => {
  it("validates required fields and defaults featured to false", () => {
    const parsed = ProjectFrontmatterSchema.parse({
      title: "AquaFeeder IoT: Full-Stack Ecosystem",
      slug: "aquafeeder",
      type: "hardware",
    })

    expect(parsed.title).toBe("AquaFeeder IoT: Full-Stack Ecosystem")
    expect(parsed.slug).toBe("aquafeeder")
    expect(parsed.type).toBe("hardware")
    expect(parsed.featured).toBe(false)
  })

  it("accepts all optional fields with valid YYYY-MM and 'present' dates", () => {
    const parsed = ProjectFrontmatterSchema.parse({
      title: "Futura 2025: National Tech Event",
      slug: "futura",
      type: "event",
      summary: "Orchestrating HMTE's largest and most complex external megaproject.",
      role: "Vice Project Officer (VPO 2)",
      start: "2025-02",
      end: "present",
      status: "Completed",
      tools: ["Event Mgmt", "Project Mgmt"],
      links: [{ label: "Proposal", url: "https://example.com/proposal" }],
      thumbnail: "/projects/futura/1-hero.png",
      featured: true,
    })

    expect(parsed.start).toBe("2025-02")
    expect(parsed.end).toBe("present")
    expect(parsed.featured).toBe(true)
    expect(parsed.tools).toEqual(["Event Mgmt", "Project Mgmt"])
    expect(parsed.links).toHaveLength(1)
  })

  it("rejects invalid type enum values", () => {
    expect(() =>
      ProjectFrontmatterSchema.parse({
        title: "Invalid Project",
        slug: "invalid",
        type: "unknown-category",
      })
    ).toThrow()
  })

  it("rejects invalid start or end date formats", () => {
    expect(() =>
      ProjectFrontmatterSchema.parse({
        title: "Bad Start Date",
        slug: "bad-start",
        type: "web",
        start: "June 2025",
      })
    ).toThrow()

    expect(() =>
      ProjectFrontmatterSchema.parse({
        title: "Bad End Date",
        slug: "bad-end",
        type: "web",
        end: "2025-13",
      })
    ).toThrow()
  })
})

describe("content loader (getProjects, getFeatured, getProject)", () => {
  let tempDir: string

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-content-test-"))
  })

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true })
  })

  it("loads MDX files, sorts by start descending, and filters featured projects", () => {
    fs.writeFileSync(
      path.join(tempDir, "older.mdx"),
      `---
title: "Older Project"
slug: "older"
type: "event"
start: "2024-11"
featured: false
---
Older body content.`
    )

    fs.writeFileSync(
      path.join(tempDir, "newer.mdx"),
      `---
title: "Newer Project"
slug: "newer"
type: "hardware"
start: "2025-06"
featured: true
---
Newer body content.`
    )

    fs.writeFileSync(
      path.join(tempDir, "undated.mdx"),
      `---
title: "Undated Project"
slug: "undated"
type: "research"
---
Undated body content.`
    )

    const projects = getProjects(tempDir)
    expect(projects.map((p) => p.slug)).toEqual(["newer", "older", "undated"])
    expect(projects[0].content.trim()).toBe("Newer body content.")

    const featured = getFeatured(tempDir)
    expect(featured.map((p) => p.slug)).toEqual(["newer"])

    const single = getProject("older", tempDir)
    expect(single?.title).toBe("Older Project")
    expect(getProject("non-existent", tempDir)).toBeUndefined()
  })

  it("throws when an MDX file has invalid frontmatter", () => {
    fs.writeFileSync(
      path.join(tempDir, "broken.mdx"),
      `---
title: "Broken Project"
slug: "broken"
type: "not-a-valid-type"
---
Body.`
    )

    expect(() => getProjects(tempDir)).toThrow(/broken\.mdx/i)
  })
})
