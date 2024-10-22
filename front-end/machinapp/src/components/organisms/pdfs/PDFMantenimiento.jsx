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
            <Text>{t('cargando')}</Text>
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
            <Text>{t('error_carga_datos')}</Text>
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
            <Text>{t('titulo_header_1')}</Text>
            <Text>{t('titulo_header_2')}</Text>
            <Text>{t('titulo_header_3')}</Text>
          </View>
          <View style={styles.dateText}>
            <Text>{t('fecha_actual')}: {formatDate(new Date().toISOString())}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.column}>{t('regional')}</Text>
            <Text style={styles.column}>{t('sedeFormacion')}</Text>
            <Text style={styles.column}>{t('unidad_productiva')}</Text>
            <Text style={styles.column}>{t('aula_taller')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.sede_nombre}</Text>
            <Text style={styles.column}>{data.sede_nombre_centro}</Text>
            <Text style={styles.column}>{data.sit_nombre}</Text>
            <Text style={styles.column}>{data.area_nombre}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>{t('datos_equipo')}</Text>
          <View style={styles.row}>
            <Text style={styles.column}>{t('placaSena')}</Text>
            <Text style={styles.column}>{t('serial')}</Text>
            <Text style={styles.column}>{t('modelo')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.fi_placa_sena}</Text>
            <Text style={styles.column}>{data.codigo_mantenimiento}</Text>
            <Text style={styles.column}>{data.nombre}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.column}>{t('tipo_reparacion')}</Text>
            <Text style={styles.column}>{t('documento_origen')}</Text>
            <Text style={styles.column}>{t('priority')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.tipo_mantenimiento}</Text>
            <Text style={styles.column}>{data.codigo_mantenimiento}</Text>
            <Text style={styles.priorityColumn}>{data.soli_prioridad}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>{t('work_executed')}</Text>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 3 }]}>{t('descripcion')}</Text>
            <View style={[styles.column, { flex: 2 }]}>
              <Text>{t('fecha')}: {formatDate(data.man_fecha_realizacion)}</Text>
              <Text>{t('proximo_mantenimiento')}: {formatDate(data.mant_fecha_proxima)}</Text>
            </View>
          </View>
          <View style={styles.textBox}>
            <Text>{data.descripcion_mantenimiento}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>{t('parts_used_and_costs')}</Text>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 2 }]}>{t('part_name')}</Text>
            <Text style={[styles.column, { flex: 1 }]}>{t('cost')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 2 }]}>{data.par_nombre_repuesto}</Text>
            <Text style={[styles.column, { flex: 1 }]}>${data.par_costo_total}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>{t('costo_reparacion')}: ${data.mant_costo_final}</Text>
        </View>
      </Page>
    </Document>
  );
};
