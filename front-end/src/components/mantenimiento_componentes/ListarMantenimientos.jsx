import React, { useEffect, useState } from 'react';
import api from '../Api';

const ListarMantenimientos = () => {
    const [mantenimientos, setMantenimientos] = useState([]);

    const fetchMantenimientos = async () => {
        try {
            const response = await api.get('mantenimiento/listar');
            setMantenimientos(response.data); 
        } catch (error) {
            console.error('Error obteniendo los mantenimientos:', error);
        }
    };

    const eliminarMantenimiento = async (idMantenimiento) => {
        try {
            const response = await api.delete(`mantenimiento/Eliminar_mantenimiento/${idMantenimiento}`);
            if (response.status === 200) {
                setMantenimientos(mantenimientos.filter(m => m.idMantenimiento !== idMantenimiento));
            } else {
                console.error('Error eliminando el mantenimiento:', response.data.menssage);
            }
        } catch (error) {
            console.error('Error eliminando el mantenimiento:', error);
        }
    };

    const confirmarEliminacion = (idMantenimiento, codigo) => {
        if (window.confirm(`¿Deseas eliminar el mantenimiento con código ${codigo}?`)) {
            eliminarMantenimiento(idMantenimiento);
        }
    };

    useEffect(() => {
        fetchMantenimientos();
        
        const intervalId = setInterval(() => {
            fetchMantenimientos();
        }, 5000); 
        
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold mb-4 text-black text-center justify-center">Listado de Mantenimientos</h1>
            <div className="flex justify-center overflow-x-auto shadow-md sm:rounded-lg">
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
                        <tr>
                            <th scope="col" className="px-2 py-3">ID</th>
                            <th scope="col" className="px-2 py-3">Código</th>
                            <th scope="col" className="px-2 py-3">Fecha Realiz.</th>
                            <th scope="col" className="px-2 py-3">Fecha Próx.</th>
                            <th scope="col" className="px-2 py-3">Descripción</th>
                            <th scope="col" className="px-2 py-3">Referencia de la maquina</th>
                            <th scope="col" className="px-2 py-3">Tipo de mantenimiento</th>
                            <th scope="col" className="px-2 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mantenimientos.map(mantenimiento => (
                            <tr key={mantenimiento.idMantenimiento} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{mantenimiento.idMantenimiento}</td>
                                <td className="px-2 py-4">{mantenimiento.mant_codigo_mantenimiento}</td>
                                <td className="px-2 py-4">{new Date(mantenimiento.mant_fecha_realizacion).toLocaleDateString()}</td>
                                <td className="px-2 py-4">{new Date(mantenimiento.mant_fecha_proxima).toLocaleDateString()}</td>
                                <td className="px-2 py-4">{mantenimiento.mant_descripcion}</td>
                                <td className="px-2 py-4">{mantenimiento.referencia_maquina}</td>
                                <td className="px-2 py-4">{mantenimiento.tipo_mantenimiento}</td>
                                <td className="px-2 py-4">
                                    <button 
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mb-2 block w-full"
                                        onClick={() => confirmarEliminacion(mantenimiento.idMantenimiento, mantenimiento.mant_codigo_mantenimiento)}
                                    >
                                        Eliminar
                                    </button>
                                    <button 
                                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded block w-full"
                                    >
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListarMantenimientos;
