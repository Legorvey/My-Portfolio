import fs from "node:fs"
import path from "node:path"
import type { MetadataRoute } from "next"
import { getProjects } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adityac.dev"
  const projects = getProjects()
  const contentDir = path.join(process.cwd(), "content", "projects")

  let latestDate = new Date("2025-01-01")

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => {
    const filePath = path.join(contentDir, `${project.slug}.mdx`)
    let lastModified = new Date()
    try {
      if (fs.existsSync(filePath)) {
        lastModified = fs.statSync(filePath).mtime
      }
    } catch {
      lastModified = new Date()
    }

    if (lastModified > latestDate) {
      latestDate = lastModified
    }

    return {
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: latestDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: latestDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectEntries,
  ]
}
