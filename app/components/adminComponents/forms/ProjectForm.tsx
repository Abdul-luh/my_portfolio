"use client";
import React, { useEffect, useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import Image from "next/image";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Toast from "../Toast";
import { invalidateProjectsCache } from "@/app/hooks/useProjectsFetch";

export default function ProjectForm() {
  const [textArea, setTextArea] = useState("");
  const [image, setImage] = useState<File>();
  const [selectedImg, setSelectedImg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);

  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [textInputValue, setTextInputValue] = useState({
    projectName: "",
    ProjectHeader: "",
    repoLink: "",
    demoLink: "",
  });

  const [checkboxValue, setCheckboxValue] = useState<
    {
      name: string;
      checked: boolean;
    }[]
  >(
    skills.map((skill) => ({
      name: skill.skillName,
      checked: false,
    }))
  );

  useEffect(() => {
    // Fetch dynamic technologies list to allow selecting any discovered tech
    axios
      .get("/api/technologies")
      .then((res) => {
        const dynamicTechs = res.data.technologies || [];
        const techNames = new Set(skills.map((s) => s.skillName.toLowerCase()));

        const combined = [...skills.map((s) => ({ name: s.skillName, checked: false }))];
        for (const dt of dynamicTechs) {
          if (!techNames.has(dt.title.toLowerCase())) {
            techNames.add(dt.title.toLowerCase());
            combined.push({ name: dt.title, checked: false });
          }
        }
        setCheckboxValue(combined);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const res = await axios.get(`/api/projects/${projectId}`);
        const project = res.data.project;

        setTextInputValue({
          projectName: project.title,
          ProjectHeader: project.header,
          repoLink: project.repoLink,
          demoLink: project.demoLink,
        });

        setTextArea(project.description);
        setSelectedImg(project.image);
        setIsFeatured(project.featured !== undefined ? project.featured : true);

        setCheckboxValue((prev) =>
          prev.map((skill) => ({
            ...skill,
            checked: project.technologies?.some(
              (tech: { techName: string }) =>
                tech.techName.toLowerCase() === skill.name.toLowerCase()
            ),
          }))
        );
      } catch (err) {
        console.error("Failed to load project:", err);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddform = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checked = checkboxValue.filter((skill) => skill.checked);

    const formdata = new FormData();
    if (image) {
      formdata.append("image", image);
    }
    if (!image && !projectId && !selectedImg && !textInputValue.demoLink) {
      setErrMsg("Please upload an image or provide a hosted demo link.");
      return;
    }

    const newProject = {
      textInputValue: {
        ...textInputValue,
        projectName: textInputValue.projectName.trim(),
        ProjectHeader: textInputValue.ProjectHeader.trim(),
        repoLink: textInputValue.repoLink.trim(),
        demoLink: textInputValue.demoLink.trim(),
      },
      textArea: textArea.trim(),
      checked,
      featured: isFeatured,
    };

    formdata.append("newProject", JSON.stringify(newProject));

    try {
      const response = projectId
        ? await axios.put(`/api/projects/${projectId}`, formdata)
        : await axios.post("/api/projects", formdata);

      const data = response.data;
      if (!data.error) {
        invalidateProjectsCache();
        setMsg(data.message);
      } else {
        setErrMsg(data.error);
      }
    } catch (error: any) {
      console.log(error);
      setErrMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleAddform} className="p-2 space-y-4">
      <div className="grid md:grid-cols-2 gap-4 w-full py-2">
        <InputComponent
          htmlLabelFor="projectName"
          inputType="text"
          htmlLabel="Project Name"
          inputValue={textInputValue.projectName}
          setValue={handleTextInput}
        />
        <InputComponent
          htmlLabelFor="ProjectHeader"
          inputType="text"
          htmlLabel="Project Header / Tech Highlights"
          inputValue={textInputValue.ProjectHeader}
          setValue={handleTextInput}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <InputComponent
          htmlLabelFor="repoLink"
          inputType="text"
          htmlLabel="Repository Link (GitHub)"
          inputValue={textInputValue.repoLink}
          setValue={handleTextInput}
        />
        <InputComponent
          htmlLabelFor="demoLink"
          inputType="text"
          htmlLabel="Demo Link (Vercel / Hosted URL)"
          inputValue={textInputValue.demoLink}
          setValue={handleTextInput}
        />
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <input
          id="featuredCheckbox"
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="w-5 h-5 accent-[#5651e5] cursor-pointer"
        />
        <label htmlFor="featuredCheckbox" className="text-sm font-semibold cursor-pointer">
          ⭐ Featured Project (Display on Main Portfolio Page)
        </label>
      </div>

      <div className="flex flex-col py-2">
        <label htmlFor="emailBody" className="uppercase text-sm py-2 flex">
          Project Description
        </label>
        <textarea
          className="border-2 rounded-lg p-3 text-black dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-[#5651e5]"
          name="emailBody"
          id="emailBody"
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          rows={6}
          placeholder="Detailed description of the application architecture, features, and key learnings..."
        ></textarea>
      </div>

      <div className="py-2">
        <p className="uppercase text-sm font-semibold mb-2">Technologies & Libraries Used</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-3 rounded-xl border border-gray-300 dark:border-gray-700">
          {checkboxValue.map((skill) => (
            <label
              key={skill.name}
              className={`flex items-center gap-2 p-2 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                skill.checked
                  ? "bg-[#5651e5]/10 border-[#5651e5] text-[#5651e5] dark:text-[#a09dff]"
                  : "bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <input
                type="checkbox"
                name={skill.name}
                checked={skill.checked}
                onChange={() => {
                  setCheckboxValue((prev) =>
                    prev.map((item) =>
                      item.name === skill.name ? { ...item, checked: !item.checked } : item
                    )
                  );
                }}
                className="accent-[#5651e5]"
              />
              <span className="truncate">{skill.name}</span>
            </label>
          ))}
        </div>
      </div>

      <InputComponent
        htmlLabelFor="displayImage"
        htmlLabel="Upload Custom Screenshot (Optional - defaults to Vercel/hosted live screenshot)"
        inputType="file"
        inputValue={undefined}
        setValue={handleImage}
      />

      {selectedImg && (
        <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-400 dark:border-gray-600 rounded-xl">
          <p className="text-xs uppercase tracking-wider mb-2 opacity-70">
            Current Screenshot Preview
          </p>
          <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-md">
            <Image
              src={selectedImg}
              fill
              unoptimized={selectedImg.startsWith("http")}
              className="object-cover object-top"
              alt="image preview"
            />
          </div>
        </div>
      )}

      {errMsg && (
        <Toast
          type="error"
          message={errMsg}
          onClose={() => setErrMsg("")}
          duration={2000}
        />
      )}

      {msg && (
        <Toast
          type="success"
          message={msg}
          onClose={() => setMsg("")}
          duration={2000}
        />
      )}

      <button
        type="submit"
        className="w-full p-4 mt-4 bg-gradient-to-tr from-[#5651e5] to-[#709dff] font-bold tracking-wider rounded-xl cursor-pointer"
      >
        {projectId ? "Update Project" : "Submit Project"}
      </button>
    </form>
  );
}
