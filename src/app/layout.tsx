import { ClerkProvider } from "@clerk/nextjs";
import Navbar from '../app/components/Navbar'; // Adjust path if needed
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <html lang="en">
        <body suppressHydrationWarning className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="p-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
