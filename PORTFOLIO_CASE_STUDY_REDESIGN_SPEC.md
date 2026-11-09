# Project Dossier — Complete Case Study & Engineering Archive Redesign

> **Implementation brief for an AI coding agent**  
> **Target repository:** `https://github.com/Legorvey/My-Portfolio`  
> **Target branch:** `v2`  
> **Site:** `https://adityac.dev/`  
> **Primary routes:** `/projects` and `/projects/[slug]`  
> **Goal:** Transform individual case-study pages from oversized metadata cards into elegant, accessible, long-lived engineering dossiers that function both as public portfolio stories and as a personal documentation/reference archive.

---

## 0. Your Assignment (Read This First)

You are the senior frontend engineer, design-systems engineer, UX designer, technical information architect, and accessibility reviewer responsible for **implementing** this redesign in the existing repository, not producing a disconnected mockup.

**Inspect the codebase first.** Read `AGENTS.md`, `GEMINI.md`, the project README, and the relevant code before editing. Treat this document as the target product specification; adapt exact file placement and types to the real repository rather than blindly overwriting existing implementations.

### Non-negotiable behavior

1. **Implement working code**, not just concepts, screenshots, or suggestions.
2. Work on `v2` or a branch created from `v2`; avoid unrelated changes.
3. Preserve the existing **Next.js App Router + strict TypeScript + Tailwind v4 + MDX + YAML frontmatter + Zod** architecture.
4. Prefer existing components, icons, utilities, styles, and dependencies. Add a dependency only when its benefit justifies its cost.
5. Maintain the website's distinctive **quiet engineering-datasheet/editorial identity**. This is not a SaaS dashboard, Notion clone, or generic animated portfolio template.
6. **Never invent project achievements, metrics, diagrams, files, links, technical results, or unpublished facts.** Use existing verified content. Optional fields should be omitted cleanly when unavailable.
7. Preserve existing project slugs, routes, MDX content, search-engine metadata, and the case-study feature flag unless a change is intentional and well tested.
8. Preserve both dark and light mode, keyboard behavior, accessibility, mobile usability, and reduced-motion support.
9. Do not publicly expose secrets, confidential materials, privileged employer documents, or non-public Drive links.
10. Finish by running the repository's available validation scripts and provide a file-by-file implementation summary, testing evidence, and any remaining gaps.

### Definition of success

A new visitor must be able to understand a project in **30 seconds**. A technical reader must be able to understand key architectural decisions in **3–5 minutes**. The owner must be able to return **years later** and find project photos, raw files, reports, wiring diagrams, repository links, technical details, and lessons learned without searching through old folders.

The product is **a public portfolio + personal engineering knowledge base + well-organized resource index**. All three purposes matter.

---

## 1. Existing Codebase: Verified Starting Point

The following locations and behaviors were observed on the public `v2` source; verify they still exist in the local checkout before editing.

| Location | Existing responsibility | Desired change |
| --- | --- | --- |
| `src/app/projects/[slug]/page.tsx` | Case-study route; metadata, JSON-LD, breadcrumbs, header/infobox, cover image, MDX article | Replace giant infobox with an editorial header and responsive article/sidebar dossier |
| `src/lib/content.ts` | `ProjectFrontmatterSchema`, `ProjectLinkSchema`, parsing, validation, sorting, loading | Extend content metadata **backward-compatibly** for categorized resources and optional visual/summary fields |
| `src/components/mdx/mdx-components.tsx` | MDX primitives, images, technical tables, custom cards, heading ID generation, URL sanitizer | Add accessible figure/diagram/gallery/reference components; improve headings and link treatment |
| `src/components/projects/projects-table.tsx` | `/projects` listing with type filters, sorting, mobile entries | Preserve behavior; refine later, optionally adding keyword search |
| `src/lib/case-studies-config.ts` | `areCaseStudiesEnabled()` feature gate | Preserve exactly unless deliberately enabling publication |
| `src/app/globals.css` | Theme tokens and typography | Reuse semantic variables; add only necessary dossier-specific tokens/classes |
| `content/projects/*.mdx` | Existing individual project narratives | Preserve prose initially; improve gradually using a reusable template |

### Specific existing UI problems

- The page title currently uses `TextSpotlight` with `baseClassName="text-muted-foreground/45"`, making essential H1 text unnecessarily dim. **Remove this effect from the H1**; keep TextSpotlight elsewhere if desired.
- Project **type** and **status** are repeated in both the badges and the four-column `<dl>` grid. Keep each fact once in a logical location.
- The metadata area overpowers the actual case study and resembles an admin dashboard.
- The project thumbnail uses `max-h-96 w-full object-cover` in its hero context. This can crop wiring diagrams and documentation.
- MDX images also use `object-cover`; technical imagery should default to natural aspect ratio / contain, not crop.
- Links are treated as an optional undifferentiated list; they need meaningful categories, descriptions, and context.
- Existing section headings have IDs, but the reader needs reliable in-page navigation.
- The current body starts after an oversized visual header instead of quickly revealing useful technical information.

### Existing architectural strengths to preserve

- Server Components by default; minimize client-side JS.
- MDX via `next-mdx-remote/rsc`, frontmatter via `gray-matter`, validation via Zod.
- Type categories: `hardware`, `software`, `research`, `event`, `business`, `work`.
- Existing `title`, `slug`, `type`, `summary`, `role`, `start`, `end`, `status`, `tools`, `tags`, `links`, `thumbnail`, `featured`, and `order` fields.
- Existing slug-to-filename validation and project sort behavior.
- Existing URL-sanitization rules and safe external-link handling.
- Existing SEO: `generateMetadata`, Open Graph, canonical link, JSON-LD, sitemap logic.
- Existing feature gate: production defaults to unpublished unless `NEXT_PUBLIC_ENABLE_CASE_STUDIES=true`.
- IBM Plex Sans for prose and IBM Plex Mono for metadata, code, and technical labels.
- The established dark/light palette and spacing system.

---

## 2. Core UX Philosophy

