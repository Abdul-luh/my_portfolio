// import { File } from "buffer";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { Connect } from "@/dbConfig/dbconfig";
import Projects from "@/model/projectModel";
import Technology from "@/model/techModel";
import { NextApiRequest } from "next";

Connect();

const res = NextResponse;

export async function POST(req: NextRequest) {
	try {
		const data = await req.formData();
		// console.log(reqBody);
		const image: File = data.get("image") as unknown as File;
		const texts: string | null = data.get("newProject") as unknown as string;
		const body = JSON.parse(texts);

		const bytes = await image.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const path = join("./", "public", image.name);
		body.image = path;

		// console.log(body);

		const { textInputValue, textArea: description, checked, image: img } = body;

		const {
			projectName: title,
			ProjectHeader: header,
			repoLink,
			demoLink,
		} = textInputValue;

		// Convert checked technologies into an array of technology objects
		const technologies = checked.map((technology: { name: string }) => ({
			techName: technology.name,
		}));

		const newProject = new Projects({
			title,
			header,
			image: img,
			description,
			demoLink,
			repoLink,
			technologies,
		});

		const savedProject = await newProject.save();
		console.log(savedProject);

		if (savedProject.error) return res.json({ error: savedProject.error });

		await writeFile(path, buffer);

		return res.json(
			{
				message: "project added successfully",
				sucess: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	try {
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(req: NextApiRequest) {
	try {
		const { id } = req.query;
		console.log(id);
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}
