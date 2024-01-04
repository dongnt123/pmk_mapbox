import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow user access api route every case
  if (isApiAuthRoute) return null;
  // If route is auth route, redirect to default page is user already logged in
  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return null;
  }
  // If user not login and access protected route, redirect to login page
  // Allow user access public routes without login
  if (!isLoggedIn && !isPublicRoute) {
    let callBackUrl = nextUrl.pathname;
    if (nextUrl.search) callBackUrl += nextUrl.search;
    const encodedCallBackUrl = encodeURIComponent(callBackUrl);
    return Response.redirect(new URL(`/auth/sign-in?callBackUrl=${encodedCallBackUrl}`, nextUrl))
  };
  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}