import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { Connect } from "@/dbConfig/dbconfig";
import Projects from "@/model/projectModel";
import { randomUUID } from "crypto";
import { syncProjectsFromGitHub } from "@/utils/githubSync";
import { getFromCache, setToCache, invalidateServerCache } from "@/utils/serverCache";

const res = NextResponse;

export async function POST(req: NextRequest) {
  await Connect();
  if (!req.body) {
    return res.json({ error: "No data provided" }, { status: 400 });
  }
  try {
    const data = await req.formData();
    const image: File = data.get("image") as unknown as File;
    const texts: string | null = data.get("newProject") as unknown as string;
    const body = JSON.parse(texts);

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename to avoid collisions
    const uniqueFilename = `${randomUUID()}-${image.name}`;
    const filePath = join(process.cwd(), "public", "images", uniqueFilename);

    // The URL that will be accessible in the browser:
    body.image = `/${uniqueFilename}`;

    const { textInputValue, textArea: description, checked, featured = true } = body;

    const {
      projectName: title,
      ProjectHeader: header,
      repoLink,
      demoLink,
    } = textInputValue;

    const technologies = checked.map((technology: { name: string }) => ({
      techName: technology.name,
    }));

    const newProject = new Projects({
      title,
      header,
      image: body.image,
      description,
      demoLink,
      repoLink,
      technologies,
      featured,
    });

    const savedProject = await newProject.save();

    if (savedProject.error) {
      return NextResponse.json({ error: savedProject.error }, { status: 400 });
    }

    // Save image file to disk
    await writeFile(filePath, new Uint8Array(buffer));

    // Invalidate server cache on mutation
    invalidateServerCache("projects");
    invalidateServerCache("tech");

    return NextResponse.json(
      {
        message: "Project added successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await Connect();

  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get("featured") === "true";
    const cacheKey = featuredOnly ? "projects:featured" : "projects:all";

    // 1. Check in-memory server cache (1 minute fresh)
    const cachedProjects = getFromCache<any[]>(cacheKey, 60000);
    if (cachedProjects) {
      return new NextResponse(JSON.stringify({ projects: cachedProjects }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      });
    }

    const count = await Projects.countDocuments();
    if (count === 0) {
      try {
        await syncProjectsFromGitHub();
      } catch (syncErr) {
        console.error("Auto initial sync error:", syncErr);
      }
    }

    const filter: any = {};
    if (featuredOnly) {
      filter.featured = true;
    }

    const projects = await Projects.find(filter).sort({ featured: -1, updatedAt: -1, _id: -1 }).lean();

    // Cache the result in memory
    setToCache(cacheKey, projects);

    return new NextResponse(JSON.stringify({ projects }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.json({ error: error.message }, { status: 500 });
  }
}
