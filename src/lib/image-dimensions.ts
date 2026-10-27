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
  cacheLife("max")

  const normalized = src.replace(/^\//, "")
  const fullPath = path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    "public",
    normalized
  )

  if (fs.existsSync(/*turbopackIgnore: true*/ fullPath)) {
    const buffer = fs.readFileSync(/*turbopackIgnore: true*/ fullPath)
    const dimensions = imageSize(buffer)
    if (dimensions.width && dimensions.height) {
      return { width: dimensions.width, height: dimensions.height }
    }
  }

  return FALLBACK_DIMENSIONS
}
