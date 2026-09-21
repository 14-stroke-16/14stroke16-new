# 14stroke16

Community diary — fashion, art, culture. A Next.js site backed by Contentful.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Contentful · Vercel

See [ARCHITECTURE.md](./ARCHITECTURE.md) for structure, data flow, and conventions.

## Local development

```bash
npm install
# create .env.local with the Contentful keys below
npm run dev
```

Open http://localhost:3000.

## Environment variables

Create `.env.local` (git-ignored) with:

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_KEY=
CONTENTFUL_PREVIEW_ACCESS_KEY=
CONTENTFUL_PREVIEW_SECRET=
CONTENTFUL_ENVIRONMENT=
```

The same variables are configured in the Vercel project (Production + Preview).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Content preview

Editors preview unpublished Contentful entries via Next.js draft mode:

```
/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&entryId={entry.sys.id}&slug={entry.fields.slug}
```

`/api/draft/disable` exits preview mode.
