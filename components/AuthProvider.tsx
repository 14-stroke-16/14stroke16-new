import { ClerkProvider } from "@clerk/nextjs";

// The ONLY place that imports Clerk's client. It is loaded via a flag-gated
// dynamic import in app/layout.tsx, so in the production build (where
// NEXT_PUBLIC_ENABLE_AUTH is unset) this module — and all of @clerk/nextjs —
// is dropped from the bundle entirely. Staging (Preview) is the only build
// that includes it.
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}
