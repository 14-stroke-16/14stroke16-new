import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WebVitals from "@/components/WebVitals";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
// Only load GA when an ID is configured AND this is a production build.
// This keeps localhost dev out of analytics; staging is separated by giving
// the staging deployment a different (or empty) NEXT_PUBLIC_GA_ID.
const gaEnabled =
  process.env.NODE_ENV === "production" && Boolean(GA_MEASUREMENT_ID);

const einaFont = localFont({
  src: [
    { path: "../public/fonts/Eina01-Bold.ttf", weight: "700" },
    {
      path: "../public/fonts/Eina01-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    { path: "../public/fonts/Eina01-Light.ttf", weight: "300" },
    {
      path: "../public/fonts/Eina01-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    { path: "../public/fonts/Eina01-Regular.ttf", weight: "400" },
    {
      path: "../public/fonts/Eina01-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    { path: "../public/fonts/Eina01-SemiBold.ttf", weight: "600" },
    {
      path: "../public/fonts/Eina01-SemiboldItalic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-einaFont",
});

export const metadata: Metadata = {
  title: {
    default: "14STROKE16",
    template: "%s | 14STROKE16",
  },
  description: "14STROKE16",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${einaFont.variable} bg-ivoryWhite font-sans`}>
        <Header />
        {children}
        <Footer />

        {/* Google Analytics (GA4) — production only, gated by NEXT_PUBLIC_GA_ID */}
        {gaEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
            <WebVitals />
          </>
        )}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
