import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import PaneldeControlUsuarios from "../../pages/admin/PaneldeControl";
import { UpdateUserAdmin } from "../../pages/admin/UpdateUsersAdmin";
import { useAuth } from "../../hooks/user/useAuth";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRouteAdmin>
            <PaneldeControlUsuarios />
          </ProtectedRouteAdmin>
        }
      />
      <Route
        path="user/"
        element={
          <ProtectedRouteAdmin>
            <UpdateUserAdmin />
          </ProtectedRouteAdmin>
        }
      />
    </Routes>
  );
};

import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const { rol } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    // Verifica si el rol está disponible y si es el rol correcto
    if (rol) {
      setIsAuthorized(rol === "Administrador");
    }
  }, [rol]);

  // Si la autorización está en proceso, muestra un spinner o mensaje de carga
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // Redirige si el usuario no está autorizado
  if (!isAuthorized) {
    return <Navigate to="/home" />;
  }

  return children;
};
