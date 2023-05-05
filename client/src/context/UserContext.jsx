import { createContext, useContext, useState } from "react";
import { login } from "../api/login.api";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be within a UserContextProvider");
  }
  return context;
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  async function loadUser(credentials) {
    try {
      const { data } = await login(credentials);
      setUser(data);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
