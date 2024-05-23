import React from 'react';
import { Link } from 'react-router-dom';
import HeaderFichas from '../components/mantenimiento_componentes/HeaderFicha';
import Nav from '../components/Nav';
import RegistroMantenimientos from '../components/mantenimiento_componentes/RegistroMantenimiento'; 
import ListaMantenimientos from '../components/mantenimiento_componentes/ListarMantenimientos';
import MantenimientoGeneral from '../components/mantenimiento_componentes/MantenimientoGeneral';
import Layout from "../pages/Layout/Layout"



const Mantenimiento = () => {
    return (
        <div className="bg-gray-300">
            <Layout/>
            <Nav/>
            <div className=" items-center px-1 py-2">
                <div>
                    <div>
                        <ListaMantenimientos/> 
                        <MantenimientoGeneral/> 
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Mantenimiento;
