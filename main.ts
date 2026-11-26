// The Printer Finally Answers — make.fun entry
// u-mang-the-printer-finally-answers-8fbf0907
//
// Writes the office printer's comeback — one line, 164 characters — to
// /output/entry.txt. The printer speaks for itself: it translates its own
// cryptic error code, counts the sheets it has fed without complaint, and
// files the thumping away for later. Node 22, stdlib only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The comeback, in the machine's own voice: weary, literal, faintly
// passive-aggressive, with the flat logic of a device that has counted
// every sheet it has ever fed.
const COMEBACK =
  "Error 0xE3. Translation: you loaded the paper wrong again. I have fed " +
  "12,847 sheets without complaint; the thumping, however, has been noted " +
  "and will be remembered.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function checkLine(line: string): void {
  if (line.length < 1 || line.length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${line.length}`);
  }
  if (line.trim() !== line) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be exactly one line");
  }
}

checkLine(COMEBACK);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, COMEBACK, "utf8");

// Verify what actually landed on disk: read it back and run the same gate,
// so a stray newline or a partial write can never slip through silently.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== COMEBACK) {
  throw new Error("written entry does not match the comeback exactly");
}
checkLine(written);
console.log(`wrote ${COMEBACK.length} characters to ${OUT_FILE}`);