**Design concept:** *The Engineering Dossier.*

The inspiration is an editorial technical report with helpful documentation navigation—not a database record rendered as a giant card.

### Information hierarchy

A project page should follow this order:

1. Breadcrumbs.
2. Compact project classification / eyebrow.
3. **Large, immediately readable title**.
4. One-sentence purpose and a short plain-language summary.
5. Compact primary metadata: date, role, status (only if meaningful).
6. Strong primary actions when supplied: source code, live demo, original documentation.
7. Optional **genuine** project cover/photo, displayed intelligently.
8. Main dossier content, with right-hand sticky sidebar for **Project Resources** and **On This Page** navigation.
9. Closing section: lessons, limitations, next steps, and related projects when available.

### Three conceptual layers

| Layer | Purpose | Typical content |
| --- | --- | --- |
| **Showcase** | Quickly establish the value and context of the work | Title, problem, contribution, project outcome, selected image |
| **Engineering narrative** | Explain the work at a meaningful technical depth | Constraints, system architecture, implementation, tests, tradeoffs, lessons |
| **Reference archive** | Retrieve original knowledge and artifacts years later | Files, documents, photos, diagrams, source, parts, API details, reports |

A project is not required to have every layer populated equally. A full-stack IoT build and a field-inspection internship are different project types and must be allowed to use different sections and artifacts.

### Visual principles

- Calm, precise, editorial, technical, mature.
- Prioritize **readability over novelty**.
- Use a single restrained accent color and neutral surfaces.
- Strong heading contrast; reserve muted text for supporting information.
- Avoid glassmorphism, conspicuous gradients, enormous icon tiles, overdone shadows, neon glows, and scroll-triggered distractions.
- Do not frame the entire project page inside one enormous bordered container.
- Use borders primarily to separate genuinely distinct surfaces, especially resource panels and media frames.
- Make whitespace and typography—not decorative ornamentation—do the heavy lifting.
- Embrace detailed tables and specs **within** technical sections, but not as the first and dominant element on the page.

---

## 3. Target Page Wireframes

### 3.1 Desktop: wide layout

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Global navigation                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ Home  /  Projects  /  Hardware  /  AquaFeeder                                             │
│                                                                                         │
│ HARDWARE · INTERNET OF THINGS                                                           │
│                                                                                         │
│ AquaFeeder                                                                              │
│ Building a connected automatic fish-feeding system                                      │
│                                                                                         │
│ ESP32-based automatic feeding with sensing and a Flask web control interface.           │
│                                                                                         │
│ ◷ Jun 2025      ◈ Embedded Systems & Web Dev      ✓ Completed                            │
│                                                                                         │
│ [Source Code ↗]  [Documentation ↗]        ESP32 · C++ · Python Flask · JavaScript          │
│                                                                                         │
│ ─────────────────────────────────────────────────────────────────────────────────────── │
│                                                                                         │
│  MAIN ARTICLE / CASE STUDY (approx. 680–760 px)   │  STICKY SIDEBAR (approx. 250–300 px) │
│                                                  │                                      │
│  Overview                                        │  PROJECT RESOURCES                    │
│  Introductory engineering summary.               │  ┌────────────────────────────────┐  │
│                                                  │  │ Source code               ↗    │  │
│  [Optional project photograph / figure]          │  │ Original photos          ↗    │  │
│  [Caption: prototype wiring/assembly]            │  │ Technical report         ↗    │  │
│                                                  │  │ CAD / diagrams           ↗    │  │
│  Problem & constraints                           │  └────────────────────────────────┘  │
│  Why the project existed, actual requirements.   │                                      │
│                                                  │  ON THIS PAGE                        │
│  System architecture                             │  Overview                            │
│  [Full-width, uncropped technical diagram]       │  Problem & constraints               │
│  [Click to expand / open original]                │  Architecture                        │
│                                                  │  Implementation                      │
│  Implementation                                  │  Testing & results                   │
│  API, threading, firmware, hardware...           │  Technical reference                │
│                                                  │  Gallery                             │
│  Testing & results                               │  Lessons learned                     │
│                                                  │                                      │
│  Technical reference                             │                                      │
│  [Tables, specs, code, pin maps, endpoints]       │                                      │
│                                                  │                                      │
│  Gallery                                         │                                      │
│  Lessons learned                                 │                                      │
│                                                  │                                      │
│  ─────────────────────────────────────────────   │                                      │
│  Related project / Back to projects              │                                      │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Mobile: single column

```text
┌────────────────────────────────┐
│ Global nav                     │
│ Home / Projects / AquaFeeder   │
│                                │
│ HARDWARE · IOT                 │
│ AquaFeeder                     │
│ A connected feeding system     │
│                                │
│ Summary wraps naturally.       │
│                                │
│ Jun 2025 · Completed           │
│ Embedded Systems & Web Dev     │
│                                │
│ [Source] [Documentation]       │
│                                │
│ ┌────────────────────────────┐ │
│ │ Project resources          │ │
│ │ Code / Photos / Reports    │ │
│ └────────────────────────────┘ │
│                                │
│ [Contents ▾]                   │
│                                │
│ Overview                       │
│ Paragraphs                     │
│                                │
│ [Uncropped full-width media]   │
│                                │
│ Architecture                   │
│ ...                            │
└────────────────────────────────┘
```

Do **not** implement a two-column desktop layout below the breakpoint where the article and sidebar both become cramped. Reflow to one column before horizontal overflow occurs.

---

## 4. Design System Specifications

Use existing semantic tokens from `src/app/globals.css` wherever possible. The values below are **reference targets, not a command to overwrite the existing theme**.

### 4.1 Color (dark mode inspiration)

| Element | Reference | Notes |
| --- | --- | --- |
| Background | `#0B0C0E` | Existing near-black carbon background |
| Primary foreground | `#ECEAE4` to `#F1F2F4` | Clear headings and article text |
| Secondary foreground | `#A7ADBA` | Descriptions and short metadata |
| Muted foreground | `#858B9B` | Nonessential labels only; verify contrast |
| Surface | `#15191F` | Resource panel, figure background |
| Subtle border | `#2B303A` | Visible but quiet separators |
| Link/accent | Existing semantic `--primary` | Do not hardcode blue against every theme |
| Success/status | Existing success semantic token if present | Never depend only on green to convey status |

