# Internship Application Page — Design

**Date:** 2026-04-16 (revised 2026-04-16 after implementation)
**Author:** Anthony Kang (with Claude)
**Status:** Implemented

## Revision Note

This spec was first written against a Google Forms embed reusing the HTML5 UP "Read Only" site template. During implementation the design was changed on two axes: (1) the form service was switched from Google Forms to **Tally.so** to eliminate applicant sign-in and new-tab popups on file upload; (2) the page was restyled as a **self-contained Greenhouse-style job posting** rather than reusing the personal-site template. This document now reflects the as-built state.

## Purpose

Create a single static webpage on `ping48.github.io` that hosts the job description for the **UAV Manufacturing Intern** role at Ascend Engineering and collects applications (name, email, resume PDF) from high-school applicants. The page is shared with applicants by direct URL only — it is **not** linked from any other page on the site.

## Scope

In scope:
- One new HTML file at the repo root: `internship.html`.
- Embedded Tally.so form for applications.
- Job description content copied from the existing Indeed posting for the same role.

Out of scope:
- Backend code, database, authentication, session state.
- Changes to `index.html` or site navigation.
- Automated applicant triage, ranking, or notification beyond what Tally provides natively.
- Handling more than one open role on the page.

## Architecture

Static, client-only. The page is an HTML file served by GitHub Pages. Submissions are handled entirely by Tally.so:

```
applicant browser
      │
      │ renders
      ▼
internship.html (self-contained HTML + inline CSS + one <script>)
      │
      │ iframe embeds
      ▼
Tally.so form (tally.so/embed/NpBWAO)
      │
      ├── submissions  ──► Tally dashboard (owned by Anthony)
      └── resume files ──► Tally's CDN, downloadable via dashboard
```

No database, no backend code, no build step, no applicant sign-in. Tally's `embed.js` script auto-resizes the iframe to content height. Adding/editing the page is a normal commit.

## Page Layout

Standalone layout with its own design system — does **not** reuse `assets/css/main.css` or any part of the HTML5 UP "Read Only" template that the rest of the site uses. The page is visually self-contained so it reads as a professional job posting, not as a sub-page of the personal site.

Structure (top to bottom, centered, max-width 760px):

1. **Sticky topbar** — translucent, backdrop-blurred, company name on the left ("Ascend Engineering"), anchor "Apply" link on the right that jumps to the apply section.
2. **Hero**
   - Eyebrow line (small, uppercase, teal accent): "Internship · Hiring now"
   - `h1`: "UAV Manufacturing Intern"
   - Metadata row (dot-separated): Chicago, IL · Part-time / Full-time · In person
   - Pay range from the Indeed posting is intentionally omitted.
3. **About the Role** — short paragraph, hairline border above.
4. **Responsibilities** — bulleted list (6 items), custom teal dot bullets.
5. **Qualifications** — bulleted list (4 items).
6. **Apply card** — subtle off-white card with a thin teal accent bar at the top edge, containing an `h2` "Apply for this job", one-sentence intro, and the embedded Tally form iframe.
7. **Footer** — thin hairline, `© Ascend Engineering` on the left, `Chicago, IL` on the right.

All content is hard-coded in the HTML — no data files, no templating.

## Content

Copied verbatim from the Indeed posting for this role (Ascend Engineering is Anthony's company, so there's no licensing concern).

**About the Role:**
> The position involves assisting with the construction and assembly of unmanned aerial vehicles, designed for students pursuing interests in engineering, robotics, or electronics seeking practical hardware and firmware experience.

**Responsibilities:**
- Assist in assembling UAV components and systems
- Perform basic soldering (wires, connectors, etc.)
- Connect JST connectors and wiring harnesses
- Help with basic software setup
- Test and troubleshoot hardware components
- Maintain a clean and organized workspace

**Qualifications:**
- High school student or recent graduate interested in engineering, robotics, or drones
- Willingness to learn hands-on technical skills
- Strong attention to detail and patience
- Basic familiarity with tools and circuits (screwdrivers, soldering iron, multimeter)

## Tally Form Setup

The form was created by Anthony at `tally.so` and is owned by his Tally account.

**Form URLs:**
- Direct / share link: `https://tally.so/r/NpBWAO`
- Embed src: `https://tally.so/embed/NpBWAO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`

**Embed URL parameters (meaning):**
- `alignLeft=1` — left-aligned field labels
- `hideTitle=1` — suppresses Tally's own form title (we render our own `<h2>` heading on the page)
- `transparentBackground=1` — form renders on the apply-card surface color instead of its own white rectangle
- `dynamicHeight=1` — form posts height changes to the parent page so `embed.js` can resize the iframe

**Fields:**
| # | Label | Type | Required | Notes |
|---|-------|------|----------|-------|
| 1 | Full name | Short text | Yes | — |
| 2 | Email | Email | Yes | Built-in email validation |
| 3 | Resume | File upload | Yes | PDF only, max 1 file |

