import { afterEach, beforeEach, describe, expect, it } from "vitest"
import sitemap from "@/app/sitemap"
import { areCaseStudiesEnabled } from "@/lib/case-studies-config"

describe("Case Studies Configuration & Lockdown", () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it("defaults to enabled in test environment", () => {
    delete process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES
    expect(areCaseStudiesEnabled()).toBe(true)
  })

  it("returns false when NEXT_PUBLIC_ENABLE_CASE_STUDIES is false", () => {
    process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES = "false"
    expect(areCaseStudiesEnabled()).toBe(false)
  })

  it("returns true when NEXT_PUBLIC_ENABLE_CASE_STUDIES is true even if in production", () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
      writable: true,
    })
    process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES = "true"
    expect(areCaseStudiesEnabled()).toBe(true)
  })

  it("returns false in production when no override is provided", () => {
    delete process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
      writable: true,
    })
    expect(areCaseStudiesEnabled()).toBe(false)
  })

  it("sitemap excludes individual project slugs when case studies are disabled", () => {
    process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES = "false"
    const entries = sitemap()

    // Should only have base URL and /projects
    expect(entries.length).toBe(2)
    expect(entries[0]?.url).toBe("https://adityac.dev")
    expect(entries[1]?.url).toBe("https://adityac.dev/projects")
  })
})
