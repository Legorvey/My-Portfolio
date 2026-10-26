import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { getProjects } from "@/lib/content"

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function normalizeWhitespace(input: string): string {
  return decodeHtmlEntities(input).replace(/\s+/g, " ").trim()
}

export function extractHtmlArticleVisibleText(html: string): string {
  const match = html.match(
    /<div\s+class=["']article-content["'][^>]*>([\s\S]*?)<\/article>/i
  )
  const rawBody = match ? match[1] : html

  const withoutInlineTags = rawBody.replace(
    /<\/?(?:strong|b|em|i|code|span|a)\b[^>]*>/gi,
    ""
  )
  const withoutTags = withoutInlineTags.replace(/<[^>]+>/g, " ")
  return normalizeWhitespace(withoutTags)
}

export function extractMdxVisibleText(mdx: string): string {
  const { content } = matter(mdx)

  const expandedComponents = content
    .replace(
      /<ComponentRow[^>]*title=["']([^"']+)["'][^>]*>([\s\S]*?)<\/ComponentRow>/g,
      (_full, title: string, inner: string) => ` ${title} ${inner} `
    )
    .replace(
      /<PressCard[^>]*category=["']([^"']+)["'][^>]*title=["']([^"']+)["'][^>]*ctaLabel=["']([^"']+)["'][^>]*>([\s\S]*?)<\/PressCard>/g,
      (_full, category: string, title: string, ctaLabel: string, inner: string) =>
        ` ${category} ${title} ${inner} ${ctaLabel} `
    )

  const withoutImages = expandedComponents.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
  const withLinkText = withoutImages.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  const withoutHtmlTags = withLinkText.replace(/<[^>]+>/g, " ")

  const withoutMarkdownTokens = withoutHtmlTags
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")

  return normalizeWhitespace(withoutMarkdownTokens)
}

export interface MigrationComparisonResult {
  match: boolean
  htmlText: string
  mdxText: string
}

export function compareHtmlAndMdxText(
  html: string,
  mdx: string
): MigrationComparisonResult {
  const htmlText = extractHtmlArticleVisibleText(html)
  const mdxText = extractMdxVisibleText(mdx)
  return {
    match: htmlText === mdxText,
    htmlText,
    mdxText,
  }
}

export function verifyMigratedPage(
  htmlPath: string,
  mdxPath: string
): MigrationComparisonResult {
  const html = fs.readFileSync(htmlPath, "utf8")
  const mdx = fs.readFileSync(mdxPath, "utf8")
  return compareHtmlAndMdxText(html, mdx)
}

export function getLegacyProjectSlugs(rootDir: string = process.cwd()): string[] {
  const legacyProjectsDir = path.join(rootDir, "legacy", "projects")
  if (!fs.existsSync(legacyProjectsDir)) return []

  return fs
    .readdirSync(legacyProjectsDir)
    .filter(
      (file) => file.endsWith(".html") && file !== "project-template.html"
    )
    .map((file) => file.replace(/\.html$/, ""))
    .sort()
}

export interface ImageAuditError {
  slug: string
  src: string
  reason: string
}

export function verifyProjectImagesAndAltText(
  rootDir: string = process.cwd()
): ImageAuditError[] {
  const errors: ImageAuditError[] = []
  const projects = getProjects(path.join(rootDir, "content", "projects"))

  for (const project of projects) {
    if (project.thumbnail) {
      const publicPath = path.join(
        rootDir,
        "public",
        project.thumbnail.replace(/^\//, "")
      )
      if (!fs.existsSync(publicPath)) {
        errors.push({
          slug: project.slug,
          src: project.thumbnail,
          reason: "Thumbnail file does not exist in public/",
        })
      }
    }

    // Markdown images: ![alt](src)
    const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    for (const match of project.content.matchAll(mdImageRegex)) {
      const alt = match[1].trim()
      const src = match[2].trim()
      if (!alt) {
        errors.push({
          slug: project.slug,
          src,
          reason: "Markdown image is missing alt text",
        })
      }
      const publicPath = path.join(rootDir, "public", src.replace(/^\//, ""))
      if (!fs.existsSync(publicPath)) {
        errors.push({
          slug: project.slug,
          src,
          reason: "Markdown image file does not exist in public/",
        })
      }
    }

    // ComponentRow and PressCard images
    const jsxImgRegex = /<(?:ComponentRow|PressCard)\b([^>]+)>/g
    for (const match of project.content.matchAll(jsxImgRegex)) {
      const attrs = match[1]
      const srcMatch = attrs.match(/src=["']([^"']+)["']/)
      const altMatch = attrs.match(/alt=["']([^"']*)["']/)
      const src = srcMatch?.[1] ?? ""
      const alt = altMatch?.[1]?.trim() ?? ""

      if (!alt) {
        errors.push({
          slug: project.slug,
          src,
          reason: "JSX component image is missing alt text",
        })
      }
      if (!src) {
        errors.push({
          slug: project.slug,
          src: "(missing)",
          reason: "JSX component is missing src attribute",
        })
      } else {
        const publicPath = path.join(rootDir, "public", src.replace(/^\//, ""))
        if (!fs.existsSync(publicPath)) {
          errors.push({
            slug: project.slug,
            src,
            reason: "JSX component image file does not exist in public/",
          })
        }
      }
    }
  }

  return errors
}

const LEGACY_IMAGE_FOLDER_MAP: Record<string, string> = {
  aquafeederiot: "aquafeeder",
  "mimu-tsm": "matcha-tasikmalaya",
  pgs: "pgs25",
  "university-explore": "unex",
  futura: "futura",
  gardapati: "gardapati",
  "personal-web": "personal-web",
}

export function verifyLegacyUrlsAndRedirects(
  rootDir: string = process.cwd()
): string[] {
  const missing: string[] = []
  const validSlugs = new Set(
    getProjects(path.join(rootDir, "content", "projects")).map((p) => p.slug)
  )

  // 1. Check all legacy project HTML slugs exist as MDX routes
  for (const slug of getLegacyProjectSlugs(rootDir)) {
    if (!validSlugs.has(slug)) {
      missing.push(`/projects/${slug} (missing MDX route)`)
    }
  }

  // 2. Check required public static assets
  const requiredPublicAssets = [
    "Resume.pdf",
    "images/favicon.png",
    "images/web-thumbnail.png",
  ]
  for (const asset of requiredPublicAssets) {
    if (!fs.existsSync(path.join(rootDir, "public", asset))) {
      missing.push(`/${asset} (missing in public/)`)
    }
  }

  // 3. Check every legacy project image resolves after redirect to public/projects/<slug>/<file>
  const legacyImagesProjectsDir = path.join(
    rootDir,
    "legacy",
    "images",
    "projects"
  )
  if (fs.existsSync(legacyImagesProjectsDir)) {
    for (const folder of fs.readdirSync(legacyImagesProjectsDir)) {
      const folderPath = path.join(legacyImagesProjectsDir, folder)
      if (!fs.statSync(folderPath).isDirectory()) continue

      const targetSlug = LEGACY_IMAGE_FOLDER_MAP[folder] ?? folder
      for (const file of fs.readdirSync(folderPath)) {
        const destPath = path.join(
          rootDir,
          "public",
          "projects",
          targetSlug,
          file
        )
        if (!fs.existsSync(destPath)) {
          missing.push(
            `/images/projects/${folder}/${file} -> /projects/${targetSlug}/${file} (missing file)`
          )
        }
      }
    }
  }

  return missing
}

function collectFilesRecursively(dir: string, ext: string): string[] {
  if (!fs.existsSync(dir)) return []
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectFilesRecursively(fullPath, ext))
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath)
    }
  }
  return results
}

export function verifyInternalLinks(
  rootDir: string = process.cwd()
): string[] {
  const broken: string[] = []
  const validSlugs = new Set(
    getProjects(path.join(rootDir, "content", "projects")).map((p) => p.slug)
  )
  const validStaticRoutes = new Set([
    "/",
    "/projects",
    "/dev/tokens",
    "/api/contact",
    "/robots.txt",
    "/sitemap.xml",
  ])

  function isValidInternalHref(href: string): boolean {
    if (href.startsWith("#")) return true
    const withoutHash = href.split("#")[0].split("?")[0] || "/"
    if (validStaticRoutes.has(withoutHash)) return true
    if (withoutHash.startsWith("/projects/")) {
      const slug = withoutHash.replace(/^\/projects\//, "")
      if (validSlugs.has(slug)) return true
    }
    const publicPath = path.join(
      rootDir,
      "public",
      withoutHash.replace(/^\//, "")
    )
    return fs.existsSync(publicPath)
  }

  const tsxFiles = collectFilesRecursively(path.join(rootDir, "src"), ".tsx")
  for (const file of tsxFiles) {
    const source = fs.readFileSync(file, "utf8")
    const hrefRegex = /href=["'](\/[^"'${}]*)["']/g
    for (const match of source.matchAll(hrefRegex)) {
      const href = match[1]
      if (!isValidInternalHref(href)) {
        broken.push(`${path.relative(rootDir, file)} -> ${href}`)
      }
    }
  }

  const mdxFiles = collectFilesRecursively(
    path.join(rootDir, "content", "projects"),
    ".mdx"
  )
  for (const file of mdxFiles) {
    const source = fs.readFileSync(file, "utf8")
    const mdLinkRegex = /(?<!!)\[[^\]]+\]\((\/[^)]+)\)/g
    for (const match of source.matchAll(mdLinkRegex)) {
      const href = match[1]
      if (!isValidInternalHref(href)) {
        broken.push(`${path.relative(rootDir, file)} -> ${href}`)
      }
    }
  }

  return broken
}

