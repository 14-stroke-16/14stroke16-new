/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve Contentful images straight from their CDN (resize + WebP) via a
    // custom loader, instead of the Next.js image optimizer.
    loader: "custom",
    loaderFile: "./lib/contentfulImageLoader.ts",
  },
};

export default nextConfig;
