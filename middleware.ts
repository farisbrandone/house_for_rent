import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req): void | Response | Promise<void | Response> => {
  console.log("PART MIDLEWARE");
  const { nextUrl } = req;

  const isAuthorized = !!req.auth;
  console.log(req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    console.log("PART MIDLEWARE isApiAuthRoute");
    return;
  }

  if (isAuthRoute) {
    if (isAuthorized) {
      console.log("PART MIDLEWARE isAuthRoute AND isAuthorized");
      return Response.redirect(
        "https://mamaisonalouer.com" /*new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)*/
      );
    }
    console.log("PART MIDLEWARE END isAuthRoute NOT isAuthorized");
    return;
  }

  if (!isAuthorized && !isPublicRoute) {
    console.log("PART MIDLEWARE !isAuthorized && !isPublicRoute");
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      console.log("PART MIDLEWARE nextUrl.search");
      callbackUrl += nextUrl.search;
    }

    console.log("PART MIDLEWARE encodedCallbackUrl ");
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  console.log("PART MIDLEWARE END ");
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
