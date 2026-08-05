# About/Resume Content Refresh + Live Project Hosting

Date: 2026-08-05

## Problem

External feedback (mentor/recruiter review) on the portfolio site identified
three things:

1. The About page should lead with a short personal intro, then the
   in-progress ERA Solutions coding program (front and center, since it's
   the strongest signal of serious movement toward a developer role), then
   relevant experience — with the Army side reframed around transferable
   skills rather than forced technical relevance.
2. The Resume page has several structural/copy issues: the clearance badge
   should stand out more, the "Objective" section reads like a statement of
   fact rather than a goal, and the Projects section should move up to
   directly follow Technical Skills.
3. The user has three finished ERA Solutions coursework projects (a
   furniture-company site, a vintage barbershop site, and a coffee-shop
   site called "The Beans Place" with a booking/subscription flow) that
   currently exist nowhere online. The user wants them live on this site,
   each opening in its own browser tab, with a way to navigate back to the
   portfolio from inside each one.

The project files have already been copied into `public/projects/` by the
user, but in a state not yet safe to commit or serve correctly (embedded
git repos, `node_modules`, absolute root-relative paths that don't match
where the files will actually be served from, and a couple of pre-existing
broken references).

## Goals

- About page: short intro, ERA Solutions front and center (naming the three
  real shipped projects), Army experience reframed around transferable
  skills, ATM experience stays technical.
- Resume page: clearance badge visually emphasized, Objective rewritten as
  a real forward-looking objective, Projects section moved to directly
  follow Technical Skills, Experience bullets aligned with the About page's
  reframing, Projects section naming the three real projects.
- The three ERA Solutions projects served live from this site at stable
  URLs, each fully self-contained and functional, each with a "Back to
  Portfolio" link, and linked from the About page, Resume page, and the
  (currently empty) Projects page — all opening in a new tab.
- `public/projects/` safe to commit: no `node_modules`, no embedded `.git`
  repositories, no accidental duplicate/stray files.

## Non-goals

- No changes to Skills or Education sections beyond what's specified.
- No fabricated projects, dates, or credentials.
- No backend/database work — all three projects are static/front-end-only
  (confirmed with the user).
- Not rebuilding the three student projects' functionality or design —
  only fixing what's necessary for correct static hosting (paths, one
  pre-existing broken reference set in Vintage Barbershop) and adding the
  back-to-portfolio link.
- Source code for the three projects is confirmed backed up elsewhere by
  the user, so dev-only artifacts (`node_modules`, nested `.git`, and for
  The Beans Place the full Vite source template) are safe to remove from
  `public/projects/` and are not being preserved in this repo.

## Design

### 1. About page copy

**New short intro** (replaces the current two-paragraph bio's opening,
sits above a trimmed single paragraph):

> Aspiring developer currently in a coding bootcamp with ERA Solutions,
> building projects and working toward an entry-level developer role.

**Trimmed bio paragraph** (merges the current two paragraphs into one,
keeps the clearance mention and the ATM-to-debugging thread):

> I'm combining hands-on experience in React, JavaScript, and MySQL with
> the leadership, technical troubleshooting, and logistics discipline I
> built in the U.S. Army and as an ATM technician. I hold an active Secret
> clearance and am looking for an entry-level full-stack or front-end
> developer role where that combination is an asset.

**ERA Solutions bullets** (Experience section, still the first entry,
reordered so the shipped projects lead):

1. Built and shipped three independent front-end projects as part of the
   program — a furniture-company site (HTML/CSS), a vintage barbershop
   site (JavaScript), and The Beans Place, a coffee-shop site with a
   booking/subscription flow (React) — each live and linked from this
   site. (Each project name is a link, `target="_blank"`, to its hosted
   URL under `/projects/...`.)
2. Completed coursework in HTML, CSS, and JavaScript fundamentals,
   followed by React for building interactive, component-based
   interfaces.
3. Currently completing a MySQL and relational database course to round
   out a front-end-to-database skill set.

**Army bullets** (trimmed to 3, reframed toward transferable skills with
one systems nod, replacing the current three):

1. Trained and supervised fellow soldiers on procedures and equipment
   handling as a Non-Commissioned Officer, taking direct responsibility
   for their readiness and performance.
2. Enforced strict safety and compliance standards for handling and
   storing hazardous materials, maintaining a zero-incident record through
   discipline and attention to detail under pressure.
3. Used digital inventory and tracking systems to maintain accurate,
   audit-ready records across domestic and overseas assignments, including
   a 9-month deployment in Germany.

**ATM bullets**: unchanged (already tech-forward).

No other changes to the About page (Skills, Education, headshot untouched).

### 2. Resume page

**Clearance badge**: wrap "Active Secret Security Clearance" in a
rounded-pill box, styled consistently with the Preview/Download buttons
(`rounded-full border border-accent`, accent-colored text, uppercase,
tracked letter-spacing) but non-interactive (no hover state).

**Objective rewritten** (title stays "Objective"):

