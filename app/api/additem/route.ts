import { NextRequest, NextResponse } from "next/server";
const res = NextResponse;

export async function POST(req: NextRequest) {
	try {
		console.log(req.method, req.headers);
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
