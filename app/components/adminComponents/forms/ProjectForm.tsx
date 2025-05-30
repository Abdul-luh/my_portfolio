"use client";
import React, { useEffect, useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import { StaticImageData } from "next/image";
import Image from "next/image";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FaTimes } from "react-icons/fa";

export default function ProjectForm() {
  const [textArea, setTextArea] = useState("");
  const [image, setImage] = useState<File>();
  const [selectedImg, setSelectedImg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");

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
        setSelectedImg(project.image); // Assuming this is a URL

        const updatedCheckboxes = skills.map((skill) => ({
          name: skill.skillName,
          checked: project.technologies.some(
            (tech: { techName: string }) => tech.techName === skill.skillName
          ),
        }));

        setCheckboxValue(updatedCheckboxes);
      } catch (err) {
        console.error("Failed to load project:", err);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log(file);
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
      // console.log(selectedImg);
      setImage(file); // Update the state with the selected image
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
    if (!image && !projectId) {
      setErrMsg("Please upload an image.");
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
    };

    formdata.append("newProject", JSON.stringify(newProject));

    try {
      const response = projectId
        ? await axios.put(`/api/projects/${projectId}`, formdata)
        : await axios.post("/api/projects", formdata);

      const data = response.data;
      data.error ? setErrMsg(data.error) : setMsg(data.message);
    } catch (error: any) {
      console.log(error);
      setErrMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleAddform} className="p-2">
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
          htmlLabel="Project header"
          inputValue={textInputValue.ProjectHeader}
          setValue={handleTextInput}
        />
      </div>
      <InputComponent
        htmlLabelFor="repoLink"
        inputType="text"
        htmlLabel="Reopsitory Link"
        inputValue={textInputValue.repoLink}
        setValue={handleTextInput}
      />
      <InputComponent
        htmlLabelFor="demoLink"
        inputType="text"
        htmlLabel="demo link"
        inputValue={textInputValue.demoLink}
        setValue={handleTextInput}
      />
      <div className="flex flex-col py-2">
        <label htmlFor="emailBody" className="uppercase text-sm py-2 flex">
          Message
        </label>
        <textarea
          className="border-2 rounded-lg p-3 text-black border-gray-300"
          name="emailBody"
          id="emailBody"
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          rows={10}
        ></textarea>
      </div>
      <div className="grid md:grid-cols-2 gap-4 px-2">
        {checkboxValue.map((skill: { name: string; checked: boolean }) => {
          return (
            <InputComponent
              key={skill.name}
              htmlLabelFor={skill.name}
              inputType="checkbox"
              htmlLabel={skill.name}
              inputValue={skill.checked}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (skill.name === e.target.name) {
                  const checked = checkboxValue.map((item) =>
                    item.name === e.target.name
                      ? { ...item, checked: !skill.checked }
                      : item
                  );
                  // console.log(checked);
                  setCheckboxValue(checked);
                }
              }}
            />
          );
        })}
      </div>
      <InputComponent
        htmlLabelFor="displayImage"
        htmlLabel="Upload Image"
        inputType="file"
        inputValue={null}
        setValue={handleImage}
      />
      {selectedImg && (
        <Image
          src={selectedImg}
          className="my-2 mx-auto rounded-xl"
          alt="image preview"
          width={500}
          height={500}
        />
      )}

      {errMsg && (
        <div
          className="fixed w-full h-full top-0 left-0 flex justify-center items-center py-8 px-6  z-10 "
          onClick={(e) => setErrMsg("")}
        >
          <div className="max-w-[750px] relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xl text-red-700 font-bold">
            <FaTimes
              width={25}
              height={25}
              className="absolute top-2 right-2"
            />
            {errMsg}
          </div>
        </div>
      )}

      {msg && (
        <div
          className="fixed w-full h-full top-0 left-0 flex justify-center items-center py-8 px-6  z-10 "
          onClick={(e) => setMsg("")}
        >
          <div className="max-w-[750px] relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xll ">
            <FaTimes
              width={25}
              height={25}
              className="absolute top-2 right-2"
            />
            {msg}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full p-4 mt-4 bg-gradient-to-tr from-[#5651e5] to-[#709dff]"
      >
        {projectId ? "Update Project" : "Submit"}
      </button>
    </form>
  );
}
