import { describe, expect, it } from "vitest"
import { sanitizeUrl } from "@/components/mdx/mdx-components"
import { ProjectLinkSchema } from "@/lib/content"
import { getPublicImageDimensions } from "@/lib/image-dimensions"

describe("Security Sanitizer (sanitizeUrl)", () => {
  it("blocks javascript: URI injection payloads", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("#")
    expect(sanitizeUrl("JAVASCRIPT:alert(document.cookie)")).toBe("#")
    expect(sanitizeUrl("  javascript:void(0)  ")).toBe("#")
  })

  it("blocks data: and vbscript: URIs", () => {
    expect(sanitizeUrl("data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==")).toBe("#")
    expect(sanitizeUrl("vbscript:MsgBox(1)")).toBe("#")
  })

  it("blocks protocol-relative URLs that attempt open redirection", () => {
    expect(sanitizeUrl("//malicious.example.com/payload")).toBe("#")
  })

  it("permits safe HTTP and HTTPS URLs", () => {
    expect(sanitizeUrl("https://adityac.dev")).toBe("https://adityac.dev")
    expect(sanitizeUrl("http://localhost:3000")).toBe("http://localhost:3000")
    expect(sanitizeUrl("https://github.com/Legorvey")).toBe("https://github.com/Legorvey")
  })

  it("permits safe mailto URLs", () => {
    expect(sanitizeUrl("mailto:aditchandrasa1@gmail.com")).toBe("mailto:aditchandrasa1@gmail.com")
  })

  it("permits safe relative paths and anchor hashes", () => {
    expect(sanitizeUrl("/projects/aquafeeder")).toBe("/projects/aquafeeder")
    expect(sanitizeUrl("#hero")).toBe("#hero")
  })

  it("returns '#' on empty, null, or undefined values", () => {
    expect(sanitizeUrl("")).toBe("#")
    expect(sanitizeUrl(undefined)).toBe("#")
  })
})

describe("ProjectLinkSchema Protocol Security", () => {
  it("accepts valid HTTPS and HTTP URLs", () => {
    const validHttps = ProjectLinkSchema.safeParse({
      label: "Proposal",
      url: "https://example.com/proposal",
    })
    expect(validHttps.success).toBe(true)

    const validHttp = ProjectLinkSchema.safeParse({
      label: "Demo",
      url: "http://example.com/demo",
    })
    expect(validHttp.success).toBe(true)
  })

  it("rejects executable URI schemes such as javascript:, data:, and file:", () => {
    const jsScheme = ProjectLinkSchema.safeParse({
      label: "Exploit",
      url: "javascript:alert(1)",
    })
    expect(jsScheme.success).toBe(false)

    const dataScheme = ProjectLinkSchema.safeParse({
      label: "Payload",
      url: "data:text/html,<script>alert(1)</script>",
    })
    expect(dataScheme.success).toBe(false)

    const fileScheme = ProjectLinkSchema.safeParse({
      label: "File",
      url: "file:///etc/passwd",
    })
    expect(fileScheme.success).toBe(false)
  })
})

describe("getPublicImageDimensions Traversal Defense & Exception Safety", () => {
  it("returns fallback dimensions and does not throw on directory traversal attempts", async () => {
    const traversalResult = await getPublicImageDimensions("/../../package.json")
    expect(traversalResult).toEqual({ width: 1200, height: 675 })

    const dotDotResult = await getPublicImageDimensions("../../.env")
    expect(dotDotResult).toEqual({ width: 1200, height: 675 })
  })

  it("returns fallback dimensions and does not throw on Windows drive letters or UNC paths", async () => {
    const driveLetterResult = await getPublicImageDimensions("C:\\Windows\\System32\\cmd.exe")
    expect(driveLetterResult).toEqual({ width: 1200, height: 675 })

    const uncResult = await getPublicImageDimensions("\\\\localhost\\share\\image.png")
    expect(uncResult).toEqual({ width: 1200, height: 675 })
  })

  it("returns fallback dimensions and does not throw on external URLs", async () => {
    const externalResult = await getPublicImageDimensions("https://images.unsplash.com/photo-test")
    expect(externalResult).toEqual({ width: 1200, height: 675 })
  })

  it("returns fallback dimensions and does not throw on non-existent files", async () => {
    const nonExistentResult = await getPublicImageDimensions("/images/non-existent-image.png")
    expect(nonExistentResult).toEqual({ width: 1200, height: 675 })
  })
})
