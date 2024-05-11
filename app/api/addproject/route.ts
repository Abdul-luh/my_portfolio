// import { File } from "buffer";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { arrayBuffer } from "stream/consumers";
const res = NextResponse;

export async function POST(req: NextRequest) {
	try {
		const data = await req.formData();
		// console.log(reqBody);
		const image: File = data.get("image") as unknown as File;
		const texts: string | null = data.get("newProject") as unknown as string;
		const newProject = JSON.parse(texts);

		const bytes = await image.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const path = join("./", "public", image.name);
		await writeFile(path, buffer);

		newProject.image = {
			name: image.name,
			path: path,
			type: image.type,
			lastModified: image.lastModified,
		};

		// const msg = ;
		return res.json(
			{
				message: "project added successfully",
				newProject,
				sucess: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message });
	}
}
