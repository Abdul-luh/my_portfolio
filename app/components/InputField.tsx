"use client";
import React from "react";

interface InputProps {
  inputType: string;
  htmlLabelFor: string;
  htmlLabel: string;
  inputValue: any;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputComponent({
  inputType,
  htmlLabelFor,
  htmlLabel,
  inputValue,
  setValue,
}: InputProps) {
  const isFileInput = inputType === "file";

  return (
    <div
      className={
        inputType === "checkbox"
          ? "flex justify-end flex-row-reverse gap-4 text-left"
          : "flex flex-col"
      }
    >
      <label htmlFor={htmlLabelFor} className="uppercase text-sm py-2">
        {htmlLabel}
      </label>

      <input
        id={htmlLabelFor}
        type={inputType}
        name={htmlLabelFor}
        onChange={(e) => {
          if (typeof setValue !== "function") {
            console.error("setValue is not a function", setValue);
          }
          setValue(e);
        }}
        {...(isFileInput
          ? { accept: "image/*" } // for image upload
          : { value: inputValue })}
        className="border-2 text-black border-gray-300 focus:outline-[#5651e5] rounded-lg p-3"
      />
    </div>
  );
}

export default InputComponent;
