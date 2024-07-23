import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//proteger las rutas
import { ProtectedRoute } from "./ProtectedRoute";

// paginas

import Inicio from "../pages/Inicio";
import Home from "../pages/auth/Home";
import Perfil from "../pages/auth/Perfil";
import Fichas from "../pages/Fichas";
import Historial from "../pages/Historial";
import Maquinas from "../pages/Maquinas";
import Sitios from "../pages/Sitios";
/* import PanelControl from "../pages/PaneldeControl"; */
import Sedes from "../pages/Sedes";
import Areas from "../pages/Areas";
import Ambientes from "../pages/Ambientes";
import PaneldeControlUsuarios from "../pages/PaneldeControl";
import PaneldeControlAreas from "../pages/PaneldeControlAreas";
import PaneldeControlSitios from "../pages/PaneldeControlSitios";
import PaneldeControlSedes from "../pages/PaneldeControlSedes";
import MaquinasAmbiente from "../pages/MaquinasAmbiente";
import InfoMaquina from "../pages/InfoMaquina";
import { ViewFormFichaTecnica } from "../pages/fichastecnicas/ViewFormFichaEquipos";

export const AppRouter = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/perfil/" element={<Perfil />} />
            <Route path="/FIchas" element={<Fichas />} />
            <Route path="/Historial" element={<Historial />} />
            <Route path="/Maquinas" element={<Maquinas />} />
            <Route path="/Sitios" element={<Sitios />} />

            <Route path="/Sedes/:idSede" element={<Sedes />} />
            <Route path="/Areas/:idArea" element={<Areas />} />
            <Route path="/Ambientes" element={<Ambientes />} />
            <Route
              path="/crearfichaequipos"
              element={<ViewFormFichaTecnica />}
            />

            <Route
              path="/Panelcontrol" 
              element={<PaneldeControlUsuarios />} 
            />

            <Route
              path="/PanelControlAreas"
              element={<PaneldeControlAreas />}
            />
            <Route
              path="/PanelControlSitios"
              element={<PaneldeControlSitios />}
            />
            <Route
              path="/PanelControlSedes"
              element={<PaneldeControlSedes />}
            />
            <Route
              path="Maquinas/maquinasAmb/:idAmbiente"
              element={<MaquinasAmbiente />}
            />
            <Route path="/infoMaquina/:idMaquina" element={<InfoMaquina />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
