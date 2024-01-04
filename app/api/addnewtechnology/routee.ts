import { NextRequest, NextResponse } from "next/server";
const res = NextResponse;

const POST = async (req: NextRequest) => {
	try {
		const reqBody = await req.json();
		console.log(reqBody);
		return res.json({ reqBody });
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 400 });
	}
};
