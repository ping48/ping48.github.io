# ping48.github.io

Personal website for Anthony Kang. Based on the [Read Only](https://html5up.net/read-only) template by HTML5 UP — free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license).

---

## Gilman Tech Cohort Map

**File:** `gilman-tech-map.html`

Interactive map of the 2026 CET Gilman Tech seminar cohort (San José). Built with Leaflet.js + OpenStreetMap. Participant locations are precomputed and committed in the page so markers render immediately without browser-side geocoding. Markers are jittered for cities with multiple people. Participants with unknown locations appear in a collapsible side panel.

Social links (LinkedIn/Instagram) are base64-encoded at build time — no plain URLs ever appear in the committed source.

### Adding/updating links

1. Edit `links.json` (gitignored — never committed) with real profile URLs
2. Run `node inject-links.js`
3. Commit and push `gilman-tech-map.html`

`links.template.json` is committed as a blank template with all 30 names — copy it to `links.json` to get started.

### Future ideas for the map

- **Google Form integration:** participants fill out a form (name, location, LinkedIn, Instagram) and responses auto-populate a Google Sheet. A small script or Apps Script webhook syncs the sheet → `links.json` → runs `inject-links.js`, so the map stays up to date without manual editing. Could add an "update my info" button in each popup that pre-fills the form with that person's current data.
- Filter/search by city, study abroad country, or field of work.

---

## Potential ideas

- **Tutoring page**
- Secret password to enter rest of website (dogwater fun pages lol)
- Web app practice
- Cooking/food blog (could also easily be Instagram but more niche)
- Lifting content — hosting videos might be a pain though (YouTube + API, or just stick with Instagram)
