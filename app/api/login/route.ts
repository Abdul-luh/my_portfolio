import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const res = NextResponse;

export async function POST(req: NextRequest) {
	try {
		const { email, password }: { email: string; password: string } =
			await req.json();
		if (email === "") return res.json({ error: "please pass a valid email" });
		if (password === "")
			return res.json({ error: "please pass a valid email" });
		if (email !== process.env.ADMIN_EMAIL) {
			return res.json({ error: "email is incorrect" });
		}

		const savePassword: string = process.env.ADMIN_PASSWORD!;
		if (password) {
			const validatePassword = bcryptjs.compare(password, savePassword);
			// console.log(validatePassword);
			if (!validatePassword)
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
