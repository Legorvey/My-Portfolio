# Migration Notes — adityac.dev (`v1-final` → `v2`)

## Phase 0: Preflight & Legacy Repository Audit

### 1. Preflight Checks
- **Current git branch:** `v2` (matches `main` / `v1-final` at commit `a9e33b2` / tag `v1-final`)
- **Working tree status:** Clean
- **Tag `v1-final`:** Exists

### 2. Full Legacy File Tree
```text
.gitignore
404.html
GEMINI.md
Resume.pdf
api/
  contact.js
footer.html
images/
  favicon.png
  web-thumbnail.png
  projects/
    aquafeederiot/
      1-hero.png
      2-esp32.png
      3-servosg90.png
      4-hcsr04.png
      5-product.png
    futura/
      1-hero.png
      2-robotics.png
      3-pleno.png
      4-exhibit.png
      5-firu.png
      6-both.png
    gardapati/
      1-block-diagram.png
      2-wiring.png
      3-fsm-moore.png
      4-bom-analysis.png
      5-swot-analysis.png
      6-roadmap.png
    mimu-tsm/
      mimu1.png
      mimu2.png
      mimu3.png
    personal-web/
      porto1.png
      porto2.png
      porto3.png
    pgs/
      1-hero.png
      2-sosialisasi.png
      3-humasfmipa.png
      4-kabartasik.png
      5-eduverse.png
    university-explore/
      1-hero.png
      2-mbti.png
      3-hme.png
      4-hmm.png
index.html
package-lock.json
package.json
projects.html
projects/
  aquafeeder.html
  futura.html
  gardapati.html
  matcha-tasikmalaya.html
  personal-web.html
  pgs25.html
  project-template.html
  unex.html
readme.md
robots.txt
script.js
scripts/
  generate-sitemap.js
sitemap.xml
style.css
vercel.json
```

### 3. Legacy Pages & URLs
Because `vercel.json` sets `"cleanUrls": true`, `.html` extensions are stripped in production URLs:

| File | Clean URL (Production) | Legacy `.html` Path | Purpose |
|---|---|---|---|
| `index.html` | `/` | `/index.html` | Home page: Hero + 3 metric cards, Experiences section (4 changelog rows), Featured Projects (4 cards), Contact section |
| `projects.html` | `/projects` | `/projects.html` | Deployment Archive: Filterable grid of 7 projects (`all`, `engineering`, `business`, `leadership`) + Contact section |
| `projects/aquafeeder.html` | `/projects/aquafeeder` | `/projects/aquafeeder.html` | Case study: AquaFeeder IoT: Full-Stack Ecosystem |
| `projects/futura.html` | `/projects/futura` | `/projects/futura.html` | Case study: Futura 2025: National Tech Event |
| `projects/gardapati.html` | `/projects/gardapati` | `/projects/gardapati.html` | Case study: Gardapati: Integrated Electrical Safety |
| `projects/matcha-tasikmalaya.html` | `/projects/matcha-tasikmalaya` | `/projects/matcha-tasikmalaya.html` | Case study: MiMu Matcha: Tasikmalaya Expansion |
| `projects/personal-web.html` | `/projects/personal-web` | `/projects/personal-web.html` | Case study: Interactive Web Portfolio |
| `projects/pgs25.html` | `/projects/pgs25` | `/projects/pgs25.html` | Case study: PKMT Goes to School (PGS) |
| `projects/unex.html` | `/projects/unex` | `/projects/unex.html` | Case study: University Explore (UNEX) 2025 |
| `404.html` | (404 handler) | `/404.html` | Custom 404 error page ("404 / System Node Unreachable") |
| `footer.html` | N/A (partial fetched via JS) | `/footer.html` | HTML fragment injected into `#footer-placeholder` on `index.html` and `projects.html` (excluded from sitemap) |
| `projects/project-template.html` | N/A (template) | `/projects/project-template.html` | Indonesian placeholder template for creating project pages (excluded from sitemap) |
| `Resume.pdf` | `/Resume.pdf` | `/Resume.pdf` | Static PDF résumé linked from navbar and experiences section |
| `api/contact.js` | `/api/contact` | N/A | Vercel serverless function proxying POST requests to Web3Forms |

