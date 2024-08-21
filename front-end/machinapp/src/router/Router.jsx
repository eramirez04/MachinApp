import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
//proteger las rutas
import { ProtectedRoute } from "./ProtectedRoute";

// paginas
import {
  Inicio,
  Home,
  Historial,
  Maquinas,
  Sitios,
  Sedes,
  Areas,
  MaquinasAmbiente,
  InfoMaquina,
  ViewFormFichaTecnica,
  ViewFormFicha_De_mantenimiento,
  ResetPassword,
  InfoAmbiente,
  InfoSede,
  AreasGeneral,
  AmbientesGeneral,
  ViewFormTipoFicha
} from "../index";

import { PerfilRoutes } from "./rutas/PerfilRoute";
import { SolicitudRouter } from "./rutas/SolicitudRouter";
import { AdminRoute } from "./rutas/AdminRoutes";

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
            
            {/*  */}
            <Route
              path="/crearTiposFichaTec"
              element={<ViewFormTipoFicha />}
            />
            {/*  */}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
