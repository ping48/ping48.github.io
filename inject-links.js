// inject-links.js
// Reads links.json (gitignored), base64-encodes each URL,
// and patches the li/ig fields in gilman-tech-map.html.
//
// Usage: node inject-links.js

const fs = require('fs');

const LINKS_FILE = 'links.json';
const HTML_FILE = 'gilman-tech-map.html';

if (!fs.existsSync(LINKS_FILE)) {
  console.log(`No ${LINKS_FILE} found — nothing to inject.`);
  console.log(`Create ${LINKS_FILE} using links.template.json as a starting point.`);
  process.exit(0);
}

const links = JSON.parse(fs.readFileSync(LINKS_FILE, 'utf8'));
let html = fs.readFileSync(HTML_FILE, 'utf8');
let injected = 0;

for (const { name, linkedin, instagram } of links) {
  if (!name) continue;

  const li = linkedin ? Buffer.from(linkedin).toString('base64') : '';
  const ig = instagram ? Buffer.from(instagram).toString('base64') : '';

  const nameEscaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockRe = new RegExp(`({[^{}]*?name:\\s*"${nameEscaped}"[^{}]*?})`, 's');

  let matched = false;
  html = html.replace(blockRe, (block) => {
    matched = true;
    block = block.replace(/li:\s*"[^"]*"/, `li: "${li}"`);
    block = block.replace(/ig:\s*"[^"]*"/, `ig: "${ig}"`);
    return block;
  });

  if (matched) injected++;
  else console.warn(`  Warning: no match found for "${name}" — check spelling matches the HTML exactly.`);
}

fs.writeFileSync(HTML_FILE, html, 'utf8');
console.log(`Done. Updated ${injected} of ${links.length} entr${links.length === 1 ? 'y' : 'ies'} in ${HTML_FILE}.`);
