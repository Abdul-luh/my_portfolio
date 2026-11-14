import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import { Connect } from "@/dbConfig/dbconfig";
import Technology from "@/model/techModel";
import Projects from "@/model/projectModel";
import { getTechIcon } from "@/utils/techIcons";
import { getFromCache, setToCache, invalidateServerCache } from "@/utils/serverCache";

const res = NextResponse;

export async function POST(req: NextRequest) {
  await Connect();

  try {
    const data = await req.formData();
    const image: File | null = data.get("image") as unknown as File;
    const title: string = data.get("text") as unknown as string;

    if (!title) {
      return res.json({ error: "Technology title is required" }, { status: 400 });
    }

    let imagePath = "";
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image.name}`;
      const path = join(process.cwd(), "public", "images", "skills", filename);
      await writeFile(path, new Uint8Array(buffer));
      imagePath = `/images/skills/${filename}`;
    } else {
      imagePath = getTechIcon(title);
    }

    const techDoc = await Technology.findOneAndUpdate(
      { title: { $regex: new RegExp(`^${title.trim()}$`, "i") } },
      { title: title.trim(), image: imagePath },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    invalidateServerCache("tech");

    return res.json(
      {
        message: "Technology saved successfully",
        success: true,
        technology: techDoc,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return res.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await Connect();

  try {
    const cachedTech = getFromCache<any[]>("tech:featured", 60000);
    if (cachedTech) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          technologies: cachedTech,
          total: cachedTech.length,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // 1. Gather all technologies used in featured projects
    const featuredProjects = await Projects.find({
      $or: [{ featured: true }, { featured: { $exists: false } }],
    });

    const projectTechCounts: Record<string, number> = {};
    const techNameMap: Record<string, string> = {};

    for (const proj of featuredProjects) {
      if (Array.isArray(proj.technologies)) {
        for (const t of proj.technologies) {
          const rawName = t.techName?.trim();
          if (!rawName) continue;
          const key = rawName.toLowerCase();
          projectTechCounts[key] = (projectTechCounts[key] || 0) + 1;
          if (!techNameMap[key]) {
            techNameMap[key] = rawName;
          }
        }
      }
    }

    // 2. Sync to Technology collection so any new tech from featured projects is saved
    const existingTechs = await Technology.find({});
    const existingByLower: Record<string, any> = {};
    for (const et of existingTechs) {
      existingByLower[et.title.toLowerCase()] = et;
    }

    const resultTechs: Array<{
      _id: string;
      title: string;
      image: string;
      projectCount: number;
    }> = [];

    // Prioritize technologies currently used in featured projects
    for (const [lowerKey, count] of Object.entries(projectTechCounts)) {
      const originalName = techNameMap[lowerKey];
      let doc = existingByLower[lowerKey];

      if (!doc) {
        // Create in DB with matching icon
        const icon = getTechIcon(originalName);
        try {
          doc = await Technology.create({
            title: originalName,
            image: icon,
          });
          existingByLower[lowerKey] = doc;
        } catch {
          doc = {
            _id: lowerKey,
            title: originalName,
            image: icon,
          };
        }
      }

      resultTechs.push({
        _id: doc._id?.toString() || lowerKey,
        title: doc.title,
        image: doc.image || getTechIcon(doc.title),
        projectCount: count,
      });
    }

    // Sort by projectCount descending, then alphabetically
    resultTechs.sort((a, b) => {
      if (b.projectCount !== a.projectCount) {
        return b.projectCount - a.projectCount;
      }
      return a.title.localeCompare(b.title);
    });

    setToCache("tech:featured", resultTechs);

    return new NextResponse(
      JSON.stringify({
        success: true,
        technologies: resultTechs,
        total: resultTechs.length,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error: any) {
    console.error("Technologies GET error:", error);
    return res.json({ error: error.message }, { status: 500 });
  }
}
