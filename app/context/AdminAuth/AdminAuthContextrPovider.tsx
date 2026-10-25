"use client";
import React, { useState } from "react";
import { AdminAuthContext } from "./AdminAuth";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminAuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    try {
      const response = await axios.post("/api/login", input);
      const result = await response.data;

      if (result.error) {
        setErr(result.error);
        return;
      }

      if (result.authenticated) {
        setIsAuth(true);
        route.push("/admin/home");
      }
    } catch (error: any) {
      console.error("Login submission error:", error);
      const apiError = error.response?.data?.error;
      setErr(apiError || error.message || "Failed to log in");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setIsAuth(false);
      route.push("/");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        handleLoginSubmit,
        input,
        setInput,
        handleChange,
        err,
        setErr,
        isAuth,
        handleLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
