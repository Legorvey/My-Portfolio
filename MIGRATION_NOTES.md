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

## Stop 2 Corrections (Sections A–G)
- **Section A (Contact Form Route Handler):**
  - Created `src/app/api/contact/route.ts` reading server-only `WEB3FORMS_ACCESS_KEY`, validating fields with Zod, checking the `botcheck` honeypot, and forwarding to `https://api.web3forms.com/submit`.
  - Updated `src/components/contact/contact-form.tsx` to post to `/api/contact` and updated `.env.example` to `WEB3FORMS_ACCESS_KEY=`.
  - Note for post-launch: `WEB3FORMS_ACCESS_KEY` already exists in Vercel; rotate the Web3Forms access key after launch because the legacy key was publicly visible in `legacy/projects.html`.
- **Section B (Static Assets & Redirects):**
  - Confirmed `public/Resume.pdf`, `public/images/favicon.png`, `src/app/icon.png`, and `public/images/web-thumbnail.png` are present and all legacy `/images/projects/*` redirects in `next.config.ts` match `public/projects/<slug>/` filenames.
- **Section C (`GEMINI.md` & `readme.md`):**
  - Replaced `GEMINI.md` with a pointer to `AGENTS.md` as the single source of truth.
  - Rewrote `readme.md` with factual documentation of the v2 stack, scripts, `WEB3FORMS_ACCESS_KEY` env var, directory structure, frontmatter table, and Vercel deployment.
- **Section D (Types, Filter, Period, Status):**
  - Updated `type` enum to `hardware | software | research | event | business | work` (remapped `personal-web` → `software` and `matcha-tasikmalaya` → `business`).
  - Added optional `tags: string[]` to `ProjectFrontmatterSchema`, populated exact card tags from `legacy/projects.html` on the 7 legacy pages, and displayed `tags` in `/projects/[slug]` infobox.
  - Updated `formatPeriod()` (`"Jun 2025"`, `"Feb 2026 – Jun 2026"`, `"Jan 2026 – Present"`, `"[W.I.P]"` when `start` is missing) and `resolveProjectStatus()` (explicit `status` wins; `end = "present"` → `"Ongoing"`; past `end` → `"Completed"`; else `""`; set explicit `status: "Ongoing"` on `personal-web.mdx`).
  - Updated `/projects` filter UI to show `"All"` plus toggles with counts only for types that have at least one page, synced with `?type=` inside a `<Suspense>` boundary.
- **Sections E & F (New Content Files & Featured Frontmatter):**
  - Added `remark-gfm` (`^4.0.1`) for MDX tables and created:
    - `content/projects/motosense.mdx` (`type: hardware`, `featured: true`)
    - `content/projects/pid-control-simulator.mdx` (`type: software`, `featured: true`)
    - `content/projects/pln-thermography-internship.mdx` (`type: work`, `featured: true`)
  - Set `featured: true` only on `pid-control-simulator`, `motosense`, `pln-thermography-internship`, `aquafeeder`, and `gardapati` (all other 5 pages `featured: false`).
  - **Missing data / Action items for new pages in Section E:**
    - `motosense.mdx`, `pid-control-simulator.mdx`, and `pln-thermography-internship.mdx` have **no images or `thumbnail` yet** (pages render cleanly without a thumbnail and fall back to `/images/web-thumbnail.png` for OG metadata).
    - `pid-control-simulator.mdx` has **no live demo link** yet (only GitHub repo link is present).
    - `Spatial Metal Field Display` and `Futura web platform` from the original prompt do not exist as MDX pages yet.
- **Section G (Header & Footer Checks):**
  - Added `MobileNav` (`src/components/layout/mobile-nav.tsx`) to `SiteHeader` so mobile viewports (including `360px`) have an accessible toggleable navigation panel (`aria-expanded`, `aria-controls`, `Escape` key handler).
  - Verified `SiteFooter` uses `https://github.com/Legorvey`, `https://linkedin.com/in/adityachandrasa`, and `mailto:aditchandrasa1@gmail.com`.

