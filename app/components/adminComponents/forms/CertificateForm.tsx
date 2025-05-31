"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface CertificateFormProps {
  initialTitle?: string;
  initialImage?: string;
  onSubmit?: (formData: FormData, isEdit?: boolean) => void;
  isEdit?: boolean;
}

export default function CertificateForm({
  initialTitle,
  initialImage,
  // onSubmit,
  isEdit,
}: CertificateFormProps) {
  const [textValue, setTextValue] = useState(initialTitle || "");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image || !textValue.trim()) {
      return setErrMsg("Please don't leave any field empty.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", textValue);

    try {
      const res = await axios.post("/api/certificates", formData);
      const data = res.data;
      console.log(data);

      if (data.error) {
        return setErrMsg(data.error);
      }

      if (data.message) {
        setMsg(data.message);
        setTextValue("");
        setImage(null);
        setSelectedImg("");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      setErrMsg("An error occurred during upload.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="grid md:grid-cols-2 gap-4 w-full py-2 items-end">
        <InputComponent
          htmlLabelFor="title"
          inputType="text"
          htmlLabel="Certificate Title"
          inputValue={textValue}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTextValue(e.target.value)
          }
        />

        <InputComponent
          htmlLabelFor="image"
          htmlLabel="Upload Certificate"
          inputType="file"
          inputValue={undefined}
          setValue={handleImage}
        />
      </div>

      {selectedImg && (
        <Link href={selectedImg}>
          <Image
            src={selectedImg}
            alt="Certificate preview"
            width={500}
            height={300}
            className="mx-auto rounded-xl"
          />
        </Link>
      )}

      {errMsg && (
        <div
          className="max-w-[750px] fixed w-full h-full top-0 left-0 flex justify-center items-center py-8 px-6  z-10 "
          onClick={() => setErrMsg("")}
        >
          <div className="max-w-[750px] relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xl text-red-700 ">
            <FaTimes className="absolute top-2 right-2 text-xl cursor-pointer" />
            {errMsg}
          </div>
        </div>
      )}

      {msg && (
        <div
          className="max-w-[750px] fixed w-full h-full top-0 left-0 flex justify-center items-center py-8 px-6  z-10 "
          onClick={() => setMsg("")}
        >
          <div className="max-w-[750px] h-24 relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xl uppercase text-green-700 font-bold">
            <FaTimes className="absolute top-2 right-2 text-2xl cursor-pointer text-white" />
            {msg}!
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
      >
        {isEdit ? "Update Certificate" : "Upload Certificate"}
      </button>
    </form>
  );
}
