import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { z } from "zod"
import { resolveProjectStatus } from "@/lib/utils"

export const PROJECT_TYPES = [
  "hardware",
  "software",
  "research",
  "event",
  "business",
  "work",
] as const

export const ProjectTypeSchema = z.enum(PROJECT_TYPES)
export type ProjectType = z.infer<typeof ProjectTypeSchema>

export const YearMonthSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Expected YYYY-MM format")

export const EndDateSchema = z.union([YearMonthSchema, z.literal("present")])

export const ProjectLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
})

export type ProjectLink = z.infer<typeof ProjectLinkSchema>

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  type: ProjectTypeSchema,
  summary: z.string().optional(),
  role: z.string().optional(),
  start: YearMonthSchema.optional(),
  end: EndDateSchema.optional(),
  status: z.string().optional(),
  tools: z.array(z.string().min(1)).optional(),
  tags: z.array(z.string().min(1)).optional(),
  links: z.array(ProjectLinkSchema).optional(),
  thumbnail: z.string().min(1).optional(),
  featured: z.boolean().default(false),
  order: z.number().optional(),
})

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>

export interface Project extends ProjectFrontmatter {
  content: string
}

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), "content", "projects")

export function sortProjectsByStartDesc<
  T extends { start?: string; slug: string },
>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.start && b.start) {
      const cmp = b.start.localeCompare(a.start)
      if (cmp !== 0) return cmp
    } else if (a.start && !b.start) {
      return -1
    } else if (!a.start && b.start) {
      return 1
    }
    return a.slug.localeCompare(b.slug)
  })
}

export function getProjects(
  contentDir: string = DEFAULT_CONTENT_DIR
): Project[] {
  if (!fs.existsSync(/*turbopackIgnore: true*/ contentDir)) {
    return []
  }

  const entries = fs
    .readdirSync(/*turbopackIgnore: true*/ contentDir)
    .filter((file) => file.endsWith(".mdx"))

  const projects = entries.map((filename) => {
    const filePath = path.join(/*turbopackIgnore: true*/ contentDir, filename)
    const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf8")
    const { data, content } = matter(raw)

    const parsed = ProjectFrontmatterSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${filename}: ${parsed.error.message}`
      )
    }

    const expectedSlug = filename.replace(/\.mdx$/, "")
    if (parsed.data.slug !== expectedSlug) {
      throw new Error(
        `Frontmatter slug "${parsed.data.slug}" in ${filename} does not match filename "${expectedSlug}"`
      )
    }

    const resolvedStatus = resolveProjectStatus(parsed.data)

    return {
      ...parsed.data,
      status: resolvedStatus,
      content,
    }
  })

  return sortProjectsByStartDesc(projects)
}

export function getFeatured(
  contentDir: string = DEFAULT_CONTENT_DIR
): Project[] {
  return sortProjectsByStartDesc(
    getProjects(contentDir).filter((project) => project.featured)
  )
}

export function getProject(
  slug: string,
  contentDir: string = DEFAULT_CONTENT_DIR
): Project | undefined {
  return getProjects(contentDir).find((project) => project.slug === slug)
}
