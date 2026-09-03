import { NextRequest, NextResponse } from "next/server";

const LANG_PATTERN = /^\/(fr|en)(\/|$)/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/fr";
    return NextResponse.redirect(url);
  }

  if (pathname === "/services" || pathname.startsWith("/services/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/fr#services";
    return NextResponse.redirect(url);
  }

  if (!LANG_PATTERN.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/fr${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon\\.svg|sitemap\\.xml|robots\\.txt).*)"],
};
