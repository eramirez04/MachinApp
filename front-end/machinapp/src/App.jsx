import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import FIchas from "./pages/Fichas";
import Historial from "./pages/Historial";
import Maquinas from "./pages/Maquinas";
import Sitios from "./pages/Sitios";
import PanelControl from "./pages/PaneldeControl";
import PanelcontrolSedes from "./pages/PanelControlSedes";
import PanelcontrolAreas from "./pages/PanelControlAreas";
import PanelcontrolAmbientes from "./pages/PanelControlAmbientes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/FIchas" element={<FIchas />} />
        <Route path="/Historial" element={<Historial />} />
        <Route path="/Maquinas" element={<Maquinas />} />
        <Route path="/Sitios" element={<Sitios />} />
        <Route path="/Panelcontrol" element={<PanelControl />} />
        <Route path="/PanelcontrolSedes" element={<PanelcontrolSedes />} />
        <Route path="/PanelcontrolAreas" element={<PanelcontrolAreas />} />
        <Route path="/PanelcontrolAmbientes" element={<PanelcontrolAmbientes />} />
      </Routes>
    </div>
  );
};

export default App;