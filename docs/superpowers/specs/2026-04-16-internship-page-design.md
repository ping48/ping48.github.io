# Internship Application Page — Design

**Date:** 2026-04-16
**Author:** Anthony Kang (with Claude)
**Status:** Draft for approval

## Purpose

Create a single static webpage on `ping48.github.io` that hosts the job description for the **UAV Manufacturing Intern** role at Ascend Engineering and collects applications (name, email, resume PDF) from high-school applicants. The page is shared with applicants by direct URL only — it is **not** linked from any other page on the site.

## Scope

In scope:
- One new HTML file at the repo root: `internship.html`.
- Embedded Google Form for applications.
- Job description content copied from the existing Indeed posting for the same role.

Out of scope:
- Backend code, database, authentication, session state.
- Changes to `index.html` or site navigation.
- Automated applicant triage, ranking, or notification beyond what Google Forms provides natively.
- Handling more than one open role on the page.

## Architecture

Static, client-only. The page is an HTML file served by GitHub Pages. Submissions are handled entirely by Google:

```
applicant browser
      │
      │ renders
      ▼
internship.html ──────── reuses ──────► assets/css/main.css
      │
      │ iframe embeds
      ▼
Google Forms (docs.google.com)
      │
      ├── writes responses ──► Google Sheet (owned by Anthony)
      └── writes uploads ─────► Google Drive folder (owned by Anthony)
```

No database, no backend code, no build step. Adding/editing the page is a normal commit.

## Page Layout

**Option C from brainstorming:** standalone layout, no sidebar. The page does not reuse the personal-site sidebar (`#header`) from `index.html`. Instead it presents as a focused job-posting page.

Structure (top to bottom, centered, max-width similar to other content sections on the site):

1. **Title block**
   - `h1`: "UAV Manufacturing Intern"
   - Subtitle line: "Ascend Engineering · Chicago, IL · Part-time / Full-time · In person"
   - Pay range from the Indeed posting is intentionally omitted from this page.
2. **About the Role** — short paragraph.
3. **Responsibilities** — bulleted list (6 items).
4. **Qualifications** — bulleted list (4 items).
5. **Apply** — heading + embedded Google Form iframe.

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

## Google Form Setup

The form has been created by Anthony in Google Forms and is owned by his Google account.

**Form URLs:**
- Short link: `https://forms.gle/Q54SXoUnS5csYc3M9`
- Viewform: `https://docs.google.com/forms/d/e/1FAIpQLSeYUdAOl-9M8IAcel2Dkn8VThZN4SrqfMGdOI6v552-y_GteQ/viewform`
- Embed src: `https://docs.google.com/forms/d/e/1FAIpQLSeYUdAOl-9M8IAcel2Dkn8VThZN4SrqfMGdOI6v552-y_GteQ/viewform?embedded=true`

Configuration:

**Form title:** "UAV Manufacturing Intern — Application"

**Fields:**
| # | Label | Type | Required | Validation |
|---|-------|------|----------|------------|
| 1 | Full name | Short answer | Yes | — |
| 2 | Email | Short answer | Yes | Response validation: "Email address" |
| 3 | Resume | File upload | Yes | PDF only, max 1 file, max size default (10 MB) |

**Form settings:**
- Collect email addresses: off (field 2 handles this; avoids double-capturing)
- Require sign-in: **on** (unavoidable — Google Forms requires applicant Google sign-in whenever a file-upload field is present)
- "Email me for each response": off by default (can be enabled later if desired)
- Confirmation message shown after submit: "Thanks! We've received your application and will be in touch."

**Storage:**
- Responses linked to a Google Sheet (created from the Form's "Responses" tab → "Link to Sheets").
- Resume uploads auto-land in a Drive folder created by Forms (typically named `<Form title> (File responses)`) under Anthony's Drive.

**Embed:**
- Use the form's "Send → `< >` (embed)" snippet. This gives an `<iframe>` with `src="https://docs.google.com/forms/d/e/.../viewform?embedded=true"` and a default size.
- Paste into `internship.html` inside the "Apply" section. Adjust height if Google's default leaves scrollbars (typical: 900–1400 px depending on field count; for three fields ~900 should fit).

## Styling

Reuse `assets/css/main.css` from the existing HTML5 UP "Read Only" template. No new CSS file, no new assets.

Layout for standalone page:
- Use the template's `#wrapper` + `#main` + `.container` structure so typography matches the rest of the site.
- Do **not** include the `#header` sidebar section (that's the deviation from `index.html`).
- The iframe gets `width="100%"` and a fixed height; no custom styling beyond that.

## File Locations

```
ping48.github.io/
├── internship.html              ← new
├── assets/css/main.css          ← unchanged, reused
└── docs/superpowers/specs/
    └── 2026-04-16-internship-page-design.md   ← this document
```

## Workflow

### One-time setup (Anthony)
1. ~~Create the Google Form with the fields above.~~ Done — form lives at the URLs listed above.
2. Verify responses are linked to a Google Sheet (Form → Responses → "Link to Sheets").
3. Verify the fields match this spec (name, email with validation, resume file upload restricted to PDF).
4. Confirm the confirmation-message copy on submit.

### Ongoing
1. Share the URL `https://ping48.github.io/internship.html` with applicants directly.
2. Review submissions in the linked Google Sheet.
3. Review resumes in the linked Drive folder.
4. When the role is filled: either edit the Form to show a "This role is closed" message, or remove/archive `internship.html`. Decision deferred until hiring.

## Risks & Open Questions

- **Google sign-in required for applicants.** Any form with a file-upload field forces applicants to sign in with a Google account. This is a hard Google constraint, not a form setting. Almost all US high-school students have a school Google Workspace account, so this is expected to be a non-issue, but it's worth knowing. If it becomes a problem, the fallback is Tally.so or Airtable (no-account file upload) — switching services later is a low-effort change (swap the iframe).
- **Closing the role.** Not solved in v1. When the position is filled, Anthony will manually close the form or remove the page. Acceptable given scope.
- **Spam / drive-by submissions.** Page is unlinked, URL only shared with a small pool; this keeps volume low. Google Forms' built-in handling is sufficient; no CAPTCHA needed.
- **Mobile rendering of embedded form.** Google Forms iframes resize poorly on narrow screens. Acceptable at this scale; we can revisit if applicants flag issues.

## Success Criteria

- A high-school applicant can visit the URL, read the job description, fill out name + email, upload a PDF resume, and submit successfully.
- Anthony can see the submission in the linked Google Sheet within seconds of submission.
- Anthony can open the uploaded resume from the linked Drive folder.
- The page visually fits the rest of `ping48.github.io` (typography, colors, spacing).
