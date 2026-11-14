// /api/track/route.ts
import { NextResponse } from "next/server";
import { Connect } from "@/dbConfig/dbconfig";
import Visit from "@/model/visitModel";

// Helper to check if an IP is an internal/developer IP or private range
function isDeveloperOrInternalIp(ip: string): boolean {
  if (!ip || ip === "Unknown") return true;
  const cleanIp = ip.trim();

  // Localhost IPv4 & IPv6
  if (
    cleanIp === "::1" ||
    cleanIp === "127.0.0.1" ||
    cleanIp === "localhost" ||
    cleanIp.startsWith("::ffff:127.0.0.1")
  ) {
    return true;
  }

  // Developer Linux / local ISP subnets (e.g. 105.113.*)
  if (cleanIp.startsWith("105.113.")) {
    return true;
  }

  // RFC1918 Private networks
  if (
    cleanIp.startsWith("10.") ||
    cleanIp.startsWith("192.168.") ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(cleanIp)
  ) {
    return true;
  }

  return false;
}

export async function POST(req: Request) {
  await Connect();

  // Check if admin is authenticated (cookie contains token)
  const cookieHeader = req.headers.get("cookie") || "";
  if (cookieHeader.includes("token=")) {
    return NextResponse.json({ success: true, ignored: "admin_user" });
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const rawIp = forwarded ? forwarded.split(",")[0].trim() : realIp || "Unknown";

  // Reject internal and developer IPs
  if (isDeveloperOrInternalIp(rawIp)) {
    return NextResponse.json({ success: true, ignored: "developer_ip" });
  }

  let body: { page?: string; screenSize?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Do not track admin routes
  if (body.page && body.page.startsWith("/admin")) {
    return NextResponse.json({ success: true, ignored: "admin_page" });
  }

  const visit = new Visit({
    page: body.page || "/",
    device: body.screenSize,
    userAgent: req.headers.get("user-agent"),
    referrer: req.headers.get("referer"),
    ip: rawIp,
    timestamp: new Date(),
  });

  await visit.save();
  return NextResponse.json({ success: true });
}

export async function GET() {
  await Connect();

  // Exclude localhost, developer IP subnets, and admin page visits
  const visits = await Visit.find({
    ip: {
      $nin: ["::1", "127.0.0.1", "Unknown"],
      $not: /^(105\.113\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/,
    },
    page: { $not: /^\/admin/ },
  })
    .sort({ timestamp: -1 })
    .limit(200)
    .lean();

  return NextResponse.json({ visits });
}

export async function DELETE(req: Request) {
  await Connect();

  let body: { ip?: string; purgeDeveloper?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    // If no body provided, purge developer records by default
    body = { purgeDeveloper: true };
  }

  let deletedCount = 0;

  if (body.ip) {
    const res = await Visit.deleteMany({ ip: body.ip });
    deletedCount = res.deletedCount || 0;
  } else if (body.purgeDeveloper) {
    const res = await Visit.deleteMany({
      $or: [
        { ip: { $in: ["::1", "127.0.0.1", "Unknown"] } },
        { ip: { $regex: "^105\\.113\\." } },
        { ip: { $regex: "^10\\." } },
        { ip: { $regex: "^172\\.(1[6-9]|2[0-9]|3[0-1])\\." } },
        { ip: { $regex: "^192\\.168\\." } },
        { page: { $regex: "^/admin" } },
      ],
    });
    deletedCount = res.deletedCount || 0;
  }

  return NextResponse.json({ success: true, deletedCount });
}
