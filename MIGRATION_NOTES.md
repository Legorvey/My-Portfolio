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
  - On `projects.html`, `<form action="https://api.web3forms.com/submit" method="POST" class="saas-form">` with `<input type="hidden" name="access_key" value="b3e46436-fd4c-45f9-b5da-32191c0baa47">`.
  - In `script.js`: intercepts `.saas-form` submit event, serializes `FormData` to JSON, and `fetch('/api/contact', { method: 'POST', ... })`.
  - In `api/contact.js`: Vercel serverless handler that attaches `payload.access_key = process.env.WEB3FORMS_ACCESS_KEY` and forwards POST JSON to `https://api.web3forms.com/submit`.
  - *Migration note for v2:* Per Phase 2 & Phase 6 instructions, v2 will read the Web3Forms key from `NEXT_PUBLIC_WEB3FORMS_KEY` (stored in `.env.example` as placeholder, never hardcoded in source).
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
