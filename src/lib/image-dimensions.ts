import fs from "node:fs"
import path from "node:path"
import { imageSize } from "image-size"
import { cacheLife } from "next/cache"

export interface ImageDimensions {
  width: number
  height: number
}

const FALLBACK_DIMENSIONS: ImageDimensions = { width: 1200, height: 675 }

/**
 * Reads the intrinsic size of an image in /public.
 *
 * Wrapped in "use cache" so the file read happens inside a cache scope and
 * the result is part of the prerendered static shell (Cache Components).
 */
export async function getPublicImageDimensions(
  src: string
): Promise<ImageDimensions> {
  "use cache"
  try {
    cacheLife("max")
  } catch {
    // Gracefully bypass outside Next.js Cache Components runtime (e.g. unit test runner)
  }

  if (!src || typeof src !== "string" || /^https?:\/\/|^\/\//i.test(src)) {
    return FALLBACK_DIMENSIONS
  }

  try {
    const publicDir = path.resolve(/*turbopackIgnore: true*/ process.cwd(), "public")
    // Sanitize path by stripping leading slashes and any traversal segments
    const sanitizedRelPath = path
      .normalize(src)
      .replace(/^(\.\.[\/\\])+/, "")
      .replace(/^[\/\\]+/, "")

    const fullPath = path.resolve(/*turbopackIgnore: true*/ publicDir, sanitizedRelPath)

    // Strict containment check: resolved path must reside strictly inside the public directory
    if (!fullPath.startsWith(publicDir + path.sep) && fullPath !== publicDir) {
      return FALLBACK_DIMENSIONS
    }

    if (fs.existsSync(/*turbopackIgnore: true*/ fullPath)) {
      const buffer = fs.readFileSync(/*turbopackIgnore: true*/ fullPath)
      const dimensions = imageSize(buffer)
      if (dimensions.width && dimensions.height) {
        return { width: dimensions.width, height: dimensions.height }
      }
    }
  } catch {
    // Graceful fallback prevents DoS on corrupted files, unhandled formats, or read failures
    return FALLBACK_DIMENSIONS
  }

  return FALLBACK_DIMENSIONS
}
