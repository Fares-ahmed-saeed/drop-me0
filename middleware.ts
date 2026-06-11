import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const token = request.cookies.get("token")?.value;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isProductsRoute = request.nextUrl.pathname.startsWith("/products");

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isProductsRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/products", "/products/:path*"],
};
