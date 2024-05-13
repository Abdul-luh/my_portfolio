import { NextRequest, NextResponse } from "next/server";

type paramsType = { params: { id: string } };

const res = NextResponse;
export async function DELETE(req: NextRequest, { params }: paramsType) {
	try {
		const { id } = params;
		console.log(id);
	} catch (error: any) {
		console.log(error);
		return res.json({ error: error.message }, { status: 500 });
	}
}
