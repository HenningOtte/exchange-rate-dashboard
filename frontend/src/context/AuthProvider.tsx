import { createContext, useEffect, useState, useContext } from "react";
import type { User } from "../types/user";
import { getUserData } from "../api/authApi";
import { NewExchangeContext } from "./ExchangeContext";
import { fetchAllFavorites } from "../api/favoritesApi";
import { loadLocalStorage } from "../services/localStorage";

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
  const newExchangeContext = useContext(NewExchangeContext);

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
          const favorites = await fetchAllFavorites();
          if (Array.isArray(favorites))
            newExchangeContext?.setFavoritesState(favorites);
        } else {
          setLoggedIn(false);
          newExchangeContext?.setFavoritesState(loadLocalStorage());
        }
      } catch {
        setLoggedIn(false);
        newExchangeContext?.setFavoritesState(loadLocalStorage());
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
