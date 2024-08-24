import { useState, useEffect } from 'react';
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { axiosCliente } from "../../../service/api/axios.js";
import MantenimientoGeneralPDF from '../pdf/MantenimientoGeneralPDF.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { GenerarPdf } from '../pdf/PDFMantenimiento.jsx';
import { PaginateTable } from './PaginateTable.jsx';

import { Link } from 'react-router-dom';

//componente de icons
import { Icons } from "../../atoms/icons/Icons.jsx";
import { PencilSquareIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

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
                    const errorMessage = error.response?.data?.message || "Error al cargar los mantenimientos.";
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
            <div className="flex space-x-2">
                <Link to="/Editar_o_ver">
                    <Button color='warning' isIconOnly size='md' className="flex items-center justify-center text-white">
                        <Icons icon={PencilSquareIcon} />
                    </Button>
                </Link>
                
                <PDFDownloadLink
                    document={<GenerarPdf data={item} />}
                    fileName={`mantenimiento_${item.idMantenimiento}.pdf`}
                >
                    {({loading }) => (
                        <Button 
                            color='success' 
                            isIconOnly 
                            size='md' 
                            className="flex items-center justify-center text-white"
                            disabled={loading}
                        >
                            <Icons icon={DocumentArrowDownIcon} />
                        </Button>
                    )}
                </PDFDownloadLink>
            </div>
        )
    }));

    return (
        <div className="text-xs font-light mb-1 p-2">
            <div className="flex flex-col items-center mb-1 space-y-2"> 
                <h1 className="text-base font-bold text-black"> 
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
            <div className="m-1 p-3">
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
                            <Icons icon={DocumentArrowDownIcon} />
                            <span>Descargar PDF</span>
                        </PDFDownloadLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MantenimientoGeneral;