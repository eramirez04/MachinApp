import React from 'react';

const CampoTexto = ({ id, tipo = 'text', valor, onChange, clase }) => (
    <input
        type={tipo}
        id={id}
        value={valor}
        onChange={onChange}
        className={clase}
    />
);

export default CampoTexto;
