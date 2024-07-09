import React from 'react';

const Boton = ({ texto, onClick, tipo = 'button', className }) => (
    <button 
        type={tipo}
        onClick={onClick}
        className={className} 
    >
        {texto}
    </button>
);

export default Boton;

