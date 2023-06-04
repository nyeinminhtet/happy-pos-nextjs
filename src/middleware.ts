export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/backoffice/:path*", "/api/backoffice/:path*"],
};
