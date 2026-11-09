import type {
  ProjectLink,
  ProjectResource,
  ResourceKind,
} from "@/lib/content"
import { sanitizeUrl } from "@/components/mdx/mdx-components"

export const RESOURCE_KIND_LABELS: Record<ResourceKind, string> = {
  repository: "Repository",
  documentation: "Documentation",
  photos: "Photos & Media",
  diagram: "Diagrams & CAD",
  report: "Technical Report",
  dataset: "Dataset",
  presentation: "Presentation",
  demo: "Live Demo",
  download: "Download",
  other: "Resource",
}

/**
 * Normalizes an HTTP/HTTPS URL for deduplication comparisons.
 */
export function normalizeResourceUrl(url: string): string {
  try {
    const parsed = new URL(url.trim())
    parsed.hash = ""
    // Strip trailing slash on path if not root
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.slice(0, -1)
    }
    return `${parsed.protocol.toLowerCase()}//${parsed.host.toLowerCase()}${parsed.pathname}${parsed.search}`
  } catch {
    return url.trim().toLowerCase()
  }
}

/**
 * Infers a thoughtful ResourceKind and optional format when mapping legacy `links`
 * into the categorized resource structure.
 */
export function inferResourceMetadataFromLegacyLink(link: ProjectLink): {
  kind: ResourceKind
  format?: string
} {
  const lowerLabel = link.label.toLowerCase()
  const lowerUrl = link.url.toLowerCase()

  if (
    lowerUrl.includes("github.com") ||
    lowerUrl.includes("gitlab.com") ||
    lowerLabel.includes("repo") ||
    lowerLabel.includes("source") ||
    lowerLabel.includes("code") ||
    lowerLabel.includes("github")
  ) {
    return { kind: "repository" }
  }

  if (
    lowerLabel.includes("proposal") ||
    lowerLabel.includes("report") ||
    lowerLabel.includes("paper") ||
    lowerLabel.includes("thesis")
  ) {
    return {
      kind: "report",
      format: lowerUrl.endsWith(".pdf") ? "PDF" : undefined,
    }
  }

  if (
    lowerLabel.includes("dashboard") ||
    lowerLabel.includes("demo") ||
    lowerLabel.includes("live") ||
    lowerLabel.includes("simulator") ||
    lowerLabel.includes("app")
  ) {
    return { kind: "demo" }
  }

  if (
    lowerLabel.includes("photo") ||
    lowerLabel.includes("image") ||
    lowerLabel.includes("gallery") ||
    lowerLabel.includes("video")
  ) {
    return { kind: "photos" }
  }

  if (
    lowerLabel.includes("diagram") ||
    lowerLabel.includes("schematic") ||
    lowerLabel.includes("wiring") ||
    lowerLabel.includes("cad")
  ) {
    return { kind: "diagram" }
  }

  if (
    lowerLabel.includes("doc") ||
    lowerLabel.includes("guide") ||
    lowerLabel.includes("manual") ||
    lowerLabel.includes("spec")
  ) {
    return { kind: "documentation" }
  }

  if (lowerLabel.includes("slide") || lowerLabel.includes("deck") || lowerLabel.includes("presentation")) {
    return { kind: "presentation" }
  }

  if (lowerLabel.includes("data") || lowerLabel.includes("csv")) {
    return { kind: "dataset" }
  }

  if (lowerUrl.endsWith(".pdf")) {
    return { kind: "documentation", format: "PDF" }
  }

  return { kind: "other" }
}

/**
 * Extracts a clean, human-readable host label for display (e.g., "GitHub", "Google Drive").
 */
export function getResourceHostLabel(url: string): string | undefined {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "")
    if (hostname === "github.com") return "GitHub"
    if (hostname === "gitlab.com") return "GitLab"
    if (hostname === "drive.google.com" || hostname === "docs.google.com") {
      return "Google Drive"
    }
    if (hostname.endsWith("pythonanywhere.com")) return "PythonAnywhere"
    if (hostname.endsWith("vercel.app")) return "Vercel"
    return hostname
  } catch {
    return undefined
  }
}

/**
 * Merges structured `resources` and legacy `links` into a deduplicated,
 * URL-sanitized array of `ProjectResource` items.
 *
 * Structured `resources` take precedence over legacy `links` when both contain
 * the same normalized URL. Unsafe URLs are excluded.
 */
export function resolveProjectResources(input: {
  resources?: readonly ProjectResource[]
  links?: readonly ProjectLink[]
}): ProjectResource[] {
  const result: ProjectResource[] = []
  const seenUrls = new Set<string>()

  if (input.resources) {
    for (const res of input.resources) {
      const safeUrl = sanitizeUrl(res.url)
      if (safeUrl === "#" || !/^https?:\/\//i.test(safeUrl)) continue

      const normalized = normalizeResourceUrl(safeUrl)
      if (seenUrls.has(normalized)) continue
      seenUrls.add(normalized)

      result.push({
        label: res.label.trim(),
        url: safeUrl,
        kind: res.kind ?? "other",
        description: res.description?.trim() || undefined,
        format: res.format?.trim() || undefined,
      })
    }
  }

  if (input.links) {
    for (const link of input.links) {
      const safeUrl = sanitizeUrl(link.url)
      if (safeUrl === "#" || !/^https?:\/\//i.test(safeUrl)) continue

      const normalized = normalizeResourceUrl(safeUrl)
      if (seenUrls.has(normalized)) continue
      seenUrls.add(normalized)

      const inferred = inferResourceMetadataFromLegacyLink(link)
      result.push({
        label: link.label.trim(),
        url: safeUrl,
        kind: inferred.kind,
        format: inferred.format,
      })
    }
  }

  return result
}

const PRIMARY_ACTION_PRIORITY: readonly ResourceKind[] = [
  "repository",
  "demo",
  "documentation",
  "report",
  "diagram",
  "photos",
  "presentation",
  "dataset",
  "download",
  "other",
]

/**
 * Selects up to `maxCount` primary action links for the dossier header,
 * prioritizing source code, live demos, documentation, and technical reports.
 */
export function selectPrimaryHeaderActions(
  resources: readonly ProjectResource[],
  maxCount = 3
): ProjectResource[] {
  if (!resources || resources.length === 0 || maxCount <= 0) return []

  const indexed = resources.map((resource, index) => ({ resource, index }))
  indexed.sort((a, b) => {
    const prioA = PRIMARY_ACTION_PRIORITY.indexOf(a.resource.kind)
    const prioB = PRIMARY_ACTION_PRIORITY.indexOf(b.resource.kind)
    if (prioA !== prioB) return prioA - prioB
    return a.index - b.index
  })

  return indexed.slice(0, maxCount).map((entry) => entry.resource)
}