*Note on `/about`:* No standalone `about.html` page exists in the legacy site.

### 4. Structure of Project & Experience Pages
- **Experiences on `index.html` (`#experiences`):**
  - Rendered as `.changelog-row` items inside `.changelog-list`, each with `.changelog-meta` (`date` + category `badge`: `Organization`, `Business`, `Event Management`) and `.changelog-details` (`h3` Role · Organization, `p` description).
  - The 4 entries on `index.html` are:
    1. `Jan 2026 — Present` | `Organization` | `Head of Kominfo · HMTE Unpad`
    2. `2026` | `Business` | `Co-Founder · Matcha Craft Expansion`
    3. `Feb — Nov 2025` | `Event Management` | `Vice Project Officer · Futura National Event`
    4. `Nov '24 — Feb '25` | `Event Management` | `Project Officer · PKMT Goes to School`
- **Project archive on `projects.html`:**
  - Uses `data-category` attributes on `.deploy-card.filter-item` with 3 filter categories: `engineering` (`gardapati`, `aquafeeder`, `personal-web`), `business` (`matcha-tasikmalaya`), and `leadership` (`futura`, `pgs25`, `unex`).
  - Tags shown on cards: `Hardware`, `IoT`, `Project Mgmt`, `Operations`, `Sales`, `Full-Stack`, `Event Mgmt`, `Sponsorship`, `Leadership`, `Front-End`, `UI/UX`.
- **Individual Project Case Study Pages (`projects/*.html`):**
  - `<article class="article-container">` containing:
    - Back link (`← Back to Dashboard`)
    - `<h1 class="hero-title">` and subtitle `<p>`
    - Hero image (`<img class="project-hero-img">`)
    - Metadata grid (`.saas-project-meta`) with 3 `.meta-item` pairs (`meta-label` / `meta-value`):
      - `aquafeeder.html`: Role (`Embedded Systems & Web Dev`), Timeline (`June 2025`), Tech Stack (`ESP32, C++, Python Flask, JS`)
      - `futura.html`: Role (`Vice Project Officer (VPO 2)`), Timeline (`Feb - Nov 2025`), Scale (`230+ Participants (National)`)
      - `gardapati.html`: Role (`Project Manager`), Competition (`Pertama Eco-Innovation 2026`), Category (`Disaster Mitigation & IoT`)
      - `matcha-tasikmalaya.html`: Role (`Co-Founder (Tasikmalaya)`), Timeline (`Ramadan 2026 (10 Days)`), Domain / Area (`F&B Operations & Sales`)
      - `personal-web.html`: Role (`Front-End Dev & UI Designer`), Timeline (`March 2026`), Tech Stack (`HTML, CSS, Vanilla JS, Vercel`)
      - `pgs25.html`: Role (`Project Officer`), Timeline (`Nov 2024 - Feb 2025`), Scale (`25 Schools, 153 Participants`)
      - `unex.html`: Role (`Project Officer`), Timeline (`May - Nov 2025`), Impact (`Exceeded KPI (150% Execution Rate)`)
    - `.article-content` with `h2`, `h3`, `p`, `ul/li`, `blockquote`, inline images with italic captions, and special blocks:
      - `aquafeeder.html`: `.component-breakdown` with 3 `.component-row` cards (ESP32, Servo SG90, HC-SR04).
      - `gardapati.html`: CTA button linking to Google Drive proposal (`https://drive.google.com/file/d/13STwXBmcwxu7gDYvkN1gC62pV1HBX_jF/view?usp=sharing`).
      - `pgs25.html`: Press & Media Coverage card for *Kabar Tasikmalaya* with external article link (`https://kabartasikmalaya.pikiran-rakyat.com/pendidikan/pr-3259024110/pkmt-universitas-padjadjaran-sambangi-tasikmalaya-edukasi-siswa-sma-melalui-program-eduverse`). Note: `images/projects/pgs/3-humasfmipa.png` exists in the repo folder but is not referenced in `pgs25.html`.

