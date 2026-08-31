import assert from "node:assert/strict";
import { access, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const output = new URL("../pages-dist/", import.meta.url);
const base = "/next-week-funeral/";
const origin = "https://gongmenglin126.github.io";
const html = await readFile(new URL("index.html", output), "utf8");
assert.equal(html.match(/<base\s+href="([^"]+)"\s*\/?>/)?.[1], base);
assert.ok(html.includes("<title>下周的葬礼</title>"));
const references = new Set();
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (match[1] !== base) references.add(match[1]);
}
for (const filename of await readdir(new URL("assets/", output))) {
  assert.ok(!filename.endsWith(".map"), "Do not publish source maps");
  const content = await readFile(new URL(`assets/${filename}`, output), "utf8");
  assert.doesNotMatch(content, /["'(]\/game\//, "A root-relative photo URL would break on Pages");
  for (const match of content.matchAll(/(?:\/next-week-funeral\/|\.\/)game\/[a-zA-Z0-9_.-]+/g)) references.add(match[0]);
}
for (const reference of references) {
  const url = new URL(reference, `${origin}${base}`);
  assert.equal(url.origin, origin);
  assert.ok(url.pathname.startsWith(base), `Outside repository path: ${reference}`);
  await access(new URL(url.pathname.slice(base.length), output));
}
for (const name of ["seaside-dinner.webp", "wuting-sea-wallpaper.webp", "inn-corridor-original.webp"]) {
  assert.ok([...references].some((reference) => reference.endsWith(`/game/${name}`)), `Missing photo: ${name}`);
}
const entries = await readdir(output);
assert.ok(!entries.some((name) => ["app", "docs", ".openai", ".env", "worker"].includes(name)), "Only static runtime files belong in the publish directory");
await writeFile(new URL(".nojekyll", output), "");
console.log(`Pages build verified: ${references.size} asset references resolve under ${base}; output ${path.basename(output.pathname.slice(0, -1))}.`);
