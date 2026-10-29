// Player-visible text shipped as data must be translatable (docs ADR 0008, "Player-visible text in data
// and APIs"):
// - Arffornia JSON files (config/<target>/*.json): text fields are localized objects { "en": ..., "fr": ... };
// - KubeJS scripts never hold player text: they use Text.translatable(key) with keys in
//   kubejs/assets/<namespace>/lang/{en_us,fr_fr}.json, and no "§" colour codes;
// - the launcher and server copies of the KubeJS client scripts and assets stay identical.
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
const CONFIG = path.join(ROOT, "config");
const LOCALES = ["en", "fr"];
const MC_LOCALES = ["en_us", "fr_fr"];
/** Field names that hold player-visible text in Arffornia's own JSON files. */
const TEXT_FIELDS = new Set(["badge", "customDescription", "description", "title", "message", "text", "label", "tooltip"]);
const KUBEJS_COPIES = ["launcher", "server"].map((t) => path.join(CONFIG, t, "storage", "kubejs"));

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, "utf8").replace(/^﻿/, ""));
}

const rel = (p: string) => path.relative(ROOT, p);

/** Arffornia-owned JSON: the files directly under config/<target>/ (not third-party configs in storage/). */
function arfforniaJsonFiles(): string[] {
  return fs
    .readdirSync(CONFIG, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) =>
      fs
        .readdirSync(path.join(CONFIG, d.name))
        .filter((f) => f.endsWith(".json"))
        .map((f) => path.join(CONFIG, d.name, f))
    );
}

/** Returns "problem" strings for text fields that are not complete localized objects. */
export function checkLocalizedFields(value: unknown, where: string): string[] {
  const problems: string[] = [];
  const visit = (node: unknown, at: string) => {
    if (Array.isArray(node)) {
      node.forEach((child, i) => visit(child, `${at}[${i}]`));
      return;
    }
    if (!node || typeof node !== "object") return;
    for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
      const here = `${at}.${key}`;
      if (TEXT_FIELDS.has(key)) {
        if (typeof child === "string") {
          problems.push(`${here}: plain string "${child}", use { "en": ..., "fr": ... }`);
          continue;
        }
        if (child && typeof child === "object" && !Array.isArray(child)) {
          for (const locale of LOCALES) {
            const text = (child as Record<string, unknown>)[locale];
            if (typeof text !== "string" || text.trim() === "") problems.push(`${here}.${locale}: missing or empty`);
          }
          continue;
        }
      }
      visit(child, here);
    }
  };
  visit(value, where);
  return problems;
}

