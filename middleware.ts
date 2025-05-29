import { NextRequest, NextResponse } from "next/server";
const res = NextResponse;

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // const publicPath = path === "/admin?login";
  const privatePath =
    path === "/admin/home" ||
    path === "/admin/home/view/projects" ||
    path === "/admin/home/view/technologies" ||
    path === "/admin/home/view/certificate" ||
    path === "/admin/home/add/projects";
  path === "/admin/home/add/technologies" ||
    path === "/admin/home/add/certificate";

  const token = req.cookies.get("token")?.value || "";
  console.log(path);
  console.log(token);

  if (!token && privatePath) {
    return res.redirect(new URL("/admin/login", req.nextUrl));
  }

  // If there is a token and user visits /admin/login, redirect to /admin/home
  if (token && path === "/admin/login") {
    return res.redirect(new URL("/admin/home", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/admin/home", "/admin/login"],
};
