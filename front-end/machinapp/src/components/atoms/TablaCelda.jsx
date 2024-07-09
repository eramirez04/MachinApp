import React from 'react';

const TablaCelda = ({ children, clase }) => (
    <td className={clase}>
        {children}
    </td>
);

export default TablaCelda;
