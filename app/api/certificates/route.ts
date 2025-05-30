import { Connect } from "@/dbConfig/dbconfig";
import Certificate from "@/model/certificateModel";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

const res = NextResponse;

export async function POST(req: NextRequest) {
  await Connect();

  try {
    const data = await req.formData();
    const image: File = data.get("image") as unknown as File;
    const textValue: string = data.get("text") as unknown as string;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(
      process.cwd(),
      "public",
      "images",
      "certificates",
      image.name
    );
    await writeFile(path, new Uint8Array(buffer));

    const body = {
      title: textValue,
      image: path,
    };
    const newCert = new Certificate(body);
    const savedCert = await newCert.save();

    console.log(savedCert);
    return res.json(
      {
        message: "certificate upload successful",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return res.json({ error: error.message }, { status: 500 }); // ← add return and status
  }
}

export async function GET() {
  try {
    await Connect();
    const certificates = await Certificate.find().lean();

    return NextResponse.json({ certificates }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
