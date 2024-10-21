// GenerarPdf.jsx
import { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { axiosCliente } from "../../../index.js";
import { useTranslation } from "react-i18next"; 

const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 10,
    width: '70%',
    paddingLeft: 10,
  },
  dateText: {
    fontSize: 8,
    width: '30%',
    textAlign: 'right',
  },
  section: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    minHeight: 24,
    fontWeight: 'bold',
  },
  column: {
    flex: 1,
    fontSize: 9,
    padding: 2,
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
    borderWidth: 1,
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
  priorityColumn: {
    flex: 1,
    fontSize: 9,
    padding: 2,
    lineHeight: 1.5,
  },
});

// eslint-disable-next-line react/prop-types
export const GenerarPdf = ({ idMantenimiento }) => {
  const [data, setData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCliente.get('/mantenimiento/excelconsultavariables');
        const filteredData = response.data.find(item => item.idMantenimiento === idMantenimiento);
        setData(filteredData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setData(null);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [idMantenimiento]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  if (isDataLoading) {
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text>{t('loading')}</Text>
          </View>
        </Page>
      </Document>
    );
  }

  if (!data) {
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text>{t('error_loading_data')}</Text>
          </View>
        </Page>
      </Document>
    );
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
            <Text>Fecha actual: {formatDate(new Date().toISOString())}</Text>
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
            <Text style={styles.priorityColumn}>{data.soli_prioridad}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Trabajo ejecutado</Text>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 3 }]}>Descripción</Text>
            <View style={[styles.column, { flex: 2 }]}>
              <Text>Fecha : {formatDate(data.man_fecha_realizacion)}</Text>
              <Text>Próximo mantenimiento : {formatDate(data.mant_fecha_proxima)}</Text>
            </View>
          </View>
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
