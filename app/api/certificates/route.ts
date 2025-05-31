import { Connect } from "@/dbConfig/dbconfig";
import Certificate from "@/model/certificateModel";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";

Connect();

export async function POST(req: NextRequest) {
  await Connect();

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const text = formData.get("text") as string;

    if (!image) {
      return NextResponse.json(
        { error: "Image is required." },
        { status: 400 }
      );
    }

    if (!text || typeof text !== "string") {
      // console.log("text is required.");
      return NextResponse.json({ error: "text is required." }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes); // <- no double "await"

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "images", "certificates");
    await mkdir(uploadDir, { recursive: true });

    const uniqueFileName = `${randomUUID()}-${image.name}`;
    const filePath = join(uploadDir, uniqueFileName);
    const imageUrl = `/certificates/${uniqueFileName}`;

    // Save image to disk
    await writeFile(filePath, new Uint8Array(buffer));

    // Save to DB
    const newCertificate = new Certificate({
      title: text,
      image: imageUrl,
    });

    const savedCertificate = await newCertificate.save();

    return NextResponse.json(
      {
        message: "Certificate uploaded successfully!",
        certificate: savedCertificate,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Certificate upload failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await Connect();
  try {
    const certificates = await Certificate.find().lean();
    return NextResponse.json({ certificates }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
