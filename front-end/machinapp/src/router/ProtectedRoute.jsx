import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../index";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { tokenIsValido } = useAuth();

  try {
    if (tokenIsValido === null) {
      return <>Cargando</>;
    }

    if (!token || !tokenIsValido) {
      return <Navigate to={"/"} />;
    }

    return <Outlet />;
  } catch (error) {
    console.error(error);
  }

  return <Outlet />;
};
