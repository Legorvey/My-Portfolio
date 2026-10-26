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
import {
  formatPeriod,
  formatProjectTypeLabel,
  resolveProjectStatus,
} from "@/lib/utils"

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

  it("accepts all optional fields including tags, valid YYYY-MM and 'present' dates", () => {
    const parsed = ProjectFrontmatterSchema.parse({
      title: "Futura 2025: National Tech Event",
      slug: "futura",
      type: "event",
      summary:
        "Orchestrating HMTE's largest and most complex external megaproject.",
      role: "Vice Project Officer (VPO 2)",
      start: "2025-02",
      end: "present",
      status: "Completed",
      tools: ["Event Mgmt", "Project Mgmt"],
      tags: ["Event Mgmt", "Project Mgmt"],
      links: [{ label: "Proposal", url: "https://example.com/proposal" }],
      thumbnail: "/projects/futura/1-hero.png",
      featured: true,
    })

    expect(parsed.start).toBe("2025-02")
    expect(parsed.end).toBe("present")
    expect(parsed.featured).toBe(true)
    expect(parsed.tools).toEqual(["Event Mgmt", "Project Mgmt"])
    expect(parsed.tags).toEqual(["Event Mgmt", "Project Mgmt"])
    expect(parsed.links).toHaveLength(1)
  })

  it("rejects removed 'web' and 'experience' type enum values", () => {
    expect(() =>
      ProjectFrontmatterSchema.parse({
        title: "Old Web Type",
        slug: "old-web",
        type: "web",
      })
    ).toThrow()

    expect(() =>
      ProjectFrontmatterSchema.parse({
        title: "Old Experience Type",
        slug: "old-experience",
        type: "experience",
      })
    ).toThrow()
  })

  it("rejects invalid start or end date formats", () => {
    expect(() =>
      ProjectFrontmatterSchema.parse({
        title: "Bad Start Date",
        slug: "bad-start",
        type: "software",
        start: "June 2025",
      })
    ).toThrow()

    expect(() =>
      ProjectFrontmatterSchema.parse({
        title: "Bad End Date",
        slug: "bad-end",
        type: "software",
        end: "2025-13",
      })
    ).toThrow()
  })
})

describe("formatPeriod, formatProjectTypeLabel, and resolveProjectStatus", () => {
  it("formats single month, range, present, and missing start ([W.I.P])", () => {
    expect(formatPeriod("2025-06", "2025-06")).toBe("Jun 2025")
    expect(formatPeriod("2026-02", "2026-06")).toBe("Feb 2026 – Jun 2026")
    expect(formatPeriod("2026-01", "present")).toBe("Jan 2026 – Present")
    expect(formatPeriod(undefined, undefined)).toBe("[W.I.P]")
  })

  it("formats project type labels in Title Case", () => {
    expect(formatProjectTypeLabel("hardware")).toBe("Hardware")
    expect(formatProjectTypeLabel("software")).toBe("Software")
    expect(formatProjectTypeLabel("research")).toBe("Research")
    expect(formatProjectTypeLabel("event")).toBe("Event")
    expect(formatProjectTypeLabel("business")).toBe("Business")
    expect(formatProjectTypeLabel("work")).toBe("Work")
  })

  it("resolves status according to explicit override, present, past month, or empty", () => {
    expect(
      resolveProjectStatus({ status: "Ongoing", end: "2026-03" }, "2026-10")
    ).toBe("Ongoing")
    expect(resolveProjectStatus({ end: "present" }, "2026-10")).toBe("Ongoing")
    expect(resolveProjectStatus({ end: "2026-08" }, "2026-10")).toBe(
      "Completed"
    )
    expect(resolveProjectStatus({ end: "2026-10" }, "2026-10")).toBe("")
    expect(resolveProjectStatus({}, "2026-10")).toBe("")
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

  it("loads MDX files, sorts by start descending with missing start last, and applies same order to getFeatured", () => {
    fs.writeFileSync(
      path.join(tempDir, "older.mdx"),
      `---
title: "Older Project"
slug: "older"
type: "event"
start: "2024-11"
end: "2025-02"
featured: true
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
end: "2025-06"
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
featured: true
---
Undated body content.`
    )

    const projects = getProjects(tempDir)
    expect(projects.map((p) => p.slug)).toEqual(["newer", "older", "undated"])
    expect(projects[0].content.trim()).toBe("Newer body content.")
    expect(projects[0].status).toBe("Completed")
    expect(projects[2].status).toBe("")

    const featured = getFeatured(tempDir)
    expect(featured.map((p) => p.slug)).toEqual(["newer", "older", "undated"])

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

  it("validates all production MDX files in content/projects andfeatured order", () => {
    const projects = getProjects()
    expect(projects).toHaveLength(10)
    expect(projects.map((p) => p.slug)).toEqual([
      "pln-thermography-internship",
      "pid-control-simulator",
      "personal-web",
      "motosense",
      "aquafeeder",
      "unex",
      "futura",
      "pgs25",
      "gardapati",
      "matcha-tasikmalaya",
    ])

    const featured = getFeatured()
    expect(featured.map((p) => p.slug)).toEqual([
      "pln-thermography-internship",
      "pid-control-simulator",
      "motosense",
      "aquafeeder",
      "gardapati",
    ])
  })
})
