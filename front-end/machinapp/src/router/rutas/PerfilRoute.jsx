import { Route, Routes } from "react-router-dom";
import Perfil from "../../pages/auth/Perfil";
import { PerfilSettings } from "../../pages/auth/PerfilSettings";

export const PerfilRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Perfil />} />
        <Route path="settings" element={<PerfilSettings />} />
      </Routes>
    </>
  );
};
