import { Connect } from "@/dbConfig/dbconfig";
import Technology from "@/model/techModel";
import { NextRequest, NextResponse } from "next/server";

// GET /api/technologies/[id]
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await Connect();
  try {
    const tech = await Technology.findById(context.params.id);
    if (!tech) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ technology: tech });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/technologies/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await Connect();
  const { id } = context.params;

  try {
    const deletedTech = await Technology.findByIdAndDelete(id);
    if (!deletedTech) {
      return NextResponse.json(
        { message: "Technology not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Technology deleted successfully",
      id,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/technologies/[id]
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await Connect();
  const { id } = context.params;

  try {
    const body = await req.json();

    const updatedTech = await Technology.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTech) {
      return NextResponse.json(
        { message: "Technology not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Technology updated successfully",
      technology: updatedTech,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
