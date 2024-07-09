import React from 'react';
import Nav from '../components/molecules/Nav.jsx';
import ListadoMantenimientos from '../components/organisms/ListadoMantenimientos.jsx';

import Layout from "../components/templates/Layout.jsx"

<<<<<<< HEAD
import Nav from '../components/molecules/Nav.jsx'
=======
>>>>>>> 43dd569fd7a778ada6f3d083fcdcae26d661fc43

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