Support light mode with the *existing* light semantic palette. Do not hardcode dark-mode values directly into all component class names.

### 4.2 Typography

| Usage | Mobile | Desktop | Guidance |
| --- | --- | --- | --- |
| Case-study H1 | ~30–36 px | ~40–48 px | Semibold, tight leading, always fully legible |
| Supporting subtitle | ~18 px | ~20–22 px | Optional, concise, not a second H1 |
| Article H2 | ~22 px | ~24–28 px | Strong hierarchy with generous top spacing |
| Article H3 | ~18 px | ~19–21 px | No arbitrary capitalization |
| Body | 15–16 px | 16–17 px | 1.6–1.75 line-height |
| Captions | 12–13 px | 12–13 px | Clear association with media |
| Metadata | 12–13 px | 12–13 px | IBM Plex Mono for codes, dates, labels |
| Tech chips | 11–12 px | 11–12 px | Low emphasis, wrap naturally |

The main prose width should be approximately **66–74 characters**. Wide tables, diagrams, and galleries can intentionally escape the text measure when helpful and technically correct.

### 4.3 Spacing and dimensions

- Build on the established 4 px spacing scale.
- Outer desktop page max-width: approximately **1120–1200 px**, adjusted to the existing `Container` component.
- Main article: `minmax(0, 1fr)` / approximately 680–760 px of comfortable prose.
- Sidebar: approximately 260–300 px.
- Column gap: approximately 40–56 px.
- Desktop content top spacing: approximately 48–64 px after navigation/breadcrumbs.
- Header title-to-summary spacing: approximately 12–20 px.
- Article section separation: approximately 48–72 px, according to semantics.
- Surface radius: use the existing small/medium radius family; avoid giant rounded cards.
- Border: typically 1 px, neutral and theme-aware.
- Ensure sticky sidebar starts below the fixed navbar, with adequate scroll clearance.

### 4.4 Interaction

- Links: readable, clear hover/focus underline; arrow icon for external destinations if appropriate.
- Interactive surfaces: subtle hover border/background, no needless 3D transform.
- Optional anchor-link icon next to section headings; visible on hover **and focus**.
- Image expansion: keyboard-accessible and closable with Escape if implemented as a dialog.
- Respect `prefers-reduced-motion`; no required animation to reveal essential content.
- Avoid animation for the H1, body paragraphs, diagrams, and all critical information.
- Never hide content behind hover-only interactions on touch devices.

---

## 5. Exact Component Architecture

Suggested conceptual components. Adapt naming and location to local conventions. Do not create tiny one-use components merely for abstraction.

```text
src/
  app/
    projects/
      [slug]/
        page.tsx                  # server page composition, metadata, JSON-LD
  components/
    projects/
      project-dossier-header.tsx  # title, summary, small metadata, top actions
      project-meta.tsx            # only if reused
      project-resources.tsx       # categorized resource links
      project-toc.tsx             # TOC, minimal client logic if scroll spy is desired
      project-dossier-layout.tsx  # article + aside responsive layout (optional)
      project-figure.tsx          # reusable technical media with caption/link
      project-gallery.tsx         # responsive image gallery, optional lightbox
      technical-spec.tsx         # key/value table, pin mappings, etc.
      related-projects.tsx       # optional and lower priority
    mdx/
      mdx-components.tsx         # MDX mappings for new components
  lib/
    content.ts                    # types and Zod validation
    project-toc.ts               # stable heading extraction / slug strategy
    resource-utils.ts            # optional type-safe resource mapping
```

### 5.1 `<ProjectDossierHeader />`

**Inputs:** existing `project` data.  
**Responsibilities:**

- Render semantic breadcrumb hierarchy separately or within the header.
- Render a single `h1` with strong contrast and no spotlight.
- Render the existing `summary`; optionally render a separate `subtitle` / `tagline` only when present.
- Render role, period, and status exactly once.
- Present at most 2–3 meaningful prominent actions, based only on existing validated links/resources.
- Render tools/tags as one low-prominence row; avoid a full metadata table.
- If there is no role, status, or date, omit rather than display `—`.
- Long names, including "PLN ULTG Bandung Barat: Thermographic Inspection of 150 kV Towers," must wrap elegantly.
- Use status text with adequate contrast; type/category status should not become redundant badges.

**Desired feel:** a technical publication title page, not a back-office detail form.

### 5.2 `<ProjectResources />`

This is a **core feature**, not a secondary embellishment.

- Accept a validated array of typed resources.
- Display a heading, e.g. **Project resources**.
- Each row has a recognizable icon, clear label, optional brief description, optional format metadata, and external-link/download affordance.
- Categories: repository, documentation, media, design/diagram, demo, report, dataset, presentation, download, other.
- Example labels: "Firmware & backend source", "Original prototype photos", "Technical report (PDF)", "Circuit wiring diagram", "Live dashboard".
- Do not use vague labels like "Link 1", "Google Drive", or "Click here" without describing the contents.
- Resource panel may be sticky **as part of the desktop sidebar**, but its content must remain accessible without a sidebar on mobile.
- Do not render a hollow panel if the resource list is empty.
- Distinguish public link versus file format clearly; don't fake a download button for a Drive folder.
- External links must use safe protocols and `rel="noopener noreferrer"` where opened in a new tab.
- For actual download files, use native download behavior only when appropriate and supported; remote services may not allow forced downloads.
- Prefer descriptive labels over relying on platform icons alone.

**Desktop example:**

```text
PROJECT RESOURCES
────────────────────────────────
⌁  Firmware & backend source  ↗
   GitHub · repository

▧  Original prototype photos   ↗
   Google Drive · full resolution

▤  Technical report           ↗
   PDF · design and testing

◇  Circuit design files       ↗
   Original diagrams and assets
```

