import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Auth is enabled ONLY where this build-time flag is set (Vercel Preview scope).
// Production and local dev leave it unset, so Clerk never runs there, no Clerk
// keys are required, and the public site ships without any auth.
const AUTH_ENABLED = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

const gatedMiddleware = clerkMiddleware(async (auth) => {
  // Require a signed-in user for every route on staging. Unauthenticated
  // visitors are redirected to Clerk's hosted sign-in (Account Portal).
  await auth.protect();
});

// When auth is disabled, export a pass-through so Clerk is never invoked.
export default AUTH_ENABLED ? gatedMiddleware : () => NextResponse.next();

export const config = {
  matcher: [
    // Run on all routes except Next internals and static files.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|gif|png|svg|ico|webp|woff2?|ttf|map)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
