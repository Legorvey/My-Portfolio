import { describe, expect, it } from "vitest"
import manifest from "@/app/manifest"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { getProjects } from "@/lib/content"

describe("SEO: Sitemap Configuration", () => {
  it("generates valid sitemap entries with lastModified dates", () => {
    const entries = sitemap()
    const projects = getProjects()

    // Base URL + /projects + all project entries
    expect(entries.length).toBe(projects.length + 2)

    const homeEntry = entries.find((e) => e.url === "https://adityac.dev")
    expect(homeEntry).toBeDefined()
    expect(homeEntry?.priority).toBe(1)
    expect(homeEntry?.lastModified).toBeInstanceOf(Date)

    const projectsEntry = entries.find((e) => e.url === "https://adityac.dev/projects")
    expect(projectsEntry).toBeDefined()
    expect(projectsEntry?.priority).toBe(0.9)
    expect(projectsEntry?.lastModified).toBeInstanceOf(Date)

    for (const project of projects) {
      const entry = entries.find(
        (e) => e.url === `https://adityac.dev/projects/${project.slug}`
      )
      expect(entry).toBeDefined()
      expect(entry?.lastModified).toBeInstanceOf(Date)
      expect(entry?.priority).toBe(0.8)
    }
  })
})

describe("SEO: Robots Configuration", () => {
  it("contains proper directives for crawling and sitemap discovery", () => {
    const robotRules = robots()

    expect(robotRules.sitemap).toBe("https://adityac.dev/sitemap.xml")
    expect(robotRules.host).toBe("https://adityac.dev")

    const rules = Array.isArray(robotRules.rules)
      ? robotRules.rules[0]
      : robotRules.rules

    expect(rules.userAgent).toBe("*")
    expect(rules.allow).toBe("/")
    expect(rules.disallow).toContain("/api/")
  })
})

describe("SEO: Web App Manifest", () => {
  it("provides valid progressive web app metadata", () => {
    const manifestData = manifest()

    expect(manifestData.name).toContain("Aditya Chandrasa")
    expect(manifestData.short_name).toBe("Aditya Chandrasa")
    expect(manifestData.start_url).toBe("/")
    expect(manifestData.display).toBe("standalone")
    expect(manifestData.icons).toBeDefined()
    expect(manifestData.icons?.length).toBeGreaterThan(0)
  })
})
