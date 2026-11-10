import * as React from "react"

export interface TocHeadingItem {
  id: string
  text: string
  level: 2 | 3
}

export interface NumberedTocHeadingItem extends TocHeadingItem {
  number: string
}

/**
 * Computes hierarchical section numbers for a list of H2 and H3 TOC items.
 * - H2 headings increment the primary two-digit counter (`01`, `02`, `03`, ...).
 * - H3 headings increment a nested counter beneath their parent H2 (`03.1`, `03.2`, ...).
 * - If an H3 appears before any H2, it initializes the primary counter at `01` (`01.1`).
 */
export function formatTocSectionNumbers(
  items: readonly TocHeadingItem[]
): NumberedTocHeadingItem[] {
  if (!items || items.length === 0) return []

  let h2Index = 0
  let h3Index = 0

  return items.map((item) => {
    if (item.level === 2) {
      h2Index += 1
      h3Index = 0
      const primary = String(h2Index).padStart(2, "0")
      return {
        ...item,
        number: primary,
      }
    }

    if (h2Index === 0) {
      h2Index = 1
    }
    h3Index += 1
    const primary = String(h2Index).padStart(2, "0")

    return {
      ...item,
      number: `${primary}.${h3Index}`,
    }
  })
}

/**
 * Recursively extracts plain text from a ReactNode tree (handling strings,
 * numbers, arrays, and inline React elements like `<code>` or `<em>`).
 */
export function extractNodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return ""
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(extractNodeText).join("")
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractNodeText(node.props.children)
  }
  return ""
}

/**
 * Normalizes plain markdown inline formatting (e.g., `` `code` ``, `**bold**`,
 * `*italic*`, `[link](url)`) into plain text before slugifying so markdown source
 * extraction matches React's rendered text tree.
 */
export function stripMarkdownInlineFormatting(raw: string): string {
  return raw
    // Remove HTML tags if any
    .replace(/<[^>]+>/g, "")
    // Replace markdown links [text](url) with text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Unwrap inline code `code`
    .replace(/`([^`]+)`/g, "$1")
    // Unwrap bold/italic **text**, __text__, *text*, _text_
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Unwrap strikethrough ~~text~~
    .replace(/~~(.*?)~~/g, "$1")
    .trim()
}

/**
 * Generates a base URL-safe anchor slug from heading text.
 * Matches existing published anchor IDs while gracefully falling back to
 * "section" when a heading consists only of symbols.
 */
export function slugifyHeadingText(input: string): string {
  const plain = stripMarkdownInlineFormatting(input)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  return plain || "section"
}

/**
 * Stateful slugger that guarantees unique heading IDs across a document.
 * First occurrence of "testing" -> "testing"
 * Second occurrence of "testing" -> "testing-2"
 * Third occurrence of "testing" -> "testing-3"
 */
export function createHeadingIdGenerator() {
  const counts = new Map<string, number>()

  return {
    slug(rawTextOrNode: string | React.ReactNode): string {
      const text =
        typeof rawTextOrNode === "string"
          ? rawTextOrNode
          : extractNodeText(rawTextOrNode)
      const base = slugifyHeadingText(text)
      const prevCount = counts.get(base) ?? 0
      const nextCount = prevCount + 1
      counts.set(base, nextCount)

      return nextCount === 1 ? base : `${base}-${nextCount}`
    },
    reset() {
      counts.clear()
    },
  }
}

/**
 * Extracts H2 and H3 headings from raw MDX/Markdown content, ignoring fenced
 * code blocks and MDX comments, and assigns deterministic unique IDs using
 * `createHeadingIdGenerator`.
 */
export function extractTocFromMdx(mdxContent: string): TocHeadingItem[] {
  if (!mdxContent || !mdxContent.trim()) return []

  const slugger = createHeadingIdGenerator()
  const items: TocHeadingItem[] = []

  // Strip multi-line MDX comments {/* ... */}
  const withoutComments = mdxContent.replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  const lines = withoutComments.split(/\r?\n/)

  let inFence = false
  let fenceMarker = ""

  for (const rawLine of lines) {
    const trimmed = rawLine.trim()

    // Detect fenced code blocks (``` or ~~~)
    const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/)
    if (fenceMatch) {
      const marker = fenceMatch[1].charAt(0)
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        inFence = false
        fenceMarker = ""
      }
      continue
    }

    if (inFence) continue

    // Match ATX H2 (##) and H3 (###) headings
    const headingMatch = trimmed.match(/^(#{2,3})\s+(.+?)(?:\s+#+\s*)?$/)
    if (!headingMatch) continue

    const level = headingMatch[1].length as 2 | 3
    const rawHeadingText = headingMatch[2].trim()
    const cleanText = stripMarkdownInlineFormatting(rawHeadingText)
    if (!cleanText) continue

    const id = slugger.slug(cleanText)
    items.push({
      id,
      text: cleanText,
      level,
    })
  }

  return items
}
