"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    if (!image && !textValue)
      return setErrMsg("Please don't leave an empty field");
    formdata.append("image", image!);
    formdata.append("text", textValue);

    try {
      const resp = await axios.post("/api/addcertificate", formdata);
      const data = await resp.data;
      if (data.error) {
        return setErrMsg(data.error);
      }
      // console.log(data);
      if (data.message) {
        return setMsg(data.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="grid md:grid-cols-2 gap-4 w-full py-2">
        <InputComponent
          htmlLabelFor="certName"
          inputType="text"
          htmlLabel="Certificate Name"
          inputValue={textValue}
          setValue={handleTextInput}
        />
        <InputComponent
          htmlLabelFor="image"
          htmlLabel="Upload Image"
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
            width={250}
            height={250}
          />
        </Link>
      )}
      {errMsg && (
        <div
          className="max-w-[750px] fixed w-full h-full top-0 left-0 flex justify-center items-center py-8 px-6  z-10 "
          onClick={(e) => setErrMsg("")}
        >
          <div className="relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xll ">
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
          <div className="relative bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-center shadow-xl dark:shadow-gray-700 shadow-gray-400 py-8 px-6 rounded-xll ">
            <FaTimes
              width={25}
              height={25}
              className="absolute top-2 right-2"
            />
            {msg}
          </div>
        </div>
      )}
      <button className="w-full p-4 text-gray-100 mt-4">Add Certificate</button>
    </form>
  );
}
