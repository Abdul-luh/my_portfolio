"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import Image from "next/image";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

export default function CertificateForm() {
  const [textValue, setTextValue] = useState("");
  const [image, setImage] = useState<File>();
  const [selectedImg, setSelectedImg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

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

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("text", textValue);

    try {
      const resp = await axios.post("/api/addcertificate", formdata);
      const data = resp.data;

      if (data.error) return setErrMsg(data.error);
      if (data.message) {
        setMsg(data.message);
        setTextValue("");
        setImage(undefined);
        setSelectedImg("");
      }
    } catch (error: any) {
      console.error(error.message);
      setErrMsg("An error occurred during upload.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <InputComponent
        htmlLabelFor="title"
        inputType="text"
        htmlLabel="Certificate Title"
        inputValue={textValue}
        setValue={handleTextInput}
      />

      <InputComponent
        htmlLabelFor="image"
        htmlLabel="Upload Certificate"
        inputType="file"
        inputValue={null}
        setValue={handleImage}
      />

      {selectedImg && (
        <Image
          src={selectedImg}
          alt="Certificate preview"
          width={500}
          height={300}
          className="my-4 mx-auto rounded-lg"
        />
      )}

      {errMsg && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setErrMsg("")}
        >
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-red-600 font-bold max-w-md w-full text-center">
            <FaTimes className="absolute top-2 right-2 cursor-pointer" />
            {errMsg}
          </div>
        </div>
      )}

      {msg && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setMsg("")}
        >
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-green-600 font-bold max-w-md w-full text-center">
            <FaTimes className="absolute top-2 right-2 cursor-pointer" />
            {msg}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
      >
        Upload Certificate
      </button>
    </form>
  );
}
