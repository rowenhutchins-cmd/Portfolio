# Site Consistency Pass + About Page Update

Date: 2026-08-04

## Problem

Two unrelated but concurrently-requested changes to the portfolio site:

1. **Navigation/typography inconsistency.** The home page renders its own
   separate, always-transparent header baked into `Hero.tsx` (using `Inter`
   + `Instrument_Serif` fonts), while every other page uses the shared
   `Header.tsx` component (sticky, becomes solid on scroll, uses the site's
   global `Plus_Jakarta_Sans` font). Navigating between the home page and any
   other page produces a jarring font and nav-bar-behavior swap, even though
   the underlying color tokens (`--color-ink`, `--color-accent`, etc.) are
   already identical across both.

   Additionally: the Contact section currently appears on Home, About, and
   Projects pages. It should only live on Home, plus get its own dedicated
   page reachable from the nav.

2. **About page content.** The Experience section should foreground
   IT-relevant experience and add the user's in-progress coding program
   (ERA Solutions), since the user has few shipped projects to point to yet
   and wants to signal serious, structured movement toward a developer role.

## Goals

- One consistent header/nav (behavior + font) across all pages, including
  home.
- Home page logo modestly larger than other pages.
- Contact section lives only on the home page; a new `/contact` page reuses
  the same component; "Contact" added to the nav.
- About page Experience section leads with the ERA Solutions coding
  program, and reframes/trims the Army and ATM Technician bullets to
  emphasize technical relevance over general logistics/ops framing.

## Non-goals

- No visual/brand redesign beyond what's needed for consistency (colors,
  overall look stay the same).
- No changes to the Skills or Education sections of the About page.
- No changes to the Resume page.
- No new content beyond what's specified below (no fabricated projects,
  dates, or credentials).

## Design

### 1. Unified header

- Remove the `if (pathUrl === "/") return null;` early return in
  `src/components/Header/index.tsx` so it renders on every page, including
  home, with its existing sticky/scroll behavior (transparent at top, solid
  `bg-[#070b0a]/90` with blur once scrolled).
- On the home page only (`pathUrl === "/"`), render the logo icon and
  wordmark at a modestly larger size (~1.5x: 28px -> 40px icon, one text
  size step up on the wordmark). All other pages keep the current size.

### 2. Strip Hero's embedded header

In `src/components/Home/Hero/index.tsx`:

- Remove the absolutely-positioned `<header>` block and the fullscreen
  mobile menu overlay — nav is now handled entirely by the shared `Header`.
- Remove the `Inter` and `Instrument_Serif` font imports/consts and all
  `style={{ fontFamily: ... }}` overrides tied to them (nav links, headline,
  mobile menu, CTA button). Text falls back to the site's global
  `Plus_Jakarta_Sans` font applied in `layout.tsx`. The "Military" accent
  word keeps its `italic` styling but loses the custom serif font.
- Remove now-unused `menuOpen` state, `NAV_LINKS`, and the `Menu`/`X` icon
  imports (still keep `ArrowRight` and `ShieldCheck`, which are used
  elsewhere in the hero content).
- Change the hero content wrapper's top padding from `pt-24` to
  `pt-32 lg:pt-40`, matching the offset used under the fixed header on
  About/Projects, since the hero no longer supplies its own header spacing.

### 3. Contact section scope

- Remove `<Contact />` from `src/app/(site)/about/page.tsx` and
  `src/app/(site)/projects/page.tsx`. Home page keeps it unchanged.
- Add an optional `variant?: "embedded" | "page"` prop to
  `src/components/Contact/index.tsx` (default `"embedded"`). When
  `variant === "page"`, the outer `<section>` uses `pt-32 lg:pt-40` instead
  of `border-t border-white/10`, so it reads correctly as the first element
  on its own page under the fixed header.
- Add `src/app/(site)/contact/page.tsx`: a page with its own `Metadata`
  (title `"Contact | Rowen Hutchins"`) that renders `<Contact variant="page" />`.
- Add a "Contact" entry (`path: "/contact"`) to
  `src/components/Header/menuData.ts`, after "Resume".

### 4. About page — Experience section content

Reorder to lead with the in-progress coding program, then reframe the two
existing jobs toward their technical angle and trim each from 5 bullets to
3. Exact copy:

**ERA Solutions Coding Program** (new, first entry) — Period: "In Progress"
- Completed coursework in HTML, CSS, and JavaScript fundamentals, followed
  by React for building interactive, component-based interfaces.
- Currently completing a MySQL and relational database course to round out
  a front-end-to-database skill set.
- Structured, project-based curriculum focused on writing, testing, and
  debugging real code — hands-on preparation for an entry-level developer
  role.

**Ammunition Specialist, U.S. Army** (trimmed 5 -> 3 bullets)
- Used digital inventory and tracking systems to maintain accurate,
  audit-ready records across domestic and overseas assignments, including a
  9-month deployment in Germany — experience directly applicable to
  structured data and systems logic in software development.
- Enforced strict technical safety and compliance standards for handling
  and storing hazardous materials, maintaining a zero-incident record
  through disciplined process and attention to detail.
- Trained and supervised fellow soldiers on standard operating procedures
  and equipment handling as a Non-Commissioned Officer.

**ATM Technician, Peachtree ATMs** (trimmed 5 -> 3 bullets, tech-first)
- Diagnosed and resolved hardware, software, and network issues on ATM
  units, including performing software resets, installing system updates,
  and troubleshooting connectivity failures.
- Applied systematic, root-cause troubleshooting to electronics and
  networking problems — the same debugging mindset now applied to writing
  and fixing code.
- Maintained a consistent under-24-hour response time across an expanded
  coverage route.

No changes to Skills, Education, the intro bio paragraphs, or headshot.

## Testing

This is a static content/styling portfolio site with no automated test
suite for these components. Verification is manual:

- Run the dev server and visually confirm: header renders identically
  (behavior + font) on `/`, `/about`, `/projects`, `/resume`, `/contact`;
  logo is visibly larger only on `/`.
- Confirm Contact form only appears on `/` and `/contact`, and the
  `/contact` page's Contact section reads correctly as the top-of-page
  element (no stray top border, proper spacing under the fixed header).
- Confirm nav includes a working "Contact" link on desktop and mobile menus.
- Confirm About page Experience section shows ERA Solutions first with the
  specified copy, followed by the trimmed Army and ATM Technician entries.
- Run `npm run build` (or project's lint/typecheck script) to confirm no
  type errors from the removed Hero header code or the new Contact prop.
