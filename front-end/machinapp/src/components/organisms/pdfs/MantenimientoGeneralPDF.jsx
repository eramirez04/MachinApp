import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export const MantenimientoGeneralPDF = ({ mantenimientos }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 20,
            flexDirection: 'column',
            position: 'relative'
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
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
            width: "10%",
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            backgroundColor: '#E0E0E0',
            padding: 5,
        },
        tableCol: {
            width: "10%",
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 5,
        },
        tableCellHeader: {
            fontSize: 10,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        tableCell: {
            fontSize: 10,
            textAlign: 'center',
            wordWrap: 'break-word',
        },
        tableColWideHeader: {
            width: "20%",
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            backgroundColor: '#E0E0E0',
            padding: 5,
        },
        tableColWide: {
            width: "20%",
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 5,
        },
        pageNumber: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            fontSize: 8,
            color: 'gray'
        }
    });

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <Text style={styles.title}>Mantenimiento General</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Referencia</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Código</Text>
                        </View>
                        <View style={styles.tableColWideHeader}>
                            <Text style={styles.tableCellHeader}>Descripción</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Fecha Realización</Text>
                        </View>
                        <View style={styles.tableColWideHeader}>
                            <Text style={styles.tableCellHeader}>Estado Máquina</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Nombre Actividad</Text>
                        </View>
                        <View style={styles.tableColWideHeader}>
                            <Text style={styles.tableCellHeader}>Tipo Mantenimiento</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Fecha Inicio Garantía</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Fecha Fin Garantía</Text>
                        </View>
                        <View style={styles.tableColWideHeader}>
                            <Text style={styles.tableCellHeader}>Descripción Garantía</Text>
                        </View>
                    </View>
                    {mantenimientos.map(mantenimiento => (
                        <View key={mantenimiento.idMantenimiento} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{mantenimiento.referencia_maquina}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{mantenimiento.codigo_mantenimiento}</Text>
                            </View>
                            <View style={styles.tableColWide}>
                                <Text style={styles.tableCell}>{mantenimiento.descripcion_mantenimiento}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{mantenimiento.fecha_realizacion}</Text>
                            </View>
                            <View style={styles.tableColWide}>
                                <Text style={styles.tableCell}>{mantenimiento.estado_maquina}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{mantenimiento.acti_nombre}</Text>
                            </View>
                            <View style={styles.tableColWide}>
                                <Text style={styles.tableCell}>{mantenimiento.tipo_mantenimiento}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{mantenimiento.fi_fecha_inicio_garantia}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{mantenimiento.fi_fecha_fin_garantia}</Text>
                            </View>
                            <View style={styles.tableColWide}>
                                <Text style={styles.tableCell}>{mantenimiento.fi_descripcion_garantia}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `Página ${pageNumber} de ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};
