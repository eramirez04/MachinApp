import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { PencilSquareIcon, DocumentArrowDownIcon, TableCellsIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

/* Importa el componente Excel */
import { ExcelMantenimientos } from '../../organisms/excel/ExcelMantenimientos.jsx'; 

import { 
  MantenimientoGeneralPDF, 
  GenerarPdf, 
  axiosCliente, 
  PaginateTable, 
  SearchComponent
} from "../../../index.js";

export const MantenimientoGeneral = () => {
    const { t } = useTranslation();
    const [mensajeError, setMensajeError] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosCliente.get('mantenimiento/listar');

            if (response.data.length === 0) {
                setMensajeError(t("no_mantenimientos_encontrados"));
                return;
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

        } catch (error) {
            const errorMessage = error.response?.data?.message || t("error_cargar_mantenimientos");
            setMensajeError(errorMessage);
        }
    };

    const handleSearch = (term) => {
        let filtered = allItems;

        if (term.trim() !== '') {
            const searchTermLower = term.toLowerCase();
            filtered = filtered.filter(item => 
                (item.codigo_mantenimiento && item.codigo_mantenimiento.toLowerCase().includes(searchTermLower)) ||
                (item.referencia_maquina && item.referencia_maquina.toLowerCase().includes(searchTermLower)) ||
                (item.estado_maquina && item.estado_maquina.toLowerCase().includes(searchTermLower)) ||
                (item.tipo_mantenimiento && item.tipo_mantenimiento.toLowerCase().includes(searchTermLower))
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
        handleSearch('');
    }, [estadoSeleccionado, tipoSeleccionado]);

    const columns = [
        t('id'), t('referencia'), t('codigo'), t('fecha_proxima'),
        t('estado_actividad'), t('tipo'), t('nombre_actividad'), t('acciones')
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
                        <PencilSquareIcon className="h-5 w-5" />
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
                            <DocumentArrowDownIcon className="h-5 w-5" />
                        </Button>
                    )}
                </PDFDownloadLink>
            </div>
        )
    }));

    return (
        <div className="min-h-screen p-6 flex flex-col gap-8">
            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between p-4 items-center bg-gray-100 border-b space-y-4 md:space-y-0">
                    <div className="flex flex-wrap gap-2 w-full md:flex-row">
                        <SearchComponent
                            label={`${t("codigo")}, ${t("referencia")}, ${t("estado")}, ${t("tipo")}`}
                            onSearch={handleSearch}
                            className="w-full md:w-40"  
                        />
                        <Select
                            placeholder={t('seleccionar_estado')}
                            aria-label={t('seleccionar_estado')}
                            value={estadoSeleccionado}
                            onChange={(e) => setEstadoSeleccionado(e.target.value)}
                            className="w-full md:w-40"  
                        >
                            {estados.map((estado) => (
                                <SelectItem key={estado} value={estado}>
                                    {estado}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            placeholder={t('seleccionar_tipo')}
                            aria-label={t('seleccionar_tipo')}
                            value={tipoSeleccionado}
                            onChange={(e) => setTipoSeleccionado(e.target.value)}
                            className="w-full md:w-40"  
                        >
                            {tipos.map((tipo) => (
                                <SelectItem key={tipo} value={tipo}>
                                    {tipo}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    {filteredItems.length > 0 && (
                        <div className="flex gap-2">
                            <PDFDownloadLink 
                                document={<MantenimientoGeneralPDF mantenimientos={filteredItems} />}
                                fileName="mantenimientos.pdf"
                            >
                                <Button
                                    color="primary"
                                    startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
                                    className="text-white text-xs md:text-sm"
                                >
                                    {t('descargar_pdf')}
                                </Button>
                            </PDFDownloadLink>
                            <ExcelMantenimientos mantenimientos={filteredItems} />
                        </div>
                    )}
                </div>

                <div className="w-full overflow-x-auto">
                    <span className="text-gray-600 text-sm md:text-base flex items-center">
                        <ClipboardDocumentListIcon className="h-5 w-5 mr-1" />
                        {t("total_mantenimientos")}: {filteredItems.length}
                    </span>
                    <div className="w-full min-w-max">
                        <PaginateTable 
                            columns={columns} 
                            data={data} 
                            itemsPerPage={8} 
                            className="w-full table-auto"
                        />
                    </div>
                </div>
            </div>
            {/* {mensajeError && <p className="text-red-500 text-xs">{mensajeError}</p>} */}
        </div>
    );
};
