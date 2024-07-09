// eslint-disable-next-line no-unused-vars
import React, {lazy} from "react";
import {Routes, Route} from "react-router-dom";

const Inicio = lazy(() => import("./pages/Inicio"));
const Home = lazy(() => import("./pages/auth/Home"));
const Perfil = lazy(() => import("./pages/auth/Perfil.jsx"));
const FIchas = lazy(() => import("./pages/Fichas"));
const Historial = lazy(() => import("./pages/Historial"));
const Maquinas = lazy(() => import("./pages/Maquinas"));
const Sitios = lazy(() => import("./pages/Sitios"));
const PanelControl = lazy(() => import("./pages/PaneldeControl"));


const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/perfil/" element={<Perfil/>}/>
                <Route path="/FIchas" element={<FIchas/>}/>
                <Route path="/Historial" element={<Historial/>}/>
                <Route path="/Maquinas" element={<Maquinas/>}/>
                <Route path="/Sitios" element={<Sitios/>}/>
                <Route path="/Panelcontrol" element={<PanelControl/>}/>
                <Route path="/recuperar" element={<PanelControl/>}/>

            </Routes>
        </div>
    );
};

export default App;
