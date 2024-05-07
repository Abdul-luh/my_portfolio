import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { NextApiRequest } from "next";
import { resolve } from "path";
import { rejects } from "assert";

const res = NextResponse;

// export const config = {
// 	api: {
// 		bodyParse: false
// 	}
// }
export const dynamic = "auto";

// const readFile = (req: NextApiRequest) => {
// 	const form = formidable()
// 	return new Promise((resolve, reject) => {
// 		form.parse(req, (err, fields, files) => {
// 			if (err) reject
// 		})
// 	})

// }

export async function POST(req: NextRequest) {
	// const form = formidable({

	// })
	try {
		console.log(req.method, req.body);
		const reqBody = await req.json();
		console.log(reqBody);

		return res.json(
			{
				message: "project added successfully",
				reqBody,
				sucess: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message });
	}
}
