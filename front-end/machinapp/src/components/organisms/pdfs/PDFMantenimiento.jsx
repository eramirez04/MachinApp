import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

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

export const GenerarPdf = ({ data }) => {
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
            <Text>Fecha</Text>
            <Text>{new Date().toLocaleDateString()}</Text>
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
            <Text style={styles.column}>{data.regional || ''}</Text>
            <Text style={styles.column}>{data.sede || ''}</Text>
            <Text style={styles.column}>{data.unidad_productiva || ''}</Text>
            <Text style={styles.column}>{data.aula_taller || ''}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Datos del equipo o maquinaria</Text>
          <View style={styles.row}>
            <Text style={styles.column}>Placa sena</Text>
            <Text style={styles.column}>Serial</Text>
            <Text style={styles.column}>Placa sena</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.placa_sena1 || ''}</Text>
            <Text style={styles.column}>{data.serial || ''}</Text>
            <Text style={styles.column}>{data.placa_sena2 || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>Marca</Text>
            <Text style={styles.column}>Modelo</Text>
            <Text style={styles.column}>Placa sena</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.marca || ''}</Text>
            <Text style={styles.column}>{data.modelo || ''}</Text>
            <Text style={styles.column}>{data.placa_sena3 || ''}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.column}>Tipo de reparación</Text>
            <Text style={styles.column}>DOCUMENTO QUE ORIGINÓ ESTA ORDEN DE MANTENIMIENTO</Text>
            <Text style={styles.column}>PRIORIDAD</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.column}>{data.tipo_reparacion || ''}</Text>
            <Text style={styles.column}>{data.documento_origen || ''}</Text>
            <Text style={styles.column}>
              {data.prioridad === 'Inmediata' ? '☑' : '☐'} Inmediata{'\n'}
              {data.prioridad === 'Urgente' ? '☑' : '☐'} Urgente{'\n'}
              {data.prioridad === 'Normal' ? '☑' : '☐'} Normal
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Trabajo ejecutado</Text>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 3 }]}>Descripción</Text>
            <Text style={[styles.column, { flex: 1 }]}>Fecha</Text>
          </View>
          <View style={styles.textBox}>
            <Text>{data.descripcion_trabajo || ''}</Text>
          </View>
          <Text style={[styles.column, { textAlign: 'right', marginTop: 5 }]}>{data.fecha_trabajo || ''}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Descripción del mantenimiento</Text>
          <View style={styles.textBox}>
            <Text>{data.descripcion_mantenimiento || ''}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.greenText}>Repuestos utilizados y costos</Text>
          <View style={styles.row}>
            <Text style={[styles.column, { flex: 2 }]}>Descripción</Text>
            <Text style={[styles.column, { flex: 2 }]}>Nombre repuesto</Text>
            <Text style={[styles.column, { flex: 1 }]}>Costo</Text>
          </View>
          {data.repuestos && data.repuestos.map((repuesto, index) => (
            <View style={styles.row} key={index}>
              <Text style={[styles.column, { flex: 2 }]}>{repuesto.descripcion || ''}</Text>
              <Text style={[styles.column, { flex: 2 }]}>{repuesto.nombre || ''}</Text>
              <Text style={[styles.column, { flex: 1 }]}>{repuesto.costo || ''}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>COSTO DE REPARACIÓN: ${data.costo_total || ''}</Text>
        </View>
      </Page>
    </Document>
  );
};