### 5. Image Locations
- `images/favicon.png` — site favicon (referenced as `images/favicon.png?v=2`)
- `images/web-thumbnail.png` — default OpenGraph image (`https://adityac.dev/images/web-thumbnail.png`)
- `images/projects/aquafeederiot/` — 5 PNGs (`1-hero.png`, `2-esp32.png`, `3-servosg90.png`, `4-hcsr04.png`, `5-product.png`)
- `images/projects/futura/` — 6 PNGs (`1-hero.png`, `2-robotics.png`, `3-pleno.png`, `4-exhibit.png`, `5-firu.png`, `6-both.png`)
- `images/projects/gardapati/` — 6 PNGs (`1-block-diagram.png`, `2-wiring.png`, `3-fsm-moore.png`, `4-bom-analysis.png`, `5-swot-analysis.png`, `6-roadmap.png`)
- `images/projects/mimu-tsm/` — 3 PNGs (`mimu1.png`, `mimu2.png`, `mimu3.png`)
- `images/projects/personal-web/` — 3 PNGs (`porto1.png`, `porto2.png`, `porto3.png`)
- `images/projects/pgs/` — 5 PNGs (`1-hero.png`, `2-sosialisasi.png`, `3-humasfmipa.png`, `4-kabartasik.png`, `5-eduverse.png`)
- `images/projects/university-explore/` — 4 PNGs (`1-hero.png`, `2-mbti.png`, `3-hme.png`, `4-hmm.png`)

### 6. `vercel.json` Configuration
- `"cleanUrls": true` (strips `.html` extensions)
- `"outputDirectory": "."`
- **Routes / Redirects:** None explicitly defined in `vercel.json` beyond `cleanUrls`.
- **Security Headers** applied to `/(.*)`:
  - `Strict-Transport-Security`: `max-age=31536000; includeSubDomains; preload`
  - `X-Frame-Options`: `DENY`
  - `X-Content-Type-Options`: `nosniff`
  - `Referrer-Policy`: `strict-origin-when-cross-origin`

### 7. Web3Forms Contact Form Implementation
- **HTML (`index.html` & `projects.html`):**
  - Fields:
    - Honeypot: `<input type="checkbox" name="botcheck" class="hidden" style="display: none;">`
    - `name` (`text`, required, label: `ID / Name`, placeholder: `Enter your name`)
    - `email` (`email`, required, label: `Secure Route (Email)`, placeholder: `address@company.com`)
    - `message` (`textarea`, rows=5, required, label: `Payload (Message)`, placeholder: `State your intent...`)
    - Submit button: `Execute Transmission ➔`
  - On `index.html`, `<form action="/api/contact" method="POST" class="saas-form">`.
  - On `projects.html`, `<form action="https://api.web3forms.com/submit" method="POST" class="saas-form">` with a hardcoded `<input type="hidden" name="access_key">` (publicly exposed in legacy HTML; rotate Web3Forms access key after v2 launch).
  - In `script.js`: intercepts `.saas-form` submit event, serializes `FormData` to JSON, and `fetch('/api/contact', { method: 'POST', ... })`.
  - In `api/contact.js`: Vercel serverless handler that attaches `payload.access_key = process.env.WEB3FORMS_ACCESS_KEY` and forwards POST JSON to `https://api.web3forms.com/submit`.
  - *Migration note for v2:* v2 uses a Next.js Route Handler at `src/app/api/contact/route.ts` that reads the server-only `WEB3FORMS_ACCESS_KEY` environment variable (listed in `.env.example`, never exposed client-side).
- **Adjacent Contact Info Panel:**
  - Direct Line: `aditchandrasa1@gmail.com` (`mailto:aditchandrasa1@gmail.com`)
  - WhatsApp Network: `+62 823 2100 7009` (`https://wa.me/6282321007009`)
  - Current Node (Location): `Tasikmalaya / Bandung, ID`

