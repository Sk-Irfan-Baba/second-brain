// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/public(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
};
