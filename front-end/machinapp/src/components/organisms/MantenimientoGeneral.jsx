import React, { useEffect, useState } from 'react';
import {axiosCliente} from "../../service/api/axios.js"
import MantenimientoGeneralPDF from './MantenimientoGeneralPDF.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Fecha from '../atoms/Fecha.jsx';
import Tabla from '../atoms/Tabla.jsx';


const MantenimientoGeneral = () => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [fechaBusqueda, setFechaBusqueda] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const fetchMantenimientos = async () => {
        try {
            let url = `mantenimiento/listarRequerimiento16/${fechaBusqueda}`;
            const response = await axiosCliente.get(url);
            if (response.data.length === 0) {
                setMensajeError("No se encontraron requerimientos de mantenimiento en la base de datos para la fecha de realización proporcionada.");
            } else {
                setMensajeError('');
            }
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
        if (fechaBusqueda) {
            fetchMantenimientos();
        }
    }, [fechaBusqueda]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFechaBusqueda(selectedDate);
    };

    return (
        <div className="text-xl font-bold mb-4 text-center justify-center">
            <h1 className="text-xl font-bold mb-4 text-black text-center justify-center">
                Mantenimiento General
                <Fecha value={fechaBusqueda} onChange={handleDateChange} className="ml-4 border border-gray-400 rounded px-2 py-1" />
            </h1>
            {mensajeError && <p className="text-red-500">{mensajeError}</p>}
            {mantenimientos.length > 0 && (
                <div className="flex justify-center mx-auto my-4 overflow-x-auto max-w-7xl max-h-screen-lg shadow-md sm:rounded-lg">
                    <Tabla className="text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-lg border-collapse border border-black">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border border-black">
                            <Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">ID del mantenimiento</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Referencia de máquina</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Código de mantenimiento</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Descripción del mantenimiento</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Fecha de realización</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Estado de la máquina</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Nombre de la actividad</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Tipo de mantenimiento</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Fecha de inicio de garantía</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Fecha de fin de garantía</Tabla>
                                <Tabla className="px-3 py-2 sm:py-3 border border-black">Descripción de garantía</Tabla>
                            </Tabla>
                        </thead>
                        <tbody>
                            {mantenimientos.map(mantenimiento => (
                                <Tabla key={mantenimiento.idMantenimiento} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <Tabla className="px-3 py-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-black">{mantenimiento.idMantenimiento}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.referencia_maquina}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.codigo_mantenimiento}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.descripcion_mantenimiento}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.fecha_realizacion}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.estado_maquina}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.acti_nombre}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.tipo_mantenimiento}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.fi_fecha_inicio_garantia}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.fi_fecha_fin_garantia}</Tabla>
                                    <Tabla className="px-3 py-2 sm:py-4 border border-black">{mantenimiento.fi_descripcion_garantia}</Tabla>
                                </Tabla>
                            ))}
                        </tbody>
                    </Tabla>
                </div>
            )}
            {mantenimientos.length > 0 && (
                <PDFDownloadLink
                    document={<MantenimientoGeneralPDF mantenimientos={mantenimientos} />}
                    fileName="mantenimientos.pdf"
                    className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 justify-center"
                >
                    Descargar PDF
                </PDFDownloadLink>
            )}
        </div>
    );
};

export default MantenimientoGeneral;
