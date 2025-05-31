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
  const [err, setErr] = React.useState(null);
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", input);
      const result = await response.data;

      // console.log(result.authenticated);

      if (result.authenticated) {
        // console.log(result, "route to '/admin/home/'");
        setIsAuth(true); // ✅ Set auth state to true
        route.push("/admin/home/");
      }
    } catch (error: any) {
      console.log(error);
      setErr(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout"); // Call the logout endpoint
      setIsAuth(false); // Clear client-side auth state
      route.push("/"); // Redirect to login or home
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
        isAuth,
        handleLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
