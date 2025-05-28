"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import CertificateForm from "../forms/CertificateForm";

export default function AddCertificate() {
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
    <div
      id="AddCertificate"
      className="md:col-span-3 w-full h-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl lg:p-4"
    >
      <CertificateForm />
    </div>
  );
}
