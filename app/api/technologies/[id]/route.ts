import { Connect } from "@/dbConfig/dbconfig";
import Technology from "@/model/techModel";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

// Connect();

type paramType = { params: { id: string } };

const res = NextResponse;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tech = await Technology.findById(params.id);
    if (!tech) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ technology: tech });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextApiRequest, { params }: paramType) {
  try {
    const { id } = params;
    console.log(id);
    if (!id) return res.json({ message: "empty id" });
    const deleteTech = Technology.findByIdAndDelete(id);
    return res.json({
      message: "technology deleted successfully",
      id,
      sucess: true,
    });
  } catch (error: any) {
    console.log(error);
    return res.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest, { params }: paramType) {
  try {
    const { id } = params;
    const body = await req.json(); // expects { title: "New Title" }

    if (!id) return res.json({ message: "empty id" });

    const updatedTech = await Technology.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    const foundTech = Technology.findById(id);
    if (!foundTech) return res.json({ message: "Technology Not found" });

    foundTech.updateOne();

    return res.json({
      message: "technology deleted successfully",
      id,
      sucess: true,
    });
  } catch (error: any) {
    console.log(error);
    return res.json({ error: error.message });
  }
}
