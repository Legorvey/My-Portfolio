"use client"

import * as React from "react"
import Link from "next/link"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"
import { TextSpotlight } from "@/components/ui/text-spotlight"

export interface FooterColumn {
  heading: string
  links: { text: string; url: string }[]
}

export interface FooterProps {
  brandName?: string
  outlineText?: string
  columns?: FooterColumn[]
  copyright?: string
  className?: string
}

const defaultColumns: FooterColumn[] = [
  {
    heading: "Navigation",
    links: [
      { text: "Home", url: "/" },
      { text: "Featured Work", url: "/#projects" },
      { text: "All Projects", url: "/projects" },
      { text: "Experience", url: "/#experiences" },
      { text: "Full Résumé ↗", url: "/Resume.pdf" },
    ],
  },
  {
    heading: "Selected Projects",
    links: [
      { text: "AquaFeeder", url: "/projects/aquafeeder" },
      { text: "Gardapati Robot", url: "/projects/gardapati" },
      { text: "Futura Megaproject", url: "/projects/futura" },
      { text: "MotoSense Telemetry", url: "/projects/motosense" },
      { text: "Matcha Craft", url: "/projects/matcha-tasikmalaya" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { text: "GitHub ↗", url: "https://github.com/Legorvey" },
      { text: "LinkedIn ↗", url: "https://linkedin.com/in/adityachandrasa" },
      { text: "Email Inquiries ↗", url: "mailto:aditchandrasa1@gmail.com" },
      { text: "Instagram ↗", url: "https://instagram.com/hmte_unpad" },
    ],
  },
  {
    heading: "Location & Focus",
    links: [
      { text: "Bandung / Tasik, ID", url: "/#hero" },
      { text: "UTC+7 Timezone", url: "/#hero" },
      { text: "Padjadjaran Univ ↗", url: "https://www.unpad.ac.id" },
      { text: "Open to Roles", url: "mailto:aditchandrasa1@gmail.com" },
    ],
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

export function SiteFooter({
  brandName = "Design, coding and planning by me.",
  outlineText = "ADITYA CAKTI CHANDRASA",
  columns = defaultColumns,
  copyright = "© 2026 Aditya Cakti Chandrasa",
  className,
}: FooterProps) {
  const displayOutline = outlineText ?? "ADITYA CAKTI CHANDRASA"

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden border-t border-border bg-background px-6 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 dark:bg-neutral-950",
        className
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-muted-foreground sm:flex-row md:px-8"
      >
        <motion.div variants={itemVariants} className="space-y-1.5">
          <div className="mr-0 mb-3 md:mr-4 md:flex">
            <Link
              className="relative z-20 flex items-center space-x-2 py-0.5 text-sm font-normal text-foreground transition-colors hover:text-primary"
              href="/"
            >
              <span className="font-sans text-base font-semibold text-foreground">
                {brandName}
              </span>
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">
            {copyright}
          </div>
          <div className="text-xs text-muted-foreground/80">
            All right reserved.
          </div>
        </motion.div>

        <nav
          aria-label="Footer Navigation"
          className="mt-8 grid grid-cols-2 items-start gap-8 sm:mt-0 sm:grid-cols-4 sm:gap-10"
        >
          {columns.map((col, ci) => (
            <motion.div
              key={ci}
              variants={itemVariants}
              className="flex w-full flex-col justify-center space-y-3"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                {col.heading}
              </p>
              <ul className="list-none space-y-2.5 font-sans text-sm text-muted-foreground">
                {col.links.map((link, li) => {
                  const isExternal =
                    link.url.startsWith("http") || link.url.startsWith("mailto:")

                  return (
                    <li key={li} className="list-none">
                      {isExternal ? (
                        <a
                          className="inline-flex items-center gap-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          href={link.url}
                          target={
                            link.url.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.url.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {link.text}
                        </a>
                      ) : (
                        <Link
                          className="inline-flex items-center gap-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          href={link.url}
                        >
                          {link.text}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className="mt-10 flex w-full justify-center sm:mt-14 lg:mt-16"
      >
        <TextSpotlight
          text={displayOutline}
          className="w-full text-center"
          textClassName="font-bold tracking-tight leading-none text-center select-none"
          baseClassName="text-transparent dark:[--stroke:#d4d4d4] [--stroke:#525252]"
          baseStyle={{
            fontSize: "clamp(3rem, 14vw, 11rem)",
            WebkitTextStroke: "1.5px var(--stroke, #525252)",
          }}
          spotlightClassName="text-foreground dark:text-neutral-100"
          spotlightStyle={{
            fontSize: "clamp(3rem, 14vw, 11rem)",
            WebkitTextStroke: "0px transparent",
          }}
          spotlightSize={240}
          spotlightArea={65}
          animateOnPhone={true}
        />
      </motion.div>
    </footer>
  )
}

export { SiteFooter as FooterWithMinimalOutline }
