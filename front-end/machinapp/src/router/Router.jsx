import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//proteger las rutas
import { ProtectedRoute } from "./ProtectedRoute";

// paginas

import Inicio from "../pages/Inicio";
import Home from "../pages/auth/Home";
import { PerfilRoutes } from "./rutas/PerfilRoute";
import Fichas from "../pages/Fichas";
import Historial from "../pages/Historial";
import Maquinas from "../pages/Maquinas";
import Sitios from "../pages/Sitios";
/* import PanelControl from "../pages/PaneldeControl"; */
import Sedes from "../pages/Sedes";
import Areas from "../pages/Areas";
import { AdminRoute } from "./rutas/AdminRoutes";
import MaquinasAmbiente from "../pages/MaquinasAmbiente";
import InfoMaquina from "../pages/InfoMaquina";
import { ViewFormFichaTecnica } from "../pages/fichastecnicas/ViewFormFichaEquipos";
import { ViewFormFicha_De_mantenimiento } from "../pages/fichastecnicas/ViewFormFicha_de_mantenimiento";
import { FichaSolicitudPage } from "../pages/fichastecnicas/ViewFormFichaSolicitudPage";
import InfoAmbiente from "../pages/InfoAmbiente";
import InfoSede from "../pages/InfoSede";
import AreasGeneral from "../pages/AreasGeneral";
import AmbientesGeneral from "../pages/AmbientesGeneral";

export const AppRouter = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recuperar" element={<div>hola como estasei</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/perfil/*" element={<PerfilRoutes />} />
            <Route path="/FIchas" element={<Fichas />} />
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
            <Route path="/crearsolicitud" element={<FichaSolicitudPage />} />
            <Route path="/Areas" element={<AreasGeneral />} />
            <Route path="/Ambientes" element={<AmbientesGeneral />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
