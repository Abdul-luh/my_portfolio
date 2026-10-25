"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Toast from "../Toast";

interface TechnologyFormProps {
  initialTitle?: string;
  initialImage?: string;
  onSubmit?: (formData: FormData, isEdit?: boolean) => void;
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
    setImage(file);
  };

  const handleAddTechSubmitForm = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!image && !techName && !selectedImg) {
      return setErrMsg("Please don't leave an empty field");
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("text", techName);

    try {
      if (isEdit && onSubmit) {
        await onSubmit(formData, true);
        setMsg("Technology updated successfully!");
        return;
      }

      if (!image) {
        return setErrMsg("Please upload a logo image");
      }

      const res = await axios.post("/api/technologies", formData);
      const data = await res.data;
      if (data.error) {
        setErrMsg(data.error);
      }
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
    <form onSubmit={handleAddTechSubmitForm} className="w-full space-y-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
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
          inputValue={undefined}
          setValue={handleImage}
        />
      </div>

      {selectedImg && (
        <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-400 dark:border-gray-600 rounded-xl">
          <p className="text-xs uppercase tracking-wider mb-2 opacity-70">
            Logo Preview
          </p>
          <Link href={selectedImg} target="_blank">
            <Image
              src={selectedImg}
              alt="selected logo"
              className="mx-auto rounded-xl shadow-md object-contain"
              width={120}
              height={120}
            />
          </Link>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3.5 px-6 font-bold tracking-wider text-white rounded-xl shadow-lg transition-all hover:opacity-90 cursor-pointer"
      >
        {isEdit ? "Update Technology" : "Add Technology"}
      </button>
    </form>
  );
}
