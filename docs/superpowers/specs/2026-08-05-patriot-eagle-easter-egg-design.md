# Patriot Eagle Easter Egg — Design

## Summary

A hidden, playful feature: a button on the home page reading something like "Click me if you're a patriot" (final copy TBD by the user at implementation time, "or something similar" per the original request). Clicking it flies a pixel-art bald eagle across the hero, landing on a branch of a pixel-art tree, where it perches, blinks, and cycles a speech bubble between "* screech *" and "* freedom *". Once triggered, a small peeking version of the eagle's head follows the visitor to every other page (About, Resume, Projects, Contact) until they dismiss it or reload.

This is a pure front-end, client-side visual feature. No backend, no persistence beyond the current browser session's in-memory React state (resets on reload, by design).

## Visual style (confirmed via mockups)

- **Art style:** 8-bit-style pixel art, hand-built as inline SVG `<rect>` grids (`shape-rendering: crispEdges`), not raster image assets.
- **Palette:** Red / white / blue on the eagle (white head & tail, navy/red banded body, yellow beak and feet) — matches "patriotic" intent while the tree uses natural browns with a couple of leaf clusters in the site's existing accent green (`#5ed29c` / `#3fae7d`) to tie into the site's palette.
- **Two flight frames:** "Gliding" (wings swept back) and "Wings Up" (mid-flap) alternate every ~0.3s during flight to simulate flapping.
- **One perched/standing frame:** facing left (toward the page content), folded wings, used both on the branch and (cropped to just the head) for the peeking state.

## Components & state

### Global state: `EagleProvider`

A new client-side React context (e.g. `src/components/Eagle/EagleContext.tsx`) wraps `children` in `src/app/(site)/layout.tsx`, alongside the existing `Header`/`Footer`. It holds:

```
type EagleState = 'idle' | 'flying' | 'perched';
```

- `idle` — nothing rendered anywhere.
- `flying` — the flight animation is playing (home page only; see below).
- `perched` — the eagle has landed. On the home page, while the tree is in view, this shows the full perched scene (tree + eagle + blinking + speech bubble). Once scrolled out of view (or on any non-home page), this shows only the small peeking head.

Because `layout.tsx` stays mounted across client-side navigations in the Next.js App Router, this state naturally persists as the visitor moves between pages, and naturally resets on a full page reload — matching the confirmed requirement (persists across page navigation, resets on reload).

The context exposes `trigger()` (always restarts the flight animation from `idle` *or* replays it from `perched` — re-clicking always re-plays the full flight, per the user's explicit request) and `dismiss()` (resets to `idle` from anywhere in the state machine).

### `TriggerButton` + `DismissButton` (home page only)

Rendered inside `Hero` (`src/components/Home/Hero/index.tsx`), positioned directly underneath the tree/branch graphic on the right side of the hero. Two small controls:
- Trigger: "Click me if you're a patriot" (or similar copy, left to implementation) — calls `trigger()`.
- Dismiss: a small "X" / "remove eagle" control next to it — calls `dismiss()`.

Both only exist on the home page. There is intentionally **no** dismiss control on other pages — if the peeking head is showing on, say, the Resume page and it's unwanted, the visitor has to return to the home page to dismiss it, or reload. This was an explicit choice, called out here so it doesn't get "fixed" unintentionally later.

### `TreeBranch` (home page hero only)

Pixel-art tree trunk + canopy bleeding off the right edge of the hero, with a branch running unbroken from the trunk to under the perched eagle's feet (no floating gap). Positioned with enough clearance below the header/nav row that it never overlaps clickable nav elements (confirmed via mockup — moved lower once already).

Contains the static perched-eagle SVG (facing left), with:
- A blinking eye: `scaleY` squash keyframe, ~2.2s interval (confirmed pace).
- A speech bubble above the branch, alternating "* screech *" / "* freedom *" every ~3.5s (7s full cycle). The bubble only appears in this full in-hero scene — not in the small peeking-head state, where there isn't room for it.

### `FlyingEagle` (home page only, `flying` state)

A fixed/absolute-positioned element that plays a single-shot (non-looping) animation: enters from off-screen lower-left, dips, swoops up dramatically (banking rotation for drama, per feedback), and arrives at the branch position, alternating the two flight frames throughout. On completion, it hands off to the static perched `TreeBranch` scene and the state becomes `perched`.

Respects `prefers-reduced-motion` the same way the existing `Hero` headline rotation already does (`window.matchMedia("(prefers-reduced-motion: reduce)")`): if reduced motion is preferred, skip the flight animation and jump straight to `perched`.

### `PeekingHead` (global, rendered once near the root layout)

A small, correctly-sized (not a clipped/oversized sprite — that trick caused a rendering bug during design and won't be repeated) fixed element in the top-left corner of the viewport, right-side-up, positioned to sit fully clear of the "Rowen Hutchins" logo text (confirmed ~13px+ of vertical clearance). Blinks on the same ~2.2s pace as the perched eagle.

**Visibility rules:**
- Home page: hidden while the in-hero `TreeBranch` scene is in view (avoids showing both at once). Shown once the hero/tree scrolls out of view — driven by an `IntersectionObserver` on the tree container (not a hardcoded scroll pixel value, so it stays correct if hero height changes).
- Every other page: shown immediately whenever state is `perched` (no flight animation plays on these pages at all — "skip straight to peeking"), with no tree/branch graphic since those pages have no hero to host one.
- Hidden whenever state is `idle` (i.e., after `dismiss()`, or before ever triggered).

## Interaction summary

| Action | Result |
|---|---|
| Click trigger on home page (any prior state) | Full flight animation plays in the hero, ending perched in the tree. Replays from scratch even if already perched. |
| Scroll down past the hero on the home page (after perched) | In-hero scene scrolls away normally; `PeekingHead` fades in at the top-left. |
| Scroll back up | `PeekingHead` hides again; in-hero scene is back in view. |
| Navigate to another page (already triggered) | `PeekingHead` shows immediately, no flight, no tree. |
| Click dismiss (home page only) | State resets to `idle` everywhere; `PeekingHead` disappears from whatever page it was on. |
| Reload the page | State resets to `idle` (no storage persistence). |

## Out of scope

- No sound effects (the "screech"/"freedom" bubble is text-only).
- No persistence across reloads or browser sessions (explicitly confirmed — resets on reload).
- No dismiss control on non-home pages (explicitly confirmed).
- No raster image assets — everything is inline SVG, consistent with keeping this lightweight and matching the site's otherwise flat/vector visual language.
