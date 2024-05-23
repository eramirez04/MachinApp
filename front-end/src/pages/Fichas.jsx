import React from 'react';
import { Link } from 'react-router-dom';
import api from '../components/Api';
import Nav from '../components/Nav';
import HeaderFichas from '../components/mantenimiento_componentes/HeaderFicha';
import RegistroMantenimientos from '../components/mantenimiento_componentes/RegistroMantenimiento'; 
import BarraDeBusqueda from '../components/mantenimiento_componentes/BuscarMantenimiento';
import ListarFichas from '../components/mantenimiento_componentes/ListarFichas';
import Layout from "../pages/Layout/Layout"


const Fichas = () => {
    return (
        <div className="bg-gray-300">
            <Layout/>
            <Nav/>
            <div className="flex items-center justify-center px-4 py-2">
                <BarraDeBusqueda />
                <span style={{ margin: '0 10px' }}></span>
                <div className="flex">
                    <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Añadir</button>
                    <span style={{ margin: '0 10px' }}></span>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box w-full max-w-lg">
                            <RegistroMantenimientos />
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
            <div>
                <ListarFichas/>
            </div>
        </div>
    );
};

export default Fichas;
