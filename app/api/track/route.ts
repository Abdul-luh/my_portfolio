// /api/track/route.ts
import { NextResponse } from "next/server";
// import { headers } from "next/headers";
import { Connect } from "@/dbConfig/dbconfig";
import Visit from "@/model/visitModel";

export async function POST(req: Request) {
  await Connect();
  // Ensure DB connection is established before processing the request
  if (!req.body) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }

  const body = await req.json();
  const ip = req.headers.get("x-forwarded-for") || "Unknown";
  const visit = new Visit({
    page: body.page,
    device: body.screenSize,
    userAgent: req.headers.get("user-agent"),
    referrer: req.headers.get("referer"),
    ip,
    timestamp: new Date(),
  });

  await visit.save();

  return NextResponse.json({ success: true });
}

export async function GET() {
  await Connect();
  const visits = await Visit.find().sort({ timestamp: -1 }).limit(100).lean();
  return NextResponse.json({ visits });
}
