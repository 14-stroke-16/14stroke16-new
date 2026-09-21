import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WebVitals from "@/components/WebVitals";

const GA_MEASUREMENT_ID = "G-6G2T8LT049";

// Auth (Clerk) wraps the app ONLY on staging/preview. NEXT_PUBLIC_ENABLE_AUTH
// is set in Vercel's Preview scope only; it's inlined at build time, so in the
// production build the `if` is provably false and webpack drops this require —
// @clerk/nextjs never enters the production bundle.
type Wrapper = (props: { children: React.ReactNode }) => React.ReactNode;
let AuthProvider: Wrapper = ({ children }) => children;
if (process.env.NEXT_PUBLIC_ENABLE_AUTH === "true") {
  AuthProvider = require("@/components/AuthProvider").default as Wrapper;
}

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
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>

        {/* Google Analytics (GA4) */}
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
