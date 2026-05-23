# @stella-ds/theme

Design tokens for the [Stella Design System](https://github.com/theta-prog/stella-ds).

Framework-agnostic — distributed as CSS custom properties (`--stella-*`) and a JSON token object.

## Installation

```bash
npm install @stella-ds/theme
# or
pnpm add @stella-ds/theme
```

## Usage

### CSS (recommended)

```ts
import '@stella-ds/theme/css'
```

Injects all `--stella-*` CSS custom properties into `:root`.

The compiled CSS also includes official scoped themes:

```tsx
<div data-theme="dark">...</div>
<div data-theme="light">...</div>
```

`light` overrides the surface, text, accent, and shadow tokens; `dark` matches the default root token set.

### Tailwind CSS v3

Add the preset to your `tailwind.config.js`. The preset registers the Stella token
subsets that are exposed through Tailwind `theme.extend` utilities using
`var(--stella-*)` CSS variable references, so `data-theme` dark/light switches are
automatically reflected in those utilities.

```js
// tailwind.config.js
const stellaPreset = require('@stella-ds/theme/tailwind');

module.exports = {
  presets: [stellaPreset],
  // your config...
};
```

Or with ESM (`tailwind.config.mjs`):

```js
import stellaPreset from '@stella-ds/theme/tailwind';

export default {
  presets: [stellaPreset],
};
```

Make sure `@stella-ds/theme/css` is imported in your global CSS (or call
`injectCSSVars()` once) so the `--stella-*` variables are available at runtime.

```css
/* globals.css */
@import '@stella-ds/theme/css';
```

**Available utilities (examples):**

```html
<p class="text-cosmos-500 font-semibold text-lg">Hello</p>
<div class="bg-void-surface rounded-lg shadow-md p-4">Card</div>
<button class="bg-cosmos-500 hover:bg-cosmos-600 text-starlight-primary">CTA</button>
```

> **Note:** Colors defined as plain CSS variable references (`var(--stella-*)`) do not
> support Tailwind's opacity modifier syntax (`text-cosmos-500/80`) or `text-opacity-*`
> utilities. Use an arbitrary value (`text-[rgb(91_91_240/0.8)]`) instead.

### Tailwind CSS v4

Import the `@theme` mapping file **after** `@stella-ds/theme/css` in your
global CSS. Tailwind v4 picks up the `@theme` block and generates utilities
from the `--stella-*` CSS variables.

```css
/* globals.css */
@import 'tailwindcss';
@import '@stella-ds/theme/css';       /* sets --stella-* CSS variables    */
@import '@stella-ds/theme/tailwind-v4'; /* maps them into Tailwind's @theme */
```

### JavaScript / TypeScript

```ts
import { tokens } from '@stella-ds/theme'
// → raw token object

import { cssVariables, injectCSSVars } from '@stella-ds/theme'
// cssVariables: flat { '--stella-color-cosmos-500': '#6366f1', ... }
// injectCSSVars(): programmatically injects into document.documentElement
```

## Token Categories

| Category | Description |
|---|---|
| `color` | Celestial color palettes (`cosmos`, `nebula`, `aurora`, `nova`, `void`, `starlight`) |
| `typography` | Font families, sizes, weights, line heights |
| `spacing` | Spacing scale |
| `borderRadius` | Border radius presets |
| `shadow` | Box shadow levels |
| `transition` | Duration and easing |

## Color Palettes

- `cosmos` — primary / interactive (indigo)
- `nebula` — accent (purple)
- `aurora` — accent (cyan)
- `nova` — success / positive (emerald)
- `void` — backgrounds (`base` / `surface` / `overlay` / `muted`)
- `starlight` — text (`primary` / `secondary` / `disabled`)

## Links

- [Component Library — @stella-ds/react](https://www.npmjs.com/package/@stella-ds/react)
- [GitHub](https://github.com/theta-prog/stella-ds)

## License

MIT
