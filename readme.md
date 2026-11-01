<div align="center">
  <a href="https://adityac.dev">
    <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  </a>
  <a href="https://adityac.dev">
    <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  </a>
  <a href="https://adityac.dev">
    <img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5" />
  </a>
  <a href="https://adityac.dev">
    <img src="https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  </a>
  <a href="https://adityac.dev">
    <img src="https://img.shields.io/badge/Vitest-52%20Passed-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest 52 Passed" />
  </a>
  <a href="https://adityac.dev">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </a>
</div>

<h1 align="center">Aditya Chandrasa | Engineering & Systems Portfolio</h1>

<p align="center">
  <strong>The complete source code for my professional portfolio and technical engineering archive, accessible at <a href="https://adityac.dev">adityac.dev</a>.</strong>
</p>

<p align="center">
  A high-performance technical editorial web architecture bridging hardware logic, software systems, data analytics, and real-world execution. Designed with the calm density of an engineering datasheet, strict type contracts, and zero runtime bloat.
</p>

<hr />

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture & Tech Stack](#system-architecture--tech-stack)
- [Design Philosophy & Visual System](#design-philosophy--visual-system)
- [Project Catalog](#project-catalog)
- [Project Structure](#project-structure)
- [Content Authoring: Adding Projects](#content-authoring-adding-projects)
- [Case Studies Feature Gate](#case-studies-feature-gate)
- [Getting Started](#getting-started)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Deployment](#deployment)
- [Author & Connect](#author--connect)

---

## Overview

`adityac.dev` serves as the central engineering repository and project portfolio for **Aditya Cakti Chandrasa**, an Electrical Engineering student at Universitas Padjadjaran and systems developer.

Moving away from generic SaaS dashboard tropes, glassmorphism, and neon glows, the platform embodies an **engineering datasheet and technical documentation aesthetic**: dense, calm, readable, and structured around a strict 4px spacing grid, dual-mode WCAG 2.1 AAA contrast compliance, and semantic Server Components by default.

---

## Key Features

- **Technical / Editorial Aesthetic:** Designed like precision technical documentation. Zero glassmorphism, zero ambient blur bloat, zero heavy gradients. One single semantic accent color per theme, high-density tabular metadata, and strict 72-character maximum prose width.
- **Dynamic Location & Edge-Cached Weather Widget:** Fixed navbar displays real-time Bandung, Indonesia (GMT+7) local time with hydration-safe `useSyncExternalStore` (re-syncing on visibility change). Queries Open-Meteo via an internal Next.js route handler (`/api/weather`) with 15-minute Edge CDN cache headers (`s-maxage=900`) and resilient fallback (`24°C`).
- **Tactile Physics & Micro-Interactions:** 
  - **3D Mouse Tilt Bento Grid:** Featured project cards employ hardware-accelerated 3D mouse tracking, spring physics, and dynamic specular shine reflection followers (gracefully disabled on touch devices and reduced-motion environments).
  - **Scroll-Anchored Experience Timeline:** Real-time vertical timeline with a dynamic progress bar computed via `requestAnimationFrame` tracking center-screen milestones.
  - **Interactive Text Spotlight:** Radial mask spotlights responding to desktop mouse tracking and continuous autonomous sine sweeps on mobile.
  - **Scroll-Reactive Navbar:** Seamless transition to blurred backdrop and subtle border boundary when scrolling beyond the hero section.
- **Type-Safe MDX Content Pipeline:** Project case studies are authored in MDX with YAML frontmatter strictly validated at compile and runtime using **Zod 4**. Includes automated slug-to-filename matching, automatic image dimension probing (`image-size`) to prevent layout shifts, and remark-gfm support.
- **Case Studies MVP Feature Gate:** Centralized architectural feature flag (`areCaseStudiesEnabled()`) that locks unpublished case studies in production (`/projects/[slug]` returns a clean 404, cards/tables remain unlinked, and URLs are purged from `sitemap.xml`), while keeping all case studies interactive in local development.
- **Enterprise SEO, OpenGraph & Accessibility:**
  - Automated Schema.org JSON-LD structured data graphs (`WebSite`, `Person`, `ItemList`).
  - Dynamic `sitemap.ts`, `robots.ts`, and PWA `manifest.ts`.
  - Accessible touch targets (minimum 44x44px), semantic HTML5 landmarks, and full keyboard skip-to-content routing.
  - Full support for `prefers-reduced-motion` across all motion components.
- **Defense-in-Depth Security:** Custom URL sanitization utilities blocking `javascript:`, `vbscript:`, `data:`, protocol-relative `//`, and backslash directory traversal evasions across external links and markdown rendering.

---

## System Architecture & Tech Stack

### Core Framework & Runtime
- **Framework:** [Next.js](https://nextjs.org/) `16.4.3` (App Router, Server Components by default)
- **Runtime:** [Node.js](https://nodejs.org/) `>= 22` / [React](https://react.dev/) `19.3.0`
- **Language:** [TypeScript](https://www.typescriptlang.org/) `5.x` (Strict mode, no `any`, strict null checks)

### Styling & Design System
- **Engine:** [Tailwind CSS](https://tailwindcss.com/) `4.x` with `@tailwindcss/turbopack` and `@tailwindcss/typography`
- **Tokens:** Centralized CSS variable token system in `src/app/globals.css`
- **Typography:** [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (editorial prose & display headings) & [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (technical metadata, labels, code, and metrics)
- **Icons:** [Lucide React](https://lucide.dev/) `1.63.0` inline optimized SVG symbols

### Component Primitives
- **Headless Primitives:** Restyled [shadcn/ui](https://ui.shadcn.com/) `4.22.1` powered by `@base-ui/react` `1.9.0` (Buttons, Toggles, Toggle Groups) and Radix UI (`@radix-ui/react-avatar` `1.3.1`)
- **Utility:** `class-variance-authority` `0.7.1` and `cn` `0.5.0` (lightweight conditional classnames utility)

### Motion & Inertial Scrolling
- **Scroll Engine:** [Lenis](https://lenis.darkroom.engineering/) `1.3.27` (`lenis/react`) configured with exponential easing (`duration: 1.2`) and route-change scroll resetting
- **Animation Orchestration:** [anime.js](https://animejs.com/) `4.5.0` (`StaggerIn` entry animations with `outQuad` easing) & [Motion](https://motion.dev/) `14.7.1` (`motion/react` spring physics)

### Content Management & Validation
- **Content Format:** MDX parsed via `next-mdx-remote` `6.0.0` and `gray-matter` `4.0.3`
- **Markdown Plugins:** `remark-gfm` `4.0.1` (tables, strikethrough, autolinks)
- **Schema Validation:** [Zod](https://zod.dev/) `4.6.7` validating 14 distinct frontmatter metadata fields
- **Asset Metadata:** `image-size` `2.0.4` for automated intrinsic dimension extraction

### Tooling, Testing & Infrastructure
- **Test Runner:** [Vitest](https://vitest.dev/) `5.0.5` (52 unit tests covering schemas, security, weather, and lockdown mechanics)
- **Linter:** [ESLint](https://eslint.org/) `9.x` with `eslint-config-next` `16.4.3`
- **Hosting & CDN:** [Vercel](https://vercel.com/) Edge Network with automated Next.js cache tagging

---

## Design Philosophy & Visual System

The platform's visual identity draws inspiration from physical data sheets, technical instrumentation manuals, and editorial print layouts:

```
+-------------------------------------------------------------------------------+
|  <A>                                          Bandung, ID · 13:30 GMT+7 · 24°C |
+-------------------------------------------------------------------------------+
|                                                                               |
|   Hi there                                                                    |
|   I am Aditya. [primary accent square]                                        |
|                                                                               |
|   Designing stuff since 2024                                                  |
|   Electrical Engineering Student at Padjadjaran University ↗                  |
|                                                                               |
+-------------------------------------------------------------------------------+
|   [ 01 ] Featured Bento Grid (3D Tilt & Specular Shine)                       |
|   [ 02 ] Scroll-Anchored Experience Timeline                                  |
|   [ 03 ] Full Technical Project Catalog (Tabular Filter & Sort)               |
+-------------------------------------------------------------------------------+
```

### Color System & WCAG 2.1 AAA Contrast Ratios

The palette guarantees maximum legibility across ambient conditions, exceeding strict WCAG 2.1 AAA contrast thresholds:

| Theme | Role | Hex Value | Contrast Ratio | Rating |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | Background (`--background`) | `#F7F6F2` (Warm Datasheet) | — | — |
| | Text (`--foreground`) | `#141413` (Carbon Black) | **16.9 : 1** on background | **WCAG AAA** |
| | Surface / Card (`--surface`) | `#EFECE6` | **15.5 : 1** text on card | **WCAG AAA** |
| | Primary Accent (`--primary`) | `#2B547E` (Muted Steel Blue) | **7.37 : 1** on background | **WCAG AAA** |
| | Muted Text (`--muted-foreground`)| `#52514E` | **7.32 : 1** on background | **WCAG AAA** |
| **Dark** | Background (`--background`) | `#0B0C0E` (Deep Carbon) | — | — |
| | Text (`--foreground`) | `#ECEAE4` (Off-White) | **17.5 : 1** on background | **WCAG AAA** |
| | Surface / Card (`--surface`) | `#13151A` | **15.8 : 1** text on card | **WCAG AAA** |
| | Primary Accent (`--primary`) | `#38BDF8` (Electric Cyan) | **10.5 : 1** on background | **WCAG AAA** |
| | Muted Text (`--muted-foreground`)| `#94A3B8` (Slate) | **7.60 : 1** on background | **WCAG AAA** |

### Design Rules
- **Spacing Grid:** Strict 4px base increments (`--spacing: 0.25rem`).
- **Typography Scale:** Maximum 4 font sizes in active view; prose constrained to `max-w-[72ch]`.
- **Corner Radii:** Precision technical borders (`--radius: 0.125rem` / 2px).
- **Motion Limits:** Under 600ms, non-blocking, and disabled when `prefers-reduced-motion` is detected.

---

## Project Catalog

The repository currently maintains 10 project and internship records in `content/projects/*.mdx`:

| Slug | Title | Domain | Core Tools & Key Tags | Featured |
| :--- | :--- | :--- | :--- | :---: |
| `aquafeeder` | AquaFeeder IoT: Full-Stack Ecosystem | `hardware` | ESP32, C++, Python Flask, JavaScript | **Yes** |
| `gardapati` | Gardapati: Integrated Electrical Safety | `hardware` | Hardware, IoT, Project Management | **Yes** |
| `motosense` | MOTOSENSE: Vibration Monitoring System | `hardware` | Raspberry Pi 3B, ADXL345, I2C, InfluxDB | **Yes** |
| `pid-control-simulator` | PID Control Simulator | `software` | Next.js, TypeScript, Tailwind CSS, Plotly.js | **Yes** |
| `pln-thermography-internship` | PLN ULTG Bandung Barat: Thermographic Inspection of 150 kV Towers | `work` | Thermography, High-Voltage Substation Analysis | **Yes** |
| `futura` | Futura 2025: National Tech Event | `event` | Event Management, Technical Operations, Sponsorship | No |
| `matcha-tasikmalaya` | MiMu Matcha: Tasikmalaya Expansion | `business` | Business Strategy, Operations, Regional Sales | No |
| `personal-web` | Interactive Web Portfolio | `software` | Semantic HTML5, CSS3, Vanilla JavaScript, Vercel | No |
| `pgs25` | PKMT Goes to School (PGS) | `event` | Technical Workshops, Sponsorship, Operations | No |
| `unex` | University Explore (UNEX) 2025 | `event` | Event Production, Team Leadership, Operations | No |

---

## Project Structure

```text
My-Portfolio/
├── .env.example                     # Environment configuration template
├── components.json                  # shadcn/ui registry configuration
├── content/
│   └── projects/                    # MDX case studies with Zod-validated frontmatter
│       ├── aquafeeder.mdx
│       ├── futura.mdx
│       ├── gardapati.mdx
│       ├── matcha-tasikmalaya.mdx
│       ├── motosense.mdx
│       ├── personal-web.mdx
│       ├── pgs25.mdx
│       ├── pid-control-simulator.mdx
│       ├── pln-thermography-internship.mdx
│       └── unex.mdx
├── public/                          # Static public assets
│   ├── favicon.svg                  # SVG favicon
│   ├── resume.pdf                   # Official executive curriculum vitae
│   ├── images/                      # Global brand & experience assets
│   └── projects/                    # Per-project imagery assets (<slug>/...)
├── src/
│   ├── app/                         # Next.js App Router root
│   │   ├── api/
│   │   │   └── weather/route.ts     # Route handler for Bandung temperature with Edge CDN caching
│   │   ├── projects/
│   │   │   ├── page.tsx             # Project Archive table & filter page
│   │   │   └── [slug]/page.tsx      # Dynamic MDX case study detail page
│   │   ├── globals.css              # Tailwind v4 import & CSS custom design tokens
│   │   ├── layout.tsx               # Root layout shell with fonts & Lenis provider
│   │   ├── manifest.ts              # Web Application Manifest (PWA metadata)
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── page.tsx                 # Home page (Hero, Featured 3D Grid, Timeline)
│   │   ├── robots.ts                # Search engine crawler policies
│   │   └── sitemap.ts               # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── experience/              # Timeline & career milestone components
│   │   ├── hero/                    # Fluid headline & floating cursor badges
│   │   ├── layout/                  # Container, SiteHeader, SiteFooter, LocationTime
│   │   ├── mdx/                     # Custom MDX components (MdxImage, PressCard, etc.)
│   │   ├── motion/                  # anime.js v4 wrappers (StaggerIn)
│   │   ├── projects/                # Featured3DGrid, ProjectsTable
│   │   ├── providers/               # Lenis smooth-scrolling context provider
│   │   └── ui/                      # Restyled shadcn/ui & Base UI primitives
│   └── lib/
│       ├── __tests__/               # Vitest automated test suites (7 files)
│       ├── case-studies-config.ts   # MVP lockdown feature gate configuration
│       ├── content.ts               # Zod schemas, MDX loader, and project sorters
│       ├── image-dimensions.ts      # Intrinsic image dimension extraction
│       └── utils.ts                 # Date formatters, status resolver, cn helper
├── package.json                     # Dependency manifests and scripts
├── tsconfig.json                    # Strict TypeScript configuration
└── vitest.config.mts                # Vitest test runner configuration
```

---

## Content Authoring: Adding Projects

All project documentation lives in `content/projects/<slug>.mdx`. The file system enforces that the filename (excluding `.mdx`) strictly equals the frontmatter `slug`.

### Frontmatter Schema Specification

Each file is validated against `ProjectFrontmatterSchema` in `src/lib/content.ts` (14 fields total):

| Field | Type | Requirement | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Required** | Project or case study title. |
| `slug` | `string` | **Required** | Regex `/^[a-z0-9-]+$/` matching the file name without extension. |
| `type` | `enum` | **Required** | One of: `"hardware"`, `"software"`, `"research"`, `"event"`, `"business"`, `"work"`. |
| `summary` | `string` | Optional | Concise 1–2 sentence summary for cards, tables, and meta tags. |
| `role` | `string` | Optional | Engineering role or project capacity. |
| `start` | `string` | Optional | Format `YYYY-MM`. Used for descending chronological sorting. |
| `end` | `string` | Optional | Format `YYYY-MM` or `"present"`. |
| `status` | `string` | Optional | Explicit status override. If omitted, resolved from `end` (`"Completed"` or `"Ongoing"`). |
| `tools` | `string[]` | Optional | Technical stack, frameworks, microcontrollers, or instrumentation used. |
| `tags` | `string[]` | Optional | Domain keywords displayed in badges and infoboxes. |
| `links` | `array` | Optional | Array of objects `{ label: string, url: string }` (must be valid `http://` or `https://`). |
| `thumbnail`| `string` | Optional | Public path to project cover image (e.g. `"/projects/my-slug/1-hero.png"`). |
| `featured` | `boolean`| Optional | Set to `true` to display in the homepage 3D bento grid (defaults to `false`). |
| `order` | `number` | Optional | Explicit ordering sequence number. |

### Sample MDX Entry (`content/projects/example-device.mdx`)

```mdx
---
title: "Autonomous Environmental Telemetry Unit"
slug: "example-device"
type: "hardware"
summary: "Solar-powered environmental monitoring node with LoRaWAN mesh communication and edge sensor calibration."
role: "Lead Hardware Architect"
start: "2026-01"
end: "2026-04"
tools: ["ESP32-S3", "KiCad", "C++", "FreeRTOS", "LoRaWAN"]
tags: ["Embedded Systems", "IoT", "Telemetry"]
links:
  - label: "Firmware Repository"
    url: "https://github.com/Legorvey/example-device"
thumbnail: "/projects/example-device/1-hero.png"
featured: true
---

## Architectural Overview

Write the project case study here using standard GitHub-Flavored Markdown and custom MDX components.

### Hardware Specifications

| Subsystem | Specification |
| :--- | :--- |
| **Microcontroller** | ESP32-S3 Dual-Core Xtensa LX7 @ 240 MHz |
| **Wireless** | Semtech SX1262 LoRa Transceiver (915 MHz) |
| **Power Budget** | 120 μA Deep Sleep, 3.7V 2500mAh LiPo Buffer |
```

---

## Case Studies Feature Gate

The portfolio incorporates an **MVP Lockdown Mechanism** (`src/lib/case-studies-config.ts`):

1. **Local Development (`NODE_ENV === "development"`):** Full access is automatically enabled. You can browse, inspect, and refine all `/projects/[slug]` case study detail pages on `http://localhost:3000`.
2. **Production Deployment (`NODE_ENV === "production"`):** Individual case study URLs return a clean 404, project links in tables/bento grids remain unlinked, and unreleased URLs are dynamically excluded from `sitemap.xml`.
3. **Unlocking for Production Launch:** Set the environment variable in your Vercel Dashboard or local environment:
   ```env
   NEXT_PUBLIC_ENABLE_CASE_STUDIES=true
   ```

---

## Getting Started

### 1. Prerequisites
- **Node.js:** `v22.0.0` or higher recommended
- **npm:** `v10.0.0` or higher

### 2. Clone the Repository
```bash
git clone https://github.com/Legorvey/My-Portfolio.git
cd My-Portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the template to `.env.local` (optional for local dev, which enables case studies automatically):
```bash
# On Linux/macOS/PowerShell:
cp .env.example .env.local

# On Windows Command Prompt (CMD):
copy .env.example .env.local
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application supports full Turbopack Hot Module Replacement (HMR).

---

## Testing & Quality Assurance

The repository includes a comprehensive automated test suite powered by [Vitest](https://vitest.dev/):

```bash
# Execute all unit tests
npm test

# Run ESLint validation
npm run lint

# Verify TypeScript types without emitting files
npx tsc --noEmit

# Verify production build compilation
npm run build
```

### Test Coverage Architecture

| Test Suite | File | Tests | Key Invariants Verified |
| :--- | :--- | :---: | :--- |
| **Content Schema** | `content.test.ts` | 10 | Frontmatter Zod schema, required/optional fields, date regex, slug matching, descending chronological sorting. |
| **Security & Sanitization** | `security.test.ts` | 13 | Defense-in-depth URL sanitization (`javascript:`, `vbscript:`, `data:`, protocol-relative `//`, backslash traversal), image dimension path traversal resistance. |
| **Case Studies Gate** | `case-studies-config.test.ts` | 5 | Environment flag overrides, default fallback logic, dynamic sitemap URL exclusion. |
| **SEO & Meta Engine** | `seo.test.ts` | 3 | Dynamic `sitemap()` structure, crawler rules in `robots()`, PWA `manifest()` validity. |
| **Utility Functions** | `utils.test.ts` | 13 | Conditional classnames utility (`cn`), date range formatting (`formatPeriod`), project status resolution. |
| **Weather Route** | `weather.test.ts` | 4 | Next.js `/api/weather` endpoint, Open-Meteo payload parsing, 15-minute ISR/CDN cache headers, resilient fallback logic. |
| **Experience Model** | `experience.test.ts` | 4 | Timeline milestone integrity, link structure, physical existence of asset paths in `public/`. |
| **Total** | **7 Files** | **52 Tests** | **100% Passing** |

---

## Deployment

The application is optimized for deployment on the [Vercel](https://vercel.com/) Edge Network:

1. Import the repository into Vercel.
2. Select the **Next.js** framework preset (build command: `npm run build`, output directory: `.next`).
3. *(Optional)* Add the environment variable to make case studies public:
   - `NEXT_PUBLIC_ENABLE_CASE_STUDIES` = `true`
4. Deploy. Vercel automatically configures edge caching and ISR headers for static pages and the `/api/weather` endpoint.

---

## Author & Connect

**Aditya Cakti Chandrasa**  
*Technologist & Electrical Engineering Student at Universitas Padjadjaran*  
Bandung, West Java, Indonesia

- **Website:** [adityac.dev](https://adityac.dev)
- **GitHub:** [@Legorvey](https://github.com/Legorvey)
- **LinkedIn:** [linkedin.com/in/adityachandrasa](https://linkedin.com/in/adityachandrasa)
- **Email:** [aditchandrasa1@gmail.com](mailto:aditchandrasa1@gmail.com)

---

<p align="center">
  Designed, coded, and engineered by <b>Aditya Cakti Chandrasa</b>.
</p>
