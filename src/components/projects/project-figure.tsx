import Image from "next/image"
import { ImageInspectModal } from "@/components/projects/image-inspect-modal"
import { sanitizeUrl } from "@/components/mdx/mdx-components"
import { getPublicImageDimensions } from "@/lib/image-dimensions"
import { cn } from "@/lib/utils"

export type FigureKind = "photo" | "diagram" | "schematic" | "screenshot"

export interface ProjectFigureProps {
  src?: string
  alt?: string
  caption?: string
  credit?: string
  kind?: FigureKind
  fullSizeUrl?: string
  wide?: boolean
  fit?: "contain" | "cover"
  className?: string
}

const KIND_LABELS: Record<FigureKind, string> = {
  photo: "Photograph",
  diagram: "Architecture Diagram",
  schematic: "Technical Schematic",
  screenshot: "Interface Capture",
}

export async function ProjectFigure({
  src,
  alt = "",
  caption,
  credit,
  kind = "diagram",
  fullSizeUrl,
  wide = false,
  fit,
  className,
}: ProjectFigureProps) {
  if (!src || !src.trim()) return null

  const safeSrc = sanitizeUrl(src)
  if (safeSrc === "#") return null

  const safeFullSizeUrl = fullSizeUrl ? sanitizeUrl(fullSizeUrl) : undefined
  const resolvedFullSizeUrl =
    safeFullSizeUrl && safeFullSizeUrl !== "#" ? safeFullSizeUrl : safeSrc

  const { width, height } = await getPublicImageDimensions(safeSrc)

  // Technical diagrams, schematics, and screenshots must NEVER be cropped by default.
  const effectiveFit =
    fit ?? (kind === "photo" ? "contain" : "contain")
  const isBreakout = wide || kind === "diagram" || kind === "schematic"

  return (
    <figure
      className={cn(
        "my-6 overflow-hidden rounded-sm border border-border bg-surface",
        isBreakout ? "max-w-full" : "max-w-[72ch]",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center bg-background",
          effectiveFit === "contain" && "p-2 sm:p-4"
        )}
      >
        <Image
          src={safeSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          sizes={
            isBreakout
              ? "(min-width: 1024px) 760px, 100vw"
              : "(min-width: 768px) 72ch, 100vw"
          }
          className={cn(
            "h-auto w-full",
            effectiveFit === "cover"
              ? "max-h-[480px] object-cover"
              : "object-contain"
          )}
        />
      </div>

      <figcaption className="flex flex-col gap-2 border-t border-border bg-surface px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-0.5">
          {caption ? (
            <p className="font-mono text-xs text-muted-foreground leading-relaxed break-words">
              {caption}
            </p>
          ) : alt ? (
            <p className="font-mono text-xs text-muted-foreground leading-relaxed break-words">
              {alt}
            </p>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">
              {KIND_LABELS[kind]}
            </span>
          )}
          {credit && (
            <p className="font-mono text-[11px] text-muted-foreground/80">
              Source: {credit}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <ImageInspectModal
            src={safeSrc}
            alt={alt || caption || KIND_LABELS[kind]}
            caption={caption}
            fullSizeUrl={resolvedFullSizeUrl}
            triggerLabel="View full size"
          />
        </div>
      </figcaption>
    </figure>
  )
}

export async function TechnicalDiagram(
  props: Omit<ProjectFigureProps, "kind">
) {
  return <ProjectFigure {...props} kind="diagram" wide={props.wide ?? true} />
}
