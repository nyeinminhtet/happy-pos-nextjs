export { default } from "next-auth/middleware";

export const config = { matcher: ["/backoffice", "/api/backoffice/:path*"] };
