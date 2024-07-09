import React from 'react';

const Alerta = ({ descripcion }) => (
    <div className="alert alert-danger">
        {descripcion}
    </div>
);

export default Alerta;
