import { Connect } from "@/dbConfig/dbconfig";
import Certificate from "@/model/certificateModel";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

Connect();

const res = NextResponse;

export async function POST(req: NextRequest) {
	const data = await req.formData();
	const image: File = data.get("image") as unknown as File;
	const textValue: string = data.get("text") as unknown as string;

	const bytes = await image.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const path = join("./", "public", "images", "certificates", image.name);
	const body = {
		title: textValue,
		image: {
			name: image.name,
			path: path,
			size: image.size.toString(),
			type: image.type,
		},
	};
	try {
		const newCert = new Certificate(body);
		const savedCert = await newCert.save();

		console.log(savedCert);
		return res.json(
			{
				message: "certificate upload successful",
				body,
				success: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.log(error);
		res.json({ error: error.message });
	}
}
