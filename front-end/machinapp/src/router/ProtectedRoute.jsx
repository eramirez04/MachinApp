import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      alert("permiso denegado");
      return <Navigate to={"/"} />;
    }

    return <Outlet />;
  } catch (error) {
    console.error(error);
  }

  console.log("Renderizando el Outlet"); // Declaración de depuración

  return <Outlet />;
};
