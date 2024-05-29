import React, { useState } from 'react';

const BarraDeBusqueda = ({ onBuscar }) => {
    const [Mantenimiento, setMantenimiento] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setMantenimiento(event.target.value);
        setError(''); // Limpiar el mensaje de error al cambiar el código de mantenimiento
    };

    const handleClick = async () => {
        const resultado = await onBuscar(Mantenimiento);
        if (!resultado) {
            setError('Código de mantenimiento no encontrado');
        }
    };

    return (
        <div className="flex">
            <input
                type="text"
                value={Mantenimiento}
                onChange={handleChange}
                placeholder="Buscar por código de mantenimiento"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button onClick={handleClick} className="btn ml-2">
                Buscar
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default BarraDeBusqueda;
