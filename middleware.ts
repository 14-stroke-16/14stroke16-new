import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Auth is enabled ONLY where this build-time flag is set (Vercel Preview scope).
// Production and local dev leave it unset, so Clerk never runs there, no Clerk
// keys are required, and the public site ships without any auth.
const AUTH_ENABLED = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

// The in-app auth pages must stay public, or gating them would loop.
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const gatedMiddleware = clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId } = await auth();
  if (!userId) {
    // Redirect to the IN-APP sign-in page (same origin), not the hosted
    // Account Portal — so the post-sign-in redirect back to the app is
    // same-origin and actually works on the dev instance.
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // ── Post-launch: restrict access to the business email domain ───────────
  // Enforce the allowlist in code (free) instead of Clerk's paid production
  // allowlist once the domain is finalized:
  //
  // const { sessionClaims } = await auth();
  // const email = (sessionClaims?.email as string | undefined) ?? "";
  // if (!email.endsWith("@yourdomain.com")) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }
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