> Seeking an entry-level full-stack or front-end developer role where I
> can apply hands-on experience in React, JavaScript, and MySQL alongside
> the leadership, troubleshooting, and technical discipline built during
> my time in the U.S. Army and as an ATM technician.

**Section order**: Objective, Technical Skills, **Projects** (moved up
from its current position after Experience), Experience, Education.

**Experience bullets**: trimmed to 3 bullets each and aligned with the
About page's reframing —

- Army: same 3 bullets as the About page (transferable skills + one
  systems nod).
- ATM Technician: same 3 tech-forward bullets as the About page
  (diagnosis/troubleshooting, root-cause debugging mindset, response
  time).

**Projects section**: replaces the current generic "deployed and viewable
at rowenhutchins.com" text with the three named, linked projects:

> Three independent coding projects, built during the ERA Solutions
> program and deployed live from this site: Furniture Website (HTML/CSS),
> Vintage Barbershop (JavaScript), and The Beans Place (React). Source
> code for each is available on GitHub.

Each project name links (`target="_blank"`) to its hosted URL; the
existing `rowenhutchins.com` / GitHub links at the bottom stay as-is.

### 3. Live project hosting

**Final URLs** (served as static files from `public/`, no Next.js routing
involved):

- `/projects/furniture-website/`
- `/projects/vintage-barbershop/`
- `/projects/the-beans-place/`

**Furniture Website** (`public/projects/furniture-website/`):

- Delete the superseded draft files `index1.html` and `CSS/styles1.css`
  (the current `index.html` is the complete, current version — over 2x the
  content, with full inline styles).
- Rewrite all absolute root-relative paths (`/furniture-website/...`) in
  `index.html`, `auth/register.html`, and `intake.html` to relative paths
  (`videos/...`, `images/...`, `auth/register.html`, etc.) so the site
  works regardless of the mount path.
- Add a fixed-position "Back to Portfolio" link (plain anchor, minimal
  inline/embedded styling matching the site's dark aesthetic) pointing to
  `/` (relative, same-origin — works in both dev and production).

**Vintage Barbershop** (`public/projects/Vintage Barbershop/` →
`public/projects/vintage-barbershop/`):

- Delete `node_modules/`, `.git/`, `package.json`, `package-lock.json`,
  `eslint.config.mjs` (dev-only artifacts, not needed to serve a static
  site).
- Rename the folder to `vintage-barbershop` (lowercase, hyphenated, no
  spaces).
- Rewrite absolute root-relative paths (`/css/...`, `/assets/...`,
  `/js/...`) to relative paths.
- Fix pre-existing broken references: `js/main1.js` → `js/main.js` (script
  tag points at a file that doesn't exist); `Barbershop assets/feature-*`
  → `assets/feature-*` (mismatched folder name, three `<img>` tags).
- Add the same "Back to Portfolio" link pattern as Furniture Website.

**The Beans Place** (`public/projects/the-beans-place/`):

- In `The-Beans-Place_Student_Template/vite.config.js`, set
  `base: "/projects/the-beans-place/"`.
- Add a persistent "Back to Portfolio" link into the React app (e.g. a
  small fixed-position component rendered from `App.jsx`), styled to fit
  the existing Tailwind-based design, linking to `/`.
- Run `npm run build` inside `The-Beans-Place_Student_Template/` to
  regenerate `dist/` with the corrected base path and the new link baked
  in.
- Replace the contents of `public/projects/the-beans-place/` with just the
  fresh `dist/` output (flattened directly into that folder — no
  `The-Beans-Place_Student_Template/` wrapper, no `src/`, no
  `node_modules/`, no top-level stray `package-lock.json`).

**Projects page** (`src/components/Projects/projectsData.ts` or
equivalent, currently empty): add three entries so `ProjectCard` renders
real cards — title, one-line description, and a link
(`target="_blank"`) to each project's URL. Use a thumbnail image already
present in each project's asset folder if the `ProjectCard`/data shape
supports one; otherwise text-only cards are fine.

**`.gitignore`**: no change needed at the root level once nested
`node_modules`/`.git` are deleted, since nothing will remain that needs
ignoring; if any dev tooling is later reintroduced under
`public/projects/`, ignore it at that time.

## Testing

Static content/styling changes with no automated test suite. Manual
verification:

- About page: confirm intro, ERA Solutions bullets (with working links
  opening in a new tab), and reframed Army/ATM bullets render correctly.
- Resume page: confirm clearance badge styling, reworded Objective,
  section order (Skills → Projects → Experience → Education), reframed
  Experience bullets, and Projects section links.
- Visit each of the three `/projects/...` URLs directly: confirm all
  images/video/CSS/JS load with no 404s in the console, confirm the
  Vintage Barbershop images that were previously broken now display, and
  confirm each site's "Back to Portfolio" link returns to `/`.
- Confirm the Projects page renders three working cards linking out
  correctly.
- Confirm `public/projects/` contains no `node_modules` or `.git`
  directories before anything is committed (`git status` /
  `git add --dry-run` should not show thousands of new files).
- Run `npm run build` on the main site to confirm no type errors.
