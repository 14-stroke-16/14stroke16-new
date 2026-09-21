"use client";

import { SignIn } from "@clerk/nextjs";

// Loaded only on staging (via a flag-gated require in the sign-in route), so
// @clerk/nextjs never enters the production bundle.
export default function ClerkSignIn() {
  return <SignIn fallbackRedirectUrl="/" />;
}
