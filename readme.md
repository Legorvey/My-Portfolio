# adityac.dev

Personal engineering portfolio and project archive for Aditya Cakti Chandrasa.

## Stack

Versions from `package.json`:

- **Framework:** Next.js `16.4.3` (App Router), React `19.3.0`
- **Language:** TypeScript `^5` (strict mode)
- **Styling:** Tailwind CSS `^4` (`@tailwindcss/turbopack` `^4`, `@tailwindcss/typography` `^0.5.20`)
- **UI Primitives:** shadcn/ui `^4.22.1` (`@base-ui/react` `^1.9.0`, `class-variance-authority` `^0.7.1`)
- **Content & Validation:** MDX (`next-mdx-remote` `^6.0.0`, `gray-matter` `^4.0.3`, `remark-gfm` `^4.0.1`), Zod `^4.6.7`, `image-size` `^2.0.4`
- **Motion:** anime.js `^4.5.0`
- **Testing & Linting:** Vitest `^5.0.5`, ESLint `^9` (`eslint-config-next` `16.4.3`)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server (`http://localhost:3000`):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests and linter:

```bash
npm test
npm run lint
```

## Project Structure

- `src/app/` — Next.js App Router pages (`/`, `/projects`, `/projects/[slug]`), metadata routes (`sitemap.ts`, `robots.ts`), 404 page (`not-found.tsx`), and global styles (`globals.css`).
- `src/components/` — Layout shell (`layout/`), UI primitives (`ui/`), project table and filter controls (`projects/`), MDX custom components (`mdx/`), and motion wrappers (`motion/`).
- `src/lib/` — Zod frontmatter schema and MDX loader (`content.ts`), formatting utilities (`utils.ts`), and unit tests (`__tests__/`).
- `content/projects/` — Project and experience case studies written in `.mdx` with YAML frontmatter.
- `public/` — Static assets including `Resume.pdf`, site images (`images/`), and per-project image folders (`projects/<slug>/`).

## How to Add a Project

1. Place any project images in `public/projects/<slug>/`.
2. Create `content/projects/<slug>.mdx` (the filename without `.mdx` must match the frontmatter `slug`).
3. Populate the frontmatter fields validated by `ProjectFrontmatterSchema` in `src/lib/content.ts`:

| Field | Required | Type / Format | Description |
| :--- | :--- | :--- | :--- |
| `title` | Required | `string` | Project or role title. |
| `slug` | Required | `string` (`^[a-z0-9-]+$`) | URL slug matching the `.mdx` filename. |
| `type` | Required | `"hardware" \| "software" \| "research" \| "event" \| "business" \| "work"` | Primary category used for filtering. |
| `summary` | Optional | `string` | Short description shown in tables, cards, and metadata. |
| `role` | Optional | `string` | Role held on the project. |
| `start` | Optional | `string` (`YYYY-MM`) | Start month used for descending chronological sorting. If omitted, period displays as `[W.I.P]`. |
| `end` | Optional | `string` (`YYYY-MM` or `"present"`) | End month or `"present"`. |
| `status` | Optional | `string` | Explicit status override. If omitted, derived from `end` (`"present"` -> `"Ongoing"`, past month -> `"Completed"`). |
| `tools` | Optional | `string[]` | Technologies, instruments, or tools used. |
| `tags` | Optional | `string[]` | Domain tags displayed in the project infobox. |
| `links` | Optional | `{ label: string; url: string }[]` | External links (repositories, dashboards, documents). |
| `thumbnail` | Optional | `string` | Public path to the cover image (e.g. `"/projects/my-slug/cover.png"`). |
| `featured` | Optional | `boolean` (default `false`) | Whether to include the entry in `getFeatured()` on the home page. |

### Example (`content/projects/example-project.mdx`)

```mdx
---
title: "Example Hardware Controller"
slug: "example-project"
type: "hardware"
summary: "Closed-loop sensor readout and actuator control board."
role: "Hardware Engineer"
start: "2026-03"
end: "2026-05"
tools: ["ESP32", "C++", "KiCad"]
tags: ["Hardware", "Embedded Systems"]
links:
  - label: "GitHub"
    url: "https://github.com/Legorvey/example-project"
thumbnail: "/projects/example-project/1-hero.png"
featured: false
---

## Overview

Write the project documentation here using standard Markdown and MDX.
```

## Deployment on Vercel

1. Import the repository into Vercel and select the **Next.js** framework preset.
2. Leave build and output settings at the Next.js defaults (`npm run build`).
3. Ensure the `WEB3FORMS_ACCESS_KEY` environment variable is configured in the Vercel project settings.
