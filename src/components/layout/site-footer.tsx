"use client"

import * as React from "react"
import Link from "next/link"
import { motion, type Variants } from "motion/react"
import { areCaseStudiesEnabled } from "@/lib/case-studies-config"
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
      { text: "Full Résumé ↗", url: "/resume.pdf" },
    ],
  },
  {
    heading: "Selected Projects",
    links: [
      { text: "Gardapati Safety System", url: "/projects/gardapati" },
      { text: "MOTOSENSE Vibration Monitor", url: "/projects/motosense" },
      { text: "AquaFeeder IoT", url: "/projects/aquafeeder" },
      { text: "PID Control Simulator", url: "/projects/pid-control-simulator" },
      { text: "PLN Thermography", url: "/projects/pln-thermography-internship" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { text: "GitHub ↗", url: "https://github.com/Legorvey" },
      { text: "LinkedIn ↗", url: "https://linkedin.com/in/adityachandrasa" },
      {
        text: "Email Inquiries ↗",
        url: "mailto:aditchandrasa1@gmail.com?subject=Portfolio%20Inquiry",
      },
      { text: "Instagram ↗", url: "https://instagram.com/hmteunpad" },
    ],
  },
  {
    heading: "Location & Focus",
    links: [
      {
        text: "Bandung, Indonesia ↗",
        url: "https://maps.google.com/?q=Bandung,Indonesia",
      },
      { text: "UTC+7 Timezone ↗", url: "https://time.is/UTC+7" },
      { text: "Padjadjaran University ↗", url: "https://www.unpad.ac.id" },
      {
        text: "Open to Roles ↗",
        url: "mailto:aditchandrasa1@gmail.com?subject=Role%20Inquiry%20-%20Aditya%20Chandrasa",
      },
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
  const caseStudiesEnabled = areCaseStudiesEnabled()
  const displayOutline = outlineText ?? "ADITYA CAKTI CHANDRASA"

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden border-t border-border bg-background px-4 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 dark:bg-neutral-950",
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
              aria-label="Aditya Chandrasa - Home"
              className="relative z-20 flex items-center space-x-2 py-0.5 text-sm font-normal text-foreground transition-colors hover:text-primary"
              href="/"
            >
              <span className="font-sans text-base font-semibold text-foreground">
                {brandName}
              </span>
            </Link>
          </div>
          <div className="text-xs text-muted-foreground" suppressHydrationWarning>
            {copyright}
          </div>
          <div className="text-xs text-muted-foreground/80" suppressHydrationWarning>
            All rights reserved.
          </div>
        </motion.div>

        <nav
          aria-label="Footer Navigation"
          className="mt-8 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:mt-0 sm:grid-cols-4 sm:gap-10"
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
                  const isPdf = link.url.endsWith(".pdf")
                  const isHttp = link.url.startsWith("http")
                  const isMail = link.url.startsWith("mailto:")
                  const isExternal = isHttp || isMail || isPdf
                  const hasArrow = link.text.endsWith("↗")
                  const label = hasArrow ? link.text.slice(0, -1).trim() : link.text

                  const linkContent = (
                    <>
                      <span>{label}</span>
                      {hasArrow && (
                        <span aria-hidden="true" className="text-primary/70">
                          ↗
                        </span>
                      )}
                    </>
                  )

                  return (
                    <li key={li} className="list-none">
                      {isExternal ? (
                        <a
                          className="inline-flex items-center gap-1 py-1.5 -my-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          href={link.url}
                          target={isHttp || isPdf ? "_blank" : undefined}
                          rel={
                            isHttp || isPdf
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {linkContent}
                        </a>
                      ) : !caseStudiesEnabled &&
                        link.url.startsWith("/projects/") &&
                        link.url !== "/projects" ? (
                        <Link
                          className="inline-flex items-center gap-1 py-1.5 -my-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          href="/projects"
                          title="View in Project Archive"
                        >
                          {linkContent}
                        </Link>
                      ) : (
                        <Link
                          className="inline-flex items-center gap-1 py-1.5 -my-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          href={link.url}
                        >
                          {linkContent}
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
            fontSize: "clamp(1.35rem, 11vw, 11rem)",
            WebkitTextStroke: "1.5px var(--stroke, #525252)",
          }}
          spotlightClassName="text-foreground dark:text-neutral-100"
          spotlightStyle={{
            fontSize: "clamp(1.35rem, 11vw, 11rem)",
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