## Phase 7: Motion (`animejs` v4)
- Verified `animejs` `4.5.0` types in `node_modules/animejs/dist/modules/` (`animate`, `stagger`, `createScope`, `svg.createDrawable`).
- Created `StaggerIn` (`src/components/motion/stagger-in.tsx`, `'use client'`) using `createScope` with `scope.revert()` cleanup, `360ms` `outQuad` entrance (`40ms` stagger), never blocking initial SSR content and skipping animation when `prefers-reduced-motion: reduce` is active.
- Created `DrawPath` (`src/components/motion/draw-path.tsx`, `'use client'`) using `createScope` and `svg.createDrawable` (`480ms` `outQuad` stroke draw) with `scope.revert()` cleanup and `prefers-reduced-motion` guard. (Not applied to decorative fake SVGs since no real SVG schematic exists in content yet).
- Applied `StaggerIn` only to the home hero (`#hero`) and the project lists (featured projects grid on `/` and project rows/entries on `/projects`).

## Phase 8: QA & Verification
- **Build, Lint, Type-Check & Tests:**
  - `npm test` (`vitest run`): 24/24 tests passing across `src/lib/__tests__/content.test.ts` (10 tests) and `src/lib/__tests__/verify-migration.test.ts` (14 tests).
  - `npm run lint` (`eslint`): 0 errors, 0 warnings.
  - `npm run build` (`next build` with TypeScript check): 0 errors, 0 warnings; 20 static paths prerendered.
- **Automated Link, Image, Alt Text & Legacy Redirect Verification (`src/lib/verify-migration.ts`):**
  - `verifyInternalLinks()`: Verified all internal `href` attributes in `src/**/*.tsx` and Markdown links in `content/projects/*.mdx` resolve to valid Next.js routes or `public/` assets (`0` broken links).
  - `verifyProjectImagesAndAltText()`: Verified all `thumbnail`, Markdown `![]()`, `<ComponentRow>`, and `<PressCard>` images exist in `public/` and have non-empty `alt` text (`0` errors).
  - `verifyLegacyUrlsAndRedirects()`: Verified all 7 legacy project slugs, `Resume.pdf`, `images/favicon.png`, `images/web-thumbnail.png`, and all 34 legacy project images in `legacy/images/projects/*` resolve via routes or `next.config.ts` redirects (`0` missing targets).
- **Accessibility, Focus Styles, Contrast & Responsive Widths (360 / 768 / 1280):**
  - **Contrast (WCAG 2.1 AA):** All light and dark mode token pairs pass AA/AAA (minimum `5.27:1` for dark destructive, `6.12:1`–`16.9:1` for all body, muted, surface, and accent pairs).
  - **Focus Styles:** Skip-to-content link (`#main-content`) in `src/app/layout.tsx`, `focus-visible:ring-2 focus-visible:ring-ring` on all interactive buttons, links, form inputs, table sort controls, and toggle items.
  - **Responsive Widths (`360px` / `768px` / `1280px`):**
    - `360px`: `SiteHeader` collapses into `MobileNav` (`Menu` / `Close` button with `aria-expanded` and `Escape` handler); `/projects` renders stacked `<article>` cards (`md:hidden`); MDX tables wrap in `overflow-x-auto`.
    - `768px` (`md`): `/projects` switches to 6-column datasheet table (`hidden md:block`); home featured cards and contact grid switch to 2-column layouts.
    - `1280px`: Centered `max-w-5xl` (`1024px`) container with `max-w-[72ch]` left-aligned prose.
- **Client JS per Route (modern browsers, excluding `nomodule` polyfills, gzipped):**
  - `/_not-found` (6 chunks): `458.0 kB` raw / `136.5 kB` gzipped (Next.js 16 + React 19 + layout `MobileNav` baseline)
  - `/projects/[slug]` (7 chunks, all 10 project pages including `/projects/motosense`, `/projects/pid-control-simulator`, `/projects/pln-thermography-internship`): `499.3 kB` raw / `152.7 kB` gzipped (`+16.2 kB` route delta)
  - `/dev/tokens` (8 chunks): `508.6 kB` raw / `156.6 kB` gzipped (`+20.1 kB` route delta)
  - `/` (9 chunks): `548.4 kB` raw / `172.0 kB` gzipped (`+35.5 kB` route delta)
  - `/projects` (9 chunks): `556.6 kB` raw / `174.2 kB` gzipped (`+37.7 kB` route delta)
