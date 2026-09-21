# 14stroke16 — Architecture

High-level overview of the app.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Contentful** (headless CMS) via a typed data layer
- **Vercel** hosting

## Structure

- `app/` — App Router routes (home, content collections, static pages).
- `lib/contentful/` — a single typed data layer (client + typed models + fetch helpers); pages fetch through it rather than creating clients inline.
- `components/` — layout and card components.
- `styles/` — global styles.

## Data fetching

- Server components fetch content directly in the data layer.
- Dynamic routes use `generateStaticParams`.
- ISR keeps pages fresh (`export const revalidate`).
- Unpublished content is viewable through Next.js draft mode.

## SEO

- Metadata API (static `metadata` + `generateMetadata` per dynamic route).

## Analytics

- Vercel Analytics + Speed Insights, plus Web Vitals reporting.