### 5.3 `<ProjectTOC />`

- Derive links from the **actual rendered content headings**, not a hardcoded global menu.
- Include appropriate H2 headings and optionally nested H3 headings for longer content.
- Use **the same heading-ID generator** in MDX rendering and table-of-contents extraction. No mismatched slugs.
- Support duplicate headings (e.g. `testing`, `testing-2`) and headings with code/inline formatting.
- If automatic extraction adds complexity, centralize a robust parser (prefer the existing Markdown/MDX AST toolchain) rather than a fragile regex parser.
- Maintain stable anchor URLs (`/projects/aquafeeder#system-architecture`).
- Use `scroll-margin-top` to keep headings visible below the fixed navbar.
- Sticky on desktop where room permits; on mobile use a native `<details>` or accessible collapsible pattern.
- **Optional enhancement:** active section highlighting via IntersectionObserver. Keep the feature lightweight, accessible, and nonessential.
- Omit the TOC when the article has too few sections; avoid decorative empty navigation.

### 5.4 `<ProjectFigure />` / `<TechnicalDiagram />`

This needs to solve the AquaFeeder Wokwi cropping problem.

- Default: **show the whole image** (`object-contain` / intrinsic height), never forced cropping for technical media.
- Preserve correct width and height to avoid layout shift.
- Support `src`, `alt`, `caption`, `credit` (optional), `kind` (photo/diagram/schematic/screenshot), `fullSizeUrl` (optional), and possibly `width`/`height` as needed by the image resolver.
- Allow a schematic to use a wider breakout layout where appropriate.
- Show a functional "View full size" action that opens a real asset URL or accessible dialog.
- Use `loading="lazy"` on non-critical media and keep sensible responsive `sizes`.
- Provide captions and figure numbering only when useful; avoid automatic fake numbering across nested MDX boundaries.
- Keep photographs eligible for designed cropping **only when explicitly marked as covers**. Never crop diagrams or screenshots by default.
- Screen captures should be legible and not blurred through unnecessary rescaling.
- Do not show an image lightbox if it cannot be closed via keyboard or if it traps focus incorrectly.

### 5.5 `<ProjectGallery />`

- Accept images with `src`, `alt`, and optional `caption`.
- Responsive grid (e.g. 2–3 across on wide screens, single column on narrow screens).
- Individual images can be opened at full size.
- Preserve intrinsic ratios or use explicit intentional crops for photographs only.
- Prevent huge raw original media from causing poor page performance.
- Avoid adding a heavy carousel dependency for a simple list of photos.
- Optional ability to link to the original Google Drive folder in the adjacent resources panel.
- Render only verified photos actually present in project content/assets.

### 5.6 `<TechnicalSpec />` / `<KeyValueTable />`

- For pinouts, component lists, configurations, API endpoint lists, sensor parameters, and other retrieval-focused details.
- Use semantic table markup when information is tabular; use `<dl>` for a small key/value list.
- Permit long identifiers without destroying mobile layout; support horizontal scroll with an obvious visual affordance where required.
- Keep values easy to select and copy.
- Do not fill unknown information with guessed defaults.
- Code, shell commands, pin numbers, and identifiers should use monospace text.

### 5.7 Related-project/footer controls

- Simple "Back to all projects" link is required.
- Optionally show 1–2 genuinely related projects based on tags/type or an explicit relationship field.
- Avoid showing irrelevant "related" projects simply to fill space.

---

## 6. Content Model and Zod Migration

### 6.1 Keep existing frontmatter working

Current projects must build without modification. Continue supporting the existing `links: [{ label, url }]` structure while gradually introducing richer typed resources. **Do not break current MDX files.**

Suggested type shape (illustrative; implement with actual Zod conventions used in the repo):

```ts
export const ResourceKindSchema = z.enum([
  "repository",
  "documentation",
  "photos",
  "diagram",
  "report",
  "dataset",
  "presentation",
  "demo",
  "download",
  "other",
])

export const ProjectResourceSchema = z.object({
  label: z.string().trim().min(1),
  url: z.string().url().refine((value) => /^https?:\/\//i.test(value)),
  kind: ResourceKindSchema.default("other"),
  description: z.string().trim().max(180).optional(),
  format: z.string().trim().max(40).optional(),
})

// Proposed additive fields (do not remove legacy fields):
// resources?: ProjectResource[]
// subtitle?: string
// cover?: { src: string; alt: string; fit?: "cover" | "contain" }
// outcome?: string  // only if supported by actual case-study evidence
// updated?: "YYYY-MM"  // or ISO date; decide consistently
```

**Implementation rules:**

1. Keep the existing `ProjectLinkSchema` or provide a safe migration that accepts its original format.
2. Prefer `resources` for new structured links; map legacy `links` into the resource component as fallback. Do **not** render duplicate links if both fields contain the same URL.
3. Preserve secure HTTP(S)-only URLs and existing malicious-scheme rejection.
4. Frontmatter must remain validated server-side; do not move `node:fs` or the content loader into Client Components.
5. No new field should be required for existing projects.
6. Keep existing date and `status` resolution logic; do not replace it with guessed status parsing.
7. If introducing an image object, preserve `thumbnail` for listing cards and social previews. A cover image is **not necessarily** the thumbnail.
8. Use one consistent URL normalization/deduplication strategy for resources.
9. If a project has no public resources, render the article normally with no empty resource card.
10. Validate developer ergonomics: errors must identify the broken frontmatter file and field.

### 6.2 Example frontmatter — illustrative only

Do not paste invented Drive URLs or fictitious results into production content. Replace placeholders with actual verified links.

