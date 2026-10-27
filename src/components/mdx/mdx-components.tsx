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
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center font-mono text-xs font-semibold text-primary underline-offset-4 hover:underline"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export const mdxComponents = {
  img: MdxImage,
  ComponentRow,
  PressCard,
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-10 mb-3 border-b border-border pb-2 font-sans text-base font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-6 mb-2 font-sans text-base font-semibold text-foreground"
      {...props}
    />
  ),
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
  a: (props: React.ComponentProps<"a">) => (
    <a
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-mono text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      {...props}
    />
  ),
}