### 8. Analytics, Favicon, OG Images, Robots/Sitemap, Custom JS Behavior
- **Analytics:** None present in the legacy codebase.
- **Favicon:** `images/favicon.png` (linked with `?v=2`).
- **OG Images & Metadata:**
  - Home & `/projects`: `https://adityac.dev/images/web-thumbnail.png`
  - Project pages: each uses its hero image (e.g. `https://adityac.dev/images/projects/aquafeederiot/1-hero.png`)
  - `index.html` also includes JSON-LD (`@type: WebSite` and `@type: Person` for Aditya Chandrasa / Aditya Cakti Chandrasa, linking `https://linkedin.com/in/adityachandrasa` and `https://github.com/Legorvey`).
- **Robots & Sitemap:**
  - `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://adityac.dev/sitemap.xml`
  - `sitemap.xml`: generated by `scripts/generate-sitemap.js`, listing `/`, `/projects`, and the 7 `/projects/<slug>` pages with `changefreq: weekly` and `priority: 1.0` (home) / `0.8` (others).
- **Custom JS (`script.js`):**
  1. Category filter buttons on `projects.html` (`.filter-btn` toggling `.hide-project` on `.filter-item` cards by `data-category`).
  2. Contact form AJAX submission to `/api/contact` with button state feedback (`Transmitting...`, `Transmission Successful ✅`, `Transmission Failed ❌`, `System Error`, resetting after 4000ms).
  3. Top scroll progress bar (`#progress-bar` width updated on window `scroll`).
  4. Dynamic footer loader fetching `footer.html` into `#footer-placeholder` on `DOMContentLoaded` (note: `footer.html` has placeholder links `github.com/adityacakti`, `linkedin.com/in/adityacakti`, `contact@adityacakti.com`, whereas `index.html` navbar & contact panel have the real links `github.com/Legorvey/`, `linkedin.com/in/adityachandrasa`, `aditchandrasa1@gmail.com`, and project pages have inline footers).
  5. Mobile hamburger menu toggle (`#mobile-menu-btn` toggling `.open` on `.nav-links`).
  6. Scroll-spy via `IntersectionObserver` (`threshold: 0.4`) highlighting `.nav-item` matching visible section IDs.

## Phase 1: Move Legacy Site Aside
- Created `legacy/` and moved all legacy site assets, pages, scripts, images, `Resume.pdf`, `package.json`, `package-lock.json`, and `vercel.json` into `legacy/` via `git mv`.
- Preserved at repository root: `.git`, `.gitignore`, `readme.md`, `GEMINI.md`, and `MIGRATION_NOTES.md`.

## Phase 2: Scaffold & Dependencies
- **Stack & Detected Versions (verified via `package.json`):**
  - `next`: `16.4.3` (App Router, Turbopack CSS loader `@tailwindcss/turbopack`, `cacheComponents: true`, `partialPrefetching: true`)
  - `react` / `react-dom`: `19.3.0`
  - `tailwindcss`: `^4`
  - `shadcn`: `^4.22.1` (default `base-nova` preset using `@base-ui/react` `^1.9.0`; added `button`, `table`, `badge`, `toggle-group` + `toggle`)
  - `zod`: `^4.6.7` (Zod v4)
  - `gray-matter`: `^4.0.3`
  - `next-mdx-remote`: `^6.0.0` (RSC support via `next-mdx-remote/rsc`)
  - `@tailwindcss/typography`: `^0.5.20`
  - `animejs`: `^4.5.0` (anime.js v4 modular exports)
  - `image-size`: `^2.0.4`
  - `vitest`: `^5.0.5` (devDependency; upgraded `@types/node` from `^20` to `^22` to satisfy `vitest@5` peer dependency and match local Node `v22.16.0`)
- Excluded `legacy/` in `tsconfig.json` and `eslint.config.mjs`.
- Merged `AGENTS.md` (preserving Next.js 16 `<!-- BEGIN:nextjs-agent-rules -->` block alongside verbatim DESIGN RULES AND CODE RULES).
- Created `.env.example` with `WEB3FORMS_ACCESS_KEY=` and configured `.gitignore` with `.env*` + `!.env.example`.
- Verified `npm run build` succeeds.

