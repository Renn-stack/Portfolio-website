# Renata Ponce — Inventor

Personal site for Renata Ponce, an independent inventor working across technology, AI, accessibility, audio and human perception.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so Open Graph image URLs come out absolute.

## Before you deploy

Contact links live in `lib/content.ts`. Replace the placeholder **email**, **LinkedIn** and **App Store** values. GitHub points to `github.com/renn-stack`; change it if that's not the right profile.

All copy (projects, lab modules, navigation) lives in the same file.

## Structure

```
app/
  layout.tsx          fonts (Geist, bundled locally), metadata, skip link
  page.tsx            the chronological story, section by section
  globals.css         design tokens, type scale, motion primitives
components/
  Nav.tsx             minimal nav, active-section dot, accessible mobile menu
  ChronoRail.tsx      fixed 2024 → Now rail in the right gutter (desktop)
  sections/           Hero, Origin, Journey (Cochlear + Gummy Hear), IdeaStayed,
                      Wallas (+ project views), BuildingToInventing, Lab, Now,
                      Identity, Contact
  viz/                SVG/CSS visualisations (research plate, form study,
                      Wallas signal / transcript / link visuals)
  ui/                 reveal animations, section markers, corner marks
lib/
  content.ts          copy + links
  hooks.ts            on-screen detection, dialog focus handling, reduced motion
public/images/        hero photographs (landscape + portrait)
```

## Notes

- **Hero art direction.** A `<picture>` swaps between the landscape and portrait photographs by orientation. The image and its FUI overlay share one "cover box" (`.cover-box` in `globals.css`), so the annotations stay pinned to the sound processor and phone at any viewport size.
- **Motion.** Pointer parallax only runs on fine pointers. Looping visuals pause when they're off screen. Everything respects `prefers-reduced-motion`: Framer Motion via `MotionConfig`, CSS loops via media queries, and the sticky statement section falls back to static text.
- **No WebGL.** The 3D form study is CSS 3D transforms and everything else is SVG, which keeps the bundle small (~167 kB first load).
- **Project views.** Each Wallas module opens an accessible dialog with focus trapping, Escape to close and focus restored afterwards. You can deep-link one with `#wallas-stream`, `#wallas-transcribe` or `#wallas-on`.
