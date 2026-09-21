# 14stroke16 — Architecture

Target stack for the rebranded site. This document is the reference for the migration
happening on the `dev` branch. The old site remains live and untouched on the original
repo/Vercel project until launch (target: March 2027).

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Contentful** (headless CMS) via a typed data layer
- **Vercel** hosting (Hobby during dev, Pro at launch)
- **Clerk** for staging authentication (added last)

## Directory structure

```
app/
  layout.tsx              root layout: fonts, GA4, Vercel Analytics, <html>/<body>, Header/Footer
  page.tsx                home
  not-found.tsx
  articles/page.tsx       + articles/[slug]/page.tsx
  community/page.tsx      + community/[slug]/page.tsx
  events/page.tsx         + events/[slug]/page.tsx
  gallery/page.tsx        + gallery/[slug]/page.tsx
  contact/page.tsx
  get-involved/page.tsx
  api/draft/route.ts      enable draftMode   (+ api/draft/disable/route.ts)
lib/
  contentful/
    client.ts             delivery + preview clients (single source of truth)
    types.ts              typed content models (Article, Event, Community, GalleryImage, Section union)
    articles.ts           getArticles / getArticleBySlug / getArticleSlugs
    events.ts community.ts gallery.ts
components/
  layout/                 Header (custom slide-in mobile nav), Footer
  cards/                  ArticleCard, EventsCard, CommunityCard, GalleryCard
  HomepageArticle.tsx     home page featured-image card
  ArticleAnalytics.tsx    article_view GA4 event (client component)
  PreviewBanner.tsx       draft-mode banner
  WebVitals.tsx           useReportWebVitals -> GA4
styles/
  globals.css
```

## Data fetching

- Server components fetch directly: `const articles = await getArticles()`.
- Static params for dynamic routes via `generateStaticParams()`.
- ISR preserved with `export const revalidate = 10`.
- One Contentful client module; no inline `createClient` in pages.

## Content model → routes

| Contentful content type | Route        |
| ----------------------- | ------------ |
| `article`               | `/articles`  |
| `community`             | `/community` |
| `events`                | `/events`    |
| `galleryImage`          | `/gallery`   |

`article.blogSections` is a polymorphic array modelled as a discriminated union:
`TextBlock | ImageBlock | QuoteBlock`.

## Preview / draft content

- Replaces the Pages-Router `pages/api/preview.js` + `context.preview`.
- `app/api/draft/route.ts` enables Next.js `draftMode()`; server components read
  `draftMode().isEnabled` to choose the Contentful **preview** client.
- `PreviewBanner` shown while draft mode is on.

## SEO / metadata

- Static `metadata` in `app/layout.tsx`; `generateMetadata()` per dynamic route
  (per-article titles + OpenGraph). Replaces repeated `<Head>` blocks.

## Analytics (ported from the old `_app.js`)

- **GA4** (`G-6G2T8LT049`) via `next/script` in the root layout.
- **Vercel Analytics** + **Speed Insights** in the root layout.
- Web Vitals via `useReportWebVitals` (`next/web-vitals`) → GA4, in `components/WebVitals.tsx`.
- Article-level GA event (`article_view` with author/slug/etc.) preserved on the article page.

## Dropped dependencies (replaced during rebrand)

- `react-burger-menu` → custom Tailwind mobile nav / Headless UI / shadcn `Sheet`.
- `react-masonry-css` → Tailwind `columns-*` utilities (or `react-photo-album` for the gallery).

## Auth (added LAST, after the rebrand)

- **Clerk**, gating **preview/staging only** — production stays fully public.
- Invite-only. Post-launch: restrict sign-up to the business email domain via a
  code-level check in middleware (free), not Clerk's paid production allowlist.
- Gating driven by a build-time flag so production ships without Clerk.

## Migration status

Migration to the new stack is **complete** (steps 1–7). Remaining work:

1. ✅ Scaffold: Next 15 / React 19 / TS, tooling, `app/` shell, root layout.
2. ✅ `lib/contentful/` typed data layer.
3. ✅ Articles (index + `[slug]`) reference pattern.
4. ✅ Remaining collections: events, community, gallery.
5. ✅ Static pages: home, contact, get-involved, not-found.
6. ✅ Preview (`draftMode`), metadata, analytics.
7. ✅ Delete legacy code, final cleanup.
8. ⏳ CSS rebrand layered onto the new markup.
9. ⏳ Clerk staging auth.