## Phase 3: Design Tokens & Shell
- **Color Palette (defined in `src/app/globals.css`, dark mode follows system `prefers-color-scheme: dark`):**
  - **Light mode (`:root`):**
    - `--background`: `#F7F6F2` (warm off-white datasheet paper)
    - `--surface` / `--card`: `#EFECE6` (elevated panel surface)
    - `--muted` / `--secondary`: `#EAE6DF` (subtle stone fill)
    - `--foreground`: `#141413` (near-black ink — **16.9:1** on background, **15.5:1** on surface, AAA)
    - `--muted-foreground`: `#52514E` (secondary slate — **7.32:1** on background, **6.40:1** on muted, AA+)
    - `--primary` / `--accent`: `#2B547E` (muted technical steel-blue — **7.37:1** on background and vs `#F7F6F2` foreground, AAA)
    - `--border` / `--input`: `#D5D0C8` (1px structural rule)
    - `--destructive`: `#9E2A2B` (**8.18:1** on background, AAA)
  - **Dark mode (`@media (prefers-color-scheme: dark)`):**
    - `--background`: `#111214` (near-black carbon)
    - `--surface` / `--card`: `#181A1D` (elevated dark surface)
    - `--muted` / `--secondary`: `#1F2226` (subtle dark fill)
    - `--foreground`: `#ECEAE4` (warm off-white — **15.46:1** on background, **14.40:1** on surface, AAA)
    - `--muted-foreground`: `#A09E97` (secondary gray — **7.00:1** on background, **6.12:1** on muted, AA+)
    - `--primary` / `--accent`: `#6B9FD4` (lighter muted blue — **6.71:1** on `#111214` and vs `#111214` button text, AA+)
    - `--border` / `--input`: `#2A2D32` (1px hairline border)
    - `--destructive`: `#E06C6D` (**5.27:1** on background, AA)
- **Typography & Spacing:**
  - Loaded `IBM Plex Sans` (`--font-ibm-plex-sans`) and `IBM Plex Mono` (`--font-ibm-plex-mono`) via `next/font/google` in `src/app/layout.tsx`.
  - Restricted Tailwind `@theme` type scale to 4 sizes (`--text-*: initial`): `text-xs` (`0.75rem`/`12px`), `text-sm` (`0.875rem`/`14px`), `text-base` (`1rem`/`16px`), `text-xl` (`1.5rem`/`24px`).
  - Set 4px base spacing grid (`--spacing: 0.25rem`) and crisp datasheet corner radius (`--radius: 0.125rem` / `2px`).
- **Component Restyling & Layout Shell:**
  - Restyled `src/components/ui/{button,badge,table,toggle,toggle-group}.tsx` to use token classes, `2px` radius, `4px` spacing multiples, monospace labels, and `150ms` transitions.
  - Built `Container`, `SiteHeader` (Home, Projects, About + GitHub, LinkedIn, View Résumé), and `SiteFooter`.
  - Created `/dev/tokens` (`src/app/dev/tokens/page.tsx`) showcasing color swatches, type specimens, a sample datasheet table, buttons, badges, and toggle-group controls.

## Phase 4: Content Model & Loader (`src/lib/content.ts`)
- **Category Inventory & `type` Enum Mapping (`hardware | web | research | event | experience`):**
  - `aquafeeder` (`legacy/projects/aquafeeder.html`, `data-category="engineering"`) → `hardware`
  - `gardapati` (`legacy/projects/gardapati.html`, `data-category="engineering"`) → `hardware`
  - `personal-web` (`legacy/projects/personal-web.html`, `data-category="engineering"`) → `web`
  - `futura` (`legacy/projects/futura.html`, `data-category="leadership"`, `#experiences` `Event Management`) → `event`
  - `pgs25` (`legacy/projects/pgs25.html`, `data-category="leadership"`, `#experiences` `Event Management`) → `event`
  - `unex` (`legacy/projects/unex.html`, `data-category="leadership"`) → `event`
  - `matcha-tasikmalaya` (`legacy/projects/matcha-tasikmalaya.html`, `data-category="business"`, `#experiences` `Business`) → `experience`
  - All 7 legacy case study pages fit into the `hardware | web | research | event | experience` enum without requiring enum changes.
