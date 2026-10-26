import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const metadata: Metadata = {
  title: "Design Tokens & System Specimen | Aditya Chandrasa",
  description: "Technical datasheet specification for colors, typography, spacing, and UI primitives.",
}

const COLOR_SWATCHES = [
  {
    name: "background",
    variable: "var(--background)",
    swatchClass: "bg-background text-foreground",
    usage: "Primary page canvas (warm off-white in light, carbon near-black in dark)",
    contrast: "16.9:1 (Light) / 15.5:1 (Dark) vs foreground — WCAG AAA",
  },
  {
    name: "surface / card",
    variable: "var(--surface)",
    swatchClass: "bg-surface text-foreground",
    usage: "Datasheet headers, infobox panels, elevated containers",
    contrast: "15.5:1 (Light) / 14.4:1 (Dark) vs foreground — WCAG AAA",
  },
  {
    name: "muted / secondary",
    variable: "var(--muted)",
    swatchClass: "bg-muted text-foreground",
    usage: "Row hover states, secondary fills, subtle backgrounds",
    contrast: "6.4:1 (Light) / 6.1:1 (Dark) vs muted-foreground — WCAG AA",
  },
  {
    name: "foreground",
    variable: "var(--foreground)",
    swatchClass: "bg-foreground text-background",
    usage: "Primary body copy, headings, high-emphasis values",
    contrast: "16.9:1 (Light) / 15.5:1 (Dark) vs background — WCAG AAA",
  },
  {
    name: "muted-foreground",
    variable: "var(--muted-foreground)",
    swatchClass: "bg-muted-foreground text-background",
    usage: "Metadata labels, timestamps, secondary descriptions",
    contrast: "7.3:1 (Light) / 7.0:1 (Dark) vs background — WCAG AAA",
  },
  {
    name: "primary / accent",
    variable: "var(--primary)",
    swatchClass: "bg-primary text-primary-foreground",
    usage: "Single muted steel-blue accent for interactive controls, active states, and links",
    contrast: "7.4:1 (Light) / 6.7:1 (Dark) vs background & primary-foreground — WCAG AA+",
  },
  {
    name: "border / input",
    variable: "var(--border)",
    swatchClass: "bg-border text-foreground",
    usage: "1px structural hairlines, table rules, and form borders",
    contrast: "Structural divider token",
  },
  {
    name: "destructive",
    variable: "var(--destructive)",
    swatchClass: "bg-destructive text-destructive-foreground",
    usage: "Validation errors and critical status alerts",
    contrast: "8.2:1 (Light) / 5.3:1 (Dark) vs background — WCAG AA+",
  },
] as const

const TYPE_SPECIMENS = [
  {
    token: "text-xl",
    metrics: "1.5rem (24px) / 2rem (32px) line-height",
    fontClass: "font-sans text-xl font-semibold tracking-tight",
    role: "Page Title (h1) & Primary Metric Readout",
    sample: "Building Logic from Schematic to Hardware",
  },
  {
    token: "text-base",
    metrics: "1rem (16px) / 1.625rem (26px) line-height",
    fontClass: "font-sans text-base",
    role: "Body Prose (~72ch max) & Section Headings (h2/h3 with weight/rule)",
    sample:
      "Electrical Engineering student focused on practical logic behind physical systems. I build prototypes that work in the lab and stay reliable in the field.",
  },
  {
    token: "text-sm",
    metrics: "0.875rem (14px) / 1.375rem (22px) line-height",
    fontClass: "font-sans text-sm",
    role: "Datasheet Table Cells, Secondary Descriptions, Compact Copy",
    sample:
      "Engineered a preventive cutoff logic using an ESP32 microcontroller and FSM Moore modeling to mitigate tidal flood hazards.",
  },
  {
    token: "text-xs (mono)",
    metrics: "0.75rem (12px) / 1rem (16px) line-height",
    fontClass: "font-mono text-xs uppercase tracking-wider",
    role: "Monospace Labels, Metadata Fields, Badges, Table Headers, Controls",
    sample: "ROLE: PROJECT MANAGER · PERIOD: 2025-06 · STATUS: COMPLETED",
  },
] as const

const SAMPLE_ROWS = [
  {
    title: "Gardapati: Integrated Electrical Safety",
    type: "hardware",
    role: "Project Manager",
    period: "2026",
    status: "Proposal",
    tools: ["ESP32", "FSM Moore", "GSM"],
  },
  {
    title: "AquaFeeder IoT: Full-Stack Ecosystem",
    type: "hardware",
    role: "Embedded Systems & Web Dev",
    period: "2025-06",
    status: "Completed",
    tools: ["ESP32", "C++", "Python Flask", "JS"],
  },
  {
    title: "Futura 2025: National Tech Event",
    type: "event",
    role: "Vice Project Officer (VPO 2)",
    period: "2025-02 — 2025-11",
    status: "Completed",
    tools: ["Event Mgmt", "Project Mgmt"],
  },
  {
    title: "Interactive Web Portfolio",
    type: "web",
    role: "Front-End Dev & UI Designer",
    period: "2026-03",
    status: "Live",
    tools: ["HTML", "CSS", "Vanilla JS", "Vercel"],
  },
] as const

