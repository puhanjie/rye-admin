import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, localePrefix, locales } from "./navigation";
import createMiddleware from "next-intl/middleware";
import { getAccessPath } from "./utils/route";

export default async function middleware(request: NextRequest) {
  const path = await getAccessPath(request);
  if (path) {
    return NextResponse.redirect(`${path}`);
  }

  return createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
  })(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