```yaml
---
title: "AquaFeeder IoT: Full-Stack Ecosystem"
slug: "<keep-existing-slug>"
type: hardware
summary: "Bridging bare-metal hardware control with a Python web backend."
role: "Embedded Systems & Web Dev"
start: "2025-06"
end: "2025-06"
status: "Completed"
tools:
  - ESP32
  - C++
  - Python Flask
  - JavaScript
tags:
  - Hardware
  - IoT
  - Full-Stack
thumbnail: "<keep-existing-thumbnail>"
resources:
  - label: "Firmware and backend source"
    kind: repository
    url: "https://github.com/<real-repo>"
    description: "Code, configuration, and project history"
  - label: "Original prototype photos"
    kind: photos
    url: "https://drive.google.com/<real-shared-folder>"
    description: "Full-resolution assembly and testing images"
  - label: "Technical documentation"
    kind: report
    url: "https://<real-public-document>"
    format: PDF
    description: "System design and development report"
---
```

*Note: `<keep-existing-slug>` and other placeholders are documentation-only; never ship them as literal frontmatter.*

### 6.3 Long-term archive metadata (optional, not first-pass blockers)

Consider fields for `lastReviewed`, `version`, `projectRepository`, `confidentialityNote`, `relatedProjects`, and downloadable archive manifests **only if genuinely useful**. Avoid turning the frontmatter into an enormous database schema for no reason.

Prefer a few high-quality, consistent fields over 40 fields that remain empty.

---

## 7. Recommended MDX Document Template

Create a reusable authoring template in a sensible location, e.g. `content/templates/project-case-study-template.mdx` or `docs/project-case-study-template.md`. Make sure template files are **not accidentally parsed as published projects**.

### Recommended headings

```md
## Overview
What is this project? What problem does it solve? What did I own or build?

## Problem & Constraints
Why was it necessary? What were the operational, software, hardware,
organizational, safety, time, or budget constraints?

## System Architecture / Methodology
Show the actual diagram or workflow. Explain components and information flow.

## Implementation / Execution
Key decisions, subsystems, protocols, code architecture, steps, tradeoffs.

## Testing & Results
Describe how the project was validated and what was observed.
Do not invent measurements. Include limitations when evidence is incomplete.

## Technical Reference
Pin maps, component tables, configurations, interfaces, calculations,
commands, wiring notes, component specifications, procedures.

## Media & Artifacts
Important visual evidence with useful captions and references to originals.

## Challenges & Lessons Learned
What went wrong? How was it solved? What would change next time?

## References & Further Reading
Optional external documentation, standards, original references.
```

### Authoring rules

- Sections are **optional and composable**; use the sections relevant to the project.
- Include useful descriptions, not empty headings.
- Keep intro paragraphs concise but allow deep technical detail lower down.
- Write in first person where it accurately communicates the author's contribution.
- Separate what **the team** did from what **I** did.
- Record assumptions and limitations.
- Distinguish prototype behavior from production readiness.
- Source measurements and outcomes or clearly label them estimates.
- Explain diagrams in text for accessibility and future comprehension.
- Prefer real photographs and original technical artifacts over generic illustrations.
- Include a provenance note for images/reports when necessary.
- Avoid exaggerated buzzwords: "enterprise-grade", "lightning-fast", "revolutionary", etc.
- This is both public storytelling and future-self retrieval. Be honest and precise.

### Project-specific variations

**AquaFeeder — IoT:** architecture, firmware control, servo/ultrasonic sensor integration, communication with Flask, scheduling/concurrency, interfaces, wiring, calibration, testing, and photo sources.

**PLN thermographic inspection:** inspection purpose, tools, methodology, criteria for anomalies, findings and severity classification (only permitted public data), authorized figures, and approved references. Do **not** upload restricted infrastructure reports, coordinates, equipment identifiers, or internal documents without permission.

**PID simulator:** control theory background, numerical approach, simulated plant, controller structure, parameters, UI, validation and known numerical limitations.

**Events and leadership:** objective, responsibilities, stakeholders, process, tangible deliverables, observed results, lessons, event documentation. Don't force fake system architecture onto non-technical work.

**Research:** research question, methodology, experiments, datasets, results, references, limitations, reproducibility artifacts.

---

## 8. Image & Asset Handling — Critical Quality Requirement

### 8.1 Distinguish image roles

| Role | Typical examples | Default rendering behavior |
| --- | --- | --- |
| **Cover photograph** | Physical prototype photograph | May use intentional crop with focal point |
| **Technical diagram** | Wokwi wiring, architecture, schematic | Show complete image, no crop |
| **UI screenshot** | Flask dashboard, web app interface | Show complete image; allow zoom |
| **Chart/table scan** | Measurements, thermal image interpretation | Preserve labels and scale, allow zoom |
| **Gallery image** | Build photos, event documentation | Thumbnail crop optional, full image accessible |

A Wokwi schematic should not be used as a gigantic cropped decoration simply because it is the first available project image.

### 8.2 Implementation

- Change the current hero's `max-h-96 w-full object-cover` behavior. Choose a real cover photo when available, else render a smaller uncropped diagram or skip the hero.
- In `MdxImage`, use natural sizing and avoid `object-cover` as the universal default.
- Preserve the existing `getPublicImageDimensions` mechanism or improve it safely.
- Make sure optimized local media goes through `next/image` where suitable.
- Do not pass arbitrary unapproved remote hosts to `next/image`; adhere to remote image configuration or link to originals rather than fetching them.
- Media expansion should expose the **actual original local asset** or validated external original URL.
- Large original Drive files should remain on Drive; host only selected optimized previews locally where appropriate.
- Provide descriptive alt text for informative images; decorative photos may have empty alt only when genuinely decorative.
- Distinguish caption content from alt text; the two serve different purposes.
- Preserve natural image aspect ratio, with no stretching and no unintended layout shift.
- Prevent long captions from breaking the layout.

### 8.3 Future-self retrieval

A gallery image entry should be able to carry a caption such as:

> Prototype assembly with ESP32, servo, and distance sensor during bench testing — June 2025. Original high-resolution set linked under Project Resources.

This identifies what the picture shows and where the originals live, without duplicating full-resolution originals on the portfolio.

---

## 9. Sidebar and Navigation Behavior

### Desktop

