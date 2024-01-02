import { createContext } from "react";

interface AdminAuthContext_Iface {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	handleChange: (e: any) => void;
	setInput: React.Dispatch<
		React.SetStateAction<{
			email: string;
			password: string;
		}>
	>;
	input: {
		email: string;
		password: string;
	};
	err: null | string;
	isAuth: boolean;
}

export const AdminAuthContext = createContext<AdminAuthContext_Iface>(null);

export default AdminAuthContext;
