---
name: Project Architecture
description: Frontend stack, file structure, shared component locations, design system conventions
type: project
---

## Stack
- Next.js App Router (v16), TypeScript strict, Tailwind CSS v4
- Styling: `<style jsx>` for component-scoped styles (styled-jsx), global Tailwind utilities via `globals.css`
- No component library — all UI is custom with `styled-jsx`

## Key File Locations
- `cafeteria-ebenezer/app/layout.tsx` — Root layout: InfoStrip, WhatsAppButton, JSON-LD schema
- `cafeteria-ebenezer/app/(pages)/layout.tsx` — Navigation, Footer, RevealObserver
- `cafeteria-ebenezer/app/components/shared/Navigation.tsx` — Full-screen overlay nav, `'use client'`
- `cafeteria-ebenezer/app/components/shared/Footer.tsx` — Footer, `'use client'`
- `cafeteria-ebenezer/app/components/RevealObserver.tsx` — Mounts `useReveal` hook globally for all pages
- `cafeteria-ebenezer/hooks/useReveal.ts` — IntersectionObserver hook for `.reveal` / `.reveal-delay-N` animation classes
- `cafeteria-ebenezer/lib/config/site.ts` — Central SITE config (phone, hours, address, social links)
- `cafeteria-ebenezer/app/globals.css` — Design tokens (CSS vars), shared utility classes (`.lux-btn`, `.eyebrow`, `.reveal`, `.section-title`)

## Design System Tokens (CSS vars)
- Colors: `--ink`, `--obsidian`, `--pearl`, `--champagne`, `--taupe`, `--stone`
- Fonts: `--font-display` (Cormorant Garamond), `--font-serif` (Libre Baskerville), `--font-sans` (Jost), `--font-italiana`
- Easing: `--ease-silk`, `--ease-couture`, `--ease-velvet`
- Layout: `--nav-h: 72px`, `--info-h: 34px`, `--stack: calc(var(--nav-h) + var(--info-h))`

## Reveal Animation Pattern
Elements with `.reveal` start at `opacity: 0; transform: translateY(42px)`. The `RevealObserver` component (rendered in `(pages)/layout.tsx`) calls `useReveal(0.1)` which observes all `.reveal` elements globally and adds `.visible` on intersection. Delay variants: `.reveal-delay-1` through `.reveal-delay-5`. Pages that render new `.reveal` elements after mount (e.g., menu tab switching) must run their own local `IntersectionObserver` inside a `requestAnimationFrame` to allow React to commit the DOM first.

## Image Hosting
Remote images from `images.unsplash.com` are allowed in `next.config.ts`. No local images exist in `public/` except placeholder SVGs — do not reference local image paths like `/images/...`.

**Why:** `nosotros/page.tsx` previously referenced `/images/nosotros/interior-logo.jpg` which did not exist. Fixed to use an Unsplash URL.
