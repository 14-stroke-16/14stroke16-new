import type { Document } from "@contentful/rich-text-types";

/** Generic Contentful entry wrapper used across content types. */
export interface Entry<TFields> {
  sys: { id: string; createdAt: string };
  fields: TFields;
}

/** Minimal shape of a Contentful asset (image) as used by this site. */
export interface ContentfulAsset {
  fields: {
    title?: string;
    description?: string;
    file: {
      url: string;
      details?: { image?: { width: number; height: number } };
    };
  };
}

/* ---- polymorphic content sections (article.blogSections, community.communitySection, gallery.galleryImages) ---- */

export interface TextBlock {
  sys: { contentType: { sys: { id: "textBlock" } } };
  fields: { textBlockText: string };
}

export interface ImageBlock {
  sys: { contentType: { sys: { id: "image" } } };
  fields: { image: ContentfulAsset; altText: string };
}

export interface QuoteBlock {
  sys: { contentType: { sys: { id: "quoteBlock" } } };
  fields: { quoteBlockText: string };
}

export type ContentSection = TextBlock | ImageBlock | QuoteBlock;

export const isTextBlock = (s: ContentSection): s is TextBlock =>
  s.sys.contentType.sys.id === "textBlock";
export const isImageBlock = (s: ContentSection): s is ImageBlock =>
  s.sys.contentType.sys.id === "image";
export const isQuoteBlock = (s: ContentSection): s is QuoteBlock =>
  s.sys.contentType.sys.id === "quoteBlock";

/* ---- article ---- */

export interface ArticleFields {
  title: string;
  slug: string;
  author?: string;
  plugSocket?: string;
  readTime?: number;
  articlePublishedDate?: string;
  introductionText?: string;
  featuredImage?: ContentfulAsset;
  featuredImageAltTag?: string;
  credits?: Document;
  blogSections?: ContentSection[];
  thumbnail?: ContentfulAsset;
  thumbnailAltTag?: string;
  excerpt?: string;
}
export type Article = Entry<ArticleFields>;

/* ---- events (content type: "events") ---- */

export interface EventFields {
  eventsTitle: string;
  slug: string;
  eventsThumbnail?: ContentfulAsset;
  eventDate?: string;
  eventLink?: string;
  eventDescription?: string;
}
export type EventItem = Entry<EventFields>;

/* ---- community (content type: "community") ---- */

export interface CommunityFields {
  communityTitle: string;
  slug: string;
  communityThumbnail?: ContentfulAsset;
  CommunityThumbnailAltTag?: string;
  communitySection?: ContentSection[];
  communityArticlePublishedDate?: string;
  communityReadTime?: number;
  communityAuthor?: string;
  communityPlugSocket?: string;
  communityIntroductionText?: string;
}
export type CommunityItem = Entry<CommunityFields>;

/* ---- gallery (content type: "galleryImage") ---- */

export interface GalleryFields {
  galleryImageTitle: string;
  slug: string;
  galleryThumbnail?: ContentfulAsset;
  galleryThumbnailAltTag?: string;
  galleryImages?: ContentSection[];
  galleryCredits?: string;
  googleDriveLink?: string;
}
export type GalleryItem = Entry<GalleryFields>;
