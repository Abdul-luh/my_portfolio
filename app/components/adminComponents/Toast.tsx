"use client";
import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  type,
  message,
  onClose,
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className="fixed top-24 right-4 sm:right-6 z-[999] max-w-sm w-[calc(100%-2rem)] sm:w-auto shadow-2xl transition-all duration-300"
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg ${
          isSuccess
            ? "bg-emerald-900/90 border-emerald-500 text-emerald-100 shadow-emerald-950/40"
            : "bg-rose-900/90 border-rose-500 text-rose-100 shadow-rose-950/40"
        }`}
      >
        <div className="shrink-0 text-xl">
          {isSuccess ? (
            <FaCheckCircle className="text-emerald-300" />
          ) : (
            <FaExclamationCircle className="text-rose-300" />
          )}
        </div>
        <p className="flex-1 text-sm font-semibold tracking-wide">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="shrink-0 p-1.5 rounded-full text-current opacity-70 hover:opacity-100 hover:bg-black/20 transition-all !shadow-none !bg-transparent border-0 cursor-pointer"
        >
          <FaTimes size={14} />
        </button>
      </div>
    </div>
  );
}