- **Top 5 Client Chunks on `/`:**
  1. `20box33a0_n53.js` (`224.2 kB` raw / `70.2 kB` gzipped): `react-dom/client` (`19.3.0`) + Next.js `16.4.3` `appBootstrap`, hydration, and route announcer runtime.
  2. `3l_qmp-61z4yc.js` (`164.8 kB` raw / `45.5 kB` gzipped): `react` (`19.3.0`) + Next.js App Router RSC Flight client, router reducer, and segment prefetching.
  3. `3sn43rb_v7k4q.js` (`40.0 kB` raw / `15.5 kB` gzipped): `animejs` (`4.5.0`: `animate`, `createScope`, `stagger`) + `StaggerIn` + `ContactForm`.
  4. `0qq2g_yul0u74.js` (`35.9 kB` raw / `14.4 kB` gzipped): `cn` (`clsx` + `tailwind-merge`), `@base-ui/react/button`, `class-variance-authority`, and shared `src/components/ui/{button,table}.tsx`.
  5. `06bs-nf19b2js.js` (`28.8 kB` raw / `7.5 kB` gzipped): Next.js navigation (`usePathname`, `useRouter`, `useSearchParams`), `RedirectBoundary`, and `NotFoundBoundary`.

## Manual tests for the owner
1. **Responsive Viewports (`360px`, `768px`, `1280px`):**
   - At `360px`: open `/` and `/projects`, click the `Menu` / `Close` button in the header to verify the mobile dropdown opens and closes (including via `Escape`), verify there is no horizontal overflow, and verify `/projects` renders stacked `<article>` cards (`md:hidden`).
   - At `768px` and `1280px`: verify `/projects` switches to the 6-column table (`Title`, `Type`, `Role`, `Period`, `Status`, `Tools`) and `/` displays the 2-column featured project grid and 12-column contact layout.
2. **URL-Synced Filter & Period Sort on `/projects`:**
   - Click each filter toggle (`All (10)`, `Hardware (3)`, `Software (2)`, `Event (3)`, `Business (1)`, `Work (1)`) and verify the URL updates with `?type=<value>` and reloading the URL preserves the active filter.
   - Visit `/projects?type=research` directly and verify the empty-state message (`No entries match the selected filter (Research).`) appears.
   - Click the `Period` sort control (`Newest ↓` / `Oldest ↑`) and verify `[W.I.P]` entries (`gardapati`, `matcha-tasikmalaya`) always remain at the end of the list.
3. **New & Legacy Project Pages (`/projects/[slug]`):**
   - Open `/projects/motosense`, `/projects/pid-control-simulator`, and `/projects/pln-thermography-internship`: verify the infobox displays `Type`, `Role`, `Period`, `Status`, `Tools`, `Tags`, and `Links`, that the absence of a `thumbnail` leaves no broken image or empty gap, and that GFM tables (`motosense`) and code blocks (`pid-control-simulator`) render cleanly.
   - Open `/projects/aquafeeder`, `/projects/gardapati`, `/projects/personal-web`, `/projects/matcha-tasikmalaya`, `/projects/futura`, `/projects/pgs25`, and `/projects/unex`: verify thumbnails, inline images, `ComponentRow` cards (`aquafeeder`), and `PressCard` (`pgs25`).
4. **Contact Form (`/api/contact`):**
   - With `WEB3FORMS_ACCESS_KEY` set in `.env.local`, submit a test message on `/` or `/projects` and confirm the button transitions through `Transmitting...` → `Transmission Successful`.
5. **Legacy Redirects & Static Assets:**
   - Visit `/index.html`, `/projects.html`, `/projects/aquafeeder.html`, and `/images/projects/aquafeederiot/1-hero.png` and confirm they redirect (`308`) to `/`, `/projects`, `/projects/aquafeeder`, and `/projects/aquafeeder/1-hero.png`.
   - Confirm `/Resume.pdf`, `/robots.txt`, and `/sitemap.xml` load properly.
6. **Keyboard Navigation, Dark Mode & Reduced Motion:**
   - Press `Tab` from the top of `/` to verify the `Skip to main content` link appears and all interactive controls show a crisp focus ring.
   - Toggle OS light/dark appearance and `prefers-reduced-motion: reduce` to verify system theme switching and reduced-motion compliance.





