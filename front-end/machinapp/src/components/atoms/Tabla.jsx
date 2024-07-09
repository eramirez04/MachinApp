import React from 'react';

const Tabla = ({ children, clase }) => (
    <table className={clase}>
        {children}
    </table>
);

export default Tabla;