- Use an `<aside aria-label="Project navigation and resources">` or equivalent semantic wrapper.
- Keep resource links above TOC when links exist; these are valuable retrieval shortcuts.
- Sticky offset must account for site header height.
- If the sidebar becomes taller than the viewport, it must remain scrollable/reachable; do not permanently trap lower items below the fold.
- No excessive card borders. One resource panel and one quiet TOC area are sufficient.
- Navigation remains readable if article headings wrap across lines.
- Anchor jumps work with the existing Lenis scroll behavior (or use native smooth scrolling responsibly, with reduced-motion support).

### Mobile/tablet

- Resource links appear near the top of the article after intro, not buried after a long case study.
- TOC becomes a compact accessible disclosure or a simple inline link list.
- No horizontal body overflow at widths as narrow as 320 px.
- No clipped project title, badges, code, tables, or diagrams.
- Keep tap targets approximately 44 × 44 px where practical.
- Avoid a fixed sidebar overlay on phones.

### Jump links

- Each article heading gets a stable ID.
- Active state is optional; robust anchors are required.
- Browser back/forward navigation must keep anchors functional.
- User can share deep links to useful sections.
- When adding a generated ID strategy, preserve existing published heading anchors when feasible; avoid gratuitously breaking links.

---

## 10. `/projects` Listing: Keep It Useful, Don't Redesign Everything

The existing catalog has type filters and date sorting. Preserve it. Only make changes that support dossier discovery.

### First release (low-risk)

- Keep table view on desktop and stacked entries on mobile.
- Ensure project titles clearly indicate clickability when case studies are enabled.
- Preserve category filter, sort direction, URL query behavior, and keyboard usability.
- Consider a small explanatory description: "Projects, engineering notes, and original documentation."
- Do not cram every resource link into the listing row.

### Optional later enhancement

Add lightweight keyword search over `title`, `summary`, `role`, `tools`, and `tags`:

- Search should be case-insensitive.
- Combine cleanly with existing type filter and date sorting.
- Keep query state in URL if it suits the existing routing architecture.
- Provide a clear empty-state message and a clear/reset control.
- No external search service or database needed for a small static project catalog.
- Search is secondary to the individual dossier redesign; do not delay the core project pages for this.

---

## 11. Accessibility & Semantic Correctness

Treat this as a requirement, not final polish.

- Exactly one primary H1 per case-study page.
- Use H2/H3 headings in a logical sequence.
- Keep semantic `<main>`, `<article>`, `<aside>`, `<nav>`, `<figure>`, `<figcaption>`, `<dl>`, `<table>`, and links when appropriate.
- Ensure sufficient contrast across **both themes**; test the actual colors instead of assuming compliance.
- Maintain visible keyboard focus styles for every interactive element.
- No hover-only content needed to understand the project.
- Expandable images must support keyboard open, Escape to close, correct focus handling, accessible label, and return focus where applicable.
- TOC links need descriptive accessible names and stable targets.
- External links indicate destination context, without noisy repeated screen-reader text.
- Tables have headers and remain navigable on mobile.
- The interface is understandable without icons.
- Test screen reader landmark order and heading navigation.
- Honor `prefers-reduced-motion`.
- Do not disable useful native focus outlines.
- Do not render placeholder or broken image elements if assets are absent.
- Ensure 200% browser zoom remains usable without horizontal page overflow.

---

## 12. Performance, SEO, Robustness & Security

### Performance

- Server-render dossier metadata, resource panels, and static TOC by default.
- Add Client Components only for genuine interaction: search, optional scroll-spy, optional lightbox/disclosure.
- Avoid bundling an enormous lightbox/carousel library for a handful of images.
- Use `next/image` and correct responsive `sizes` for local assets.
- Do not preload every image on a long MDX page; prioritize only important above-the-fold media if warranted.
- Preserve image aspect ratios to avoid cumulative layout shift.
- No expensive scroll listeners when CSS or IntersectionObserver suffices.
- No network API required to render the archive.

### SEO

- Keep per-project `generateMetadata`, canonical routes, OpenGraph/Twitter image, and JSON-LD.
- Check that the published image URLs resolve.
- Preserve sitemap/robots logic and the case-study feature gate.
- Prefer genuine dates for structured metadata; do not treat the project completion date as article modification time unless that is intentionally modeled.
- Do not introduce duplicate H1s or duplicate canonical links.

### Security/publication

- Reuse and extend existing URL-sanitization utilities rather than bypassing them.
- Allow only explicitly safe link protocols for public resource destinations.
- Never render `javascript:`, `data:`, `vbscript:`, protocol-relative unsafe links, or user-generated untrusted HTML.
- Preserve `target="_blank"` security attributes when external links are opened in new tabs.
- No Drive API credentials or private access tokens should be embedded in client bundles or public frontmatter.
- **A public hyperlink is not a private archive.** If an asset must remain private, omit the link from the public project data entirely.
- Do not assume an obscure URL is secure access control.
- For employer or infrastructure projects, use only content cleared for public release.
- Avoid speculative or unnecessary live system-location details.

### Case-study publishing gate

The current source uses `areCaseStudiesEnabled()` with an environment override:

```env
NEXT_PUBLIC_ENABLE_CASE_STUDIES=true
```

Only enable it in production when the owner intends to publish. Preserve the ability to keep unfinished dossiers inaccessible, unlinked, and out of the sitemap. If introducing per-project draft visibility, implement it explicitly and without exposing restricted content in the public production bundle.

---

## 13. Implementation Plan — In Order

### Phase 0 — Audit and baseline

- [ ] Confirm current branch, dependency versions, existing scripts, and design tokens.
- [ ] Read `AGENTS.md`, `GEMINI.md`, README, route implementation, content schema, MDX renderer, feature gate, and project listing.
- [ ] Enumerate existing MDX project entries and check which fields and links they actually have.
- [ ] Identify any tests relying on current DOM structure or schemas.
- [ ] Run baseline lint/tests/build if available; record pre-existing failures separately.
- [ ] Do not delete old content during the redesign.

### Phase 1 — Editorial project header