- **Zod Schema & Loader:**
  - Implemented `ProjectFrontmatterSchema` with required `title`, `slug`, `type` and optional `summary`, `role`, `start` (`YYYY-MM`), `end` (`YYYY-MM` or `"present"`), `status`, `tools` (`string[]`), `links` (`{ label, url }[]`), `thumbnail`, `featured` (`default(false)`).
  - Implemented `getProjects()`, `getFeatured()`, and `getProject(slug)` in `src/lib/content.ts`, throwing on invalid frontmatter or filename/slug mismatch and sorting by `start` descending.
  - Added TDD unit test suite in `src/lib/__tests__/content.test.ts` (`vitest`).

## Phase 5: Content Migration (`content/projects/*.mdx`)
- **Migrated Pages (7 of 7 real case studies; `project-template.html` skipped as unpopulated template):**
  1. `content/projects/aquafeeder.mdx` (`type: hardware`) — images in `public/projects/aquafeeder/`
  2. `content/projects/gardapati.mdx` (`type: hardware`) — images in `public/projects/gardapati/`
  3. `content/projects/personal-web.mdx` (`type: web`) — images in `public/projects/personal-web/`
  4. `content/projects/matcha-tasikmalaya.mdx` (`type: experience`) — images in `public/projects/matcha-tasikmalaya/`
  5. `content/projects/futura.mdx` (`type: event`) — images in `public/projects/futura/`
  6. `content/projects/pgs25.mdx` (`type: event`) — images in `public/projects/pgs25/`
  7. `content/projects/unex.mdx` (`type: event`) — images in `public/projects/unex/`
- **Visible Text Comparison (`src/lib/verify-migration.ts` & `src/lib/__tests__/verify-migration.test.ts`):**
  - All 7 migrated MDX files have 100% identical visible text compared to their legacy `.article-content` HTML bodies (**0 pages differ**).
- **Featured Projects Check:**
  - The prompt specified setting `featured: true` only for: `PID Control Simulator`, `MOTOSENSE`, `Spatial Metal Field Display`, `PLN thermography internship`, `Futura web platform`.
  - **Missing featured pages in `legacy/`:**
    - `PID Control Simulator`: Does not exist in legacy repo.
    - `MOTOSENSE`: Does not exist in legacy repo.
    - `Spatial Metal Field Display`: Does not exist in legacy repo.
    - `PLN thermography internship`: Does not exist in legacy repo.
    - `Futura web platform`: Does not exist in legacy repo (`legacy/projects/futura.html` is *Futura 2025: National Tech Event*, an event management case study as VPO 2, not a web platform).
  - Consequently, all 7 migrated MDX files currently have `featured: false` per the prompt rule ("If one does not exist, log it. All others featured: false."). Note: On `legacy/index.html`, the 4 cards displayed in `#projects` were `gardapati`, `matcha-tasikmalaya`, `personal-web`, and `aquafeeder`.

### Missing Data (`content/projects/*.mdx`)
Per HARD RULE ("Never invent facts, dates, metrics, or links... If something is missing, leave it empty and log it"):
- **`aquafeeder.mdx`**:
  - Missing `status` (not stated in legacy HTML)
  - Missing `links` (no external repo/demo URL in legacy HTML)
  - Note on `start`/`end`: Legacy timeline states `"June 2025"`, mapped to `start: "2025-06"`, `end: "2025-06"`.
- **`gardapati.mdx`**:
  - Missing `start` and `end` (legacy metadata states `Competition: Pertama Eco-Innovation 2026` without a month `YYYY-MM`)
  - Missing `status` (not explicitly labeled as a status field in legacy metadata)
- **`personal-web.mdx`**:
  - Missing `status` (not stated in legacy metadata)
  - Missing `links` (no external link in legacy case study body)
  - Note on `start`/`end`: Legacy timeline states `"March 2026"`, mapped to `start: "2026-03"`, `end: "2026-03"`.
