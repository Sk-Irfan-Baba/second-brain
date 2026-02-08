// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/* -------------------- Public Routes -------------------- */

const isPublicRoute = createRouteMatcher([
  "/",
  "/public(.*)",
  "/api/health",
]);

/* -------------------- Middleware -------------------- */

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return;
  }

  const session = await auth();

  if (!session.userId) {
    // Redirects to Clerk sign-in automatically
    return session.redirectToSignIn();
  }
});

/* -------------------- Config -------------------- */

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)",
  ],
};
