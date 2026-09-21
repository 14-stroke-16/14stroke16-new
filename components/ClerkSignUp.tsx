"use client";

import { SignUp } from "@clerk/nextjs";

// Loaded only on staging (via a flag-gated require in the sign-up route), so
// @clerk/nextjs never enters the production bundle.
export default function ClerkSignUp() {
  return <SignUp fallbackRedirectUrl="/" />;
}
