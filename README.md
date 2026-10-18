# Benjamin Zhang — Personal Website

Personal portfolio site built with React, TypeScript, and Vite, with plain CSS and GSAP animations. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run lint` — lint with oxlint
- `npm run format` — format with Prettier

## Structure

```
src/components/   one component per page section
src/content/      all site text (edit here to change copy)
src/styles/       design tokens (palettes, type, spacing)
src/lib/          animation, smooth scroll, theme helpers
public/           images, favicon, share image
docs/             PRD, plan, copy deck
```

## Changing the palette

In dev (`npm run dev`), a **Palettes** panel in the bottom-right corner switches between the five 7:2:1 palettes. To make one permanent, change the default in `index.html` (`palette || 'yellow'`) and in `src/lib/theme.ts`. The panel is not included in production builds.
