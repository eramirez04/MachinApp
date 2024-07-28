import  { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { axiosCliente } from "../../service/api/axios.js";
import MantenimientoGeneralPDF from './MantenimientoGeneralPDF.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Fecha from '../atoms/Inputs/Fecha.jsx';

const MantenimientoGeneral = () => {
    const [fechaBusqueda, setFechaBusqueda] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const list = useAsyncList({
        async load({ signal, cursor }) {
            if (!fechaBusqueda) return { items: [] };

            try {
                const url = cursor || `mantenimiento/listarRequerimiento16/${fechaBusqueda}`;
                const response = await axiosCliente.get(url, { signal });
                
                if (response.data.length === 0) {
                    setMensajeError("No se encontraron requerimientos de mantenimiento para la fecha proporcionada.");
                    return { items: [] };
                }

                setMensajeError('');
                const mantenimientosFormateados = response.data.map(mantenimiento => ({
                    ...mantenimiento,
                    fecha_realizacion: new Date(mantenimiento.fecha_realizacion).toLocaleDateString(),
                    fi_fecha_inicio_garantia: new Date(mantenimiento.fi_fecha_inicio_garantia).toLocaleDateString(),
                    fi_fecha_fin_garantia: new Date(mantenimiento.fi_fecha_fin_garantia).toLocaleDateString()
                }));

                return {
                    items: mantenimientosFormateados,
                    cursor: null // Ajusta esto si tu API soporta paginación
                };
            } catch (error) {
                console.error('Error obteniendo los mantenimientos:', error);
                setMensajeError("Error al cargar los datos.");
                return { items: [] };
            }
        }
    });

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore: false, // Cambia a true si implementas paginación en el backend
        onLoadMore: list.loadMore
    });

    useEffect(() => {
        if (fechaBusqueda) {
            list.reload();
        }
    }, [fechaBusqueda]);

    const handleDateChange = (e) => {
        setFechaBusqueda(e.target.value);
    };

    return (
        <div className="text-xl font-bold mb-4 text-center justify-center">
            <h1 className="text-xl font-bold mb-4 text-black text-center justify-center">
                Mantenimiento General
                <Fecha value={fechaBusqueda} onChange={handleDateChange} className="ml-4 border border-gray-400 rounded px-2 py-1" />
            </h1>
            {mensajeError && <p className="text-red-500">{mensajeError}</p>}
            <Table
                aria-label="Tabla de mantenimientos"
                baseRef={scrollerRef}
                bottomContent={
                    list.isLoading ? (
                        <div className="flex w-full justify-center">
                            <Spinner ref={loaderRef} color="primary" />
                        </div>
                    ) : null
                }
                classNames={{
                    base: "max-h-[70vh] overflow-scroll",
                    table: "min-h-[400px]",
                }}
            >
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Referencia de máquina</TableColumn>
                    <TableColumn>Código</TableColumn>
                    <TableColumn>Descripción</TableColumn>
                    <TableColumn>Fecha de realización</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Actividad</TableColumn>
                    <TableColumn>Tipo</TableColumn>
                    <TableColumn>Inicio garantía</TableColumn>
                    <TableColumn>Fin garantía</TableColumn>
                    <TableColumn>Descripción garantía</TableColumn>
                </TableHeader>
                <TableBody
                    items={list.items}
                    loadingContent={<Spinner color="primary" />}
                >
                    {(item) => (
                        <TableRow key={item.idMantenimiento}>
                            <TableCell>{item.idMantenimiento}</TableCell>
                            <TableCell>{item.referencia_maquina}</TableCell>
                            <TableCell>{item.codigo_mantenimiento}</TableCell>
                            <TableCell>{item.descripcion_mantenimiento}</TableCell>
                            <TableCell>{item.fecha_realizacion}</TableCell>
                            <TableCell>{item.estado_maquina}</TableCell>
                            <TableCell>{item.acti_nombre}</TableCell>
                            <TableCell>{item.tipo_mantenimiento}</TableCell>
                            <TableCell>{item.fi_fecha_inicio_garantia}</TableCell>
                            <TableCell>{item.fi_fecha_fin_garantia}</TableCell>
                            <TableCell>{item.fi_descripcion_garantia}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {list.items.length > 0 && (
                <PDFDownloadLink
                    document={<MantenimientoGeneralPDF mantenimientos={list.items} />}
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