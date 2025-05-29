// /api/track/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Connect } from "@/dbConfig/dbconfig";
import Visit from "@/model/visitModel";

Connect();

export async function POST(req: Request) {
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
