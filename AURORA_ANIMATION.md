# Aurora Background Animation — Complete Implementation Guide

A production-ready guide to reproducing, customizing, and integrating the animated **Aurora Background** into any React / Next.js / Vite web application.

---

## Table of Contents
1. [Overview & Visual Mechanics](#1-overview--visual-mechanics)
2. [Prerequisites & Dependencies](#2-prerequisites--dependencies)
3. [Step-by-Step Installation](#3-step-by-step-installation)
   - [Step 1: Utility Class Helper (`cn`)](#step-1-utility-class-helper-cn)
   - [Step 2: CSS Variables & Keyframes](#step-2-css-variables--keyframes)
     - [Option A: Tailwind CSS v4 (Modern `@theme` syntax)](#option-a-tailwind-css-v4-modern-theme-syntax)
     - [Option B: Tailwind CSS v3 (`tailwind.config.js`)](#option-b-tailwind-css-v3-tailwindconfigjs)
   - [Step 3: Aurora Background Component](#step-3-aurora-background-component)
   - [Step 4: Interactive Demo Component](#step-4-interactive-demo-component)
4. [Drop-in Self-Contained Version (Zero Global CSS Edits)](#4-drop-in-self-contained-version-zero-global-css-edits)
5. [Usage Examples](#5-usage-examples)
   - [A. Fullscreen Hero Section (Like in this Portfolio)](#a-fullscreen-hero-section-like-in-this-portfolio)
   - [B. Bounded Card / Section Banner](#b-bounded-card--section-banner)
   - [C. Without Framer Motion (Pure HTML/CSS)](#c-without-framer-motion-pure-htmlcss)
6. [Color Schemes & Presets](#6-color-schemes--presets)
7. [Customization Reference](#7-customization-reference)
8. [Performance & Accessibility](#8-performance--accessibility)
9. [Troubleshooting & FAQs](#9-troubleshooting--faqs)

---

## 1. Overview & Visual Mechanics

The **Aurora Background** creates a soft, ambient, liquid-light wave effect inspired by the Northern Lights (Aurora Borealis).

### How It Works Under the Hood:
1. **Multi-layer Linear Gradients**: 
   - A repeating mask gradient (`--white-gradient` or `--dark-gradient`) angled at `100deg` creates diagonal bands.
   - An aurora color gradient (`--aurora`) contains multiple color stops (e.g., blue, indigo, violet).
2. **Pseudo-element Interference (`::after`)**:
   - The root aurora layer and its `::after` pseudo-element both render these gradients at different background sizes (`300% 200%` vs `200% 100%`).
   - The pseudo-element uses `mix-blend-mode: difference` and `background-attachment: fixed` to create complex optical shimmer and interference patterns as they move.
3. **Continuous CSS Keyframe Motion**:
   - The `aurora` keyframe pans the background position horizontally from `50% 50%` to `350% 50%` over 60 seconds linearly and infinitely.
4. **Gaussian Blur & Inversion**:
   - High blur (`blur-[10px]` or `filter: blur(10px)`) diffuses the sharp diagonal bands into soft light beams.
   - `invert dark:invert-0` ensures luminous colors work on both pure white and deep dark canvases.
5. **Radial Gradient Vignette Mask**:
   - An elliptical mask (`mask-image: radial-gradient(...)`) concentrates the light in the top-right corner, gently fading into transparency across the view.

---

## 2. Prerequisites & Dependencies

### Package Installation
Run the following in your target project:

```bash
# Core class name merging utility
npm install clsx tailwind-merge

# Optional: if you want smooth reveal animations for content inside the hero
npm install motion
# OR for framer-motion:
# npm install framer-motion
```

---

## 3. Step-by-Step Installation

### Step 1: Utility Class Helper (`cn`)
Create or verify your `lib/utils.ts` (standard shadcn/ui pattern):

```typescript
// lib/utils.ts or src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

### Step 2: CSS Variables & Keyframes

Choose the configuration that matches your Tailwind version.

#### Option A: Tailwind CSS v4 (Modern `@theme` syntax)
If your new project uses Tailwind v4 (with `@import "tailwindcss";`), add this to your `globals.css` / `app.css`:

```css
/* app/globals.css or src/app/globals.css */
@import "tailwindcss";

@theme {
  --animate-aurora: aurora 60s linear infinite;
}

:root {
  /* Aurora Base Color Palette */
  --white: #ffffff;
  --black: #000000;
  --transparent: transparent;
  --blue-500: #3b82f6;
  --indigo-300: #a5b4fc;
  --blue-300: #93c5fd;
  --violet-200: #ddd6fe;
  --blue-400: #60a5fa;
}

@media (prefers-color-scheme: dark) {
  :root {
    --white: #ffffff;
    --black: #000000;
    --transparent: transparent;
    --blue-500: #3b82f6;
    --indigo-300: #a5b4fc;
    --blue-300: #93c5fd;
    --violet-200: #ddd6fe;
    --blue-400: #60a5fa;
  }
}

/* Keyframes for continuous horizontal flow */
@keyframes aurora {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}

@layer utilities {
  .animate-aurora {
    animation: aurora 60s linear infinite;
  }
  .after\:animate-aurora::after,
  [data-slot="aurora-layers"]::after {
    animation: aurora 60s linear infinite;
  }
}

/* Respect user accessibility preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Option B: Tailwind CSS v3 (`tailwind.config.js`)
If your new project uses Tailwind v3 (`tailwind.config.js` or `tailwind.config.ts`), add the animation and keyframes to `theme.extend`:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      colors: {
        // Optional: define custom color stops if not using CSS variables
      },
    },
  },
  plugins: [addVariablesForColors],
}

// Plugin to inject the color variables onto :root
function addVariablesForColors({ addBase }) {
  addBase({
    ":root": {
      "--white": "#ffffff",
      "--black": "#000000",
      "--transparent": "transparent",
      "--blue-500": "#3b82f6",
      "--indigo-300": "#a5b4fc",
      "--blue-300": "#93c5fd",
      "--violet-200": "#ddd6fe",
      "--blue-400": "#60a5fa",
    },
  })
}
```

And in your `globals.css`:
```css
@keyframes aurora {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}

.after\:animate-aurora::after,
[data-slot="aurora-layers"]::after {
  animation: aurora 60s linear infinite;
}
```

---

### Step 3: Aurora Background Component
Create `components/ui/aurora-background.tsx`:

```tsx
// components/ui/aurora-background.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-background text-foreground transition-colors overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Decorative Aurora Layers Container */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none" 
        aria-hidden="true"
      >
        <div
          data-slot="aurora-layers"
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>

      {/* Children content rendered above background */}
      {children}
    </div>
  )
}
```

---

### Step 4: Interactive Demo Component
Create `components/ui/aurora-background-demo.tsx`:

```tsx
// components/ui/aurora-background-demo.tsx
"use client"

import * as React from "react"
import { motion } from "motion/react" // Or "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Background lights are cool you know.
        </h2>
        <p className="max-w-lg py-2 text-base md:text-xl text-muted-foreground">
          Ambient motion rendered with soft indigo and blue gradient sweeps.
        </p>
        <button className="rounded-full bg-foreground px-6 py-2.5 font-medium text-background transition-opacity hover:opacity-90">
          Explore System
        </button>
      </motion.div>
    </AuroraBackground>
  )
}
```

---

## 4. Drop-in Self-Contained Version (Zero Global CSS Edits)

If you need a standalone file that works immediately **without editing `globals.css` or `tailwind.config.js`**, use this self-contained version. It embeds the keyframe styles and variables directly via a scoped `<style>` block:

```tsx
// components/ui/standalone-aurora.tsx
"use client"

import * as React from "react"

interface StandaloneAuroraProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  showRadialGradient?: boolean
  speedSeconds?: number
  opacity?: number
}

export function StandaloneAurora({
  className = "",
  children,
  showRadialGradient = true,
  speedSeconds = 60,
  opacity = 0.5,
  ...props
}: StandaloneAuroraProps) {
  return (
    <div
      className={`relative flex flex-col min-h-screen items-center justify-center overflow-hidden bg-white text-zinc-900 dark:bg-[#01010D] dark:text-[#F4F3FF] ${className}`}
      {...props}
    >
      <style>{`
        @keyframes aurora-keyframes {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }
        .aurora-element {
          --white-gradient: repeating-linear-gradient(100deg, #ffffff 0%, #ffffff 7%, transparent 10%, transparent 12%, #ffffff 16%);
          --dark-gradient: repeating-linear-gradient(100deg, #000000 0%, #000000 7%, transparent 10%, transparent 12%, #000000 16%);
          --aurora: repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%);
          background-image: var(--white-gradient), var(--aurora);
          background-size: 300% 200%;
          background-position: 50% 50%, 50% 50%;
          filter: blur(10px) invert(1);
        }
        :is(.dark, [data-theme="dark"]) .aurora-element,
        @media (prefers-color-scheme: dark) {
          .aurora-element {
            background-image: var(--dark-gradient), var(--aurora);
            filter: blur(10px) invert(0);
          }
        }
        .aurora-element::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--white-gradient), var(--aurora);
          background-size: 200% 100%;
          background-attachment: fixed;
          mix-blend-mode: difference;
          animation: aurora-keyframes ${speedSeconds}s linear infinite;
        }
        :is(.dark, [data-theme="dark"]) .aurora-element::after,
        @media (prefers-color-scheme: dark) {
          .aurora-element::after {
            background-image: var(--dark-gradient), var(--aurora);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-element::after {
            animation: none !important;
          }
        }
      `}</style>

      {/* Decorative Aurora Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="aurora-element absolute -inset-[10px] pointer-events-none will-change-transform"
          style={{
            opacity,
            maskImage: showRadialGradient
              ? "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)"
              : "none",
            WebkitMaskImage: showRadialGradient
              ? "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)"
              : "none",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
```

---

## 5. Usage Examples

### A. Fullscreen Hero Section (Like in this Portfolio)
A complete real-world Hero section with header spacing and responsive typography:

```tsx
// components/hero-section.tsx
import { AuroraBackground } from "@/components/ui/aurora-background"

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <AuroraBackground className="min-h-[100dvh] h-[100dvh] w-full justify-between pt-4 px-6 pb-8">
        {/* Top Navbar spacer */}
        <div className="h-12 w-full shrink-0" aria-hidden="true" />

        {/* Hero Content */}
        <div className="my-auto flex w-full flex-col items-center justify-center text-center z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            Crafting Digital Experiences.
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
            Software engineer specializing in performant web systems, clean typography, and interactive interfaces.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Bottom counterbalance spacer */}
        <div className="h-12 w-full shrink-0" aria-hidden="true" />
      </AuroraBackground>
    </section>
  )
}
```

### B. Bounded Card / Section Banner
You don't have to use full viewport height (`100vh`). Override `h-[100vh]` via `className`:

```tsx
// components/cta-banner.tsx
import { AuroraBackground } from "@/components/ui/aurora-background"

export function CtaBanner() {
  return (
    <div className="relative mx-auto my-16 max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <AuroraBackground className="h-auto py-16 px-8 text-center" showRadialGradient={false}>
        <h3 className="text-2xl sm:text-3xl font-bold">Ready to build something amazing?</h3>
        <p className="mt-2 text-muted-foreground">Let's discuss your next project together.</p>
        <button className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-primary-foreground font-semibold">
          Get in Touch
        </button>
      </AuroraBackground>
    </div>
  )
}
```

### C. Without Framer Motion (Pure HTML/CSS)
If your project avoids animation libraries, the aurora itself runs entirely on hardware-accelerated CSS keyframes:

```tsx
export function StaticContentAurora() {
  return (
    <AuroraBackground>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl font-bold">Pure CSS Aurora</h1>
        <p className="mt-2 text-zinc-500">Zero JavaScript overhead for the background motion.</p>
      </div>
    </AuroraBackground>
  )
}
```

---

## 6. Color Schemes & Presets

You can create different visual moods by altering the `--aurora` gradient stops.

### 1. Electric Indigo & Cyan (Default)
```css
[--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)]
```

### 2. Emerald Borealis (Northern Lights Green)
```css
[--aurora:repeating-linear-gradient(100deg,#059669_10%,#34d399_15%,#10b981_20%,#a7f3d0_25%,#047857_30%)]
```

### 3. Cyberpunk Sunset (Magenta & Warm Orange)
```css
[--aurora:repeating-linear-gradient(100deg,#ec4899_10%,#f43f5e_15%,#fb923c_20%,#fbbf24_25%,#e11d48_30%)]
```

### 4. Cosmic Violet & Deep Purple
```css
[--aurora:repeating-linear-gradient(100deg,#7c3aed_10%,#c084fc_15%,#6366f1_20%,#e879f9_25%,#4f46e5_30%)]
```

### 5. Monochrome / Minimalist Silver
```css
[--aurora:repeating-linear-gradient(100deg,#52525b_10%,#a1a1aa_15%,#71717a_20%,#d4d4d8_25%,#3f3f46_30%)]
```

---

## 7. Customization Reference

| Parameter | Default | How to Modify | Effect |
| :--- | :--- | :--- | :--- |
| **Animation Speed** | `60s` | Change `60s` in keyframes or `animation: aurora 30s linear infinite` | Lower values (e.g. `20s`) make it energetic; higher (e.g. `90s`) make it meditative. |
| **Radial Vignette Mask** | `true` | Pass prop `showRadialGradient={false}` | `true` focuses light at the top-right; `false` lights the entire background evenly. |
| **Mask Position** | `ellipse at 100% 0%` | Edit `ellipse_at_100%_0%` in the class string | Change to `ellipse_at_50%_0%` (top-center) or `ellipse_at_0%_0%` (top-left). |
| **Blur Diffusion** | `blur-[10px]` | Change to `blur-[20px]` or `blur-[30px]` | Higher blur gives smoother gradients; lower blur reveals tighter beam lines. |
| **Layer Opacity** | `opacity-50` | Change to `opacity-30` or `opacity-70` | Adjusts how intense the glowing ribbons are relative to the content text. |
| **Inset Overhang** | `-inset-[10px]` | Keep at `-inset-[10px]` to `-inset-[20px]` | Prevents the blurred edge from showing hard borders at the element edges. |

---

## 8. Performance & Accessibility

### Performance Guarantees:
- **No CPU Loop / Canvas**: Uses GPU-accelerated CSS `background-position` and CSS composite layers.
- **Hardware Acceleration**: Uses `will-change-transform` on the animated layer.
- **Pointer Events**: Background wrapper includes `pointer-events-none` so all cursor clicks and touches pass through unobstructed.
- **Screen Reader Accessible**: Marked with `aria-hidden="true"` so assistive technologies ignore the purely visual lights.

### Accessibility (`prefers-reduced-motion`):
For users sensitive to vestibular motion, ensure the animation pauses:
```css
@media (prefers-reduced-motion: reduce) {
  [data-slot="aurora-layers"]::after,
  .animate-aurora {
    animation: none !important;
  }
}
```

---

## 9. Troubleshooting & FAQs

### Q1: The animation is completely static / not moving.
1. Check that the `@keyframes aurora` block is present in your global CSS.
2. Ensure the class name matches: `.animate-aurora` or `[data-slot="aurora-layers"]::after`.
3. Check if your operating system has "Reduce motion" enabled in Accessibility settings.

### Q2: The colors look inverted or weird in light mode.
The component has `filter blur-[10px] invert dark:invert-0`. This intentionally inverts the black background layer in light mode to produce a glowing effect on light surfaces. If you want direct colors in light mode, remove `invert dark:invert-0`.

### Q3: On iOS / Safari the animation stutters.
Safari handles `background-attachment: fixed` on mobile with heavy repaint costs. If targeting older iOS versions, replace `after:[background-attachment:fixed]` with standard absolute positioning or remove `background-attachment: fixed`.

### Q4: Can I use this in Astro, Vite, or pure HTML?
Yes! The [Drop-in Self-Contained Version](#4-drop-in-self-contained-version-zero-global-css-edits) or pure HTML/CSS works in any environment without React dependencies.

---

*Generated from the [Aditya Portfolio](file:///C:/Codes/My-Portfolio) codebase.*
