import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const AppRoutes = () => {
  const { token } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={token ? <Navigate to="/home" /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
