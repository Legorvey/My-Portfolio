<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## DESIGN RULES AND CODE RULES
Stack: Next.js (App Router), strict TypeScript (no `any`), Tailwind CSS 4,
shadcn/ui (restyled), MDX content, anime.js v4 for motion. No other UI or
animation libraries.
Design: technical/editorial direction, like documentation or a datasheet. Calm,
dense, readable. One accent color max. NO gradients, glassmorphism, glow, blur
effects, or "modern SaaS" styling (exception: subtle scroll-reactive navbar blur
inspired by diegovz.com, and metallic headline treatment). Sans for body, mono for labels and metadata.
Max 4 type sizes. 4px spacing grid. Left-aligned text, prose max width ~72ch.
Motion is subtle, under 600ms, never blocks content, respects
prefers-reduced-motion.
Code: server components by default; 'use client' only for small interaction or
animation wrappers. All colors/spacing come from tokens in globals.css, no
hardcoded hex values in components. Project data lives in
content/projects/*.mdx with Zod-validated frontmatter; never hardcode project
data in components. Explain the plan before large edits.