/** Literal player text in a KubeJS script (tooltips, chat, Text helpers) or a "§" colour code. */
export function checkScript(source: string, where: string): string[] {
  const problems: string[] = [];
  const lines = source.split(/\r?\n/);
  const patterns: [RegExp, string][] = [
    [/§/, "section-sign colour code, use .green()/.color() on a Text"],
    [/\bText\.(?:of|string|literal|red|green|blue|gold|yellow|aqua|gray|white|black|darkRed|darkGreen|darkBlue|darkAqua|darkPurple|lightPurple|darkGray)\(\s*["'`][^"'`]*\p{L}/u, "literal text in a Text helper, use Text.translatable(key)"],
  ];
  // Last string argument of a tooltip/chat call, e.g. event.add("mod:item", "Some words").
  const textCall = /\.(?:add|insert|tell|setStatusMessage|displayName)\(\s*(?:[^,()]+,\s*)?(["'`])((?:(?!\1).)*)\1\s*\)/gu;
  lines.forEach((line, i) => {
    if (/^\s*\/\//.test(line)) return;
    for (const [re, why] of patterns) if (re.test(line)) problems.push(`${where}:${i + 1}: ${why}`);
    for (const m of line.matchAll(textCall)) {
      // Words separated by spaces are text; ids and tags ("minecraft:oak_log", "#c:ingots") are not.
      if (/\p{L}+\s+\p{L}/u.test(m[2])) problems.push(`${where}:${i + 1}: literal player text, use Text.translatable(key)`);
    }
  });
  return problems;
}

function langFiles(kubejs: string): Map<string, Record<string, Record<string, string>>> {
  // namespace -> locale -> entries
  const byNamespace = new Map<string, Record<string, Record<string, string>>>();
  for (const file of walk(path.join(kubejs, "assets"))) {
    const m = /assets[\\/]([^\\/]+)[\\/]lang[\\/]([a-z_]+)\.json$/.exec(file);
    if (!m) continue;
    const entry = byNamespace.get(m[1]) ?? {};
    entry[m[2]] = readJson(file) as Record<string, string>;
    byNamespace.set(m[1], entry);
  }
  return byNamespace;
}

describe("player-visible text in Provisioning data", () => {
  it("text fields of Arffornia JSON files are localized objects with en and fr", () => {
    const files = arfforniaJsonFiles();
    expect(files.map(rel)).toContain(path.join("config", "launcher", "featuredShaders.json"));
    const problems = files.flatMap((f) => checkLocalizedFields(readJson(f), rel(f)));
    expect(problems).toEqual([]);
  });

  it.each(KUBEJS_COPIES.map((k) => [rel(k), k]))("%s scripts hold no literal player text", (_name, kubejs) => {
    const scripts = walk(kubejs).filter((f) => f.endsWith(".js"));
    expect(scripts.length).toBeGreaterThan(0);
    const problems = scripts.flatMap((f) => checkScript(fs.readFileSync(f, "utf8"), rel(f)));
    expect(problems).toEqual([]);
  });

  it.each(KUBEJS_COPIES.map((k) => [rel(k), k]))("%s lang files we add exist in en_us and fr_fr with the same keys", (_name, kubejs) => {
    const problems: string[] = [];
    for (const [namespace, locales] of langFiles(kubejs)) {
      // en_us-only files override third-party mods' English text; French players keep the mod's own fr_fr.
      if (!locales.fr_fr) continue;
      for (const locale of MC_LOCALES) {
        if (!locales[locale]) problems.push(`${namespace}: missing ${locale}.json`);
      }
      const keys = (l: string) => Object.keys(locales[l] ?? {}).sort();
      if (JSON.stringify(keys("en_us")) !== JSON.stringify(keys("fr_fr"))) problems.push(`${namespace}: en_us and fr_fr keys differ`);
      for (const locale of MC_LOCALES) {
        for (const [key, value] of Object.entries(locales[locale] ?? {})) {
          if (typeof value !== "string" || value.trim() === "") problems.push(`${namespace}/${locale}: empty ${key}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it.each(KUBEJS_COPIES.map((k) => [rel(k), k]))("%s: every Text.translatable key exists in en_us and fr_fr", (_name, kubejs) => {
    const all: Record<string, Set<string>> = { en_us: new Set(), fr_fr: new Set() };
    for (const locales of langFiles(kubejs).values()) {
      for (const locale of MC_LOCALES) Object.keys(locales[locale] ?? {}).forEach((k) => all[locale].add(k));
    }
    const missing: string[] = [];
    for (const file of walk(kubejs).filter((f) => f.endsWith(".js"))) {
      for (const m of fs.readFileSync(file, "utf8").matchAll(/Text\.translatable\(\s*["'`]([^"'`$]+)["'`]/g)) {
        for (const locale of MC_LOCALES) if (!all[locale].has(m[1])) missing.push(`${rel(file)}: ${m[1]} missing in ${locale}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("launcher and server KubeJS client scripts and assets are identical", () => {
    const [launcher, server] = KUBEJS_COPIES;
    for (const sub of ["client_scripts", "assets"]) {
      const files = (root: string) => walk(path.join(root, sub)).map((f) => path.relative(root, f)).sort();
      expect(files(server)).toEqual(files(launcher));
      for (const f of files(launcher)) {
        expect(fs.readFileSync(path.join(server, f)).equals(fs.readFileSync(path.join(launcher, f)))).toBe(true);
      }
    }
  });
});

describe("guards catch regressions", () => {
  it("flags plain-string text fields and incomplete localized objects", () => {
    expect(checkLocalizedFields({ featured: [{ badge: "Recommended" }] }, "f")).toHaveLength(1);
    expect(checkLocalizedFields({ featured: [{ badge: { en: "Recommended" } }] }, "f")).toEqual(["f.featured[0].badge.fr: missing or empty"]);
    expect(checkLocalizedFields({ featured: [{ badge: { en: "A", fr: "B" } }] }, "f")).toEqual([]);
    expect(checkLocalizedFields({ mods: [{ displayName: "Create" }] }, "f")).toEqual([]);
  });

  it("flags literal tooltips, Text helpers and colour codes in scripts", () => {
    expect(checkScript(`event.add("stellaris:fuel_refinery", "Only accepts Stellaris's Oil.")`, "s")).toHaveLength(1);
    expect(checkScript("event.add('x:y', `§aⓘ Use it §f`)", "s").length).toBeGreaterThan(0);
    expect(checkScript(`event.add("x:y", Text.green("Only accepts oil"))`, "s")).toHaveLength(1);
    expect(checkScript(`event.add("x:y", Text.translatable("tooltip.kubejs.x").green())`, "s")).toEqual([]);
    expect(checkScript(`event.add("minecraft:logs", "minecraft:oak_log")`, "s")).toEqual([]);
    expect(checkScript(`// event.add("x:y", "Old text here")`, "s")).toEqual([]);
  });
});
