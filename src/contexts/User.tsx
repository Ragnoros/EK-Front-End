import { ReactNode, createContext, useState, useEffect } from "react";

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<any | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user_id"));
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
