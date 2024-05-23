import React, { useEffect, useState } from 'react';
import api from '../Api';

const ListarFichas = () => {
    const [mantenimientos, setMantenimientos] = useState([]);

    const fetchMantenimientos = async () => {
        try {
            const response = await api.get('mantenimiento/listar');
            setMantenimientos(response.data); 
        } catch (error) {
            console.error('Error obteniendo los mantenimientos:', error);
        }
    };

    useEffect(() => {
        fetchMantenimientos();
        const intervalId = setInterval(() => {
            fetchMantenimientos();
        }, 60000); 
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold mb-4 text-black text-center justify-center">Listado de Mantenimientos</h1>
            <div className="flex flex-wrap justify-center">
                {mantenimientos.map(mantenimiento => (
                    <div key={mantenimiento.idMantenimiento} className="bg-gray-100 shadow-md rounded-lg overflow-hidden m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div className="bg-green-500 h-32"></div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-2 text-gray-800">Código de Mantenimiento: {mantenimiento.mant_codigo_mantenimiento}</h2>
                            <p className="text-gray-700"><strong>Fecha Realización:</strong> {new Date(mantenimiento.mant_fecha_realizacion).toLocaleDateString()}</p>
                            <p className="text-gray-700"><strong>Fecha Próxima:</strong> {new Date(mantenimiento.mant_fecha_proxima).toLocaleDateString()}</p>
                            <p className="text-gray-700"><strong>Descripción:</strong> {mantenimiento.mant_descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListarFichas;

