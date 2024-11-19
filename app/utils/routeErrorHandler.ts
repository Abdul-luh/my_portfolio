import mongoose from "mongoose";
import { NextResponse } from "next/server";

export function routeCatchErrorHandler(e: any, res: typeof NextResponse) {
	console.error(e);
	if (e instanceof mongoose.Error.ValidationError) {
		return res.json({ error: e.message }, { status: 400 }); // 400 Bad Request
	}
	if (e instanceof mongoose.Error.CastError) {
		return res.json({ error: "Invalid ID format" }, { status: 400 }); // 400 Bad Request
	}
	return res.json({ error: "Internal server error" }, { status: 500 }); // 500 Internal Server Error
}
