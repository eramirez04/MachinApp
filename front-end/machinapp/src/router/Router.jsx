import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//proteger las rutas
import { ProtectedRoute } from "./ProtectedRoute";

// paginas

import Inicio from "../pages/Inicio";
import Home from "../pages/auth/Home";
import { PerfilRoutes } from "./rutas/PerfilRoute";
import { SolicitudRouter } from "./rutas/SolicitudRouter";
import Historial from "../pages/Historial";
import Maquinas from "../pages/Maquinas";
import Sitios from "../pages/Sitios/Sitios";
/* import PanelControl from "../pages/PaneldeControl"; */
import Sedes from "../pages/Sitios/Sedes";
import Areas from "../pages/Sitios/Areas";
import { AdminRoute } from "./rutas/AdminRoutes";
import MaquinasAmbiente from "../pages/MaquinasAmbiente";
import InfoMaquina from "../pages/InfoMaquina";
import { ViewFormFichaTecnica } from "../pages/fichastecnicas/ViewFormFichaEquipos";
import { ViewFormFicha_De_mantenimiento } from "../pages/fichastecnicas/ViewFormFicha_de_mantenimiento";
import InfoAmbiente from "../pages/Sitios/InfoAmbiente";
import InfoSede from "../pages/Sitios/InfoSede";
import AreasGeneral from "../pages/Sitios/AreasGeneral";
import AmbientesGeneral from "../pages/Sitios/AmbientesGeneral";
import { ResetPassword } from "../pages/auth/ResetPassword";

export const AppRouter = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recuperar" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/perfil/*" element={<PerfilRoutes />} />
            <Route path="/solicitud/*" element={<SolicitudRouter />} />
            <Route path="/Historial" element={<Historial />} />
            <Route path="/Maquinas" element={<Maquinas />} />
            <Route path="/Sedes" element={<Sitios />} />
            <Route path="/Sedes/:idSede" element={<Sedes />} />
            <Route path="/Areas/:idArea" element={<Areas />} />{" "}
            <Route
              path="/crearfichaequipos"
              element={<ViewFormFichaTecnica />}
            />
            <Route path="/Panelcontrol/*" element={<AdminRoute />} />
            <Route
              path="/MaquinasAmb/:idAmbiente"
              element={<MaquinasAmbiente />}
            />
            <Route path="/infoMaquina/:idMaquina" element={<InfoMaquina />} />
            <Route path="/Sedes/InfoSede/:idSede" element={<InfoSede />} />
            <Route
              path="/Ambientes/InfoAmbiente/:idAmbientes"
              element={<InfoAmbiente />}
            />
            <Route
              path="/crear_ficha_mantenimiento"
              element={<ViewFormFicha_De_mantenimiento />}
            />
            <Route path="/Areas" element={<AreasGeneral />} />
            <Route path="/Ambientes" element={<AmbientesGeneral />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
