# Internship Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a single standalone static page (`internship.html`) to `ping48.github.io` that presents the UAV Manufacturing Intern job description and embeds the existing Google Form for applications.

**Architecture:** One new HTML file at the repo root. Reuses `assets/css/main.css` from the existing HTML5 UP "Read Only" template, with a small inline `<style>` block to kill the template's right-sidebar padding and center the content (the template's default layout assumes a fixed 23em sidebar on the right that we are intentionally not rendering). Submissions are handled entirely by Google Forms — no JavaScript, no backend, no database.

**Tech Stack:** Static HTML, the existing site's CSS (`assets/css/main.css`), an `<iframe>` embed of Google Forms.

**Spec:** `docs/superpowers/specs/2026-04-16-internship-page-design.md`

---

## Before You Start

Open a terminal from the repo root and start a local static server so you can preview each task's output:

```bash
cd /home/ak/git/ping48.github.io
python3 -m http.server 8000
```

Leave the server running in a separate terminal for the duration of this plan. Visit `http://localhost:8000/internship.html` after each file edit to verify visually. Reload with Ctrl+Shift+R (hard reload) to bypass caching when iterating on CSS.

---

## Task 1: Scaffold standalone page with title block

Create the page skeleton: doctype, head with template stylesheet + inline overrides, and the opening title section. No content sections yet.

**Files:**
- Create: `internship.html`

- [ ] **Step 1: Create `internship.html` with the shell and title block**

Write this exact content to `/home/ak/git/ping48.github.io/internship.html`:

```html
<!DOCTYPE HTML>
<!--
	Based on Read Only by HTML5 UP (html5up.net/license).
	Standalone job-posting page — no sidebar, no site nav.
-->
<html lang="en">
	<head>
		<title>UAV Manufacturing Intern — Ascend Engineering</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<style>
			/* Standalone overrides: the default template reserves 20–23em on the
			   right of #wrapper for a fixed sidebar we are not rendering here.
			   Kill that padding at all breakpoints and center the content. */
			#wrapper { padding-right: 0 !important; }
			#main > section > .container {
				max-width: 48em;
				margin: 0 auto;
				padding-left: 1.5em;
				padding-right: 1.5em;
			}
			.apply-iframe {
				width: 100%;
				border: 0;
				min-height: 1000px;
				display: block;
			}
		</style>
	</head>
	<body>
		<div id="wrapper">
			<div id="main">

				<!-- Title -->
				<section id="intro">
					<div class="container">
						<header class="major">
							<h1>UAV Manufacturing Intern</h1>
							<p>Ascend Engineering &middot; Chicago, IL &middot; Part-time / Full-time &middot; In person</p>
						</header>
					</div>
				</section>

			</div>
		</div>
	</body>
</html>
```

Notes for the implementer:
- The `<body>` deliberately does **not** have `class="is-preload"`. That class is part of the template's JS-driven fade-in; without loading `assets/js/main.js`, keeping the class would leave elements stuck at opacity 0.
- The `!important` on `#wrapper { padding-right: 0 }` is needed because the base stylesheet's media-query rules (`@media max-width: 1680px` etc.) re-set `padding-right` at multiple breakpoints; a single rule in our inline `<style>` is authoritative without `!important` only at the largest breakpoint, so we use `!important` to cover all of them with one line.

- [ ] **Step 2: Load the page and verify the title renders correctly**

In a browser, visit `http://localhost:8000/internship.html`.

