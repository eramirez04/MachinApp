import React from 'react';

const Fecha = ({ id, valor, onChange, clase }) => (
    <input
        type="date"
        id={id}
        value={valor}
        onChange={onChange}
        className={clase}
    />
);

export default Fecha;
