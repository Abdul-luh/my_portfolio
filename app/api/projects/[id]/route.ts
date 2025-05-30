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

export async function PUT(req: NextRequest, { params }: paramsType) {
  await Connect();
  try {
    const { id } = params;

    const formData = await req.formData(); // ✅ This is correct
    const rawProject = formData.get("newProject");

    if (!rawProject || typeof rawProject !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid project data." },
        { status: 400 }
      );
    }

    let projectData;
    try {
      projectData = JSON.parse(rawProject);
    } catch (err) {
      return NextResponse.json(
        { error: "Malformed JSON in newProject." },
        { status: 400 }
      );
    }

    // Build the update object
    const updatedFields = {
      title: projectData.textInputValue.projectName,
      header: projectData.textInputValue.ProjectHeader,
      repoLink: projectData.textInputValue.repoLink,
      demoLink: projectData.textInputValue.demoLink,
      description: projectData.textArea,
      technologies: projectData.checked.map((tech: { name: string }) => ({
        techName: tech.name,
      })),
    };

    // Optionally handle image here if you wish to update it
    // e.g., if (formData.get("image")) { ... }

    const updatedProject = await Projects.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `Project with id ${id} updated successfully.`,
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET one project by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await Connect();
  try {
    const project = await Projects.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
