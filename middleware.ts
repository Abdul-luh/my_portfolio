import { NextRequest, NextResponse } from "next/server";
const res = NextResponse;

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // const publicPath = path === "/admin?login";
  const privatePath =
    path === "/admin/home/view/projects" || path === "/admin/home/add/projects";

  const token = req.cookies.get("token")?.value || "";
  console.log(path);
  console.log(token);

  if (!token && privatePath) {
    return res.redirect(new URL("/admin/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/admin/home", "/admin/login"],
};
