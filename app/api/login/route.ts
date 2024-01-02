import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const res = NextResponse;

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();
		if (email === "") return res.json({ error: "please pass a valid email" });
		if (password === "")
			return res.json({ error: "please pass a valid email" });
		if (email !== process.env.ADMIN_EMAIL) {
			return res.json({ error: "email is incorrect" });
		}
		if (password !== process.env.ADMIN_PASSWORD) {
			return res.json({ error: "password is incorrect" });
		}
		const token = jwt.sign(email, process.env.TOKEN_SECRET!);
		const response = res.json({ authenticated: true });
		response.cookies.set("token", token, { maxAge: 60 * 60 });
		// return res.json({ authenticated: true });

		return response;
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}
