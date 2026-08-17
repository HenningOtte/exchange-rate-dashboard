import { createContext, useEffect, useState } from "react";
import type { User } from "../types/user";

type AuthContextValue = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  useEffect(() => {
    if (!token) {
      console.log("token not found!");
    } else {
      console.log("token found!");
    }
  }, [token]);

  return (
    <AuthContext value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
