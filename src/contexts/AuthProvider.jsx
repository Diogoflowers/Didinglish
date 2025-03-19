import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idUser, setIdUser] = useState(localStorage.getItem("token"));

  const deslogar = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, deslogar, setIdUser, idUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
