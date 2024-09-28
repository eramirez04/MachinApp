import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DocumentArrowDownIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { toast } from "react-toastify";

import { ExcelMantenimientos } from '../../organisms/excel/ExcelMantenimientos.jsx';

import { 
  MantenimientoGeneralPDF, 
  axiosCliente, 
  PaginateTable, 
  SearchComponent,
  VistaPDF,
  Breadcrumb
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

            /* toast.success(t("mantenimientos_cargados_exitosamente")); */

        } catch (error) {
            const errorMessage = error.response?.data?.message || t("error_cargar_mantenimientos");
            setMensajeError(errorMessage);
            toast.error(errorMessage);
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
        /* toast.info(`${filtered.length} ${t("mantenimientos_encontrados")}`); */
    };

    useEffect(() => {
        handleSearch('');
    }, [estadoSeleccionado, tipoSeleccionado]);

    const columns = [
        t('referencia'), t('codigo'), t('fecha_proxima'),
        t('estado_actividad'), t('tipo'), t('nombre_actividad'), t('acciones')
    ];

    const data = filteredItems.map(item => ({
        referencia_maquina: item.referencia_maquina,
        codigo_mantenimiento: item.codigo_mantenimiento,
        fecha_realizacion: item.fecha_realizacion,
        estado_maquina: item.estado_maquina,
        tipo_mantenimiento: item.tipo_mantenimiento,
        acti_nombre: item.acti_nombre,
        acciones: (
            <div className="flex space-x-2">
                <VistaPDF item={item} />
            </div>
        )
    }));

    return (
        <div className="p-6 flex flex-col gap-8">
            <Breadcrumb pageName={t("mantenimiento_general")} />
                <div className="w-full bg-white rounded-lg shadow-md">
                    <div className="flex flex-col p-4 bg-white border-b space-y-4">
                    
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                                <SearchComponent
                                    label={`${t("codigo")}, ${t("referencia")}, ${t("estado")}, ${t("tipo")}`}
                                    onSearch={handleSearch}
                                    className="w-full sm:w-40 lg:w-60"
                                />
                                <Select
                                    placeholder={t('seleccionar_estado')}
                                    aria-label={t('seleccionar_estado')}
                                    value={estadoSeleccionado}
                                    onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                    className="w-full sm:w-40 lg:w-60"
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
                                    className="w-full sm:w-40 lg:w-60"
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
                                        {({ blob, url, loading, error }) =>
                                            loading ? (
                                                <Button color="primary" disabled>
                                                    {t('cargando')}
                                                </Button>
                                            ) : (
                                                <Button
                                                    color="primary"
                                                    startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
                                                    className="text-white text-xs sm:text-sm"
                                                    onClick={() => toast.success(t('pdf_descargado_exitosamente'))}
                                                >
                                                    {t('descargar_pdf')}
                                                </Button>
                                            )
                                        }
                                    </PDFDownloadLink>
                                    <ExcelMantenimientos 
                                        mantenimientos={filteredItems} 
                                        onDownloadSuccess={() => toast.success(t('excel_descargado_exitosamente'))}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full p-4">
                        <span className="text-gray-600 text-sm md:text-base flex items-center mb-4">
                            <ClipboardDocumentListIcon className="h-5 w-5 mr-1" />
                            {t("total_mantenimientos")}: {filteredItems.length}
                        </span>
                        <div className="w-full">
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