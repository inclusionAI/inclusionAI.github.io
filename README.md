# inclusionAI Website

Official website for [inclusionAI](https://github.com/inclusionAI), built with [Docusaurus 3](https://docusaurus.io/).

## Prerequisites

- Node.js ≥ 20
- [pnpm](https://pnpm.io/) (used as the package manager)

## Quick Start

```bash
pnpm install
pnpm start
```

`pnpm start` launches a local dev server at `http://localhost:3000` with hot-reload.

## Available Commands

| Command                     | Description                             |
| --------------------------- | --------------------------------------- |
| `pnpm start`                | Start local dev server (English locale) |
| `pnpm start -- --locale zh` | Start dev server in Chinese locale      |
| `pnpm build`                | Production build (output in `build/`)   |
| `pnpm serve`                | Serve the production build locally      |
| `pnpm clear`                | Clear Docusaurus cache                  |
| `pnpm typecheck`            | Run TypeScript type-checking            |
| `pnpm write-translations`   | Extract i18n translation strings        |

## Adding a Blog Post

### 1. Create the post directory and file

```
blog/<post-slug>/index.mdx
```

### 2. Add required frontmatter

```yaml
---
title: "Your Post Title"
date: 2025-01-01
authors: [inclusionai]
tags: [Release, Insights]
---
```

**Frontmatter fields:**

| Field             | Required | Description                                       |
| ----------------- | -------- | ------------------------------------------------- |
| `title`           | Yes      | Post title (shown in listings and page `<title>`) |
| `date`            | Yes      | Publication date (`YYYY-MM-DD`)                   |
| `authors`         | Yes      | Author key(s) from `blog/authors.yml`             |
| `tags`            | No       | Tag list — certain tags control which site sections the post appears in (see below) |
| `draft`           | No       | Set `true` to hide from build output              |
| `custom_edit_url` | No       | Set `null` to hide the "Edit this page" link      |

### Tag Reference

Tags serve two purposes: they render as colored badges in the Blog listing and they route posts into dedicated sections on the [Research page](/research).

**Special routing tags** (case-insensitive):

| Tag         | Effect                                                                                |
| ----------- | ------------------------------------------------------------------------------------- |
| `Release`   | Post appears in the **Releases** section of the Research page (up to 5 most recent)   |
| `Landscape` | Post appears in the **Landscapes** section of the Research page (up to 5 most recent) |

**Badge color palette:**

| Tag               | Color  |
| ----------------- | ------ |
| `Release`         | Blue   |
| `Community`       | Green  |
| `Insights`        | Purple |
| `Tutorials`       | Amber  |
| `Best Practice`   | Amber  |
| *(anything else)* | Grey   |

> Tags are matched case-insensitively for routing. Use title-case (`Release`, `Landscape`) by convention to match the badge display.

### 3. Add a Chinese translation (optional)

Create the same file at:

```
i18n/zh/docusaurus-plugin-content-blog/<post-slug>/index.mdx
```

The Chinese version needs the same frontmatter; only the body content needs to be translated.

### 4. Including assets

Place images and other assets in the same directory as `index.mdx`:

```
blog/<post-slug>/
├── index.mdx
└── assets/
    └── figure1.png
```

Reference them with a relative path: `![Figure 1](./assets/figure1.png)`.

## Adding an Author

Edit `blog/authors.yml`:

```yaml
your-handle:
  name: Your Name
  title: Your Title
  url: https://github.com/your-handle
  image_url: https://github.com/your-handle.png
  email: you@example.com
```

## Math Support

KaTeX is enabled. Use standard LaTeX syntax:

- Inline: `$E = mc^2$`
- Block: `$$\sum_{i=1}^{n} x_i$$`

## i18n

The site ships with English (`en`, default) and Simplified Chinese (`zh`) locales.

To extract new translation strings after adding content:

```bash
pnpm write-translations --locale zh
```

## Deployment

The site is deployed to GitHub Pages via CI. The production build is triggered by pushing to `main`.

To build and preview locally:

```bash
pnpm build && pnpm serve
```
