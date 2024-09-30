import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { axiosCliente } from '../../../service/api/axios'

export const FichaTecnicaEquiposPDF = ({idMaquina}) => {
    

    //informacio de la maquina 
    const [infoMaquina , setMaquinaGen] = useState({})

    //informacion de las variables.
    const [varEspec, setVarEspec] = useState([])
    const [varEspTecnicas, setVarEspTec ] = useState([])
    const [varSecciones, setVarSecciones ] = useState([])
    const [varObligatorias, setVarObligatorias] = useState({})
    



    useEffect(()=>{

        const informacionMaquina   = async () =>{
            try{
                const response = await axiosCliente.get(`ficha/listarUnica/${idMaquina}`)
                setMaquinaGen(response.data.infoFicha[0])

                console.log(response.data.infoFicha[0])
    
    
                //variables
    
                let variables = response.data.infoVar
    
                //separamos las clases de las variables para poder mapearlas
                setVarEspTec(variables?.filter(item => item.var_clase == "especificacionesTecnicas"))
                setVarSecciones(variables?.filter(item => item.var_clase == "seccion"))
                setVarEspec(variables?.filter(item => item.var_clase == "especifica")) 
    
                
                //para las variables obligatorias.
                let varObligatorias = variables?.filter(item => item.var_clase == "obligatoria")
    
                const objVarObligatorias = {}
    
                for(let i = 0; i< varObligatorias.length; i++){
                const variable = varObligatorias[i]
    
                objVarObligatorias[`idVar${variable.idVariable}`] ={
                    idDetalle: variable.idDetalle,
                    det_valor: variable.det_valor, 
                    var_nombre: variable.var_nombre,
                    var_descripcion: variable.var_descripcion,
                    var_tipoDato: variable.var_tipoDato
                }
    
                }
    
                setVarObligatorias(objVarObligatorias)

                console.log(objVarObligatorias)
        
            }catch(error){
                console.error(error.response)
            }
        }
        informacionMaquina()
    }, [idMaquina])




    const styles = StyleSheet.create({
      /* basicos */
      page: {
        padding: 30,
        flexDirection: 'column',
        backgroundColor: 'white',
      },
      container: {
        flexDirection: 'column', 
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 10,
        border: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: '#dbe0e1'
      },
      containerTitulo : {
        width:'100%',
        paddingLeft: 12,
        paddingVertical: 4, 
        paddingRight: 3,
        fontSize: 16
      },
      textoTitulo:{
        color:'#16a34a',
        paddingBottom:'2',

      },
      /* seccion de informacion basica */
      containerContent :{
        flexDirection: 'row',
        width:'100%', 
        gap:9,
        borderTop:'2',
        borderTopColor:'#16a34a',
        paddingBottom:14
      },
      containerHijo:{
        flex: 1,
        paddingTop:20,
        paddingBottom:4,
        gap:3
      },
      contenedorInfo:{
        flexDirection: 'row',
        width:'100%',
        paddingVertical:4,
        paddingLeft:12,
        flexWrap: 'wrap',
      },
      tituloInfo:{
        fontSize: 14,
        color:'#303030'
      },
      respuestaInfo:{
        fontSize: 14,
        color:'#4e4e4e'
      },
      contentedorVarios:{
        flexDirection:'column',
        width:'100%'
      },
      contenedorDes:{
        flexDirection: 'column',
        width:'100%',
        paddingVertical:4,
        paddingLeft:12,
        gap:2
      },
      subTituloSecc:{
        fontWeight:700,
        fontSize: 14,
        color:'#303030',
      },

      /* Para las caracteristicas generales */
      contenidoCaractGen: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'start',
        padding: 10,
        paddingTop:25,
        gap:3,
        borderTop:'2',
        borderTopColor:'#16a34a',
      },
      infoCaractGen: {
        width: '24%', 
        marginBottom: 25,
        justifyContent: 'start',
        alignItems: 'start',
        backgroundColor:'#fbfbfb'
      },
      tituloCaractGen: {
        padding:4,
        paddingVertical:6,
        backgroundColor:'#c8edc7',
        fontSize:13
      },
      contCaractGen: {
        padding:4,
        paddingVertical:10,
        textAlign: 'left',
        flexWrap: 'wrap',
        fontSize:13 
      },


      /* Para las secciones */
      containerTituloSeccion: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 10, 
        backgroundColor: '#f0f0f0',
        // Eliminamos flexWrap
    },
    textoTituloSeccion: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    textoDescripcion: {
        fontSize: 14,
        color: '#555',
        flex: 1, // Permite que ocupe el espacio restante
        textAlign: 'right',
        // Modificamos el overflow
        overflow: 'visible', 
        // También podrías considerar establecer un ancho máximo
        maxWidth: '80%', // Ajusta según sea necesario
    },



    })


    return (
      <>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.container}> 
              <View style={styles.containerTitulo}>
                <Text style={styles.textoTitulo}>Informacion basica del equipo</Text>
              </View>

              <View style={styles.containerContent}>
                <View style={styles.containerHijo}>
                  <View style={styles.contenedorInfo}>
                    <Text style={styles.tituloInfo}>Placa SENA: </Text>
                    <Text style={styles.respuestaInfo}>{infoMaquina.fi_placa_sena}</Text>
                  </View>
                  <View style={styles.contenedorInfo}>
                    <Text style={styles.tituloInfo}>{varObligatorias?.idVar2?.var_nombre}: </Text>
                    <Text style={styles.respuestaInfo}>{varObligatorias?.idVar2?.det_valor}</Text>
                  </View>
                  <View style={styles.contenedorInfo}>
                    <Text style={styles.tituloInfo}>{varObligatorias?.idVar9?.var_nombre}: </Text>
                    <Text style={styles.respuestaInfo}>{varObligatorias?.idVar9?.det_valor}</Text>
                  </View>
                  <View style={styles.contenedorInfo}>
                    <Text style={styles.tituloInfo}>{varObligatorias?.idVar7?.var_nombre}: </Text>
                    <Text style={styles.respuestaInfo}>{varObligatorias?.idVar7?.det_valor}</Text>
                  </View>
                  <View style={styles.contenedorInfo}>
                    <Text style={styles.tituloInfo}>{varObligatorias?.idVar8?.var_nombre}: </Text>
                    <Text style={styles.respuestaInfo}>{varObligatorias?.idVar8?.det_valor}</Text>
                  </View>
                  <View style={styles.contenedorInfo}>
                    <Text style={styles.tituloInfo}>{varObligatorias?.idVar1?.var_nombre}: </Text>
                    <Text style={styles.respuestaInfo}>{varObligatorias?.idVar1?.det_valor}</Text>
                  </View>
                </View>

                <View style={styles.containerHijo}>
                  <Text>(imagen)</Text>
                </View>
              </View>

              {/* pendientee---------------------------- */}
              <View style={styles.contentedorVarios}>
                <View style={styles.contenedorDes}>
                  <Text style={styles.subTituloSecc}>{varObligatorias?.idVar6?.var_nombre}</Text>
                  <Text style={styles.respuestaInfo}>{varObligatorias?.idVar6?.det_valor}</Text>
                </View>

                <View style={styles.contenedorDes}>
                  <Text style={styles.subTituloSecc}>{varObligatorias?.idVar3?.var_nombre}</Text>
                  <Text style={styles.respuestaInfo}>{varObligatorias?.idVar3?.det_valor}</Text>
                </View>
                <View style={styles.contenedorDes}>
                  <Text style={styles.subTituloSecc}>{varObligatorias?.idVar4?.var_nombre}</Text>
                  <Text style={styles.respuestaInfo}>{varObligatorias?.idVar4?.det_valor}</Text>
                </View>
                <View style={styles.contenedorDes}>
                  <Text style={styles.subTituloSecc}>{varObligatorias?.idVar5?.var_nombre}</Text>
                  <Text style={styles.respuestaInfo}>{varObligatorias?.idVar5?.det_valor}</Text>
                </View>
                
              </View>

            </View>


            {/* para las caraceristicas generales */}
            {
              varEspec.length>0 ? (
                <View style={styles.container}> 
                <View style={styles.containerTitulo}>
                  <Text style={styles.textoTitulo}>Caracteristicas generales</Text>
                </View>

                <View style={styles.contenidoCaractGen}>
                  {
                    varEspec.map((varEspeci, index)=>(
                      <View key={index} style={styles.infoCaractGen}>
                        <Text style={styles.tituloCaractGen}>{varEspeci.var_nombre}</Text>
                        <Text style={styles.contCaractGen}>{varEspeci.det_valor}</Text>
                      </View>
                    ))
                  }
                </View>


              </View>
              ):(<></>)
            }

            {/* para especificaciones tecnicas */}
            <View style={styles.container}> 
              <View style={styles.containerTitulo}>
                <Text style={styles.textoTitulo}>Especificaciones tecnicas</Text>
              </View>
            </View>

            {/* para secciones */}
            <View style={styles.container}> 
              <View style={styles.containerTituloSeccion}>
                <Text style={styles.textoTituloSeccion}>Seccion 1</Text>
                <Text style={styles.textoDescripcion}>www</Text>
              </View>

            </View>




            
          </Page>
        </Document>
      </>
    )
}

 