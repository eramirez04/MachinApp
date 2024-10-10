import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { axiosCliente } from "../../../index.js";


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
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
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
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
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
    paddingBottom: 2,
  },
  priority: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 5,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: 5,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
    paddingBottom: 2,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 5,
    marginTop: 5,
    fontSize: 10,
    minHeight: 40,
  },
  costSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  costLabel: {
    fontSize: 10,
    marginRight: 5,
  },
  costInput: {
    borderWidth: 1,
    borderColor: '#000000',
    width: 100,
    padding: 2,
    fontSize: 10,
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
    width: '33.33%',
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
    padding: 5,
  },
  tableDataRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  tableDataCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8,
    padding: 5,
  },
});

export const PDFSolicitud = ({idSolicitud}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get('http://localhost:3000/solicitud/PDF');
        const filteredData = response.data.find(item => item.idSolicitud === idSolicitud);
        setData(filteredData || {});
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [idSolicitud]);

  if (!data) {
    return null;
  }

  const actividades = data.acti_nombres ? data.acti_nombres.split(', ') : [];
  const descripciones = data.acti_descripciones ? data.acti_descripciones.split(', ') : [];

/*   const TableHeader = () => (
    <View style={styles.tableRow} fixed>
        {[
            'Equipo', 'Nombre de la Actividad', 'Descripción de la actividad'
        ].map((header, index) => (
            <View key={index} style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>{header}</Text>
            </View>
        ))}
    </View>
); */
/* const TableContent = ({ data }) => (
  <>
      {data.map((actividad, index) => (
          <View key={index} style={styles.tableRow} wrap={false}>
              <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.fi_placa_sena}</Text>
              </View>
              <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{actividad}</Text>
              </View>
              <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{descripciones[index] || ''}</Text>
              </View>
          </View>
      ))}
  </>
); */
  return(
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
            <Text style={styles.input}>{data.nombre_solicitante}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Correo del Solicitante</Text>
            <Text style={styles.input}>{data.correo_solicitante}</Text>
          </View>
        </View>

        <View style={styles.priority}>
          <View style={styles.priorityItem}>
            <View style={[styles.checkbox, data.soli_prioridad === 'inmediata' && { backgroundColor: 'black' }]} />
            <Text style={styles.priorityText}>Inmediata</Text>
          </View>
          <View style={styles.priorityItem}>
            <View style={[styles.checkbox, data.soli_prioridad === 'urgente' && { backgroundColor: 'black' }]} />
            <Text style={styles.priorityText}>Urgente</Text>
          </View>
          <View style={styles.priorityItem}>
            <View style={[styles.checkbox, data.soli_prioridad === 'normal' && { backgroundColor: 'black' }]} />
            <Text style={styles.priorityText}>Normal</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parte Legal</Text>
          <View style={styles.textBox}>
            <Text>{data.temas_legal || ''}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observaciones</Text>
          <View style={styles.textBox}>
            <Text>{data.soli_observaciones || ''}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción de la solicitud</Text>
          <View style={styles.textBox}>
            <Text>{data.soli_descripcion_problemas || ''}</Text>
          </View>
        </View>

        <View style={styles.costSection}>
          <Text style={styles.costLabel}>COSTO DE REPARACIÓN $</Text>
          <View style={styles.costInput}>
            <Text>{data.soli_costo_estimado || ''}</Text>
          </View>
        </View>
{/*         <View style={styles.table}>
                    <TableHeader />
                    <TableContent data={data} />
        </View>
 */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Equipo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nombre de la Actividad</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Descripción de la actividad</Text>
            </View>
          </View>
          {actividades.map((actividad, index) => (
            <View style={styles.tableDataRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableDataCell}>{data.fi_placa_sena || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableDataCell}>{actividad}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableDataCell}>{descripciones[index] || ''}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
