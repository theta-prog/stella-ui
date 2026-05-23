# @stella-ds/react

## 0.8.0

### Patch Changes

- Updated dependencies [5b2e498]
  - @stella-ds/theme@0.8.0

## 0.7.2

### Patch Changes

- dee2fd8: Fix carousel smart-align canScrollNext phantom true: disable trimSnaps containScroll and gate canScrollNext/Prev when all slides fit in viewport

## 0.7.1

### Patch Changes

- a6564e1: Fix carousel smart-align collapsing to single snap point when all slides fit in viewport, preventing phantom canScrollNext=true state

## 0.7.0

### Minor Changes

- eeb2630: Add CarouselDots component and autoplay support

  - CarouselDots: new compound component rendering pill-shaped dot indicators driven by Embla scroll-snap count; active dot expands to a pill shape
  - autoplay prop: automatically advances slides on a configurable interval (autoplayInterval, default 3000ms)
  - pauseOnHover prop: pauses autoplay on pointer enter and focus; resumes on leave/blur (default true)
  - Autoplay respects prefers-reduced-motion: reduce and stops cleanly when loop=false reaches the last snap
  - snapCount added to CarouselContext (api.scrollSnapList().length) for accurate dot rendering with slidesPerView > 1
  - autoplayInterval clamped to a minimum of 250ms to prevent tight-loop edge cases

## 0.6.1

### Patch Changes

- d2f4d3f: - Fix Carousel viewport edge bleed so two-up layouts no longer clip card borders, rounded corners, or shadows at the viewport edge.
  - Add regression coverage for two-up hoverable cards and exact-fit two-image layouts.
  - Keep the linked React and theme package versions aligned for the automated 0.6.1 release flow. The theme package has no runtime code changes in this patch.
- Updated dependencies [d2f4d3f]
  - @stella-ds/theme@0.6.1

## 0.6.0

### Minor Changes

- Add the `slidesPerView` Carousel prop for uniform multi-slide layouts, including fractional peek layouts.
- Expand Carousel docs and stories with inside image controls and public API examples.

### Patch Changes

- Updated dependencies
  - @stella-ds/theme@0.6.0

## 0.5.0

### Minor Changes

- db9bfdd: Add `Carousel` component powered by Embla Carousel. Supports looping and prev/next navigation. Fully accessible with ARIA live regions and keyboard support.

## 0.4.0

### Minor Changes

- Refresh the linked React and theme packages for the light-theme and typography update.

  - update the theme font tokens used for sans and display typography defaults
  - improve component runtime behavior for disabled asChild buttons and client-side header navigation
  - align the React package exports and build output for smoother ESM consumption

### Patch Changes

- Updated dependencies
  - @stella-ds/theme@0.4.0

## 0.3.2

### Patch Changes

- 2b176c5: Fix Storybook infinite loading caused by addon-docs/addon-a11y variable name collision; update void color token fallbacks across Toast, Tooltip, Dialog, and Select components; fix Google Fonts render-blocking load; align pnpm engine constraint with packageManager field
- Updated dependencies [2b176c5]
  - @stella-ds/theme@0.3.2

## 0.3.1

### Patch Changes

- 5259272: Add MCP usage guidelines, page composition patterns, npm publish support, and associated React updates

  - Add `guidelines` field to all components in MCP data for AI Do/Don't rules
  - Add `list_patterns` / `get_pattern` tools with 7 page composition patterns
  - Add `bin`, `files`, `keywords` for npm publishing as `@stella-ds/mcp`
  - Add guideline text matching to search tool
  - Update Heading default `family` from serif to sans
  - Adjust Dialog overlay styling
  - Update Switch shadow token

## 0.3.0

### Minor Changes

- feat(Text, Heading): add `family` prop for font-family selection

### Patch Changes

- feat: design refinement — remove AI-generic patterns for more intentional styling
- feat: add documentation site and AI tooling improvements
- 73557a4: add document and licence
- Updated dependencies
- Updated dependencies
- Updated dependencies [73557a4]
  - @stella-ds/theme@0.3.0

## 0.2.1

### Patch Changes

- f25ef48: add document and licence
- Updated dependencies [f25ef48]
  - @stella-ds/theme@0.2.1

## 0.2.0

### Minor Changes

- 747cbf6: Initial release of @stella-ds/react and @stella-ds/theme

### Patch Changes

- Updated dependencies [747cbf6]
  - @stella-ds/theme@0.2.0
