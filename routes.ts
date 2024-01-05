/**
 * Route that can be access without login
 * @type{string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification"
];

/**
 * Authentication route
 * If user already loggen in, redirect to setttings page
 * @type{string[]}
 */
export const authRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password"
];

/**
 * Prefix for API authentication routes
 * @type{string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after login
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * Default redirect path after logout
 * @type{string}
 */
export const DEFAULT_LOGOUT_REDIRECT = "/auth/sign-in";