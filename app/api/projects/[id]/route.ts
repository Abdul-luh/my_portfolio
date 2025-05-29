import { NextRequest, NextResponse } from "next/server";
import Projects from "@/model/projectModel";
import { Connect } from "@/dbConfig/dbconfig"; // adjust to your DB connection util

type paramsType = { params: { id: string } };

export async function DELETE(req: NextRequest, { params }: paramsType) {
  try {
    const { id } = params;

    // Ensure DB connection
    await Connect();

    // Delete the project by id
    const deletedProject = await Projects.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { error: "Project not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Project with id ${id} deleted successfully.` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
