// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/submit(.*)",
  "/settings(.*)",
  "/api/factories(.*)",
  "/api/inspections(.*)",
  "/api/inspection-types(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const userAuth = auth(); 
  if (isProtectedRoute(req)) {
    auth.protect(); 
  }
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
