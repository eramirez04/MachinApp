import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        flexDirection: "row"
    },
    tableColHeader: {
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#E0E0E0'
    },
    tableCol: {
        width: "60%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 'bold'
    },
    tableCell: {
        margin: 5,
        fontSize: 12
    }
});

const GenerarPdf = ({ data }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>ID Mantenimiento: {data.idMantenimiento}</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Código Mantenimiento:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.mant_codigo_mantenimiento}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Fecha Realización:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{new Date(data.mant_fecha_realizacion).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Fecha Próxima:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{new Date(data.mant_fecha_proxima).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Descripción:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.mant_descripcion}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Referencia Máquina:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.referencia_maquina}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Tipo Mantenimiento:</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{data.tipo_mantenimiento}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default GenerarPdf;
