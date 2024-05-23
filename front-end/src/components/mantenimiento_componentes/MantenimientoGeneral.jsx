import React, { useEffect, useState } from 'react';
import api from '../Api';


const MantenimientoGeneral = () => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [fechaBusqueda, setFechaBusqueda] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const fetchMantenimientos = async () => {
        try {
            let url = `http://localhost:3000/mantenimiento/listarRequerimiento16/${fechaBusqueda}`;
            const response = await api.get(url);
            if (response.data.length === 0) {
                setMensajeError("No se encontraron requerimientos de mantenimiento en la base de datos para la fecha de realización proporcionada.");
            } else {
                setMensajeError('');
            }
            // Formatear las fechas directamente en el mapeo
            const mantenimientosFormateados = response.data.map(mantenimiento => ({
                ...mantenimiento,
                fecha_realizacion: new Date(mantenimiento.fecha_realizacion).toLocaleDateString(),
                fi_fecha_inicio_garantia: new Date(mantenimiento.fi_fecha_inicio_garantia).toLocaleDateString(),
                fi_fecha_fin_garantia: new Date(mantenimiento.fi_fecha_fin_garantia).toLocaleDateString()
            }));
            setMantenimientos(mantenimientosFormateados);
        } catch (error) {
            console.error('Error obteniendo los mantenimientos:', error);
        }
    };

    useEffect(() => {
        fetchMantenimientos();
    }, [fechaBusqueda]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFechaBusqueda(selectedDate);
    };

    return (
        <div className="text-xl font-bold mb-4 text-center justify-center">
            <h1 className="text-xl font-bold mb-4 text-black text-center justify-center">
                Mantenimiento General
                <input type="date" value={fechaBusqueda} onChange={handleDateChange} className="ml-4 border border-gray-400 rounded px-2 py-1" />
            </h1>
            {mensajeError && <p className="text-red-500">{mensajeError}</p>}
            {mantenimientos.length > 0 && (
        <div className="flex justify-center mx-auto my-4 overflow-x-auto max-w-7xl max-h-screen-lg shadow-md sm:rounded-lg">
        <table className="text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
                <tr>
                    <th scope="col" className="px-3 py-2 sm:py-3">ID del mantenimiento</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Referencia de máquina</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Código de mantenimiento</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Descripción del mantenimiento</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Fecha de realización</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Estado de la máquina</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Nombre de la actividad</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Tipo de mantenimiento</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Fecha de inicio de garantía</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Fecha de fin de garantía</th>
                    <th scope="col" className="px-3 py-2 sm:py-3">Descripción de garantía</th>
                </tr>
            </thead>
            <tbody>
            {mantenimientos.map(mantenimiento => (
                <tr key={mantenimiento.idMantenimiento} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-1 py-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{mantenimiento.idMantenimiento}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.referencia_maquina}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.codigo_mantenimiento}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.descripcion_mantenimiento}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.fecha_realizacion}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.estado_maquina}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.acti_nombre}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.tipo_mantenimiento}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.fi_fecha_inicio_garantia}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.fi_fecha_fin_garantia}</td>
                    <td className="px-3 py-2 sm:py-4">{mantenimiento.fi_descripcion_garantia}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    
    )}
    <button onClick={() => {
        const confirmacion = window.confirm("¿Deseas descargar el PDF?");
        if (confirmacion) {
            /* Agrega aquí la función para descargar PDF */
            alert("Descargando PDF...");
        } else {
            alert("Operación cancelada");
        }
        }} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 justify-center">
            Descargar PDF
    </button>
</div>



    );
};

export default MantenimientoGeneral;
