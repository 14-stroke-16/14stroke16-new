import type { Document } from "@contentful/rich-text-types";

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

/* ---- article.blogSections: a polymorphic list of linked entries ---- */

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

export type ArticleSection = TextBlock | ImageBlock | QuoteBlock;

export const isTextBlock = (s: ArticleSection): s is TextBlock =>
  s.sys.contentType.sys.id === "textBlock";
export const isImageBlock = (s: ArticleSection): s is ImageBlock =>
  s.sys.contentType.sys.id === "image";
export const isQuoteBlock = (s: ArticleSection): s is QuoteBlock =>
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
  // detail view
  featuredImage?: ContentfulAsset;
  featuredImageAltTag?: string;
  credits?: Document;
  blogSections?: ArticleSection[];
  // list / card view
  thumbnail?: ContentfulAsset;
  thumbnailAltTag?: string;
  excerpt?: string;
}

export interface Article {
  sys: { id: string; createdAt: string };
  fields: ArticleFields;
}
