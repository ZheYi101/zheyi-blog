# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment and tooling

- Use `pnpm`, not npm/yarn/bun. `package.json` enforces this with `only-allow pnpm`.
- README documents Node.js >= 20 and pnpm >= 9.
- Formatting/linting uses Biome with tabs and double quotes; see `biome.json`.
- TypeScript path aliases are defined in `tsconfig.json` (`@/`, `@components/`, `@utils/`, `@i18n/`, etc.).

## Common commands

Run from the repository root:

```bash
pnpm install
pnpm dev
pnpm check
pnpm type-check
pnpm build
pnpm preview
pnpm format
pnpm lint
pnpm new-post <filename>
```

Notes:

- `pnpm build` runs `astro build && pagefind --site dist`, so production search index generation happens during build.
- `pnpm preview` is the correct way to validate search behavior; `src/components/Search.svelte` uses fake results in dev because Pagefind is not available under `astro dev`.
- `pnpm lint` is not read-only: it runs `biome check --write ./src` and may rewrite files.
- `pnpm format` only formats `./src`.
- There is no dedicated test runner configured in `package.json`. For validation, use `pnpm check`, `pnpm type-check`, and `pnpm build`.
- There is no single-test command because no unit/integration test framework is configured.

## High-level architecture

This repo is an Astro-based static blog derived from Fuwari, with most pages rendered from Markdown content collections and a small amount of client-side interactivity layered in via Svelte and Vue.

### Rendering stack

- `src/layouts/Layout.astro` is the outer document shell. It owns:
  - page metadata / OG tags / favicons
  - theme and hue bootstrapping from `localStorage`
  - Swup page-transition hooks
  - OverlayScrollbars initialization
  - PhotoSwipe image lightbox setup
- `src/layouts/MainGridLayout.astro` wraps most pages with the navbar, sidebar, banner area, footer, back-to-top control, and optional TOC.
- Page routes typically render inside `MainGridLayout` rather than directly in `Layout`.

### Content model

- Blog posts live in `src/content/posts/**`.
- Non-post content pages can come from `src/content/spec/**`; the about page is backed by `src/content/spec/about.md` and rendered by `src/pages/about.astro`.
- Collection schemas are defined in `src/content/config.ts`.
  - Post frontmatter fields include `title`, `published`, `updated`, `draft`, `description`, `image`, `tags`, `category`, and `lang`.
  - The schema also includes `prevTitle`, `prevSlug`, `nextTitle`, and `nextSlug`; these are filled in programmatically by `getSortedPosts()` rather than authored manually.
- `scripts/new-post.js` creates new Markdown posts under `src/content/posts/`, adds `.md` automatically, and supports nested paths.

### Routing and data flow

- `src/pages/[...page].astro` builds the homepage pagination from `getSortedPosts()`.
- `src/pages/posts/[...slug].astro` renders each post and calls `entry.render()` to get both the component content and heading metadata.
- `src/utils/content-utils.ts` is the main content aggregation layer:
  - filters out drafts only in production
  - sorts posts by `published` descending
  - injects previous/next post metadata into each post record
  - builds tag and category lists for widgets
- `src/pages/archive.astro` passes a post list into the Svelte archive UI.
- `src/components/ArchivePanel.svelte` filters posts on the client using `?tag=...`, `?category=...`, and `?uncategorized=true` query params.
- `src/pages/rss.xml.ts` generates the RSS feed from the same sorted post list and sanitizes rendered HTML.
- `src/pages/robots.txt.ts` emits robots.txt using `import.meta.env.SITE`.

### Markdown pipeline

The Markdown pipeline is heavily customized in `astro.config.mjs` and is one of the most important parts of the repo:

- Remark plugins:
  - math support
  - reading time (`src/plugins/remark-reading-time.mjs`)
  - excerpt extraction (`src/plugins/remark-excerpt.js`)
  - GitHub-style admonitions converted to directives
  - custom directive parsing (`src/plugins/remark-directive-rehype.js`)
  - sectionization
- Rehype plugins:
  - KaTeX rendering
  - heading slug generation and autolink anchors
  - custom component rendering for admonitions and GitHub cards
- Code blocks use `astro-expressive-code` with custom plugins under `src/plugins/expressive-code/`.

When working on post rendering, start with `astro.config.mjs`, `src/plugins/**`, and `src/components/misc/Markdown.astro`.

### Client-side islands and framework mix

The repo is mostly Astro, but interactive pieces are split across frameworks:

- Svelte is used for some interactive widgets, especially:
  - `src/components/Search.svelte`
  - `src/components/ArchivePanel.svelte`
  - `src/components/widget/DisplaySettings.svelte`
- Vue support is enabled, and `src/components/contest/Contest.vue` exists as a standalone interactive component.
- Astro integrations for both Svelte and Vue are configured in `astro.config.mjs`.

Before assuming a component is server-rendered only, check whether it is mounted with a client directive such as `client:only="svelte"`.

### Site configuration and i18n

- Global site/profile/license/navbar settings live in `src/config.ts`.
- The site language comes from `siteConfig.lang`; translations are resolved through `src/i18n/translation.ts` and `src/i18n/languages/*`.
- URL helpers are centralized in `src/utils/url-utils.ts`.
- Astro config sets `trailingSlash: "always"`; preserve that when generating links or routes.

## Search and indexing caveats

- Search UI lives in `src/components/Search.svelte`.
- Real search depends on Pagefind assets generated by `pnpm build`.
- `pagefind.yml` excludes KaTeX output and search-panel UI from indexing.
- Do not treat dev-mode search behavior as production behavior.

## Styling conventions

- Tailwind is the primary styling layer; `tailwind.config.cjs` scans Astro, TS, Svelte, Vue, and Markdown sources.
- PostCSS is configured in `postcss.config.mjs` with `postcss-import` and Tailwind nesting.
- Additional global styles live under `src/styles/**`.
- Biome intentionally excludes CSS files from its checked file set.

## Practical guidance for edits

- For site-wide behavior changes, check `src/layouts/Layout.astro` first; many runtime behaviors that look component-local are actually initialized there.
- For sidebar/archive/tag/category behavior, check `src/utils/content-utils.ts` and `src/utils/url-utils.ts` before editing UI components.
- For post metadata or frontmatter issues, check both `src/content/config.ts` and `scripts/new-post.js`.
- For markdown rendering issues, inspect `astro.config.mjs` and the custom plugins before changing page components.
- For search issues, validate with `pnpm build && pnpm preview`, not only `pnpm dev`.
