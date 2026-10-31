import Image from "next/image"
import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getPublicImageDimensions } from "@/lib/image-dimensions"
import { cn } from "@/lib/utils"

interface MdxImageProps {
  src?: string
  alt?: string
}

export async function MdxImage({ src, alt }: MdxImageProps) {
  if (!src) return null
  const { width, height } = await getPublicImageDimensions(src)

  return (
    <span className="my-6 block overflow-hidden rounded-sm border border-border bg-surface">
      <Image
        src={src}
        alt={alt ?? ""}
        width={width}
        height={height}
        sizes="(min-width: 768px) 72ch, 100vw"
        className="h-auto w-full object-cover"
      />
    </span>
  )
}

interface ComponentRowProps {
  src: string
  alt: string
  title: string
  children: React.ReactNode
}

export async function ComponentRow({
  src,
  alt,
  title,
  children,
}: ComponentRowProps) {
  const { width, height } = await getPublicImageDimensions(src)

  return (
    <div className="my-4 flex flex-col gap-4 rounded-sm border border-border bg-surface p-4 sm:flex-row sm:items-start">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-sm border border-border bg-background">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="96px"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-sans text-base font-semibold text-foreground">
          {title}
        </h3>
        <div className="mt-1 text-sm text-muted-foreground [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Sanitizes URLs to prevent executable schemes like javascript:, vbscript:, data:,
 * and protocol-relative / backslash-based open redirect vectors.
 */
export function sanitizeUrl(url?: string): string {
  if (!url) return "#"
  const trimmed = url.trim()

  // Disallow protocol-relative URLs (//) and backslash variations (/\, \\) that can bypass protocol checks
  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("\\") ||
    /^[/\\]{2,}/.test(trimmed) ||
    /^\/[\\/]/.test(trimmed) ||
    trimmed.includes("\\")
  ) {
    return "#"
  }

  // Allow safe relative paths and anchor hashes
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return trimmed
  }

  try {
    const parsed = new URL(trimmed)
    if (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:" ||
      parsed.protocol === "mailto:"
    ) {
      return trimmed
    }
  } catch {
    return "#"
  }

  return "#"
}

interface PressCardProps {
  src: string
  alt: string
  category: string
  title: string
  href: string
  ctaLabel: string
  children: React.ReactNode
}

export async function PressCard({
  src,
  alt,
  category,
  title,
  href,
  ctaLabel,
  children,
}: PressCardProps) {
  const { width, height } = await getPublicImageDimensions(src)

  return (
    <div className="my-6 max-w-lg overflow-hidden rounded-sm border border-border bg-surface">
      <div className="border-b border-border bg-background">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-56 w-full object-cover"
        />
      </div>
      <div className="p-4">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
          {category}
        </span>
        <h3 className="mt-1 font-sans text-base font-semibold text-foreground">
          {title}
        </h3>
        <div className="mt-2 text-sm text-muted-foreground [&>p]:m-0">
          {children}
        </div>
        <a
          href={sanitizeUrl(href)}
          target={sanitizeUrl(href).startsWith("http") ? "_blank" : undefined}
          rel={
            sanitizeUrl(href).startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          className="mt-4 inline-flex items-center font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

function slugifyHeading(children: React.ReactNode): string | undefined {
  if (typeof children === "string") {
    return children
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }
  if (Array.isArray(children)) {
    const text = children
      .map((c) => (typeof c === "string" ? c : ""))
      .join("")
      .trim()
    if (text) {
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
    }
  }
  return undefined
}

export const mdxComponents = {
  img: MdxImage,
  ComponentRow,
  PressCard,
  h2: ({ children, id, className, ...props }: React.ComponentProps<"h2">) => {
    const headingId = id || slugifyHeading(children)
    return (
      <h2
        id={headingId}
        className={cn(
          "mt-10 mb-3 border-b border-border pb-2 font-sans text-base font-semibold tracking-tight text-foreground scroll-mt-24",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ children, id, className, ...props }: React.ComponentProps<"h3">) => {
    const headingId = id || slugifyHeading(children)
    return (
      <h3
        id={headingId}
        className={cn(
          "mt-6 mb-2 font-sans text-base font-semibold text-foreground scroll-mt-24",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    )
  },
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="my-3 max-w-[72ch] text-base text-foreground [&>em:only-child]:block [&>em:only-child]:font-mono [&>em:only-child]:text-xs [&>em:only-child]:not-italic [&>em:only-child]:text-muted-foreground"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="my-3 max-w-[72ch] list-disc space-y-2 pl-5 text-base text-foreground"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="text-base text-foreground" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 max-w-[72ch] rounded-sm border border-border border-l-2 border-l-primary bg-surface p-4 font-sans text-base italic text-foreground"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="my-4 max-w-[72ch] overflow-x-auto rounded-sm border border-border bg-surface p-4 font-mono text-xs text-foreground [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="rounded-sm border border-border bg-surface px-1 py-0 font-mono text-xs text-foreground"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 max-w-[72ch]">
      <Table {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => <TableHeader {...props} />,
  tbody: (props: React.ComponentProps<"tbody">) => <TableBody {...props} />,
  tr: (props: React.ComponentProps<"tr">) => <TableRow {...props} />,
  th: (props: React.ComponentProps<"th">) => <TableHead {...props} />,
  td: (props: React.ComponentProps<"td">) => <TableCell {...props} />,
  a: ({ href, ...props }: React.ComponentProps<"a">) => {
    const safeHref = sanitizeUrl(href)
    const isExternal = safeHref.startsWith("http")
    return (
      <a
        {...props}
        href={safeHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-mono text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    )
  },
}
