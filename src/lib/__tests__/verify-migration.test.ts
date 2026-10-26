import path from "node:path"
import { describe, expect, it } from "vitest"
import {
  compareHtmlAndMdxText,
  extractHtmlArticleVisibleText,
  extractMdxVisibleText,
  verifyMigratedPage,
} from "@/lib/verify-migration"

describe("migration text-comparison script", () => {
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
    const mdx = `---\ntitle: "T"\nslug: "t"\ntype: "web"\n---\n## Title\n\nRewritten wording.`

    const result = compareHtmlAndMdxText(html, mdx)
    expect(result.match).toBe(false)
  })

  it("verifies that migrated aquafeeder.mdx matches legacy aquafeeder.html", () => {
    const rootDir = process.cwd()
    const result = verifyMigratedPage(
      path.join(rootDir, "legacy", "projects", "aquafeeder.html"),
      path.join(rootDir, "content", "projects", "aquafeeder.mdx")
    )

    expect(result.htmlText).toBe(result.mdxText)
    expect(result.match).toBe(true)
  })
})
