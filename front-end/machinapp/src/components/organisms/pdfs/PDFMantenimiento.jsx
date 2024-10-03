import { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { axiosCliente } from "../../../index.js";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 10,
    width: '70%',
  },
  dateText: {
    fontSize: 8,
    width: '30%',
    textAlign: 'right',
  },
  section: {
    marginBottom: 10,
    border: 1,
    padding: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  column: {
    flex: 1,
    fontSize: 9,
  },
  boldText: {
    fontWeight: 'bold',
  },
  greenText: {
    color: 'green',
    fontSize: 10,
    marginBottom: 5,
  },
  textBox: {
    border: 1,
    borderColor: '#eee',
    padding: 5,
    minHeight: 40,
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
  },
});

export const GenerarPdf = ({ idMantenimiento }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get('http://localhost:3000/mantenimiento/excelconsultavariables');
        const filteredData = response.data.find(item => item.idMantenimiento === idMantenimiento);
        setData(filteredData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [idMantenimiento]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  if (!data) {
    return null; 
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/logoSenaNaranja.png" />
          <View style={styles.headerText}>
            <Text>SUBSISTEMA DE MANTENIMIENTO Y</Text>
            <Text>CONTROL DE MAQUINARIA Y EQUIPO</Text>
            <Text>ORDEN DE TRABAJO DE MANTENIMIENTO</Text>
          </View>
          <View style={styles.dateText}>
            <Text>Fecha: {formatDate(new Date().toISOString())}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.column}>Regional</Text>
            <Text style={styles.column}>Sede de formación</Text>
            <Text style={styles.column}>Unidad productiva</Text>
            <Text style={styles.column}>Aula o Taller</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.sede_nombre}</Text>
            <Text style={styles.column}>{data.sede_nombre_centro}</Text>
            <Text style={styles.column}>{data.sit_nombre}</Text>
            <Text style={styles.column}>{data.area_nombre}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Datos del equipo o maquinaria</Text>
          <View style={styles.row}>
            <Text style={styles.column}>Placa sena</Text>
            <Text style={styles.column}>Serial</Text>
            <Text style={styles.column}>Modelo</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.fi_placa_sena}</Text>
            <Text style={styles.column}>{data.codigo_mantenimiento}</Text>
            <Text style={styles.column}>{data.nombre}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.column}>Tipo de reparación</Text>
            <Text style={styles.column}>DOCUMENTO QUE ORIGINÓ ESTA ORDEN DE MANTENIMIENTO</Text>
            <Text style={styles.column}>PRIORIDAD</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.tipo_mantenimiento}</Text>
            <Text style={styles.column}>{data.codigo_mantenimiento}</Text>
            <Text style={styles.column}>
              {data.soli_prioridad === 'inmediata' ? '☑' : '☐'} Inmediata{'\n'}
              {data.soli_prioridad === 'urgente' ? '☑' : '☐'} Urgente{'\n'}
              {data.soli_prioridad === 'normal' ? '☑' : '☐'} Normal
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Trabajo ejecutado</Text>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 3 }]}>Descripción</Text>
            <Text style={[styles.column, { flex: 1 }]}>Fecha : {formatDate(data.fecha_realizacion)}</Text>
          </View>
          <View style={styles.textBox}>
            <Text>{data.descripcion_mantenimiento}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Descripción del mantenimiento</Text>
          <View style={styles.textBox}>
            <Text>{data.descripcion_mantenimiento}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Repuestos utilizados y costos</Text>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 2 }]}>Nombre repuesto</Text>
            <Text style={[styles.column, { flex: 1 }]}>Costo</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 2 }]}>{data.par_nombre_repuesto}</Text>
            <Text style={[styles.column, { flex: 1 }]}>${data.par_costo_total}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>COSTO DE REPARACIÓN: ${data.mant_costo_final}</Text>
        </View>
      </Page>
    </Document>
  );
};