// import { File } from "buffer";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { Connect } from "@/dbConfig/dbconfig";
import Projects from "@/model/projectModel";
import { randomUUID } from "crypto"; // for unique filenames
// import { NextApiRequest } from "next";

const res = NextResponse;

export async function POST(req: NextRequest) {
  await Connect();
  // Ensure DB connection is established before processing the request
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
    const filePath = join(process.cwd(), "public", uniqueFilename);

    // The URL that will be accessible in the browser:
    body.image = `/${uniqueFilename}`;

    const { textInputValue, textArea: description, checked } = body;

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
      image: body.image, // Use URL path here
      description,
      demoLink,
      repoLink,
      technologies,
    });

    console.log(newProject);
    const savedProject = await newProject.save();

    if (savedProject.error)
      return NextResponse.json({ error: savedProject.error }, { status: 400 });

    console.log(savedProject);

    // Save image file to disk
    await writeFile(filePath, new Uint8Array(buffer));

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
  // Ensure DB connection is established before processing the request

  try {
    const projects = await Projects.find().populate("technologies");
    return res.json({ projects }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return res.json({ error: error.message }, { status: 500 });
  }
}
