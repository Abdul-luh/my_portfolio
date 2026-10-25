import { createContext } from "react";

interface AdminAuthContext_Iface {
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  setErr: React.Dispatch<React.SetStateAction<string | null>>;
  isAuth: boolean;
  handleLogout: () => void;
}

export const AdminAuthContext = createContext<
  AdminAuthContext_Iface | undefined
>(undefined);

export default AdminAuthContext;
