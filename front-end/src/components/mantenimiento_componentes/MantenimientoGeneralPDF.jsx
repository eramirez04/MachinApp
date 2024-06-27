import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const MantenimientoGeneralPDF = ({ mantenimientos }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 20
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
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

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Mantenimiento General</Text>
                {mantenimientos.map(mantenimiento => (
                    <View key={mantenimiento.idMantenimiento} style={styles.section}>
                        <Text style={styles.subtitle}>Referencia: {mantenimiento.referencia_maquina}</Text>
                        <Text style={styles.text}>Código: {mantenimiento.codigo_mantenimiento}</Text>
                        <Text style={styles.text}>Descripción: {mantenimiento.descripcion_mantenimiento}</Text>
                        <Text style={styles.text}>Fecha de realización: {mantenimiento.fecha_realizacion}</Text>
                        <Text style={styles.text}>Estado de la máquina: {mantenimiento.estado_maquina}</Text>
                        <Text style={styles.text}>Nombre de la actividad: {mantenimiento.acti_nombre}</Text>
                        <Text style={styles.text}>Tipo de mantenimiento: {mantenimiento.tipo_mantenimiento}</Text>
                        <Text style={styles.text}>Fecha inicio garantía: {mantenimiento.fi_fecha_inicio_garantia}</Text>
                        <Text style={styles.text}>Fecha fin garantía: {mantenimiento.fi_fecha_fin_garantia}</Text>
                        <Text style={styles.text}>Descripción garantía: {mantenimiento.fi_descripcion_garantia}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default MantenimientoGeneralPDF;
