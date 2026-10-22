import { createContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { getUserData } from "../api/authApi";

type AuthContextValue = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyAuthentication() {
      try {
        const response = await getUserData();

        if (response.success) {
          setLoggedIn(true);
          setUser({
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
          });
        } else {
          setLoggedIn(false);
        }
      } catch {
        setLoggedIn(false);
        setUser({
          firstname: "",
          lastname: "",
          email: "",
        });
      } finally {
        setIsLoading(false);
      }
    }

    verifyAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
