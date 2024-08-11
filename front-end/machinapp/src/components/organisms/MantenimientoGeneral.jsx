import { useState, useEffect } from 'react';
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { axiosCliente } from "../../service/api/axios.js";
import MantenimientoGeneralPDF from './MantenimientoGeneralPDF.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PaginateTable } from '../organisms/table/PaginateTable.jsx'; 

const MantenimientoGeneral = () => {
    const [mensajeError, setMensajeError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tipos, setTipos] = useState([]);

    const list = useAsyncList({
        async load({ signal }) {
            try {
                const response = await axiosCliente.get('mantenimiento/listar', { signal });

                if (response.data.length === 0) {
                    setMensajeError("No se encontraron mantenimientos.");
                    return { items: [] };
                }

                setMensajeError('');
                const mantenimientosFormateados = response.data.map(mantenimiento => ({
                    ...mantenimiento,
                    mant_fecha_proxima: new Date(mantenimiento.fecha_realizacion).toLocaleDateString('es-ES')
                }));

                setAllItems(mantenimientosFormateados);
                setFilteredItems(mantenimientosFormateados);

                const estadosUnicos = [...new Set(mantenimientosFormateados.map(item => item.estado_maquina))].filter(Boolean);
                setEstados(estadosUnicos);

                const tiposUnicos = [...new Set(mantenimientosFormateados.map(item => item.tipo_mantenimiento))].filter(Boolean);
                setTipos(tiposUnicos);

                return {
                    items: mantenimientosFormateados,
                };
            } catch (error) {
                if (error.name !== 'CanceledError') {
                    const errorMessage = error.response 
                    setMensajeError(errorMessage);
                }
                return { items: [] };
            }
        }
    });

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore: false,
        onLoadMore: list.loadMore
    });

    useEffect(() => {
        list.reload();
    }, []);

    const handleSearch = (term) => {
        let filtered = allItems;
        setSearchTerm(term);

        if (term.trim() !== '') {
            const searchTermLower = term.toLowerCase();
            filtered = filtered.filter(item => 
                item.codigo_mantenimiento && item.codigo_mantenimiento.toLowerCase().includes(searchTermLower)
            );
        }

        if (estadoSeleccionado !== '') {
            filtered = filtered.filter(item => 
                item.estado_maquina && item.estado_maquina.toLowerCase() === estadoSeleccionado.toLowerCase()
            );
        }

        if (tipoSeleccionado !== '') {
            filtered = filtered.filter(item => 
                item.tipo_mantenimiento && item.tipo_mantenimiento.toLowerCase() === tipoSeleccionado.toLowerCase()
            );
        }

        setFilteredItems(filtered);
    };

    useEffect(() => {
        handleSearch(searchTerm);
    }, [estadoSeleccionado, tipoSeleccionado]);

    const columns = [
        'ID', 'Referencia', 'Código', 'Fecha próxima',
        'Estado de la actividad', 'Tipo', 'Nombre actividad', 'Acciones'
    ];

    const data = filteredItems.map(item => ({
        idMantenimiento: item.idMantenimiento,
        referencia_maquina: item.referencia_maquina,
        codigo_mantenimiento: item.codigo_mantenimiento,
        fecha_realizacion: item.fecha_realizacion,
        estado_maquina: item.estado_maquina,
        tipo_mantenimiento: item.tipo_mantenimiento,
        acti_nombre: item.acti_nombre,
        acciones: (
            <Button className="w-8 h-8 flex items-center justify-center bg-green-700 text-white rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </Button>
        )
    }));

    return (
        <div className="text-xs font-light mb-1 p-2">
            <div className="flex flex-col items-center mb-1 space-y-2"> 
                <h1 className="text-base font-bold text-black"> {/* Ajusta el tamaño del título */}
                    Mantenimiento General
                </h1>
                <div className="flex flex-col md:flex-row gap-6 justify-start items-center w-full"> 
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar por código..."
                        aria-label="Buscar mantenimientos"
                        className="w-1/8 md:w-1/6 text-xxxs p-0" 
                    />
                    <Select
                        placeholder="Seleccionar estado"
                        aria-label="Seleccionar estado"
                        value={estadoSeleccionado}
                        onChange={(e) => setEstadoSeleccionado(e.target.value)}
                        className="w-11/12 md:w-1/4 text-xxs p-0.25" 
                    >
                        {estados.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                                {estado}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        placeholder="Seleccionar tipo"
                        aria-label="Seleccionar tipo"
                        value={tipoSeleccionado}
                        onChange={(e) => setTipoSeleccionado(e.target.value)}
                        className="w-11/12 md:w-1/4 text-xxs p-0.25" 
                    >
                        {tipos.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                                {tipo}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="m-1">
                {mensajeError && <p className="text-red-500 text-xs">{mensajeError}</p>}
                <div className="w-full">
                    <PaginateTable 
                        columns={columns} 
                        data={data} 
                        itemsPerPage={8} 
                    />
                </div>
                {filteredItems.length > 0 && (
                    <div className="mt-1 flex justify-center">
                        <PDFDownloadLink 
                            document={<MantenimientoGeneralPDF mantenimientos={filteredItems} />}
                            fileName="mantenimientos.pdf"
                            className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs flex items-center space-x-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span>Descargar PDF</span>
                        </PDFDownloadLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MantenimientoGeneral;
