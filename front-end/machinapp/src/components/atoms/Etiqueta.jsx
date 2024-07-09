import React from 'react';

const Etiqueta = ({ htmlFor, texto, clase }) => (
    <label htmlFor={htmlFor} className={clase}>
        {texto}
    </label>
);

export default Etiqueta;
