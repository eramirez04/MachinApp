import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../index";
import { useTranslation } from "react-i18next";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { tokenIsValido } = useAuth();
  const { t } = useTranslation();

  try {
    if (tokenIsValido === null) {
      return <>{t("loading")}</>;
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
