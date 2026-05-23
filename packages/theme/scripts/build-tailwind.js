#!/usr/bin/env node
/**
 * Build script: generates Tailwind CSS integration files from src/tokens.json
 *
 * Outputs:
 *   dist/tailwind-preset.cjs  — CommonJS preset for Tailwind v3 (require())
 *   dist/tailwind-preset.mjs  — ESM preset for Tailwind v3 (import)
 *   dist/tailwind-v4.css      — CSS @theme block for Tailwind v4
 *
 * All color values reference --stella-* CSS custom properties so that
 * data-theme dark/light switches are automatically reflected in utilities.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const _require = createRequire(import.meta.url);

/** @type {import('../src/tokens.json')} */
const tokens = _require('../src/tokens.json');

// ---------------------------------------------------------------------------
// Helper: build a CSS variable reference from a dot-path array
// e.g. ['color', 'cosmos', '500'] → 'var(--stella-color-cosmos-500)'
// Mirrors the flattenToCSSVars logic in src/index.ts
// ---------------------------------------------------------------------------
function cssVar(parts) {
  return `var(--stella-${parts.join('-')})`;
}

// ---------------------------------------------------------------------------
// Helper: recursively map an object's leaf values to CSS variable references
// ---------------------------------------------------------------------------
function toCSSVarMap(obj, pathParts) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const parts = [...pathParts, key];
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = toCSSVarMap(value, parts);
    } else {
      result[key] = cssVar(parts);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Build Tailwind v3 preset config object
// ---------------------------------------------------------------------------
const { color, typography, spacing, borderRadius, shadow, transition } = tokens;

const preset = {
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────────────────
      // Dynamically derived from tokens.color so new palettes are picked up
      // automatically without manual enumeration.
      colors: Object.fromEntries(
        Object.keys(color).map((paletteName) => [
          paletteName,
          toCSSVarMap(color[paletteName], ['color', paletteName]),
        ]),
      ),

      // ── Typography ───────────────────────────────────────────────────────
      // Font families: wrap in array so Tailwind emits a single font-family declaration
      fontFamily: Object.fromEntries(
        Object.keys(typography.fontFamily).map((key) => [
          key,
          [cssVar(['typography', 'fontFamily', key])],
        ]),
      ),
      fontSize: toCSSVarMap(typography.fontSize, ['typography', 'fontSize']),
      fontWeight: toCSSVarMap(typography.fontWeight, ['typography', 'fontWeight']),
      lineHeight: toCSSVarMap(typography.lineHeight, ['typography', 'lineHeight']),
      letterSpacing: toCSSVarMap(typography.letterSpacing, ['typography', 'letterSpacing']),

      // ── Spacing ──────────────────────────────────────────────────────────
      spacing: toCSSVarMap(spacing, ['spacing']),

      // ── Border Radius ────────────────────────────────────────────────────
      borderRadius: toCSSVarMap(borderRadius, ['borderRadius']),

      // ── Shadows ──────────────────────────────────────────────────────────
      boxShadow: toCSSVarMap(shadow, ['shadow']),

      // ── Transition easing ────────────────────────────────────────────────
      // Note: transition.fast/base/slow are shorthand ("100ms ease-out") and
      // cannot be split into duration + easing, so they are intentionally
      // excluded. Use Tailwind's built-in duration utilities alongside
      // transitionTimingFunction from this preset.
      transitionTimingFunction: toCSSVarMap(transition.easing, ['transition', 'easing']),
    },
  },
};

// ---------------------------------------------------------------------------
// Write Tailwind v3 preset (CJS + ESM)
// ---------------------------------------------------------------------------
mkdirSync(join(root, 'dist'), { recursive: true });

const serialized = JSON.stringify(preset, null, 2);

writeFileSync(
  join(root, 'dist', 'tailwind-preset.cjs'),
  `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${serialized};\n`,
  'utf-8',
);

writeFileSync(
  join(root, 'dist', 'tailwind-preset.mjs'),
  `/** @type {import('tailwindcss').Config} */\nexport default ${serialized};\n`,
  'utf-8',
);

// ---------------------------------------------------------------------------
// Build Tailwind v4 @theme block
// Maps the token categories currently supported by this script to Tailwind v4
// CSS variables in the appropriate namespaces (--color-*, --font-*,
// --spacing-*, etc.). Not every branch in src/tokens.json is emitted here.
// Requires @stella-ds/theme/css to be imported first to set --stella-* vars.
// ---------------------------------------------------------------------------
const v4Lines = ['/* Stella DS — Tailwind v4 @theme mapping */'];
v4Lines.push(
  '/* Import this file AFTER @stella-ds/theme/css in your global CSS. */',
);
v4Lines.push('');
v4Lines.push('@theme {');

// Colors
for (const [paletteName, shades] of Object.entries(color)) {
  for (const shade of Object.keys(shades)) {
    const stellaVar = `--stella-color-${paletteName}-${shade}`;
    const twVar = `--color-${paletteName}-${shade}`;
    v4Lines.push(`  ${twVar}: var(${stellaVar});`);
  }
  v4Lines.push('');
}

// Font family
for (const key of Object.keys(typography.fontFamily)) {
  v4Lines.push(`  --font-${key}: var(--stella-typography-fontFamily-${key});`);
}
v4Lines.push('');

// Font size
for (const key of Object.keys(typography.fontSize)) {
  v4Lines.push(`  --text-${key}: var(--stella-typography-fontSize-${key});`);
}
v4Lines.push('');

// Font weight
for (const key of Object.keys(typography.fontWeight)) {
  v4Lines.push(`  --font-weight-${key}: var(--stella-typography-fontWeight-${key});`);
}
v4Lines.push('');

// Line height
for (const key of Object.keys(typography.lineHeight)) {
  v4Lines.push(`  --leading-${key}: var(--stella-typography-lineHeight-${key});`);
}
v4Lines.push('');

// Letter spacing
for (const key of Object.keys(typography.letterSpacing)) {
  v4Lines.push(`  --tracking-${key}: var(--stella-typography-letterSpacing-${key});`);
}
v4Lines.push('');

// Spacing
for (const key of Object.keys(spacing)) {
  v4Lines.push(`  --spacing-${key}: var(--stella-spacing-${key});`);
}
v4Lines.push('');

// Border radius
for (const key of Object.keys(borderRadius)) {
  v4Lines.push(`  --radius-${key}: var(--stella-borderRadius-${key});`);
}
v4Lines.push('');

// Box shadow
for (const key of Object.keys(shadow)) {
  v4Lines.push(`  --shadow-${key}: var(--stella-shadow-${key});`);
}
v4Lines.push('');

// Transition easing
for (const key of Object.keys(transition.easing)) {
  v4Lines.push(`  --ease-${key}: var(--stella-transition-easing-${key});`);
}

v4Lines.push('}');
v4Lines.push('');

writeFileSync(join(root, 'dist', 'tailwind-v4.css'), v4Lines.join('\n'), 'utf-8');

console.log('✅ tailwind-preset.cjs written');
console.log('✅ tailwind-preset.mjs written');
console.log('✅ tailwind-v4.css written');
