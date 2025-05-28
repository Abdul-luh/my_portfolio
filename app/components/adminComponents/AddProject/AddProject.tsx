import ProjectForm from "../forms/ProjectForm";

export default function AddProject() {
  return (
    <div
      id="AddProject"
      className="md:col-span-3 w-full h-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl lg:p-4"
    >
      <ProjectForm />
    </div>
  );
}
