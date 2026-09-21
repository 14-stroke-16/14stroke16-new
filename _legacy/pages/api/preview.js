export default async function handler(req, res) {
  const { secret, entryId, slug } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !entryId || !slug) {
    console.error("Invalid token or missing parameters");
    return res
      .status(401)
      .json({ message: "Invalid token or missing parameters" });
  }

 
  const url = `https://preview.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/${entryId}?access_token=${process.env.CONTENTFUL_PREVIEW_ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    const entry = await response.json();

   

    if (!response.ok) {
      console.error("Error fetching entry:", entry);
      return res
        .status(400)
        .json({ message: "Error fetching entry", error: entry });
    }

   
    const contentType = entry.sys.contentType.sys.id;

    res.setPreviewData({});

    if (contentType === "article") return res.redirect(`/articles/${slug}`);
    if (contentType === "community") return res.redirect(`/community/${slug}`);
    if (contentType === "events") return res.redirect(`/events/${slug}`);
    if (contentType === "galleryImage") return res.redirect(`/gallery/${slug}`);

    return res.status(400).json({ message: "Invalid content type" });
  } catch (err) {
    console.error("Error during Contentful request:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}