"use client";

import { useEffect } from "react";

interface Props {
  title: string;
  author?: string;
  slug: string;
  articlePublishedDate?: string;
  readTime?: number;
}

// Sends an "article_view" GA4 event with Contentful metadata (author, etc.)
// so article performance can be sliced by author in analytics.
export default function ArticleAnalytics({
  title,
  author,
  slug,
  articlePublishedDate,
  readTime,
}: Props) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "article_view", {
      article_author: author || "Unknown",
      article_title: title,
      article_slug: slug,
      article_published_date: articlePublishedDate ?? null,
      article_read_time: readTime ?? null,
    });
  }, [title, author, slug, articlePublishedDate, readTime]);

  return null;
}
