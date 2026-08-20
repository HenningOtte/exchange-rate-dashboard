import { createContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { getUserData } from "../api/authApi";
import type { GetUserResponse } from "../api/authApi";

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
      setLoggedIn(false);
      setUser({
        firstname: "",
        lastname: "",
        email: "",
      });
      return;
    }
    verifyAuthentication(token);
  }, [token]);

  async function verifyAuthentication(token: string) {
    const response: GetUserResponse = await getUserData(token);
    if (response.success) {
      setLoggedIn(true);
      setUser({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
      });
      return;
    }
    setLoggedIn(false);
    setUser({
      firstname: "",
      lastname: "",
      email: "",
    });
    setToken("");
  }

  return (
    <AuthContext value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
