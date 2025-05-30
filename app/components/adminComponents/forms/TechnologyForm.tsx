"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface TechnologyFormProps {
  initialTitle?: string;
  initialImage?: string;
  onSubmit: (formData: FormData, isEdit?: boolean) => void;
  isEdit?: boolean;
}

export default function TechnologyForm({
  initialTitle,
  initialImage,
  onSubmit,
  isEdit,
}: TechnologyFormProps) {
  const [techName, setTechname] = useState(initialTitle || "");
  const [image, setImage] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState(initialImage || "");
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImg(URL.createObjectURL(file));
    setImage(file); // Update the state with the selected image
  };

  const handleAddTechSubmitForm = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData();
    if (!image && !techName)
      return setErrMsg("Please don't leave an empty field");
    formData.append("image", image!);
    formData.append("text", techName);

    try {
      const res = await axios.post("/api/technologies", formData);
      const data = await res.data;
      if (data.error) {
        setErrMsg(data.error);
      }
      // console.log(data);
      if (data.message) {
        setMsg(data.message);
        setImage(null);
        setTechname("");
        setSelectedImg("");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      setErrMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleAddTechSubmitForm} className="p-2">
      <div className="grid md:grid-cols-2 gap-4 w-full py-2 items-end">
        <InputComponent
          htmlLabelFor="techName"
          inputType="text"
          htmlLabel="Technology Name"
          inputValue={techName}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTechname(e.target.value)
          }
        />
        <InputComponent
          htmlLabelFor="image"
          htmlLabel="Upload logo"
          inputType="file"
          inputValue={null}
          setValue={handleImage}
        />
      </div>
      {selectedImg && (
        <Link href={selectedImg}>
          <Image
            src={selectedImg}
            alt="selected logo"
            className="mx-auto rounded-xl"
            width={150}
            height={150}
          />
        </Link>
      )}
      {errMsg && (
        <div
          className="max-w-[750px] fixed w-full h-full top-0 left-0 flex justify-center items-center py-8 px-6  z-10 "
          onClick={(e) => setErrMsg("")}
        >
          <div className="max-w-[750px] relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xl text-red-700 ">
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
          className="max-w-[750px] fixed w-full h-full top-0 left-0 flex justify-center items-center py-8 px-6  z-10 "
          onClick={(e) => setMsg("")}
        >
          <div className="max-w-[750px] h-24 relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xl uppercase text-green-700 font-bold">
            <FaTimes
              width={25}
              height={25}
              className="absolute top-2 right-2 text-2xl text-white"
            />
            {msg}!
          </div>
        </div>
      )}
      <button className="w-full p-4 text-gray-100 mt-4">
        {isEdit ? "Update Technology" : "Add Technology"}
      </button>{" "}
    </form>
  );
}