- [ ] Remove `TextSpotlight` from H1 and use semantic, high-contrast typography.
- [ ] Remove the four-column infobox and duplicated metadata.
- [ ] Add a compact type eyebrow, useful summary, and inline metadata.
- [ ] Group tools/tags in a modest secondary row.
- [ ] Keep breadcrumbs and essential SEO behavior.
- [ ] Make long project titles wrap correctly.

### Phase 2 — Dossier layout and resources

- [ ] Build responsive article + sidebar composition.
- [ ] Add typed categorized resource model with legacy link compatibility.
- [ ] Implement `ProjectResources` with omission when empty.
- [ ] Position resources near the top on mobile.
- [ ] Add "Back to projects" navigation.

### Phase 3 — TOC and MDX improvements

- [ ] Derive TOC from real headings.
- [ ] Share slug/ID logic and account for duplicates.
- [ ] Implement sticky desktop TOC and mobile compact TOC.
- [ ] Improve heading hierarchy and prose spacing.
- [ ] Fix image cropping defaults and add semantic figure/caption support.
- [ ] Support technical diagrams and optional image galleries.
- [ ] Provide useful technical table/spec patterns.

### Phase 4 — Content enrichment (non-destructive)

- [ ] Make the existing AquaFeeder page the primary QA/reference implementation.
- [ ] Retain existing accurate content, reorganize sections where useful.
- [ ] Move the Wokwi diagram into an architecture/wiring context rather than an arbitrary oversized hero.
- [ ] Use an existing real physical prototype photo for the cover **only if a verified photo is already available**.
- [ ] Wire real resource links only if they exist. If not, leave the resource component working but omit empty UI.
- [ ] Validate at least one different project type (e.g. PLN/work/research) to ensure the layout is flexible.
- [ ] Add an authoring template and concise instructions for new case studies.

### Phase 5 — Validation and refinement

- [ ] Run available formatter, linter, type checker, unit tests, and production build.
- [ ] Add unit tests for resources, safe URL validation, legacy link fallback, heading IDs, and optional fields.
- [ ] Manually test dark/light themes and narrow mobile viewports.
- [ ] Test image sizing, long labels, missing images, empty resources, and very long pages.
- [ ] Check keyboard-only navigation, reduced motion, TOC anchors, and external links.
- [ ] Confirm publication gate remains correct in development and production.
- [ ] Inspect page for visual density and unnecessary duplication.

---

## 14. Acceptance Criteria: Must Pass

### A. Visual and information hierarchy

- [ ] The project title is readable immediately, without hover or motion.
- [ ] There is no giant border wrapping the **entire** title + metadata + hero + article.
- [ ] Type, role, date, and status are not repeated needlessly.
- [ ] The project story starts high on the page; technical content is not buried below metadata.
- [ ] Desktop article and sidebar have comfortable widths and spacing.
- [ ] The design visually belongs to `adityac.dev`, including light and dark themes.
- [ ] The page still looks intentional when there is no cover, no resources, or no project status.

### B. Archive functionality

- [ ] Source, documentation, photos, reports, diagrams, and other existing resources can be labeled and categorized.
- [ ] Resource links can be added through MDX frontmatter without editing UI JSX.
- [ ] Existing `links` frontmatter remains supported.
- [ ] Each link label explains **what can be found** at the destination.
- [ ] External resources open safely.
- [ ] No fake buttons, dummy files, or invented document URLs exist in production.
- [ ] Restricted resources are not exposed in public page content.

### C. Reading and technical media

- [ ] All TOC entries match a real heading anchor.
- [ ] Deep links work and account for the navbar offset.
- [ ] Wiring diagrams and technical screenshots are never automatically cropped.
- [ ] Images retain good aspect ratio and are readable at full size.
- [ ] Captions and technical tables work in MDX.
- [ ] The article works for hardware, software, research, business/event, and work/inspection projects without forcing irrelevant sections.

### D. Responsive/accessibility

- [ ] 320px, 375px, 768px, 1024px, and wide desktop layouts work.
- [ ] No page-wide horizontal overflow.
- [ ] Mobile resources and TOC are easy to reach.
- [ ] Full keyboard navigation works; focus remains visible.
- [ ] Motion is not required to reveal information.
- [ ] Core colors meet applicable WCAG contrast requirements.
- [ ] Screen-reader semantics and heading hierarchy make sense.

### E. Engineering quality

- [ ] Strict TypeScript and Zod checks pass.
- [ ] Existing MDX files build without bulk mandatory edits.
- [ ] Existing routes, filtering, sorting, SEO, and feature-gate behavior remain intact.
- [ ] Unit tests cover schema compatibility, safe links, and TOC generation.
- [ ] No unnecessary heavy dependencies or redundant components were added.
- [ ] The production build passes or any pre-existing unrelated blockers are explicitly documented.

---

## 15. Edge Cases to Test Explicitly

1. Project with a 100+ character title.
2. Project missing `thumbnail`.
3. Project with only legacy `links`.
4. Project with only new `resources`.
5. Project with both, including duplicate URLs.
6. Project without any links/resources.
7. Project without role/status/end date.
8. Very long Google Drive label and URL.
9. A broken/nonexistent local image path.
10. A landscape wiring diagram with tiny labels.
11. A portrait project photo.
12. A code block containing a very long line.
13. A wide table on a 320 px phone.
14. Multiple headings with identical text.
15. Headings containing inline code and punctuation.
16. Keyboard-only opening/closing of image expansion.
17. Reduced-motion mode.
18. Production with case studies **disabled**.
19. Production with case studies **enabled**.
20. Existing MDX custom components such as `ComponentRow` and `PressCard` still render.
21. External URLs with unsafe schemes are rejected.
22. Light theme has proper contrast, not just dark theme.

---

## 16. Suggested Test Cases

Use the existing Vitest setup and test conventions. Examples of **behavior** to validate, not mandated exact test syntax:

