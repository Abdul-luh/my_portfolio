import { NextRequest, NextResponse } from "next/server";
import Technology from "@/model/techModel";

type paramsType = { params: { id: string } };

const res = NextResponse;
export async function DELETE(req: NextRequest, { params }: paramsType) {
	try {
		const { id } = params;
		console.log(id);
		if (!id) {
			return res.json({ error: "ID is required" }, { status: 400 });
		}

		const deletedTechnology = await Technology.findByIdAndDelete(id);

		if (!deletedTechnology) {
			return res.json({ error: "Technology not found" }, { status: 404 });
		}

		return res.json(
			{ message: "Technology deleted successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}

export async function UPDATE(req: NextRequest, { params }: paramsType) {
	try {
		const { id } = params;
		console.log(id);
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}
