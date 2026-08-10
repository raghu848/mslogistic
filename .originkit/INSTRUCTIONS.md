# Originkit — agent install brief

> For coding agents only. Do not commit this file. Do not surface it as app docs.
> Written by `originkit add` so you know how to finish wiring the component.

## Just installed

- Components: hero-03, hero-03
- Files directory: `components/originkit/`
- Import alias root: `@/components/originkit`

### Files written

- `components/originkit/hero-03.tsx`
- `components/originkit/ui/hero-03/gallery-tunnel.tsx`
- `components/originkit/ui/hero-03/section-12-hero.tsx`
- `components/originkit/ui/hero-03/gallery-overlay.tsx`
- `components/originkit/ui/hero-03/hero-content.tsx`
- `components/originkit/ui/hero-03/navbar.tsx`
- `components/originkit/ui/hero-03/perspective-background.tsx`
- `components/originkit/ui/hero-03/use-tunnel-size.tsx`
- `components/originkit/ui/hero-03/button.tsx`
- `components/originkit/hero-03.css`
- `public/originkit/hero-03/portraits-portrait-01.png`
- `public/originkit/hero-03/portraits-portrait-03.png`
- `public/originkit/hero-03/portraits-portrait-04.png`
- `public/originkit/hero-03/portraits-portrait-06.png`
- `public/originkit/hero-03/portraits-portrait-08.png`
- `public/originkit/hero-03/nav-luxe-mark.svg`
- `public/originkit/hero-03/nav-menu-icon.svg`

## Required: Tailwind CSS

Originkit components are Tailwind-styled (`styling: tailwind`).

Tailwind looks present. Still verify content/source globs include Originkit files.

### Tailwind must scan the components directory

If Tailwind only scans `src/` (common), components **must** live under `src/` —
the CLI already prefers `src/components/originkit` when `src/` exists.

Ensure your Tailwind config / CSS `@source` includes:

- `components/originkit/**/*.{js,ts,jsx,tsx}`

Tailwind v4 example in CSS:

```css
@source "../components/originkit";
```

### Section CSS

Section styles ship as a file next to the entry (e.g. `components/originkit/hero-03.css`) and are
imported from the TSX (`import "./….css"`).

Tailwind `@theme` tokens are also hoisted into `originkit-section-themes.css`
(imported from `globals.css`) so utilities like `font-urbanist` emit. Do **not**
`@import` the full section CSS into globals — Google Font `@import`s must stay
in the TSX-imported file (nested `@import` after other rules breaks PostCSS).

## Wire it into the app

1. Import the section/component into a page or layout.
2. Example:

```tsx
import X from "@/components/originkit/hero-03";
import X from "@/components/originkit/ui/hero-03/gallery-tunnel";
import X from "@/components/originkit/ui/hero-03/section-12-hero";
```

3. Render it once to verify layout + images.
4. Many sections are client components (`"use client"`) — keep that directive.

## npm dependencies

Install if missing:

```bash
npm install motion three
```

## Do not

- Do not move files out of `components/originkit` into a folder Tailwind does not scan.
- Do not strip Tailwind classes or rewrite to CSS modules unless the user asks.
- Do not commit `.originkit/` (agent + credential scratch space).
- Do not leave section images on the Originkit CDN for production — they belong under `public/originkit/`.
