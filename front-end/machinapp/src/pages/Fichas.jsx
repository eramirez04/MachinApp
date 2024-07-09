import React from 'react';
import Nav from '../components/molecules/Nav.jsx';
import ListadoMantenimientos from '../components/organisms/ListadoMantenimientos.jsx';

import Layout from "../components/template/Layout.jsx"





const Fichas = () => {
    return (
        <div className="bg-gray-300">
            <Layout/>
            <Nav/>
            <div>
                <ListadoMantenimientos/>
            </div>
        </div>
    );
};

export default Fichas;