Expected:
- Page title in the browser tab reads "UAV Manufacturing Intern — Ascend Engineering".
- You see the h1 "UAV Manufacturing Intern" styled in the same typeface/size as h1 headings on `index.html`.
- Below the h1: the subtitle line with the four fields separated by middle dots.
- Content is roughly centered horizontally — not flush-left with a huge empty gap on the right (if it is flush-left, the `#wrapper` padding override didn't apply; check DevTools → Elements → inspect `#wrapper` and confirm computed `padding-right` is `0px`).
- No console errors.

- [ ] **Step 3: Resize the viewport to mobile (≤500px wide) and re-verify**

Open DevTools → toggle device toolbar → set width to 375px.

Expected:
- Content still fits without horizontal scrollbar.
- h1 wraps cleanly; subtitle wraps across 2–3 lines but is still readable.
- No content cut off at the right edge.

- [ ] **Step 4: Commit**

```bash
cd /home/ak/git/ping48.github.io
git add internship.html
git commit -m "Scaffold internship.html with standalone layout and title"
```

---

## Task 2: Add job description sections

Add three content sections — About the Role, Responsibilities, Qualifications — using the exact text from the spec (copied verbatim from the existing Indeed posting, since Ascend Engineering is Anthony's company).

**Files:**
- Modify: `internship.html` (insert three new `<section>` blocks inside `#main`, after the `#intro` section)

- [ ] **Step 1: Insert the three content sections**

In `internship.html`, locate the closing `</section>` of the `#intro` section. Immediately after it (still inside `<div id="main">`), insert:

```html
				<!-- About -->
				<section id="about">
					<div class="container">
						<h2>About the Role</h2>
						<p>The position involves assisting with the construction and assembly of unmanned aerial vehicles, designed for students pursuing interests in engineering, robotics, or electronics seeking practical hardware and firmware experience.</p>
					</div>
				</section>

				<!-- Responsibilities -->
				<section id="responsibilities">
					<div class="container">
						<h2>Responsibilities</h2>
						<ul>
							<li>Assist in assembling UAV components and systems</li>
							<li>Perform basic soldering (wires, connectors, etc.)</li>
							<li>Connect JST connectors and wiring harnesses</li>
							<li>Help with basic software setup</li>
							<li>Test and troubleshoot hardware components</li>
							<li>Maintain a clean and organized workspace</li>
						</ul>
					</div>
				</section>

				<!-- Qualifications -->
				<section id="qualifications">
					<div class="container">
						<h2>Qualifications</h2>
						<ul>
							<li>High school student or recent graduate interested in engineering, robotics, or drones</li>
							<li>Willingness to learn hands-on technical skills</li>
							<li>Strong attention to detail and patience</li>
							<li>Basic familiarity with tools and circuits (screwdrivers, soldering iron, multimeter)</li>
						</ul>
					</div>
				</section>
```

Preserve the tab-based indentation already used in the file — the existing site files use hard tabs.

- [ ] **Step 2: Reload the page and verify all three sections render**

Visit `http://localhost:8000/internship.html` (hard reload with Ctrl+Shift+R).

Expected:
- Three new `h2` headings appear in order below the title: "About the Role", "Responsibilities", "Qualifications".
- The template's grey horizontal line (`border-top: solid 6px #f4f4f4` on `#main > section`) separates each section.
- The About paragraph renders as a readable paragraph; no raw HTML entities or escaped characters showing.
- Both bulleted lists render with standard disc bullets and correct item counts (6 for Responsibilities, 4 for Qualifications).
- No horizontal scrollbar at desktop or mobile widths.

- [ ] **Step 3: Proofread the content against the spec**

Open `docs/superpowers/specs/2026-04-16-internship-page-design.md` alongside the rendered page. Compare character-by-character:
- About the Role paragraph.
- All 6 Responsibilities bullets.
- All 4 Qualifications bullets.

Fix any typo or deviation. The page must match the spec exactly — we copied verbatim from the live Indeed posting so any divergence here would be a bug.

- [ ] **Step 4: Commit**

```bash
git add internship.html
git commit -m "Add About/Responsibilities/Qualifications sections to internship page"
```

---

## Task 3: Embed the Google Form

Add the `Apply` section with an iframe pointing at the pre-existing Google Form's embed URL, then tune the iframe height so the form renders without internal scrollbars.

**Form URLs (from spec):**
- Short link: `https://forms.gle/Q54SXoUnS5csYc3M9`
- Embed src: `https://docs.google.com/forms/d/e/1FAIpQLSeYUdAOl-9M8IAcel2Dkn8VThZN4SrqfMGdOI6v552-y_GteQ/viewform?embedded=true`

**Files:**
- Modify: `internship.html` (append a new `#apply` section after `#qualifications`)

- [ ] **Step 1: Insert the Apply section with the iframe**

In `internship.html`, immediately after the closing `</section>` of `#qualifications` (still inside `<div id="main">`), insert:

```html
				<!-- Apply -->
				<section id="apply">
					<div class="container">
						<h2>Apply</h2>
						<p>Fill out the form below to submit your application. A Google account is required to upload your resume.</p>
						<iframe
							class="apply-iframe"
							src="https://docs.google.com/forms/d/e/1FAIpQLSeYUdAOl-9M8IAcel2Dkn8VThZN4SrqfMGdOI6v552-y_GteQ/viewform?embedded=true"
							title="UAV Manufacturing Intern Application Form"
							loading="lazy">
							Loading application form&hellip;
						</iframe>
					</div>
				</section>
```

The `.apply-iframe` class was already defined in the inline `<style>` block in Task 1 (`width: 100%; border: 0; min-height: 1000px; display: block;`), so no additional CSS is needed yet.

- [ ] **Step 2: Reload and verify the form embed renders**

Visit `http://localhost:8000/internship.html` and scroll to the bottom.

Expected:
- An h2 "Apply" appears.
- A short paragraph about the Google account requirement appears.
- A Google Form loads inline showing the form title and the three fields: full name, email, resume file upload.
- If you are signed out of Google, the iframe shows a sign-in prompt instead (that's correct behavior — Google requires sign-in for any form with a file-upload field).

- [ ] **Step 3: Check for iframe scrollbars and tune height if needed**

At desktop width, look at the iframe carefully:
- If the iframe has its own vertical scrollbar (i.e., the form is taller than 1000px), increase `min-height` in the `.apply-iframe` rule in the page's `<style>` block by 200px increments until the scrollbar disappears. Reasonable upper bound: 1600px.
- If the iframe has substantial empty space below the submit button, reduce `min-height` by 100px increments. Reasonable lower bound: 800px.

The goal: the form renders in its entirety with no internal scrollbar and minimal trailing empty space. Note the final value you land on; no separate commit for tuning — we'll commit the whole Apply section together.

- [ ] **Step 4: Sanity-check mobile rendering of the iframe**

DevTools → device toolbar → 375px width. Reload.

Expected:
- Form renders at full width of the container, fields stack vertically.
- Internal horizontal scrollbar inside the iframe is acceptable here (Google Forms' own responsive design is imperfect on narrow embeds); a vertical scrollbar on the iframe itself is **not** acceptable — if it appears only at mobile widths, bump `min-height` higher.

- [ ] **Step 5: Commit**

```bash
git add internship.html
git commit -m "Embed Google Form on internship page"
```

---

## Task 4: End-to-end submission test + final verification

Submit a real test application through the page, confirm it lands where the spec says it should, and check typography/layout parity with the rest of the site.

- [ ] **Step 1: Submit a test application**

In a Google-signed-in browser tab, visit `http://localhost:8000/internship.html`. In the embedded form:
- Name: `Test Applicant`
- Email: any email you control
- Resume: upload any small PDF (the existing `Resume_23-24.pdf` in the repo root works as a convenient test file)

Click Submit. Expected: you see the confirmation message defined in the form's settings (e.g., "Thanks! We've received your application and will be in touch.").

- [ ] **Step 2: Verify the submission in Google Sheets**

Open the Google Sheet linked to the form's responses (Form → Responses tab → green Sheets icon, or directly from Drive).

Expected:
- A new row appears with a timestamp, the name `Test Applicant`, the email you used, and a link to the uploaded PDF in Drive.

- [ ] **Step 3: Verify the resume in Drive**

Open the Drive folder that Google Forms auto-creates for file responses (usually named something like `UAV Manufacturing Intern — Application (File responses)`).

Expected:
- The PDF you uploaded is there, owned by Anthony's Google account.
- The file opens and shows the expected content.

- [ ] **Step 4: Delete the test submission**

In the Google Sheet, delete the test row. In the Drive folder, delete the test PDF. This keeps the response log clean for real applicants.

- [ ] **Step 5: Typography and layout parity check**

Open `http://localhost:8000/index.html` in one tab and `http://localhost:8000/internship.html` in another. Compare side-by-side:
- Same font family for headings and body text.
- Same heading colors and weights.
- Same body text color and line-height.
- Same horizontal rule / section separator styling between sections.

If anything is off, the most likely cause is a rule from the sidebar-based layout leaking in. Inspect the offending element in DevTools to identify which selector is winning, and add a corresponding override to the inline `<style>` block. Keep overrides minimal and well-commented.

- [ ] **Step 6: Final cross-viewport check**

Using DevTools device toolbar, load `internship.html` at these widths and confirm the page looks good at each:
- 1920px (large desktop)
- 1280px (small desktop)
- 768px (tablet)
- 375px (mobile)

Checks at every width:
- No horizontal scrollbar on the page itself (a scrollbar inside the iframe is OK at narrow widths).
- All content is readable and fits within the viewport.
- The form is submittable.

- [ ] **Step 7: Commit any final tweaks (if any)**

If you made any CSS tweaks during Steps 5–6:

```bash
git add internship.html
git commit -m "Tweak internship page layout for cross-viewport parity"
```

If no tweaks were needed, skip this step — the page is done.

- [ ] **Step 8: Push**

```bash
git push origin main
```

After GitHub Pages rebuilds (usually <60 s), visit `https://ping48.github.io/internship.html` and submit one final real test application from there (delete it afterward like in Step 4) to confirm the live URL works end-to-end. This is what you'll share with applicants.

---

## Self-Review Notes

- Spec coverage checked: title block ✓, About ✓, Responsibilities ✓, Qualifications ✓, Apply (iframe) ✓, standalone layout with no sidebar ✓, pay range omitted ✓, PDF-only handled by the form configuration (out of code scope) ✓, closing-the-role deferred ✓ (per spec's "Risks & Open Questions").
- No placeholders: every step contains concrete code or concrete expected output.
- Type/name consistency: `.apply-iframe` class is defined once in Task 1 and referenced in Task 3 with the same name. Section IDs (`intro`, `about`, `responsibilities`, `qualifications`, `apply`) are used only for document structure; they are not cross-referenced and therefore have no collision risk.
- The plan intentionally does not reintroduce `assets/js/main.js` or `body.is-preload` — verified in the plan's Task 1 notes so a future reader understands why.
