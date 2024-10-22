import { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { axiosCliente } from "../../../index.js";

export const MantenimientoGeneralPDF = () => {
    const [mantenimientos, setMantenimientos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosCliente.get('/mantenimiento/excelconsultavariables');
                setMantenimientos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const styles = StyleSheet.create({
        page: {
            padding: 20,
            flexDirection: 'column',
            position: 'relative'
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'center',
        },
        logoSena: {
            width: 80,
            height: 80,
        },
        logoTIC: {
            width: 120,
            height: 60,
        },
        title: {
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 15,
        },
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },
        tableRow: {
            flexDirection: "row",
        },
        tableColHeader: {
            width: "9.09%", // 100% / 11 columns
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            backgroundColor: '#E0E0E0',
            padding: 4,
        },
        tableCol: {
            width: "9.09%", // 100% / 11 columns
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 4,
        },
        tableCellHeader: {
            fontSize: 9,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        tableCell: {
            fontSize: 8,
            textAlign: 'left',
            wordWrap: 'break-word',
        },
        pageNumber: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            fontSize: 8,
            color: 'gray'
        }
    });

    const TableHeader = () => (
        <View style={styles.tableRow} fixed>
            {[
                'Placa SENA', 'Código Mantenimiento', 'Fecha Realización', 'Proximo mantenimiento',
                'Nombre', 'Costo Final', 'Descripción Mantenimiento', 'Tipo Mantenimiento',
                'Sitio', 'Prioridad', 'Nombre Repuesto', 'Costo Total Repuestos'
            ].map((header, index) => (
                <View key={index} style={styles.tableColHeader}>
                    <Text style={styles.tableCellHeader}>{header}</Text>
                </View>
            ))}
        </View>
    );

    const TableContent = ({ data }) => (
        <>
            {data.map((mantenimiento, index) => (
                <View key={index} style={styles.tableRow} wrap={false}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.fi_placa_sena}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.codigo_mantenimiento}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{new Date(mantenimiento.man_fecha_realizacion).toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{new Date(mantenimiento.mant_fecha_proxima).toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.nombre}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.mant_costo_final}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.descripcion_mantenimiento}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.tipo_mantenimiento}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.sede_nombre}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.soli_prioridad}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.par_nombre_repuesto}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{mantenimiento.par_costo_total}</Text>
                    </View>
                </View>
            ))}
        </>
    );

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.header} fixed>
                    <Image style={styles.logoSena} src="/logoSenaNaranja.png" />
                    <Image style={styles.logoTIC} src="/def_LOGOTIC.jpg" />
                </View>
                <Text style={styles.title} fixed>Información general de mantenimientos</Text>
                <View style={styles.table}>
                    <TableHeader />
                    <TableContent data={mantenimientos} />
                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
};