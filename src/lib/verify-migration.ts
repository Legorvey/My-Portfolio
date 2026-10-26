import fs from "node:fs"
import matter from "gray-matter"

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
