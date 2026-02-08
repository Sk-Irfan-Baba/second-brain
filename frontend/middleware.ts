// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

/* -------------------- Public Routes -------------------- */

const isPublicRoute = createRouteMatcher([
  "/",
  "/public(.*)",
  "/api/health",
]);

/* -------------------- Middleware -------------------- */

export default clerkMiddleware((auth, req: NextRequest) => {
  if (isPublicRoute(req)) {
    return;
  }

  // Protect everything else
  auth().protect();
});

/* -------------------- Config -------------------- */

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next static files
     * - favicon
     */
    "/((?!_next|favicon.ico).*)",
  ],
};
