// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Inicio = lazy(() => import("./pages/Inicio"));
const Home = lazy(() => import("./pages/auth/Home"));
const Perfil = lazy(() => import("./pages/auth/Perfil.jsx"));
const FIchas = lazy(() => import("./pages/Fichas"));
const Historial = lazy(() => import("./pages/Historial"));
const Maquinas = lazy(() => import("./pages/Maquinas"));
const Sitios = lazy(() => import("./pages/Sitios"));
const PanelControl = lazy(() => import("./pages/PaneldeControl"));
const Sedes = lazy(() => import("./pages/Sedes"));
const Areas = lazy(() => import("./pages/Areas"));
const Ambientes = lazy(() => import("./pages/Ambientes"));

const PaneldeControlAreas = lazy(() =>
  import("./pages/PaneldeControlAreas.jsx")
);
const PanelControlSitios = lazy(() =>
  import("./pages/PaneldeControlSitios.jsx")
);
const PanelControlSedes = lazy(() => import("./pages/PaneldeControlSedes.jsx"));
import MaquinasAmbiente from "./pages/MaquinasAmbiente.jsx";
import InfoMaquina from "./pages/InfoMaquina.jsx";

// formulario para crear ficha tecnica de un equipo
import { ViewFormFichaTecnica } from "./pages/fichastecnicas/ViewFormFichaEquipos.jsx";

const App = () => {
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil/" element={<Perfil />} />
          <Route path="/FIchas" element={<FIchas />} />
          <Route path="/Historial" element={<Historial />} />
          <Route path="/Maquinas" element={<Maquinas />} />
          <Route path="/Sitios" element={<Sitios />} />
          <Route path="/Panelcontrol" element={<PanelControl />} />

          <Route path="/Sedes/:idSede" element={<Sedes />} />
          <Route path="/Areas/:idArea" element={<Areas />} />
          <Route path="/Ambientes" element={<Ambientes />} />
          <Route path="/crearfichaequipos" element={<ViewFormFichaTecnica />} />

          <Route path="/recuperar" element={<PanelControl />} />

          <Route path="/PanelControlAreas" element={<PaneldeControlAreas />} />
          <Route path="/PanelControlSitios" element={<PanelControlSitios />} />
          <Route path="/PanelControlSedes" element={<PanelControlSedes />} />
          <Route
            path="Maquinas/maquinasAmb/:idAmbiente"
            element={<MaquinasAmbiente />}
          />
          <Route path="/infoMaquina/:idMaquina" element={<InfoMaquina />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
