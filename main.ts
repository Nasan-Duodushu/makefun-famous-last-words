// Famous Last Words at 1 Percent — the funniest possible last words a phone
// would say when its battery hits 1 percent. A single line of at most 199
// characters, submitted as plain text. Written to /output/entry.txt.
import { mkdirSync, writeFileSync } from 'node:fs';

const ENTRY = {
  text: 'Tell the charger I loved it. I go at 1% with 47 tabs open and no regrets — except the flashlight, which has been on since Tuesday.',
  maxChars: 199,
};

function validateLastWords(entry: typeof ENTRY): void {
  // Gate: 1-199 characters of UTF-8 text, a single line, no padding.
  const chars = [...entry.text].length;
  if (chars < 1 || chars > entry.maxChars) {
    throw new Error(`last words must be 1-${entry.maxChars} characters, got ${chars}`);
  }
  if (entry.text.includes('\n')) throw new Error('last words must be a single line');
  if (entry.text.trim() !== entry.text) throw new Error('last words must not be padded');
}

validateLastWords(ENTRY);
const outDir = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY.text, { encoding: 'utf8', mode: 0o644 });
