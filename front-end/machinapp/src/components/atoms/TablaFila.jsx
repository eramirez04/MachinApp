import React from 'react';

const TablaFila = ({ children, clase }) => (
    <tr className={clase}>
        {children}
    </tr>
);

export default TablaFila;
