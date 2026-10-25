import ProjectForm from "../forms/ProjectForm";

export default function AddProject() {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <div
        id="AddProject"
        className="w-full max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-2xl dark:shadow-gray-950/60 shadow-gray-300 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
          Project Information
        </h2>
        <ProjectForm />
      </div>
    </div>
  );
}
