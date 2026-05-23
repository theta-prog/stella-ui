# @stella-ds/theme

## 0.8.0

### Minor Changes

- 5b2e498: Add Tailwind CSS v3 preset and v4 @theme integration to @stella-ds/theme

## 0.6.1

### Patch Changes

- d2f4d3f: - Fix Carousel viewport edge bleed so two-up layouts no longer clip card borders, rounded corners, or shadows at the viewport edge.
  - Add regression coverage for two-up hoverable cards and exact-fit two-image layouts.
  - Keep the linked React and theme package versions aligned for the automated 0.6.1 release flow. The theme package has no runtime code changes in this patch.

## 0.6.0

### Minor Changes

- Release the official light theme token scope alongside the existing dark defaults.
- Generate scoped `[data-theme="dark"]` and `[data-theme="light"]` CSS variable blocks so ThemeProvider and Background can switch semantic tokens correctly.

## 0.4.0

### Minor Changes

- Refresh the light-theme and typography tokens.

  - update the theme font tokens used for sans and display typography defaults

## 0.3.2

### Patch Changes

- 2b176c5: Fix Storybook infinite loading caused by addon-docs/addon-a11y variable name collision; update void color token fallbacks across Toast, Tooltip, Dialog, and Select components; fix Google Fonts render-blocking load; align pnpm engine constraint with packageManager field

## 0.3.0

### Patch Changes

- feat: design refinement — remove AI-generic patterns for more intentional styling
- feat: add documentation site and AI tooling improvements
- 73557a4: add document and licence

## 0.2.1

### Patch Changes

- f25ef48: add document and licence

## 0.2.0

### Minor Changes

- 747cbf6: Initial release of @stella-ds/react and @stella-ds/theme
