---
name: Bugs Fixed in First Audit
description: Catalog of bugs found and fixed during initial codebase audit — patterns to watch for in future work
type: feedback
---

## 1. styled-jsx dynamic interpolation causes hydration mismatch
`SplashScreen.tsx` was interpolating `isExiting` state into `<style jsx>` strings (e.g. `opacity: ${isExiting ? 0 : 1}`). This is a hydration mismatch: the server always renders the initial state but the style tag content is a static string that gets diffed. Fixed by moving all dynamic values to inline `style={{}}` props on the elements and removing them from the `<style>` block.

**Why:** styled-jsx style tags are rendered as static strings. Dynamic values belong in `style={{}}` props.
**How to apply:** Never interpolate component state into `<style jsx>` blocks. Always use inline styles for values that change at runtime.

## 2. next/script with strategy="afterInteractive" cannot live in <head>
`layout.tsx` placed a `<Script strategy="afterInteractive">` inside `<head>`. Next.js Scripts with non-`beforeInteractive` strategies are injected by the framework and must be in `<body>`. Fixed to `strategy="beforeInteractive"` (JSON-LD schema should load early) and moved to `<body>`.

**Why:** Next.js throws a warning and the script may not load correctly when placed inside `<head>` with deferred strategies.

## 3. Form labels not programmatically associated with inputs
Both `resenas/page.tsx` and `contacto/page.tsx` had `<label>` elements without `htmlFor` and inputs without matching `id` attributes. Fixed by adding matching `id`/`htmlFor` pairs to all form fields. Also added `aria-required`, `aria-invalid`, `role="alert"` + `aria-live="polite"` to feedback messages.

## 4. useEffect missing dependency (useReveal hook)
`hooks/useReveal.ts` had `threshold` in the function signature but missing from the `useEffect` deps array. The linter correctly flagged this. Fixed.

## 5. menu/page.tsx duplicate + broken IntersectionObserver
The menu page duplicated the reveal observer AND had a timing bug: when `activeTab` changed, the effect ran synchronously before React committed the new DOM nodes, so newly rendered `.reveal` elements were never observed. Fixed by: (a) only targeting `.reveal:not(.visible)` elements in `.menu-body`, and (b) wrapping the observer setup in `requestAnimationFrame()` to defer until after React commits the DOM.

## 6. Broken local image path in nosotros/page.tsx
`<Image src="/images/nosotros/interior-logo.jpg">` referenced a file that does not exist in `public/`. Fixed to use an Unsplash URL matching existing `remotePatterns`.

## 7. contacto/page.tsx — setTimeout not cleared on unmount (memory leak)
`onSubmit` called `setTimeout` but the ref was never cleaned up. Fixed by storing the timer in a `useRef` and clearing it in a `useEffect` cleanup function.

## 8. Navigation overlay not aria-hidden when closed
The full-screen overlay nav panels lacked `aria-hidden` when the menu was closed, meaning screen readers could reach nav links that were visually hidden. Fixed by adding `aria-hidden={!menuOpen}` to the `menu-content` div and `aria-hidden="true"` to the decorative `menu-overlay` div. Also added `role="dialog"`, `aria-modal`, `aria-controls`, and `aria-label` for full modal semantics.

## 9. Gallery cards used alt text as heading text (redundant for screen readers)
`galeria/page.tsx` set `<h3>{img.alt}</h3>` inside each card, which duplicated the image's alt attribute verbatim. Screen readers would read the description twice. Fixed by using `img.caption` as the heading text instead.

## 10. Footer year computed at module scope
`Footer.tsx` had `const year = new Date().getFullYear()` outside the component. Moved inside the component to avoid the stale-value edge case during SSR (server evaluates once; module stays cached).

## 11. Footer legal links used href="#"
Placeholder links used `<a href="#">` which navigates to the page top and is semantically misleading. Replaced with `<span>` elements since these pages don't exist yet.

## 12. Star rating picker — wrong ARIA role
`role="radiogroup"` was used for the star picker buttons. Since each button toggles the selected value (not a true radio group), changed to `role="group"` with `aria-labelledby`, added `aria-pressed` to each star button.
