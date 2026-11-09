import { describe, expect, it } from "vitest"
import { selectRelatedProjects } from "@/components/projects/related-projects"
import type { ProjectFrontmatter } from "@/lib/content"

const SAMPLE_PROJECTS: ProjectFrontmatter[] = [
  {
    title: "AquaFeeder IoT",
    slug: "aquafeeder",
    type: "hardware",
    tools: ["ESP32", "C++", "Python Flask"],
    tags: ["Hardware", "IoT", "Full-Stack"],
    featured: true,
  },
  {
    title: "Gardapati Safety",
    slug: "gardapati",
    type: "hardware",
    tools: ["ESP32"],
    tags: ["Hardware", "IoT", "Project Mgmt"],
    featured: true,
  },
  {
    title: "MOTOSENSE",
    slug: "motosense",
    type: "hardware",
    tools: ["Raspberry Pi 3B", "I2C"],
    tags: ["IoT", "Embedded Systems"],
    featured: true,
  },
  {
    title: "MiMu Matcha",
    slug: "matcha-tasikmalaya",
    type: "business",
    tags: ["Operations", "Sales"],
    featured: false,
  },
]

describe("selectRelatedProjects", () => {
  it("ranks projects by shared tags, shared tools, and matching domain while excluding current project", () => {
    const current = SAMPLE_PROJECTS[0]!
    const related = selectRelatedProjects(current, SAMPLE_PROJECTS, 2)

    expect(related).toHaveLength(2)
    expect(related.map((p) => p.slug)).toEqual(["gardapati", "motosense"])
  })

  it("excludes projects with zero overlap rather than showing unrelated filler", () => {
    const current = SAMPLE_PROJECTS[3]! // MiMu Matcha (business, Operations/Sales)
    const related = selectRelatedProjects(current, SAMPLE_PROJECTS, 2)

    expect(related).toEqual([])
  })
})
