# Patriot Eagle Easter Egg Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a home-page-only "click me if you're a patriot" button that flies a pixel-art eagle across the hero to perch in a tree, then follows the visitor as a small peeking head on every other page until dismissed or the page reloads.

**Architecture:** A single client-side React context (`EagleContext`) holding a 3-state machine (`idle` / `flying` / `perched`) is mounted once in the root layout so it survives client-side navigation but resets on reload. Three self-contained components consume it: `TreeBranch` (home-page hero: tree, perched eagle, speech bubble, trigger/dismiss buttons), `FlyingEagle` (home-page hero: one-shot flight animation), and `PeekingHead` (global: small fixed head shown per page/scroll rules). All art is inline SVG (`<rect>` grids), all motion is CSS `@keyframes` via `styled-jsx` (`<style jsx>`), matching the existing `Hero` component's own pattern — no new dependencies.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, styled-jsx (already used in `src/components/Home/Hero/index.tsx`).

## Amendment (made after Task 2 was built and reviewed)

Task 2 originally built the tree/trunk/branch graphic to render unconditionally (always visible on the home page). After seeing it live, the user changed this: **the tree/trunk/branch/canopy should only render once the eagle has been triggered** (i.e. gated on `state !== "idle"`, the same condition already used for the perched eagle itself) — not shown at all on first page load. The trigger button is the only thing visible in that top-right spot before the first click; once clicked, the tree appears there together with the flight animation ending in a landing. Task 3 (which already touches `TreeBranch.tsx` to add the buttons) applies this change — see its Step 2 below, which supersedes Task 2's original always-visible rendering.

## Amendment 2 (found during Task 5's regression pass)

Two genuine regressions surfaced during the final regression pass, both requiring code fixes (not design disagreements — both are bugs against already-agreed intent):

