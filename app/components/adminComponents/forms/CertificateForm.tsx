"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Toast from "../Toast";

interface CertificateFormProps {
  initialTitle?: string;
  initialImage?: string;
  onSubmit?: (formData: FormData, isEdit?: boolean) => void;
  isEdit?: boolean;
}

export default function CertificateForm({
  initialTitle,
  initialImage,
  onSubmit,
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

    if ((!image && !selectedImg) || !textValue.trim()) {
      return setErrMsg("Please don't leave any field empty.");
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("text", textValue);

    try {
      if (isEdit && onSubmit) {
        await onSubmit(formData, true);
        setMsg("Certificate updated successfully!");
        return;
      }

      if (!image) {
        return setErrMsg("Please upload a certificate image.");
      }

      const res = await axios.post("/api/certificates", formData);
      const data = res.data;

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
    <form onSubmit={handleSubmit} className="w-full space-y-6">
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
        <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-400 dark:border-gray-600 rounded-xl">
          <p className="text-xs uppercase tracking-wider mb-2 opacity-70">
            Certificate Preview
          </p>
          <Link href={selectedImg} target="_blank">
            <Image
              src={selectedImg}
              alt="Certificate preview"
              width={400}
              height={240}
              className="mx-auto rounded-xl shadow-md object-contain max-h-60"
            />
          </Link>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3.5 px-6 font-bold tracking-wider text-white rounded-xl shadow-lg transition-all hover:opacity-90 cursor-pointer"
      >
        {isEdit ? "Update Certificate" : "Upload Certificate"}
      </button>
    </form>
  );
}
