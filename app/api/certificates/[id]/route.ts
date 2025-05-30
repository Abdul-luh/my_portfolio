import { NextRequest, NextResponse } from "next/server";
import { Connect } from "@/dbConfig/dbconfig";
import Certificate from "@/model/certificateModel";

// Update certificate by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await Connect(); // Ensure DB is connected

  const id = params.id;
  const body = await req.json();

  try {
    const updatedCert = await Certificate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCert) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCert, { status: 200 });
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete certificate by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await Connect(); // Ensure DB is connected

  const id = params.id;

  try {
    const deletedCert = await Certificate.findByIdAndDelete(id);

    if (!deletedCert) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Certificate deleted successfully", deletedCert },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