**Form settings:**
- Public, no password, no sign-in required.
- Thank-you / confirmation message on submit: "Thanks! We've received your application and will be in touch."

**Storage:**
- Submissions appear in the Tally dashboard under **Submissions**.
- Resume PDFs are hosted on Tally's CDN and downloadable from each submission row.
- Optional: Tally → form Settings → Integrations → Google Sheets can mirror submissions to a Sheet if desired (not configured by default).

**Embed mechanics in `internship.html`:**
- The iframe has both `src=` (immediate initial load) and `data-tally-src=` (used by Tally's script) pointing at the same URL.
- `<script src="https://tally.so/widgets/embed.js" async>` is loaded at the end of the `<body>`. It detects Tally iframes and hooks up a `postMessage` listener so the iframe resizes to the form's current content height whenever fields expand/collapse.
- A `.apply-iframe` CSS class sets `width: 100%; border: 0; min-height: 400px; background: transparent; border-radius: calc(var(--radius) - 2px);`. The script grows the height from `400px` upward as needed.
- Fallback content inside the iframe element (for browsers that refuse third-party frames): "Your browser can't display the embedded form." + a direct link to `https://tally.so/r/NpBWAO`.

## Styling

Self-contained — no external CSS file. The page carries its own design system inside an inline `<style>` block.

**Typography:**
- Body + headings: **Manrope** (weights 400/500/600/700), loaded from Google Fonts with `font-display: swap` and `preconnect` hints on both `fonts.googleapis.com` and `fonts.gstatic.com`.
- System-font fallback stack for if Google Fonts fails.

**Color palette** (declared as CSS variables on `:root`):
- `--bg`: `#ffffff`
- `--surface`: `#fafafa` (apply card + subtle tints)
- `--text`: `#18181b`
- `--text-muted`: `#52525b`
- `--text-subtle`: `#71717a`
- `--border`: `#e4e4e7`
- `--border-strong`: `#d4d4d8`
- `--accent`: `#0f766e` (deep teal, Greenhouse-adjacent)
- `--accent-hover`: `#115e59`

**Layout tokens:**
- `--max-width`: `760px`
- `--radius`: `8px`

**Motion:**
- Page-load staggered fade-up (hero → sections → apply card) with translateY(6px) → 0 and opacity 0 → 1.
- Wrapped in `@media (prefers-reduced-motion: no-preference)` so users who opt out see no animation.

**Responsive:**
- Single breakpoint at `max-width: 640px` that tightens horizontal padding and lets the apply card go edge-to-edge (full-bleed negative margins, zero border-radius).

## File Locations

```
ping48.github.io/
├── internship.html              ← new, self-contained
└── docs/superpowers/specs/
    └── 2026-04-16-internship-page-design.md   ← this document
```

`assets/css/main.css` is **not** referenced by `internship.html`. The rest of the site continues to use it; only this page is decoupled.

## Workflow

### One-time setup (Anthony)
1. ~~Create the Google Form~~ → Create the Tally form at `tally.so`. Done — form lives at the URLs listed above.
2. Confirm the three fields match this spec.
3. Set the confirmation-message copy on submit.
4. Copy the embed URL (with the four query params noted above) into `internship.html`.

### Ongoing
1. Share the URL `https://ping48.github.io/internship.html` with applicants directly.
2. Review submissions in the Tally dashboard → Submissions tab.
3. Download resumes from the file-upload column in each row.
4. When the role is filled: either close the Tally form (form Settings → "Stop accepting responses") so visitors see a polite notice, or remove/archive `internship.html`. Decision deferred until hiring.

## Risks & Open Questions

- **Tally is a younger company** than Google; there's some service-continuity risk. Mitigated by the fact that switching the form service is a low-effort change — in practice a handful of URL/script swaps in `internship.html`, as demonstrated when we migrated from Google Forms to Tally in this same implementation.
- **Closing the role.** Not automated. When the position is filled, Anthony will manually close the Tally form or remove the page. Acceptable given scope.
- **Spam / drive-by submissions.** Page is unlinked, URL shared only with a small pool, so exposure is low. If spam appears, Tally has built-in CAPTCHA and honeypot options that can be enabled per-form.
- **Third-party script dependency.** The page loads `https://tally.so/widgets/embed.js`. If Tally's CDN is unreachable, the iframe still renders at its initial `min-height: 400px` but won't auto-resize — users would see the form in a scrollable inner box. Acceptable degradation.

## Success Criteria

- A high-school applicant can visit the URL, read the job description, fill out name + email, upload a PDF resume, and submit successfully — all without leaving the tab and without signing into any account.
- Anthony can see the submission in the Tally dashboard within seconds of submission.
- Anthony can download the uploaded resume from the Tally dashboard.
- The page presents as a clean, professional standalone job posting — not as a page of `ping48.github.io`'s personal-site template.
