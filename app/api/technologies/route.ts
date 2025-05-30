import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import { Connect } from "@/dbConfig/dbconfig";
import Technology from "@/model/techModel";

Connect();

const res = NextResponse;

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const image: File | null = data.get("image") as unknown as File;
    const title: string = data.get("text") as unknown as string;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("./", "public", "images", "skills", image.name);

    const body = {
      title,
      image: path,
    };
    const newTechnology = new Technology(body);

    const savedTech = await newTechnology.save();
    console.log(savedTech);
    // await writeFile(path, buffer);

    return res.json(
      {
        message: "technology added successfully",
        sucess: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return res.json({ error: error.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    const technologies = await Technology.find({});
    console.log(technologies);

    return res.json({
      success: true,
      technologies,
      message: "",
    });
  } catch (error: any) {
    console.error(error);
    return res.json({ error: error.message });
  }
}
