import { createContext } from "react";

interface AdminAuthContext_Iface {
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
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
  handleLogout: () => void;
}

export const AdminAuthContext = createContext<
  AdminAuthContext_Iface | undefined
>(undefined);

export default AdminAuthContext;