export default function DesignTokensPage() {
  return (
    <Container className="py-10">
      <header className="border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          SPECIFICATION SHEET · REV 2.0 · PHASE 3
        </p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          Design Tokens &amp; UI Primitives
        </h1>
        <p className="mt-2 max-w-[72ch] text-sm text-muted-foreground">
          Technical/editorial design system using IBM Plex Sans and IBM Plex Mono, a strict 4-step type scale, a 4px spacing grid, and a single muted steel-blue accent that adapts automatically to system light/dark mode.
        </p>
      </header>

      {/* 1. Color Swatches */}
      <section aria-labelledby="section-colors" className="mt-10">
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <h2
            id="section-colors"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
          >
            01 / Color Palette &amp; Contrast Tokens
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            System prefers-color-scheme
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLOR_SWATCHES.map((swatch) => (
            <div
              key={swatch.name}
              className="flex flex-col justify-between rounded-sm border border-border bg-background p-3"
            >
              <div>
                <div
                  className={`flex h-16 items-end rounded-sm border border-border p-2 font-mono text-xs font-medium ${swatch.swatchClass}`}
                >
                  <span>{swatch.name}</span>
                </div>
                <p className="mt-3 font-mono text-xs font-semibold text-foreground">
                  {swatch.variable}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{swatch.usage}</p>
              </div>
              <p className="mt-3 border-t border-border pt-2 font-mono text-xs text-muted-foreground">
                {swatch.contrast}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography Specimens */}
      <section aria-labelledby="section-typography" className="mt-12">
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <h2
            id="section-typography"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
          >
            02 / Type Scale (Max 4 Sizes) &amp; Families
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            IBM Plex Sans + IBM Plex Mono
          </span>
        </div>

        <div className="mt-4 divide-y divide-border rounded-sm border border-border bg-background">
          {TYPE_SPECIMENS.map((item) => (
            <div key={item.token} className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs font-semibold text-primary">
                  {item.token}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.metrics}
                </span>
                <span className="text-xs text-muted-foreground">{item.role}</span>
              </div>
              <div className="md:col-span-2">
                <p className={`max-w-[72ch] text-foreground ${item.fontClass}`}>
                  {item.sample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sample Datasheet Table */}
      <section aria-labelledby="section-table" className="mt-12">
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <h2
            id="section-table"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
          >
            03 / Datasheet Table Specimen
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            shadcn/ui Table (restyled)
          </span>
        </div>

        <div className="mt-4">
          <Table>
            <TableCaption>
              Table 1.0 — Sample engineering &amp; operational deployment log
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tools</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_ROWS.map((row) => (
                <TableRow key={row.title}>
                  <TableCell className="font-medium text-foreground">
                    {row.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.role}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {row.period}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{row.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {row.tools.map((tool) => (
                        <Badge key={tool} variant="ghost">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 4. Buttons, Badges, and Toggle Group */}
      <section aria-labelledby="section-controls" className="mt-12">
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <h2
            id="section-controls"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
          >
            04 / Interactive Primitives (Buttons, Badges, Toggle Group)
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            4px Grid · 2px Radius
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-sm border border-border bg-surface p-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Button Variants &amp; Sizes
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button variant="default">Default Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link Action</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
              <Button size="xs" variant="outline">
                Size XS (24px)
              </Button>
              <Button size="sm" variant="outline">
                Size SM (28px)
              </Button>
              <Button size="default" variant="outline">
                Default (32px)
              </Button>
              <Button size="lg" variant="outline">
                Size LG (36px)
              </Button>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-surface p-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Badge Variants
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
              Monospace uppercase tags with 2px border radius for system categories and tool stacks.
            </p>
          </div>

          <div className="rounded-sm border border-border bg-surface p-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Toggle Group (Filter Control)
            </h3>
            <div className="mt-3">
              <ToggleGroup defaultValue={["all"]} variant="outline" size="sm">
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="hardware">Hardware</ToggleGroupItem>
                <ToggleGroupItem value="web">Web</ToggleGroupItem>
                <ToggleGroupItem value="event">Event</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
              Keyboard-navigable filter bar using Base UI ToggleGroup primitives.
            </p>
          </div>
        </div>
      </section>
    </Container>
  )
}