- **`matcha-tasikmalaya.mdx`**:
  - Missing `start` and `end` (legacy metadata states `Timeline: Ramadan 2026 (10 Days)` and `index.html` states `2026` without a numeric month `YYYY-MM`)
  - Missing `status` and `links`
- **`futura.mdx`**:
  - Missing `status` and `links` (legacy metadata third box is `Scale: 230+ Participants (National)`)
- **`pgs25.mdx`**:
  - Missing `status` (legacy metadata third box is `Scale: 25 Schools, 153 Participants`)
  - Note on unused image: `legacy/images/projects/pgs/3-humasfmipa.png` exists in the folder (copied to `public/projects/pgs25/3-humasfmipa.png`) but was never referenced in `legacy/projects/pgs25.html`.
- **`unex.mdx`**:
  - Missing `status` and `links` (legacy metadata third box is `Impact: Exceeded KPI (150% Execution Rate)`)
- **Standalone Experience Entry on `legacy/index.html` without a case study page:**
  - `Head of Kominfo · HMTE Unpad` (`Jan 2026 — Present`, `Organization`) appears in the `#experiences` changelog on `legacy/index.html` but has no standalone HTML page in `legacy/projects/`. (Preserved on the home page timeline in Phase 6).

## Phase 6: Pages, Metadata, Security Headers & Redirects
- **Routes Built:**
  - `/` (`src/app/page.tsx`): Home page preserving exact legacy copy (Hero, 3 metrics, Experiences timeline with `Download Full Résumé ➔`, Featured Projects section with fallback to top 4 projects when `getFeatured()` returns empty, `View Full Deployment Archive ➔`, Contact section, and JSON-LD schema).
  - `/projects` (`src/app/projects/page.tsx` + `src/components/projects/projects-table.tsx`): Server component loading project metadata via `getProjects()` and passing to client `ProjectsTable` component with columns `Title`, `Type`, `Role`, `Period`, `Status`, `Tools`, filterable by `type` and sortable by `Period`, rendering stacked entries below `md`.
  - `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`): Statically generated via `generateStaticParams()` and `generateMetadata()` for all 7 slugs (`/projects/aquafeeder`, `/projects/futura`, `/projects/gardapati`, `/projects/matcha-tasikmalaya`, `/projects/personal-web`, `/projects/pgs25`, `/projects/unex`), rendering an infobox datasheet header, `thumbnail` via `next/image` with intrinsic dimensions, and `MDXRemote` case study body.
  - `/dev/tokens` (`src/app/dev/tokens/page.tsx`): Design token and component specimen page from Phase 3 (retained until Phase 9 cleanup).
  - `/sitemap.xml` (`src/app/sitemap.ts`): Dynamic Next.js sitemap listing `/`, `/projects`, and all `/projects/[slug]`.
  - `/robots.txt` (`src/app/robots.ts`): Robots rules allowing `/` and pointing to `https://adityac.dev/sitemap.xml`.
  - `not-found.tsx` (`src/app/not-found.tsx`): Custom 404 page preserving legacy `404.html` copy (`System Node Unreachable`).
- **Skipped Route (`/about`):**
  - No `about.html` page exists in `legacy/`. Per Phase 6 rules ("`/about`: migrate from legacy. If none exists, skip and log it"), `/about` was skipped and the `/about` link was removed from `SiteHeader` so all navigation links resolve cleanly.
- **Contact Form (`src/components/contact/contact-form.tsx` & `src/app/api/contact/route.ts`):**
  - Reimplemented the Web3Forms form (`ID / Name`, `Secure Route (Email)`, `Payload (Message)`, `Execute Transmission ➔`) and `botcheck` honeypot checkbox.
  - Posts JSON to `/api/contact` (`src/app/api/contact/route.ts`), which validates input with Zod, reads server-only `process.env.WEB3FORMS_ACCESS_KEY`, and forwards to `https://api.web3forms.com/submit`.
- **Security Headers & Redirects (`next.config.ts`):**
  - Added `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
  - Added permanent redirects for `/index.html` → `/`, `/projects.html` → `/projects`, `/projects/:slug.html` → `/projects/:slug`, and legacy image directory paths (`/images/projects/...` → `/projects/...`).

