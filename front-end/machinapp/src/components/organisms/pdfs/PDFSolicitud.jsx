import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  subTitle: {
    fontSize: 8,
    textAlign: 'right',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '30%',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    fontSize: 10,
    height: 20,
  },
  priority: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: '1px solid black',
    marginRight: 5,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#FF6600',
    paddingBottom: 2,
  },
  largeInput: {
    borderWidth: 1,
    height: 60,
    marginBottom: 10,
  },
  costSection: {
    alignItems: 'flex-end',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  costInput: {
    borderWidth: 1,
    width: 100,
    height: 20,
    marginLeft: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8,
    color: 'white',
  },
  tableDataRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  tableDataCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8,
    color: 'black',
  },
});

export const PDFSolicitud = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/logoSenaNaranja.png" />
        <Text style={styles.title}>SOLICITUD DE SERVICIO DE MANTENIMIENTO</Text>
        <Text style={styles.subTitle}>Centro de Gestión y{'\n'}Desarrollo Sostenible{'\n'}Surcolombiano</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre del Solicitante</Text>
          <Text style={styles.input}></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Correo del Solicitante</Text>
          <Text style={styles.input}></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dirección</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.priority}>
        <View style={styles.priorityItem}>
          <View style={styles.checkbox} />
          <Text>Inmediata</Text>
        </View>
        <View style={styles.priorityItem}>
          <View style={styles.checkbox} />
          <Text>Urgente</Text>
        </View>
        <View style={styles.priorityItem}>
          <View style={styles.checkbox} />
          <Text>Normal</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parte Legal</Text>
        <View style={styles.largeInput}></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observaciones</Text>
        <View style={styles.largeInput}></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción de la solicitud</Text>
        <View style={styles.largeInput}></View>
      </View>

      <View style={styles.costSection}>
        <Text style={{ fontSize: 10 }}>COSTO DE REPARACIÓN $</Text>
        <View style={styles.costInput}></View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Equipo</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Descripción del daño</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Descripción de la Actividad</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Nombre de la actividad</Text>
          </View>
        </View>
        <View style={styles.tableDataRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableDataCell}></Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableDataCell}></Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableDataCell}></Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableDataCell}></Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);