```ts
// Resource model
it("accepts legacy project links with label and https URL")
it("accepts categorized resources with optional descriptions")
it("rejects javascript/data/vbscript resource URLs")
it("omits empty resource panels")
it("deduplicates identical URLs across resources and legacy links")

// TOC
it("generates TOC anchors matching rendered H2 IDs")
it("assigns stable unique IDs to repeated headings")
it("handles heading text containing inline code or emphasis")

// Rendering / existing behavior
it("renders case studies without optional metadata")
it("does not crop technical diagrams by default")
it("preserves unpublished behavior when feature gate is disabled")
it("preserves metadata and canonical project URLs")
```

Keep tests aligned with the actual utility/component boundaries and avoid testing internal class names unnecessarily when a behavioral assertion is possible.

---

## 17. Content-Specific Example: AquaFeeder

The existing AquaFeeder case study is the primary reference page for visual QA because it mixes hardware diagrams, code/software architecture, and media. Do not replace its detailed MDX with three shallow marketing paragraphs.

### Proposed introductory content treatment

**Category:** Hardware / IoT  
**Title:** AquaFeeder  
**Subtitle idea:** A connected automatic fish-feeding system  
**Summary:** Use existing verified copy or an accurate concise description of the ESP32 hardware control and Python Flask interface.  
**Metadata:** June 2025 · Embedded Systems & Web Dev · Completed  
**Tools:** ESP32, C++, Python Flask, JavaScript (from existing screenshot/content).

### Recommended architecture and content emphasis

- Show the real hardware architecture and actual software communication flow.
- Explain the ultrasonic/distance sensor, servo, ESP32, Flask backend, and client dashboard only insofar as verified by existing content.
- Keep original Wokwi wiring image **uncropped** with a useful caption.
- Record the control flow, scheduling/multithreading design, communication protocol, failure behavior, and debugging knowledge already in the article.
- Use photographs of real assembly/testing only if they already exist or the owner later adds them.
- Keep source/code photos/docs links visible in resources only when valid public URLs are available.
- Include actual limitations/lessons if documented; never invent system performance figures.

### Why this page is the benchmark

It should prove the component system handles at least five content types together: narrative prose, diagram, software/technical explanation, physical hardware image, and retrievable external artifacts.

---

## 18. Content-Specific Example: PLN Thermography

This project demonstrates why the new dossier must not be a one-size-fits-all software template.

Suggested structure when approved information is available:

1. Purpose and scope of the inspection.
2. Equipment and thermographic inspection methodology.
3. Inspection process and relevant operational constraints.
4. Thermal anomalies and how severity was assessed (only actual permitted details).
5. Findings, general observations, and outcomes.
6. Lessons from high-voltage transmission maintenance work.
7. Public-safe photos/figures and appropriately reviewed supporting material.

**Important:** do not assume source code, a repository, a live demo, or a block diagram exists. Such panels should simply not appear. Do not publicize confidential schematics, sensitive inspection documents, precise infrastructure locations, asset identifiers, operational vulnerabilities, or internal reports without explicit permission.

---

## 19. Optional Phase 2 Enhancements (Do Not Let These Block the Redesign)

These can be useful later, but avoid spending the initial implementation on them:

- Cross-project keyword search and tags.
- Copy-link button for section anchors.
- Search within an individual long case study.
- Filter project resources by category when a project has many artifacts.
- "Last updated" or "Last verified" date for aging external links.
- A simple generated sitemap of downloadable/public documents.
- Related-project links using explicit references.
- Print-friendly CSS for long case studies.
- A high-quality PDF export route **only** if it can be done without compromising readability, security, or maintenance.
- An optional "Archived / active / superseded" lifecycle field if actual archive management requires it.

Do **not** implement a database, authentication system, CMS, cloud sync, Drive API integration, global state management, or command palette as part of this task. The current static MDX system is sufficient for the intended use case.

---

## 20. Deliverables Expected From the Coding Agent

At the end of implementation, report:

1. **What changed visually**, with specific before/after hierarchy explanation.
2. **Files changed**, grouped by layout, components, schema, content, and tests.
3. **Content model changes**, especially backward compatibility with `links` and any new `resources` field.
4. **How to add a new resource** using a short frontmatter example.
5. **How to write a new case study** using the reusable template.
6. **Behavior on mobile, desktop, light, and dark mode**.
7. **What was tested**, including exact commands run and pass/fail outcomes.
8. **Any missing real assets/URLs** the owner needs to supply later.
9. **Any privacy concerns or content that should not be published**.
10. **Optional next steps**, clearly separated from what is actually complete.

Where screenshots are practical, provide desktop and mobile screenshots in both themes, showing a project page and at least one uncropped technical diagram. If screenshot tooling is unavailable, state that plainly instead of claiming to have visually tested it.

---

## 21. Preferred Final Quality Bar

Before calling this complete, inspect the rendered result and ask:

- Would a recruiter understand this project within 30 seconds?
- Would an engineer know where to find the detailed architecture?
- Would the site owner in 2029 be able to locate the original photos, report, firmware, and diagrams?
- Is the design genuinely cleaner, or did we merely rearrange the same badges into more cards?
- Can a non-technical work project use the same system without looking awkward?
- Is the page readable without hover effects, motion, or a large screen?
- Are every claim, file, and link grounded in real project data?
- Does this still feel like Aditya's distinct technical editorial portfolio rather than an imported dashboard template?

If any of these answers is **no**, revise the implementation before finishing.

---

## 22. Immediate Priority if Time Is Limited

Implement the smallest **complete** release in this exact order:

**P0:** Readable H1, simplified header, eliminate redundant metadata, proper desktop/mobile article layout, safely categorized resource panel, preserve feature gate/SEO, uncropped images.  
**P1:** Reliable TOC, figure/caption components, documented authoring template, automated tests.  
**P2:** Galleries/lightbox, technical-spec helpers, archive/catalog search, related projects.

Avoid doing P2 before P0 is stable.

### Final instruction

**Make the code changes.** Do not merely restate this specification, propose a redesign without implementing it, or replace the engineering content with marketing copy. Favor excellent information architecture and real artifact retrieval over decorative UI. Preserve the site's identity, maintainability, and technical integrity.
