// src/app/sign-in/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn
        redirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
            card: "shadow-lg p-6 bg-white rounded-lg",
          },
        }}
      />
    </div>
  );
}