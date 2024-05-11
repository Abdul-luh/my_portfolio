"use client";
import React, { useEffect, useState } from "react";
import { AdminAuthContext } from "./AdminAuth";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

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
	const pathname = usePathname();

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
				route.push("/admin/home/");
			}
		} catch (error: any) {
			console.log(error);
			setErr(error.message);
		}
	};

	return (
		<AdminAuthContext.Provider
			value={{ handleLoginSubmit, input, setInput, handleChange, err, isAuth }}>
			{children}
		</AdminAuthContext.Provider>
	);
}
