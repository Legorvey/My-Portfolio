"use client"

import * as React from "react"
import { ExternalLinkIcon, Maximize2Icon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ImageInspectModalProps {
  src: string
  alt: string
  caption?: string
  fullSizeUrl?: string
  triggerLabel?: string
  className?: string
}

export function ImageInspectModal({
  src,
  alt,
  caption,
  fullSizeUrl,
  triggerLabel = "Inspect full size",
  className,
}: ImageInspectModalProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = React.useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (typeof dialog.showModal === "function") {
      dialog.showModal()
      setIsOpen(true)
      closeButtonRef.current?.focus()
    } else if (fullSizeUrl || src) {
      window.open(fullSizeUrl ?? src, "_blank", "noopener,noreferrer")
    }
  }, [fullSizeUrl, src])

  const closeModal = React.useCallback(() => {
    const dialog = dialogRef.current
    if (dialog && dialog.open) {
      dialog.close()
    }
    setIsOpen(false)
    triggerRef.current?.focus()
  }, [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openModal}
        aria-label={`${triggerLabel}: ${alt || "project figure"}`}
        className={cn(
          "inline-flex min-h-[32px] items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        <Maximize2Icon className="size-3.5 shrink-0" aria-hidden="true" />
        <span>{triggerLabel}</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setIsOpen(false)
          triggerRef.current?.focus()
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeModal()
          }
        }}
        aria-label={alt || caption || "Full size technical figure"}
        className="m-auto max-h-[92vh] max-w-[94vw] rounded-sm border border-border bg-background p-0 text-foreground backdrop:bg-background/85 open:flex open:flex-col"
      >
        {isOpen && (
          <div className="flex max-h-[92vh] w-full flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-surface px-4 py-2.5">
              <p className="truncate font-mono text-xs text-muted-foreground">
                {alt || caption || "Technical figure"}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={fullSizeUrl ?? src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[32px] items-center gap-1 rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>Open original</span>
                  <ExternalLinkIcon className="size-3" aria-hidden="true" />
                </a>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close full size preview"
                  className="inline-flex min-h-[32px] min-w-[32px] items-center justify-center rounded-sm border border-border bg-background p-1.5 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <XIcon className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-background p-3 sm:p-6 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fullSizeUrl ?? src}
                alt={alt}
                className="max-h-[76vh] w-auto max-w-full object-contain"
              />
            </div>

            {caption && (
              <div className="border-t border-border bg-surface px-4 py-2.5 font-mono text-xs text-muted-foreground">
                {caption}
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
