// In-app sign-up page (staging only). The Clerk UI is behind a flag-gated
// require so @clerk/nextjs is dropped from the production build; on production
// (auth off) this route renders nothing.
export default function SignUpPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_AUTH === "true") {
    const ClerkSignUp = require("@/components/ClerkSignUp").default;
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <ClerkSignUp />
      </div>
    );
  }
  return null;
}
