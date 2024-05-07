import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import FIchas from "./pages/Fichas";
import Historial from "./pages/Historial";
import Maquinas from "./pages/Maquinas";
import Sitios from "./pages/Sitios";
import PanelControl from "./pages/PaneldeControl";


//borrar
import RegistroUsuarios from "./components/Auth/RegistroUsuarios.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistroUsuarios />} />
        <Route path="/FIchas" element={<FIchas />} />
        <Route path="/Historial" element={<Historial />} />
        <Route path="/Maquinas" element={<Maquinas />} />
        <Route path="/Sitios" element={<Sitios />} />
        <Route path="/Panelcontrol" element={<PanelControl />} />
      </Routes>
    </div>
  );
};

export default App;