import Image from "next/image"
import { ImageInspectModal } from "@/components/projects/image-inspect-modal"
import { sanitizeUrl } from "@/components/mdx/mdx-components"
import { getPublicImageDimensions } from "@/lib/image-dimensions"
import { cn } from "@/lib/utils"

export interface GalleryImageItem {
  src: string
  alt: string
  caption?: string
  fullSizeUrl?: string
}

export interface ProjectGalleryProps {
  items: readonly GalleryImageItem[]
  columns?: 2 | 3
  fit?: "contain" | "cover"
  className?: string
}

export async function ProjectGallery({
  items,
  columns = 2,
  fit = "contain",
  className,
}: ProjectGalleryProps) {
  if (!items || items.length === 0) return null

  const validItems = items.filter((item) => {
    if (!item?.src) return false
    const safe = sanitizeUrl(item.src)
    return safe !== "#"
  })

  if (validItems.length === 0) return null

  const resolvedItems = await Promise.all(
    validItems.map(async (item) => {
      const safeSrc = sanitizeUrl(item.src)
      const dims = await getPublicImageDimensions(safeSrc)
      const safeFull = item.fullSizeUrl
        ? sanitizeUrl(item.fullSizeUrl)
        : undefined
      return {
        ...item,
        src: safeSrc,
        fullSizeUrl: safeFull && safeFull !== "#" ? safeFull : safeSrc,
        dims,
      }
    })
  )

  return (
    <div
      className={cn(
        "my-6 grid grid-cols-1 gap-4",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className
      )}
    >
      {resolvedItems.map((item) => (
        <figure
          key={item.src}
          className="flex flex-col justify-between overflow-hidden rounded-sm border border-border bg-surface"
        >
          <div
            className={cn(
              "relative flex items-center justify-center bg-background",
              fit === "contain" && "p-2 sm:p-3"
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.dims.width}
              height={item.dims.height}
              loading="lazy"
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className={cn(
                "w-full",
                fit === "cover"
                  ? "aspect-[16/10] object-cover"
                  : "h-auto max-h-72 object-contain"
              )}
            />
          </div>

          <figcaption className="flex items-center justify-between gap-2 border-t border-border bg-surface px-3 py-2">
            <p className="min-w-0 font-mono text-xs text-muted-foreground leading-snug break-words">
              {item.caption ?? item.alt}
            </p>
            <ImageInspectModal
              src={item.src}
              alt={item.alt}
              caption={item.caption}
              fullSizeUrl={item.fullSizeUrl}
              triggerLabel="Expand"
              className="shrink-0"
            />
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
