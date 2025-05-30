import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the cookie by setting it to empty and maxAge to 0
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/", // make sure path matches your cookie path
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}
