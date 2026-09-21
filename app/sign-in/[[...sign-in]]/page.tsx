// In-app sign-in page (staging only). The Clerk UI is behind a flag-gated
// require so @clerk/nextjs is dropped from the production build; on production
// (auth off) this route renders nothing.
export default function SignInPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_AUTH === "true") {
    const ClerkSignIn = require("@/components/ClerkSignIn").default;
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <ClerkSignIn />
      </div>
    );
  }
  return null;
}
