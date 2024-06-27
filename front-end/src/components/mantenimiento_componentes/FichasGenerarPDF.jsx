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
    subtitle: {
        fontSize: 18,
        marginBottom: 10
    },
    text: {
        fontSize: 12,
        marginBottom: 5
    }
});

const GenerarPdf = ({ data }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>ID Mantenimiento: {data.idMantenimiento}</Text>
                    <Text style={styles.text}>Código Mantenimiento: {data.mant_codigo_mantenimiento}</Text>
                    <Text style={styles.text}>Fecha Realización: {new Date(data.mant_fecha_realizacion).toLocaleDateString()}</Text>
                    <Text style={styles.text}>Fecha Próxima: {new Date(data.mant_fecha_proxima).toLocaleDateString()}</Text>
                    <Text style={styles.text}>Descripción: {data.mant_descripcion}</Text>
                    <Text style={styles.text}>Referencia Máquina: {data.referencia_maquina}</Text>
                    <Text style={styles.text}>Tipo Mantenimiento: {data.tipo_mantenimiento}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default GenerarPdf;
