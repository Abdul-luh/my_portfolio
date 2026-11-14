import { NextResponse } from "next/server";
import { syncProjectsFromGitHub } from "@/utils/githubSync";
import { invalidateServerCache } from "@/utils/serverCache";

export async function POST() {
  try {
    const result = await syncProjectsFromGitHub();
    invalidateServerCache();
    return NextResponse.json({
      ...result,
      message: `Successfully synced ${result.syncedCount} projects (${result.hostedCount} hosted on Vercel/web) and ${result.technologiesCount} technologies!`,
    });
  } catch (error: any) {
    console.error("Sync error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to sync projects" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await syncProjectsFromGitHub();
    invalidateServerCache();
    return NextResponse.json({
      ...result,
      message: `Synced ${result.syncedCount} projects and ${result.technologiesCount} technologies.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to sync" },
      { status: 500 }
    );
  }
}
