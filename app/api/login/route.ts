import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import fs from "fs";
import path from "path";

const res = NextResponse;

function getSavedPasswordHash(): string {
	let envPass = (process.env.ADMIN_PASSWORD || "").trim().replace(/;$/, "");
	if (envPass.startsWith("$2a$") || envPass.startsWith("$2b$") || envPass.startsWith("$2y$")) {
		return envPass;
	}
	try {
		const envPath = path.join(process.cwd(), ".env");
		if (fs.existsSync(envPath)) {
			const content = fs.readFileSync(envPath, "utf-8");
			for (const line of content.split("\n")) {
				const trimmed = line.trim();
				if (trimmed.startsWith("ADMIN_PASSWORD")) {
					const parts = trimmed.split("=");
					if (parts.length >= 2) {
						let val = parts.slice(1).join("=").trim().replace(/;$/, "").replace(/^["']|["']$/g, "").replace(/\\/g, "");
						if (val.startsWith("$2")) {
							return val;
						}
					}
				}
			}
		}
	} catch (e) {
		// ignore
	}
	return envPass;
}

export async function POST(req: NextRequest) {
	try {
		const { email, password }: { email: string; password: string } =
			await req.json();

		if (!email || email.trim() === "") {
			return res.json({ error: "Please enter a valid email" });
		}
		if (!password || password.trim() === "") {
			return res.json({ error: "Please enter a valid password" });
		}

		const adminEmail = (process.env.ADMIN_EMAIL || "abdulluhodulate@gmail.com").trim();
		if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
			return res.json({ error: "Email is incorrect" });
		}

		const hash = getSavedPasswordHash();
		let isPasswordValid = false;

		if (hash.startsWith("$2")) {
			isPasswordValid = await bcryptjs.compare(password, hash);
		} else {
			isPasswordValid = password === hash;
		}

		if (!isPasswordValid) {
			return res.json({ error: "Password is incorrect" });
		}

		const tokenSecret = (process.env.TOKEN_SECRET || "nextjscrash").trim().replace(/;$/, "");
		const token = jwt.sign({ email }, tokenSecret, { expiresIn: "12h" });

		const response = res.json({ authenticated: true });
		response.cookies.set("token", token, {
			maxAge: 60 * 60 * 12,
			httpOnly: true,
			path: "/",
			sameSite: "lax",
		});

		return response;
	} catch (error: any) {
		console.error("Login route error:", error);
		return res.json({ error: error.message }, { status: 500 });
	}
}
