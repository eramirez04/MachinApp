import  { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Input, Select, Button, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { axiosCliente } from "../../service/api/axios.js";
import MantenimientoGeneralPDF from './MantenimientoGeneralPDF.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';

const MantenimientoGeneral = () => {
   
    const [mensajeError, setMensajeError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [estados, setEstados] = useState([]);

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
                    mant_fecha_proxima: mantenimiento.fecha_realizacion
                }));

                setAllItems(mantenimientosFormateados);
                setFilteredItems(mantenimientosFormateados);

                const estadosUnicos = [...new Set(mantenimientosFormateados.map(item => item.estado_maquina))].filter(Boolean);
                setEstados(estadosUnicos);

                return {
                    items: mantenimientosFormateados,
                };
            } catch (error) {
                console.error('Error obteniendo los mantenimientos:', error);
                if (error.response.name !== 'CanceledError') {
                    setMensajeError("Error al cargar los mantenimientos: " + error.message);
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

    const handleSearch = () => {
        let filtered = allItems;

        if (searchTerm.trim() !== '') {
            const searchTermLower = searchTerm.toLowerCase();
            filtered = filtered.filter(item => 
                item.idMantenimiento.toString().includes(searchTermLower) ||
                (item.codigo_mantenimiento && item.codigo_mantenimiento.toLowerCase().includes(searchTermLower)) ||
                (item.fecha_realizacion && item.fecha_realizacion.toLowerCase().includes(searchTermLower)) ||
                (item.estado_maquina && item.estado_maquina.toLowerCase().includes(searchTermLower)) ||
                (item.referencia_maquina && item.referencia_maquina.toLowerCase().includes(searchTermLower)) ||
                (item.tipo_mantenimiento && item.tipo_mantenimiento.toLowerCase().includes(searchTermLower)) ||
                (item.fi_fecha_inicio_garantia && item.fi_fecha_inicio_garantia.toLowerCase().includes(searchTermLower)) ||
                (item.fi_fecha_fin_garantia && item.fi_fecha_fin_garantia.toLowerCase().includes(searchTermLower)) ||
                (item.fi_descripcion_garantia && item.fi_descripcion_garantia.toLowerCase().includes(searchTermLower)) ||
                (item.acti_nombre && item.acti_nombre.toLowerCase().includes(searchTermLower))
            );
        }

        if (estadoSeleccionado !== '') {
            filtered = filtered.filter(item => 
                item.estado_maquina && item.estado_maquina.toLowerCase() === estadoSeleccionado.toLowerCase()
            );
        }

        setFilteredItems(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [estadoSeleccionado]);

    return (
        <div className="text-xl font-bold mb-4 text-center justify-center">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-black">
                    Mantenimiento General
                </h1>
            </div>

            <div className="flex gap-2 mb-4">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por ID, código, fecha, referencia o tipo..."
                    className="max-w-xs"
                />
                <Select
                    placeholder="Seleccionar estado"
                    value={estadoSeleccionado}
                    onChange={(e) => setEstadoSeleccionado(e.target.value)}
                    className="max-w-xs"
                >
                    {estados.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                            {estado}
                        </SelectItem>
                    ))}
                </Select>
                <Button onPress={handleSearch}>Buscar</Button>
            </div>

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
                    <TableColumn>Fecha próxima</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Tipo</TableColumn>
                    <TableColumn>Fecha inicio garantía</TableColumn>
                    <TableColumn>Fecha fin garantía</TableColumn>
                    <TableColumn>Descripción garantía</TableColumn>
                    <TableColumn>Nombre actividad</TableColumn>
                </TableHeader>
                <TableBody
                    items={filteredItems}
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
                            <TableCell>{item.tipo_mantenimiento}</TableCell>
                            <TableCell>{item.fi_fecha_inicio_garantia}</TableCell>
                            <TableCell>{item.fi_fecha_fin_garantia}</TableCell>
                            <TableCell>{item.fi_descripcion_garantia}</TableCell>
                            <TableCell>{item.acti_nombre}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {filteredItems.length > 0 && (
                <PDFDownloadLink
                    document={<MantenimientoGeneralPDF mantenimientos={filteredItems} />}
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