1. **`PeekingHead.tsx` has no desktop-only gate.** Every other visible piece of this feature (`TreeBranch`'s wrapper) uses `hidden ... lg:flex` to stay invisible below the 1024px breakpoint per the Global Constraints' desktop-only rule. `PeekingHead.tsx`'s wrapper never got the equivalent treatment, so once triggered, the peeking head renders at any viewport width, including narrow ones. Fix: add `hidden` and `lg:block` to its wrapper's class list (it's a single `<div>`, not a flex container, so `lg:block` — not `lg:flex` — is the correct display value to restore at the breakpoint).

2. **The `prefers-reduced-motion` fallback in `FlyingEagle.tsx` is unreliable.** It sets `animation-duration: 0.01ms` via a `@media (prefers-reduced-motion: reduce)` CSS block and relies on the resulting `animationend` event (wired to `onAnimationEnd={completeLanding}`) to transition the state machine from `"flying"` to `"perched"`. Near-zero-duration CSS animations do not reliably fire `animationend` in Chromium — the transition can be delayed by 10+ seconds or never fire within a reasonable window, leaving the eagle visually stuck mid-flight indefinitely for a reduced-motion user. Fix: replace the CSS-only approach with the same JS-side `window.matchMedia("(prefers-reduced-motion: reduce)").matches` check the existing `Hero` component's headline rotation already uses (see `src/components/Home/Hero/index.tsx`'s first `useEffect`) — check it synchronously during render to skip rendering the animated sprite entirely when true, and call `completeLanding()` from a `useEffect` so the state transition still happens (effects run once, shortly after mount/paint, so this lands the eagle in `perched` almost immediately rather than depending on any CSS animation timing at all). Remove the now-superseded `@media (prefers-reduced-motion: reduce)` CSS block from the `<style jsx>` block, since the JS check replaces it entirely rather than complementing it.

## Amendment 3 (found during the final whole-branch review)

The final reviewer found issues no per-task review could have caught (each task only saw its own slice) plus a couple of real cross-cutting bugs, verified live by the controller before fixing:

1. **Critical — the flight animation doesn't land on the branch.** `FlyingEagle.tsx`'s final keyframes use `top: 44%` (a percentage of the full-height Hero `<section>`) while the branch/perch sits at a **fixed** `112px + ~76px ≈ 188px` from the top (`TreeBranch`'s `top-28` container offset plus the perched feet's position within the tree SVG). A percentage of section height and a fixed pixel offset can never coincide on a real screen — this is a genuine unit-mismatch bug, not a tuning issue, and the controller independently confirmed it live (paused the animation at ~99.98% progress via a negative `animation-delay` and measured `getBoundingClientRect()`: the flyer landed around y≈335px on a 761px-tall viewport, nowhere near the ≈188px target). Root cause: these keyframe values were copied from the brainstorming visual-companion's small fixed-height demo mockup box without being re-derived for the real, much taller, full-viewport Hero section. Fix: rewrite the 91%/100% keyframes to use fixed pixel values consistent with the branch's own coordinate system (`left: calc(100% - 199px); top: 164px;` at 100%, roughly centering the 72×48px flyer sprite on the perch point — verify and fine-tune via `getBoundingClientRect()` comparison against the perched sprite's actual rendered position, don't just trust the arithmetic blindly).

2. **Important — clicking the trigger button shifts it ~190px because the tree is unmounted, not just hidden.** `TreeBranch.tsx`'s tree `<svg>` sits inside `{active && (...)}` in a `flex-col` container above the button row; mounting/unmounting it shoves 190px of flow height in and out, so the button jumps out from under the user's cursor the instant they click it. Fix: reserve the tree's vertical space unconditionally (e.g. always render the `<svg>` element but toggle its visibility/opacity based on `active`, or wrap it in a fixed-height placeholder) so the button never moves.

3. **Important — the speech bubble overlaps the perched eagle's body instead of sitting above it.** `TreeBranch.tsx`'s bubble is positioned at `top-[46px]`, which lands on the eagle's torso, not above its head. Fix: move it above the head (negative or smaller `top` offset).

4. **Important — `eslint.config.mjs` uses `@eslint/eslintrc` without declaring it as a dependency.** It currently resolves only because it's hoisted as a transitive dependency of `eslint`. Fix: add `@eslint/eslintrc` to `devDependencies` explicitly.

5. **Important — `eslint .` now lints `public/`, including third-party minified demo assets.** `next lint` never scanned `public/`; the flat-config migration widened scope without intending to. Fix: add `"public/**"` to the `ignores` array in `eslint.config.mjs`.

6. **Minor, bundled in — dead CSS classes and a missing accessibility attribute.** `eagle-peek` (`PeekingHead.tsx`) and `eagle-bubble` (`TreeBranch.tsx`) have no CSS rule targeting them (leftover/unused hooks) — remove the classes rather than leave dead code. The speech bubble's two always-present text spans should get `aria-hidden="true"` so screen readers don't announce both permanently-present strings as page content.

Also: the plan's own Global Constraints section (below) previously claimed `z-1000` (used by `Header`) "is not a defined token in this project's Tailwind theme and has no guaranteed effect." The reviewer checked the compiled stylesheet and found `.z-1000{z-index:1000}` IS emitted — Tailwind v4 supports bare numeric `z-` utilities natively, so that reasoning was wrong (the conclusion to use `z-9999` for anything that must render above `Header` is still correct and unaffected, since `9999 > 1000` regardless). Corrected below.

Other findings from the final review (peeking-head/logo pixel overlap, `:global()` CSS scoping duplication between two components' identical blink keyframes, `window.matchMedia` called impurely during render, no unmount cleanup if navigating away mid-flight, one-frame stale `treeVisible` flash on returning to home, tree being viewport-anchored while hero content is container-anchored on ultra-wide screens) are real but lower-value-to-fix-now observations — logged as deferred, not applied, to avoid open-ended scope growth on a feature that's already had two rounds of amendments.

## Global Constraints

- No test framework exists in this repo (confirmed: no jest/vitest/testing-library in `package.json`, no `*.test.*` files outside `node_modules`). Do not add one for this feature. "Verification" steps below are `npx tsc --noEmit`, `npm run lint`, and manual checks in the browser via `npm run dev` — this matches how the rest of the codebase is verified.
- Desktop-only (`lg:` breakpoint, 1024px, and up). The entire feature — trigger button, tree, flight, peeking head — is hidden below `lg`. This was never discussed for mobile and the mockups were desktop-only; scope stays tight rather than improvising a responsive redesign of hand-built pixel art.
- Colors/spacing must reuse the site's existing design tokens from `src/styles/tailwind.css`: `--color-ink` (`#070b0a`), `--color-ink-2` (`#101513`), `--color-accent` (`#5ed29c`), `--color-accent-dark` (`#3fae7d`). Do not invent new global tokens for a one-off feature.
- Use the project's existing `z-9999` utility (defined in `tailwind.css` as `--z-index-9999`) for anything that must render above the `Header`. `Header` itself uses `z-1000` — Tailwind v4 does support bare numeric `z-` utilities natively, so `z-1000` is not broken (correcting an earlier, inaccurate claim in this doc that it had no effect) — but `z-9999` is still the actual highest layer in this project's theme, so use it, not `z-1000`, for anything that must render above `Header`.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`) — use it for all new imports, matching existing files.
- All new components are `"use client"` (they use hooks/state/effects), matching `Header`, `Hero`, and `Footer`.

---

## File Structure

- **Create** `src/components/Eagle/EagleContext.tsx` — the state machine: `EagleProvider` + `useEagle()` hook.
- **Create** `src/components/Eagle/TreeBranch.tsx` — tree/branch graphic, perched eagle (blink + speech bubble), trigger + dismiss buttons. Home page only.
- **Create** `src/components/Eagle/FlyingEagle.tsx` — the one-shot flight animation (two alternating pixel-art frames). Home page only.
- **Create** `src/components/Eagle/PeekingHead.tsx` — the small fixed peeking head, rendered globally, visibility computed from context state + current route + tree scroll-visibility.
- **Modify** `src/app/(site)/layout.tsx` — wrap `children` in `EagleProvider`, render `<PeekingHead />` once alongside `Header`/`Footer`.
- **Modify** `src/components/Home/Hero/index.tsx` — render `<TreeBranch />` and `<FlyingEagle />` inside the existing `<section className="relative ...">` (it's already a positioning context for the hero's other absolutely-positioned decorative elements).

Each of `TreeBranch`, `FlyingEagle`, and `PeekingHead` owns its own pixel art — they don't share a sprite file, because each one's SVG lives in its own coordinate space (the perched eagle is drawn relative to the tree's `viewBox`, the flying frames have their own, the peeking head has its own) and there's no real duplication to factor out.

---

### Task 1: Eagle state machine + root layout wiring

**Files:**
- Create: `src/components/Eagle/EagleContext.tsx`
- Modify: `src/app/(site)/layout.tsx`

**Interfaces:**
- Produces: `EagleProvider` (React component, wraps `children: React.ReactNode`), `useEagle()` hook returning:
  ```ts
  {
    state: "idle" | "flying" | "perched";
    flightId: number;
    treeVisible: boolean;
    trigger: () => void;
    dismiss: () => void;
    completeLanding: () => void;
    setTreeVisible: (visible: boolean) => void;
  }
  ```

- [ ] **Step 1: Create the context and provider**

Create `src/components/Eagle/EagleContext.tsx`:

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type EagleState = "idle" | "flying" | "perched";

interface EagleContextValue {
  state: EagleState;
  flightId: number;
  treeVisible: boolean;
  trigger: () => void;
  dismiss: () => void;
  completeLanding: () => void;
  setTreeVisible: (visible: boolean) => void;
}

const EagleContext = createContext<EagleContextValue | null>(null);

export const EagleProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<EagleState>("idle");
  const [flightId, setFlightId] = useState(0);
  const [treeVisible, setTreeVisible] = useState(true);

  const trigger = useCallback(() => {
    setState("flying");
    setFlightId((id) => id + 1);
  }, []);

  const dismiss = useCallback(() => {
    setState("idle");
  }, []);

  const completeLanding = useCallback(() => {
    setState((current) => (current === "flying" ? "perched" : current));
  }, []);

  return (
    <EagleContext.Provider
      value={{
        state,
        flightId,
        treeVisible,
        trigger,
        dismiss,
        completeLanding,
        setTreeVisible,
      }}
    >
      {children}
    </EagleContext.Provider>
  );
};

export const useEagle = () => {
  const ctx = useContext(EagleContext);
  if (!ctx) {
    throw new Error("useEagle must be used within an EagleProvider");
  }
  return ctx;
};
```

- [ ] **Step 2: Wrap the root layout in the provider**

In `src/app/(site)/layout.tsx`, add the import and wrap `Header`/`children`/`Footer`:

```tsx
import '@/styles/tailwind.css';

import { EagleProvider } from '@/components/Eagle/EagleContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { Plus_Jakarta_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import ToasterContext from '../context/ToastContext';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={plusJakarta.className}>
      <body>
        <EagleProvider>
          <div className='isolate'>
            <NextTopLoader
              color='#5ed29c'
              crawlSpeed={300}
              showSpinner={false}
              shadow='none'
            />

            <Header />
            {children}
            <Footer />

            <ToasterContext />
          </div>

          <ScrollToTop />
        </EagleProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/`.
Expected: the site loads exactly as before (the provider has no visible effect yet), no errors in the browser console or the terminal.

- [ ] **Step 5: Commit**

```bash
git add src/components/Eagle/EagleContext.tsx src/app/\(site\)/layout.tsx
git commit -m "feat: add eagle easter egg state machine"
```

---

### Task 2: Tree/branch scene in the hero (static, always visible for now)

**Files:**
- Create: `src/components/Eagle/TreeBranch.tsx`
- Modify: `src/components/Home/Hero/index.tsx`

**Interfaces:**
- Consumes: `useEagle()` from Task 1 (`EagleContext.tsx`) — only reads `state` in this task (perched eagle rendering is gated on `state === "perched"`, but nothing sets that state yet until Task 3, so the perched eagle won't be visible in the browser until Task 3 — the tree/branch itself, drawn unconditionally, is this task's visible deliverable).
- Produces: default-exported `TreeBranch` component, no props.

- [ ] **Step 1: Create the tree/branch/perched-eagle component**

Create `src/components/Eagle/TreeBranch.tsx`:

```tsx
"use client";

import { useEagle } from "./EagleContext";

const TreeBranch = () => {
  const { state } = useEagle();
  const perched = state === "perched";

  return (
    <div className="pointer-events-none absolute right-0 top-28 hidden w-[280px] flex-col items-end lg:flex">
      <svg
        width="280"
        height="190"
        viewBox="0 0 48 30"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* trunk, bleeding off the right edge */}
        <rect x="42" y="0" width="6" height="30" fill="#4a3826" />
        <rect x="42" y="0" width="2" height="30" fill="#5b4632" />

        {/* canopy */}
        <rect x="34" y="0" width="8" height="3" fill="#2d7a5a" />
        <rect x="30" y="3" width="8" height="3" fill="#3fae7d" />
        <rect x="38" y="2" width="8" height="4" fill="#5ed29c" />
        <rect x="32" y="7" width="10" height="3" fill="#2d7a5a" />
        <rect x="40" y="8" width="6" height="3" fill="#3fae7d" />

        {/* branch, trunk to tip, no gap under the eagle's feet */}
        <rect x="30" y="11" width="12" height="3" fill="#5b4632" />
        <rect x="16" y="12" width="16" height="2" fill="#4a3826" />
        <rect x="6" y="13" width="12" height="1" fill="#4a3826" />
        <rect x="4" y="12" width="2" height="2" fill="#3fae7d" />

        {perched && (
          <g>
            {/* tail */}
            <rect x="24" y="9" width="4" height="2" fill="#e8e8e8" />
            <rect x="25" y="11" width="4" height="1" fill="#e8e8e8" />
            {/* folded body/wing, banded */}
            <rect x="15" y="3" width="10" height="2" fill="#1e3a5f" />
            <rect x="15" y="5" width="10" height="2" fill="#c0392b" />
            <rect x="15" y="7" width="10" height="2" fill="#1e3a5f" />
            <rect x="16" y="9" width="9" height="2" fill="#c0392b" />
            {/* head, facing left */}
            <rect x="10" y="0" width="7" height="2" fill="#ffffff" />
            <rect x="9" y="2" width="8" height="2" fill="#ffffff" />
            <rect x="10" y="4" width="6" height="1" fill="#ffffff" />
            <rect
              className="eagle-eye-blink"
              x="13"
              y="2"
              width="1"
              height="1"
              fill="#111111"
            />
            {/* beak */}
            <rect x="7" y="2" width="2" height="1" fill="#f2c94c" />
            <rect x="7" y="3" width="2" height="1" fill="#e0a92e" />
            {/* feet, resting on the branch's top surface */}
            <rect x="17" y="11" width="2" height="2" fill="#f2c94c" />
            <rect x="21" y="11" width="2" height="2" fill="#f2c94c" />
          </g>
        )}
      </svg>

      {perched && (
        <div className="eagle-bubble absolute right-[100px] top-[46px] min-w-[84px] rounded-[10px] border border-accent/40 bg-ink-2 px-2.5 py-1.5 text-center text-[11px] font-bold tracking-[0.03em] text-accent">
          <span className="relative block h-[14px] leading-[14px]">
            <span className="eagle-bubble-a absolute inset-x-0 top-0">
              * screech *
            </span>
            <span className="eagle-bubble-b absolute inset-x-0 top-0">
              * freedom *
            </span>
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes eagle-blink {
          0%,
          88%,
          100% {
            transform: scaleY(1);
          }
          92% {
            transform: scaleY(0.1);
          }
        }
        :global(.eagle-eye-blink) {
          animation: eagle-blink 2.2s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes eagle-bubble-cycle {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-bubble-a) {
          animation: eagle-bubble-cycle 7s steps(1) infinite;
        }
        :global(.eagle-bubble-b) {
          animation: eagle-bubble-cycle 7s steps(1) infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default TreeBranch;
```

- [ ] **Step 2: Mount it in the Hero**

In `src/components/Home/Hero/index.tsx`, add the import at the top and render it as a sibling of the existing decorative `<svg>` / grid-line `<div>`s, inside the same `<section className="relative ...">`:

```tsx
import TreeBranch from "@/components/Eagle/TreeBranch";
```

Add `<TreeBranch />` immediately after the closing `</svg>` of the existing `heroGlow` decorative svg (around line 109 in the current file), before the `<div className="relative z-10 ...">` that holds the hero copy:

```tsx
        <ellipse
          cx="550"
          cy="120"
          rx="420"
          ry="160"
          fill="url(#heroGlowColor)"
          filter="url(#heroGlow)"
        />
      </svg>

      <TreeBranch />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-start justify-center px-6 pt-32 lg:px-10 lg:pt-40">
```

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/` at a viewport 1024px or wider.
Expected: a brown tree trunk with a green canopy is visible bleeding off the right edge of the hero, below the header, with a branch reaching toward the middle — no eagle yet (state is still always `idle`, so the `perched && (...)` block never renders). Resize below 1024px: the tree disappears entirely (the `hidden lg:flex` wrapper).

- [ ] **Step 5: Commit**

```bash
git add src/components/Eagle/TreeBranch.tsx src/components/Home/Hero/index.tsx
git commit -m "feat: add static tree/branch scene to the hero"
```

---

### Task 3: Flight animation + trigger/dismiss buttons (full interactive loop)

**Files:**
- Create: `src/components/Eagle/FlyingEagle.tsx`
- Modify: `src/components/Eagle/TreeBranch.tsx` (add trigger/dismiss buttons)
- Modify: `src/components/Home/Hero/index.tsx` (mount `FlyingEagle`)

**Interfaces:**
- Consumes: `useEagle()` — `state`, `flightId`, `trigger`, `dismiss`, `completeLanding` (all from Task 1).
- Produces: default-exported `FlyingEagle` component, no props. Fires `completeLanding()` via `onAnimationEnd` when its one-shot flight animation finishes, which flips `EagleContext` state from `"flying"` to `"perched"` — this is what makes `TreeBranch`'s `perched && (...)` block (from Task 2) start rendering.

- [ ] **Step 1: Create the flying eagle component**

Create `src/components/Eagle/FlyingEagle.tsx`:

```tsx
"use client";

import { useEagle } from "./EagleContext";

const FlyingEagle = () => {
  const { state, flightId, completeLanding } = useEagle();

  if (state !== "flying") {
    return null;
  }

  return (
    <div
      key={flightId}
      className="eagle-flyer pointer-events-none absolute z-20 h-12 w-[72px]"
      onAnimationEnd={completeLanding}
    >
      <svg
        className="eagle-frame-a absolute inset-0"
        width="72"
        height="48"
        viewBox="0 0 32 18"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="4" height="1" fill="#e8e8e8" />
        <rect x="0" y="8" width="6" height="2" fill="#e8e8e8" />
        <rect x="2" y="10" width="4" height="1" fill="#e8e8e8" />
        <rect x="8" y="6" width="11" height="1" fill="#3b82c4" />
        <rect x="6" y="5" width="11" height="1" fill="#3b82c4" />
        <rect x="4" y="4" width="11" height="1" fill="#2c5e91" />
        <rect x="2" y="3" width="11" height="1" fill="#2c5e91" />
        <rect x="0" y="2" width="11" height="1" fill="#c0392b" />
        <rect x="0" y="1" width="9" height="1" fill="#c0392b" />
        <rect x="0" y="0" width="7" height="1" fill="#c0392b" />
        <rect x="8" y="11" width="11" height="1" fill="#3b82c4" />
        <rect x="6" y="12" width="11" height="1" fill="#3b82c4" />
        <rect x="4" y="13" width="11" height="1" fill="#2c5e91" />
        <rect x="2" y="14" width="11" height="1" fill="#2c5e91" />
        <rect x="0" y="15" width="11" height="1" fill="#c0392b" />
        <rect x="0" y="16" width="9" height="1" fill="#c0392b" />
        <rect x="0" y="17" width="7" height="1" fill="#c0392b" />
        <rect x="5" y="7" width="15" height="1" fill="#1e3a5f" />
        <rect x="5" y="8" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="9" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="10" width="15" height="1" fill="#1e3a5f" />
        <rect x="20" y="7" width="7" height="1" fill="#ffffff" />
        <rect x="20" y="8" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="9" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="10" width="7" height="1" fill="#ffffff" />
        <rect x="23" y="8" width="1" height="1" fill="#111111" />
        <rect x="27" y="8" width="3" height="1" fill="#f2c94c" />
        <rect x="27" y="9" width="3" height="1" fill="#e0a92e" />
      </svg>
      <svg
        className="eagle-frame-b absolute inset-0"
        width="72"
        height="48"
        viewBox="0 0 32 14"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="2" y="6" width="4" height="1" fill="#e8e8e8" />
        <rect x="0" y="7" width="6" height="2" fill="#e8e8e8" />
        <rect x="2" y="9" width="4" height="1" fill="#e8e8e8" />
        <rect x="9" y="5" width="10" height="1" fill="#3b82c4" />
        <rect x="7" y="4" width="10" height="1" fill="#3b82c4" />
        <rect x="5" y="3" width="10" height="1" fill="#2c5e91" />
        <rect x="3" y="2" width="10" height="1" fill="#2c5e91" />
        <rect x="2" y="1" width="9" height="1" fill="#c0392b" />
        <rect x="1" y="0" width="8" height="1" fill="#c0392b" />
        <rect x="7" y="7" width="8" height="1" fill="#2c5e91" />
        <rect x="6" y="8" width="7" height="1" fill="#1e3a5f" />
        <rect x="5" y="6" width="15" height="1" fill="#1e3a5f" />
        <rect x="5" y="7" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="8" width="15" height="1" fill="#c0392b" />
        <rect x="5" y="9" width="15" height="1" fill="#1e3a5f" />
        <rect x="20" y="6" width="7" height="1" fill="#ffffff" />
        <rect x="20" y="7" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="8" width="8" height="1" fill="#ffffff" />
        <rect x="20" y="9" width="7" height="1" fill="#ffffff" />
        <rect x="23" y="7" width="1" height="1" fill="#111111" />
        <rect x="27" y="7" width="3" height="1" fill="#f2c94c" />
        <rect x="27" y="8" width="3" height="1" fill="#e0a92e" />
      </svg>

      <style jsx>{`
        @keyframes eagle-flight {
          0% {
            left: -14%;
            top: 82%;
            transform: scale(0.8) rotate(-6deg);
          }
          26% {
            top: 92%;
            transform: scale(0.85) rotate(4deg);
          }
          50% {
            left: 30%;
            top: 60%;
            transform: scale(0.95) rotate(-4deg);
          }
          74% {
            left: 62%;
            top: 20%;
            transform: scale(1) rotate(6deg);
          }
          91% {
            left: calc(100% - 150px);
            top: 30%;
            transform: scale(1) rotate(-2deg);
          }
          100% {
            left: calc(100% - 150px);
            top: 44%;
            transform: scale(1) rotate(0deg);
          }
        }
        :global(.eagle-flyer) {
          animation: eagle-flight 4.6s ease-in-out 1 forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.eagle-flyer) {
            animation-duration: 0.01ms;
            animation-fill-mode: forwards;
          }
        }
        @keyframes eagle-frame-toggle {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-frame-a) {
          animation: eagle-frame-toggle 0.3s steps(1) infinite;
        }
        :global(.eagle-frame-b) {
          animation: eagle-frame-toggle 0.3s steps(1) infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default FlyingEagle;
```

Note: `prefers-reduced-motion` is handled by collapsing the animation to near-zero duration rather than branching in JS — it still fires `onAnimationEnd` (a 0.01ms animation still dispatches the event), so `completeLanding()` still runs and the visitor lands straight on the perch, matching how `Hero`'s own headline rotation already respects `prefers-reduced-motion`.

- [ ] **Step 2: Add trigger/dismiss buttons to TreeBranch, and gate the tree on state (amendment)**

Per the Amendment note above the Global Constraints section: the tree/trunk/branch/canopy must no longer render unconditionally. It now renders only once triggered (`state !== "idle"`) — the same condition already used for the perched eagle. Before the first click, only the trigger button is visible in this spot.

Replace the entire contents of `src/components/Eagle/TreeBranch.tsx` with:

```tsx
"use client";

import { useEagle } from "./EagleContext";

const TreeBranch = () => {
  const { state, trigger, dismiss } = useEagle();
  const active = state !== "idle";
  const perched = state === "perched";

  return (
    <div className="absolute right-0 top-28 z-20 hidden w-[280px] flex-col items-end lg:flex">
      {active && (
        <svg
          className="pointer-events-none"
          width="280"
          height="190"
          viewBox="0 0 48 30"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          {/* trunk, bleeding off the right edge */}
          <rect x="42" y="0" width="6" height="30" fill="#4a3826" />
          <rect x="42" y="0" width="2" height="30" fill="#5b4632" />

          {/* canopy */}
          <rect x="34" y="0" width="8" height="3" fill="#2d7a5a" />
          <rect x="30" y="3" width="8" height="3" fill="#3fae7d" />
          <rect x="38" y="2" width="8" height="4" fill="#5ed29c" />
          <rect x="32" y="7" width="10" height="3" fill="#2d7a5a" />
          <rect x="40" y="8" width="6" height="3" fill="#3fae7d" />

          {/* branch, trunk to tip, no gap under the eagle's feet */}
          <rect x="30" y="11" width="12" height="3" fill="#5b4632" />
          <rect x="16" y="12" width="16" height="2" fill="#4a3826" />
          <rect x="6" y="13" width="12" height="1" fill="#4a3826" />
          <rect x="4" y="12" width="2" height="2" fill="#3fae7d" />

          {perched && (
            <g>
              {/* tail */}
              <rect x="24" y="9" width="4" height="2" fill="#e8e8e8" />
              <rect x="25" y="11" width="4" height="1" fill="#e8e8e8" />
              {/* folded body/wing, banded */}
              <rect x="15" y="3" width="10" height="2" fill="#1e3a5f" />
              <rect x="15" y="5" width="10" height="2" fill="#c0392b" />
              <rect x="15" y="7" width="10" height="2" fill="#1e3a5f" />
              <rect x="16" y="9" width="9" height="2" fill="#c0392b" />
              {/* head, facing left */}
              <rect x="10" y="0" width="7" height="2" fill="#ffffff" />
              <rect x="9" y="2" width="8" height="2" fill="#ffffff" />
              <rect x="10" y="4" width="6" height="1" fill="#ffffff" />
              <rect
                className="eagle-eye-blink"
                x="13"
                y="2"
                width="1"
                height="1"
                fill="#111111"
              />
              {/* beak */}
              <rect x="7" y="2" width="2" height="1" fill="#f2c94c" />
              <rect x="7" y="3" width="2" height="1" fill="#e0a92e" />
              {/* feet, resting on the branch's top surface */}
              <rect x="17" y="11" width="2" height="2" fill="#f2c94c" />
              <rect x="21" y="11" width="2" height="2" fill="#f2c94c" />
            </g>
          )}
        </svg>
      )}

      {perched && (
        <div className="eagle-bubble pointer-events-none absolute right-[100px] top-[46px] min-w-[84px] rounded-[10px] border border-accent/40 bg-ink-2 px-2.5 py-1.5 text-center text-[11px] font-bold tracking-[0.03em] text-accent">
          <span className="relative block h-[14px] leading-[14px]">
            <span className="eagle-bubble-a absolute inset-x-0 top-0">
              * screech *
            </span>
            <span className="eagle-bubble-b absolute inset-x-0 top-0">
              * freedom *
            </span>
          </span>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={trigger}
          className="rounded-full bg-accent px-4 py-2 text-[11px] font-bold uppercase tracking-[0.06em] text-ink transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
        >
          Click me if you&apos;re a patriot
        </button>
        {active && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss the eagle"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-xs text-white/70 transition-colors duration-200 hover:border-white/40 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes eagle-blink {
          0%,
          88%,
          100% {
            transform: scaleY(1);
          }
          92% {
            transform: scaleY(0.1);
          }
        }
        :global(.eagle-eye-blink) {
          animation: eagle-blink 2.2s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes eagle-bubble-cycle {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-bubble-a) {
          animation: eagle-bubble-cycle 7s steps(1) infinite;
        }
        :global(.eagle-bubble-b) {
          animation: eagle-bubble-cycle 7s steps(1) infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default TreeBranch;
```

Key differences from Task 2's version, beyond adding the buttons:
- The outer wrapper keeps `hidden lg:flex` (still fully hidden below the 1024px `lg` breakpoint, per the plan's desktop-only Global Constraint — this must not be dropped) but drops the container-level `pointer-events-none`, since the button now lives directly inside it and must be clickable. It also gains `z-20`: `Hero/index.tsx` has a pre-existing sibling, the hero-copy container (`<div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl ...">`), which establishes its own stacking context via `z-10` and, without this wrapper having a higher z-index, would sit above it and swallow pointer events over this whole region (it's a large flex box spanning the full content width, not just where its visible text sits) — even though this wrapper paints later in the DOM. `z-20` clears that. The tree `<svg>` itself keeps `pointer-events-none` (it's still pure decoration), and the bubble keeps `pointer-events-none` too.
- The tree `<svg>` is now wrapped in `{active && (...)}` where `active = state !== "idle"`.
- The button row div no longer needs `pointer-events-auto` (the container no longer blocks events), so that class is dropped from it.
- The dismiss button's condition changed from `state !== "idle"` to the equivalent `active` variable (same behavior, just reusing the new variable instead of repeating the comparison).
- `FlyingEagle`'s wrapper (Step 1 above) needs the same `z-20` treatment for the same reason — any part of its flight path that visually crosses the hero-copy content would otherwise render behind it. Add `z-20` to its class list: `className="eagle-flyer pointer-events-none absolute z-20 h-12 w-[72px]"`.

- [ ] **Step 3: Mount FlyingEagle in the Hero**

In `src/components/Home/Hero/index.tsx`, add one new import line above the existing `import TreeBranch from "@/components/Eagle/TreeBranch";` (added in Task 2 — do not duplicate it):

```tsx
import FlyingEagle from "@/components/Eagle/FlyingEagle";
```

Then add `<FlyingEagle />` directly after the existing `<TreeBranch />` line (also added in Task 2), so the two sit side by side:

```tsx
      <TreeBranch />
      <FlyingEagle />
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/` at 1024px+ width.
Expected:
1. On first load, there is no tree at all in the top-right of the hero — only the "Click me if you're a patriot" button, floating alone.
2. Clicking it: an eagle flies in from the lower-left, flapping between two frames, arcs up, while the tree/trunk/branch appears in the top-right (it renders as soon as `state` leaves `"idle"`, i.e. immediately on click, not only once landed) — and the eagle lands on the branch.
3. Once landed, the perched eagle appears, its eye blinks every ~2.2s, and a speech bubble above it alternates "* screech *" / "* freedom *" every ~3.5s.
4. A small "✕" dismiss button appears next to the trigger once triggered. Clicking it removes the perched eagle, the bubble, **and the tree/branch itself** — back to just the lone button, matching first-load state exactly.
5. Clicking the trigger button again (whether idle or already perched) replays the full flight from scratch (and the tree reappears immediately if it had been dismissed).
6. In Chrome DevTools → Rendering tab, enable "Emulate CSS prefers-reduced-motion: reduce", click trigger again: the eagle should appear perched almost immediately instead of visibly flying across.

- [ ] **Step 6: Verify no build/lint regressions**

Run: `npx tsc --noEmit` and `npm run lint` one more time after the manual check above, in case any exploratory changes were made while testing.
Expected: no errors.

---

### Task 4: Peeking head (global, cross-page)

**Files:**
- Create: `src/components/Eagle/PeekingHead.tsx`
- Modify: `src/app/(site)/layout.tsx`
- Modify: `src/components/Eagle/TreeBranch.tsx` (wire up the `IntersectionObserver` that drives `treeVisible`)

**Interfaces:**
- Consumes: `useEagle()` — `state`, `treeVisible`, `setTreeVisible` (from Task 1); `usePathname()` from `next/navigation` (already used the same way in `Header`).
- Produces: default-exported `PeekingHead` component, no props.

- [ ] **Step 1: Wire the IntersectionObserver into TreeBranch (amendment: applies on top of Task 3's fixed version, not the original brief text)**

`TreeBranch.tsx` has changed twice since Task 3's brief was originally written (once to add the buttons/tree-gating amendment, once more in Task 3's fix round to restore the `hidden` class and add `z-20`). Its current full contents are:

```tsx
"use client";

import { useEagle } from "./EagleContext";

const TreeBranch = () => {
  const { state, trigger, dismiss } = useEagle();
  const active = state !== "idle";
  const perched = state === "perched";

  return (
    <div className="absolute right-0 top-28 z-20 hidden w-[280px] flex-col items-end lg:flex">
      {active && (
        <svg
          className="pointer-events-none"
          width="280"
          height="190"
          viewBox="0 0 48 30"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          {/* trunk, bleeding off the right edge */}
          <rect x="42" y="0" width="6" height="30" fill="#4a3826" />
          <rect x="42" y="0" width="2" height="30" fill="#5b4632" />

          {/* canopy */}
          <rect x="34" y="0" width="8" height="3" fill="#2d7a5a" />
          <rect x="30" y="3" width="8" height="3" fill="#3fae7d" />
          <rect x="38" y="2" width="8" height="4" fill="#5ed29c" />
          <rect x="32" y="7" width="10" height="3" fill="#2d7a5a" />
          <rect x="40" y="8" width="6" height="3" fill="#3fae7d" />

          {/* branch, trunk to tip, no gap under the eagle's feet */}
          <rect x="30" y="11" width="12" height="3" fill="#5b4632" />
          <rect x="16" y="12" width="16" height="2" fill="#4a3826" />
          <rect x="6" y="13" width="12" height="1" fill="#4a3826" />
          <rect x="4" y="12" width="2" height="2" fill="#3fae7d" />

          {perched && (
            <g>
              {/* tail */}
              <rect x="24" y="9" width="4" height="2" fill="#e8e8e8" />
              <rect x="25" y="11" width="4" height="1" fill="#e8e8e8" />
              {/* folded body/wing, banded */}
              <rect x="15" y="3" width="10" height="2" fill="#1e3a5f" />
              <rect x="15" y="5" width="10" height="2" fill="#c0392b" />
              <rect x="15" y="7" width="10" height="2" fill="#1e3a5f" />
              <rect x="16" y="9" width="9" height="2" fill="#c0392b" />
              {/* head, facing left */}
              <rect x="10" y="0" width="7" height="2" fill="#ffffff" />
              <rect x="9" y="2" width="8" height="2" fill="#ffffff" />
              <rect x="10" y="4" width="6" height="1" fill="#ffffff" />
              <rect
                className="eagle-eye-blink"
                x="13"
                y="2"
                width="1"
                height="1"
                fill="#111111"
              />
              {/* beak */}
              <rect x="7" y="2" width="2" height="1" fill="#f2c94c" />
              <rect x="7" y="3" width="2" height="1" fill="#e0a92e" />
              {/* feet, resting on the branch's top surface */}
              <rect x="17" y="11" width="2" height="2" fill="#f2c94c" />
              <rect x="21" y="11" width="2" height="2" fill="#f2c94c" />
            </g>
          )}
        </svg>
      )}

      {perched && (
        <div className="eagle-bubble pointer-events-none absolute right-[100px] top-[46px] min-w-[84px] rounded-[10px] border border-accent/40 bg-ink-2 px-2.5 py-1.5 text-center text-[11px] font-bold tracking-[0.03em] text-accent">
          <span className="relative block h-[14px] leading-[14px]">
            <span className="eagle-bubble-a absolute inset-x-0 top-0">
              * screech *
            </span>
            <span className="eagle-bubble-b absolute inset-x-0 top-0">
              * freedom *
            </span>
          </span>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={trigger}
          className="rounded-full bg-accent px-4 py-2 text-[11px] font-bold uppercase tracking-[0.06em] text-ink transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
        >
          Click me if you&apos;re a patriot
        </button>
        {active && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss the eagle"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-xs text-white/70 transition-colors duration-200 hover:border-white/40 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes eagle-blink {
          0%,
          88%,
          100% {
            transform: scaleY(1);
          }
          92% {
            transform: scaleY(0.1);
          }
        }
        :global(.eagle-eye-blink) {
          animation: eagle-blink 2.2s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes eagle-bubble-cycle {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        :global(.eagle-bubble-a) {
          animation: eagle-bubble-cycle 7s steps(1) infinite;
        }
        :global(.eagle-bubble-b) {
          animation: eagle-bubble-cycle 7s steps(1) infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default TreeBranch;
```

Make exactly these changes to that file — do not otherwise alter it:

1. Add `useEffect` and `useRef` to the `react` import: `import { useEffect, useRef } from "react";` (new import line, above the existing `useEagle` import).
2. Add `setTreeVisible` to the destructure: `const { state, trigger, dismiss, setTreeVisible } = useEagle();`
3. Add a ref and its effect, right after the `perched` line:
   ```tsx
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
     const node = containerRef.current;
     if (!node) return;

     const observer = new IntersectionObserver(
       ([entry]) => setTreeVisible(entry.isIntersecting),
       { threshold: 0 },
     );
     observer.observe(node);

     return () => observer.disconnect();
   }, [setTreeVisible]);
   ```
4. Add `ref={containerRef}` to the outer `<div>`'s opening tag — its className stays exactly `"absolute right-0 top-28 z-20 hidden w-[280px] flex-col items-end lg:flex"`, unchanged:
   ```tsx
   <div
     ref={containerRef}
     className="absolute right-0 top-28 z-20 hidden w-[280px] flex-col items-end lg:flex"
   >
   ```

Nothing else in the file changes — the SVG, bubble, buttons, and `<style jsx>` block all stay exactly as shown above.

- [ ] **Step 2: Create the peeking head component**

Create `src/components/Eagle/PeekingHead.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { useEagle } from "./EagleContext";

const PeekingHead = () => {
  const { state, treeVisible } = useEagle();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const visible = state !== "idle" && (!isHome || !treeVisible);

  if (!visible) {
    return null;
  }

  return (
    <div className="eagle-peek pointer-events-none fixed left-2 top-1.5 z-9999 h-11 w-11">
      <svg
        width="44"
        height="44"
        viewBox="0 0 8 8"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="0" y="1" width="7" height="1" fill="#ffffff" />
        <rect x="0" y="2" width="8" height="1" fill="#ffffff" />
        <rect x="0" y="3" width="8" height="1" fill="#ffffff" />
        <rect x="0" y="4" width="7" height="1" fill="#ffffff" />
        <rect
          className="eagle-eye-blink"
          x="3"
          y="2"
          width="1"
          height="1"
          fill="#111111"
        />
        <rect x="7" y="2" width="1" height="1" fill="#f2c94c" />
        <rect x="7" y="3" width="1" height="1" fill="#e0a92e" />
      </svg>

      <style jsx>{`
        @keyframes eagle-blink {
          0%,
          88%,
          100% {
            transform: scaleY(1);
          }
          92% {
            transform: scaleY(0.1);
          }
        }
        :global(.eagle-eye-blink) {
          animation: eagle-blink 2.2s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default PeekingHead;
```

This is positioned top-left (`left-2 top-1.5` = 8px/6px, matching the confirmed mockup), right-side-up, well clear of the "Rowen Hutchins" logo text vertically. `z-9999` (a real defined token in this project's Tailwind theme, unlike `Header`'s own `z-1000`) guarantees it renders above the header bar.

- [ ] **Step 3: Mount PeekingHead in the root layout**

In `src/app/(site)/layout.tsx`, import and render it once, anywhere inside `EagleProvider` (it's `fixed`-positioned, so placement in the tree doesn't affect layout):

```tsx
import PeekingHead from '@/components/Eagle/PeekingHead';
```

```tsx
        <EagleProvider>
          <div className='isolate'>
            <NextTopLoader
              color='#5ed29c'
              crawlSpeed={300}
              showSpinner={false}
              shadow='none'
            />

            <Header />
            {children}
            <Footer />

            <ToasterContext />
          </div>

          <PeekingHead />
          <ScrollToTop />
        </EagleProvider>
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/` at 1024px+ width.
1. Click the trigger button, let it land. The peeking head should **not** appear yet (the tree is still in view).
2. Scroll down past the hero. The peeking head should fade in at the top-left, blinking.
3. Scroll back up. The peeking head should disappear again once the tree is back in view.
4. While scrolled down (peeking head visible), navigate to `/about`. The peeking head should still be visible immediately, with no tree and no flight animation.
5. Navigate back to `/`. Confirm the tree/perched-eagle scene is back and correct (peeking head hidden again since the tree is in view at the top of the page).
6. From `/about`, confirm there is **no** dismiss control reachable (per spec, dismiss only exists on the home page) — go back to `/`, click "✕" there, then navigate to `/about` again and confirm nothing shows.

- [ ] **Step 6: Commit**

```bash
git add src/components/Eagle/PeekingHead.tsx src/components/Eagle/TreeBranch.tsx src/app/\(site\)/layout.tsx
git commit -m "feat: add cross-page peeking eagle head"
```

---

### Task 5: Full regression pass

**Files:** none (verification only).

**Interfaces:** none — this task re-verifies the behavior contract described in the spec's Interaction Summary table using everything built in Tasks 1–4.

- [ ] **Step 1: Run the full manual checklist**

Run: `npm run dev`, and at a viewport 1024px or wider, walk through every row of the spec's Interaction Summary table (`docs/superpowers/specs/2026-08-05-patriot-eagle-easter-egg-design.md`):

1. Click trigger on home page → flight plays → lands perched. ✅/❌
2. Click trigger again while already perched → replays from scratch (not a no-op). ✅/❌
3. Scroll down past hero → peeking head fades in top-left, clear of the logo. ✅/❌
4. Scroll back up → peeking head disappears, full scene reappears. ✅/❌
5. Navigate to another page while perched → peeking head shows immediately, no tree, no flight. ✅/❌
6. Click dismiss (home page only) → everything disappears everywhere (check another page after dismissing). ✅/❌
7. Reload the page → state resets to idle (button reappears in its default state, no peeking head anywhere). ✅/❌
8. Resize below 1024px → button, tree, and peeking head are all hidden. ✅/❌

- [ ] **Step 2: Fix any regressions found**

If any row fails, fix it in the relevant component from Tasks 1–4 before proceeding (there is no separate code to write here unless a regression is found — this step only applies conditionally).

- [ ] **Step 3: Final typecheck, lint, and build**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: production build completes successfully with no errors (this also catches any issues specific to production/SSR that `next dev` might not surface).

- [ ] **Step 4: Commit**

Only if Step 2 required fixes:

```bash
git add -A
git commit -m "fix: address regressions found in eagle easter egg final pass"
```

If no fixes were needed, skip this commit — there's nothing to commit.
