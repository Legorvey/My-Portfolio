import path from "node:path"
import { describe, expect, it } from "vitest"
import {
  compareHtmlAndMdxText,
  extractHtmlArticleVisibleText,
  extractMdxVisibleText,
  getLegacyProjectSlugs,
  verifyInternalLinks,
  verifyLegacyUrlsAndRedirects,
  verifyMigratedPage,
  verifyProjectImagesAndAltText,
} from "@/lib/verify-migration"

describe("migration text-comparison and QA verification script", () => {
  it("extracts visible text from legacy HTML article-content", () => {
    const html = `
      <article class="article-container">
        <h1>Ignored Header</h1>
        <div class="article-content">
          <h2>The Mission</h2>
          <p>First paragraph with <strong>bold</strong> and <code>code</code>.</p>
          <ul>
            <li>Item one</li>
          </ul>
        </div>
      </article>
    `
    expect(extractHtmlArticleVisibleText(html)).toBe(
      "The Mission First paragraph with bold and code. Item one"
    )
  })

  it("extracts visible text from MDX including ComponentRow and PressCard props", () => {
    const mdx = `---
title: "Sample"
slug: "sample"
type: "hardware"
---

## The Mission

First paragraph with **bold** and \`code\`.

- Item one

<ComponentRow src="/img.png" alt="Alt" title="ESP32: The Main Brain">
  <p>Acts as the hub.</p>
</ComponentRow>

![Ignored Image Alt](/img2.png)

*Caption text.*
`
    expect(extractMdxVisibleText(mdx)).toBe(
      "The Mission First paragraph with bold and code. Item one ESP32: The Main Brain Acts as the hub. Caption text."
    )
  })

  it("detects differences when text does not match", () => {
    const html = `<article class="article-container"><div class="article-content"><h2>Title</h2><p>Original wording.</p></div></article>`
    const mdx = `---\ntitle: "T"\nslug: "t"\ntype: "software"\n---\n## Title\n\nRewritten wording.`

    const result = compareHtmlAndMdxText(html, mdx)
    expect(result.match).toBe(false)
  })

  it("discovers only the 7 legacy project pages in legacy/projects", () => {
    expect(getLegacyProjectSlugs()).toEqual([
      "aquafeeder",
      "futura",
      "gardapati",
      "matcha-tasikmalaya",
      "personal-web",
      "pgs25",
      "unex",
    ])
  })

  it.each([
    "aquafeeder",
    "gardapati",
    "personal-web",
    "matcha-tasikmalaya",
    "futura",
    "pgs25",
    "unex",
  ])(
    "verifies that migrated %s.mdx matches legacy %s.html",
    (slug) => {
      const rootDir = process.cwd()
      const result = verifyMigratedPage(
        path.join(rootDir, "legacy", "projects", `${slug}.html`),
        path.join(rootDir, "content", "projects", `${slug}.mdx`)
      )

      expect(result.htmlText).toBe(result.mdxText)
      expect(result.match).toBe(true)
    }
  )

  it("verifies every referenced project image exists in public/ and has non-empty alt text", () => {
    expect(verifyProjectImagesAndAltText()).toEqual([])
  })

  it("verifies every legacy URL and image path resolves to a v2 route or redirect target", () => {
    expect(verifyLegacyUrlsAndRedirects()).toEqual([])
  })

  it("verifies every internal link in src/ and content/projects/ resolves", () => {
    expect(verifyInternalLinks()).toEqual([])
  })
})
