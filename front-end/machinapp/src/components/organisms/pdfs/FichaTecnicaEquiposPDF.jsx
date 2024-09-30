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
        fontSize: 15
      },
      textoTitulo:{
        color:'#16a34a',
        borderBottom:'2',
        paddingBottom:'2',
        borderBottomColor:'#16a34a'
      },
      /* seccion de informacion basica */
      containerContent :{
        flexDirection: 'row',
        width:'100%', 
        gap:9
      },
      containerHijo:{
        flex: 1,
        backgroundColor:'blue'
      }
      
      
      
      
      /* ,
      containerContenido:{
        marginTop:2,
        backgroundColor:'red',
        width: '100%',
        height:'31'
      } */
        /* 
        lgContainer: {
          flexDirection: 'row',
        },
                header: {
          width: '100%',
         
          paddingLeft: 28, 
          paddingVertical: 4, 
          marginTop: 48, 
          color: '#ffffff', 
          backgroundColor: '#666666', 
        },
        halfWidth: {
          width: '100%',
        },
        lgHalfWidth: {
          width: '50%',
        },
        grid: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
        },
        inputBasic:{
            zIndex: 0, 
            width: '100%',
            marginVertical: 3,
            border: 'solid 1',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#d7dbdd',
            borderRadius: 6,
            paddingVertical: 5,
            paddingHorizontal:8, 
        },

        textoInput:{
            color:'black',
            fontSize: 12,
        },
        infoRow: {
          flexDirection: 'row',
          marginBottom: 5,
        },
        label: {
          width: '40%',
          fontSize: 12,
          fontWeight: 'bold',
        },
        value: {
          width: '60%',
          fontSize: 12,
        },
        greenText: {
            color: 'green',
            marginBottom: 5,
            fontSize: 16, 
        } */
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
                  <Text>a</Text>
                </View>
                <View style={styles.containerHijo}>
                  <Text>b</Text>
                </View>
              </View>




            </View>

            <View style={styles.container}> 
              <View style={styles.containerTitulo}>
                <Text style={styles.textoTitulo}>Caracteristicas generales</Text>
              </View>




            </View>


            <View style={styles.container}> 
              <View style={styles.containerTitulo}>
                <Text style={styles.textoTitulo}>Especificaciones tecnicas</Text>
              </View>




            </View>


            <View style={styles.container}> 

            </View>




                
              <View style={styles.container}>
                    <Text style={styles.greenText}>Información Básica</Text>
                  <View style={[styles.halfWidth, styles.lgHalfWidth]}>
                    <View style={styles.grid}>
                        
                        <View style={styles.inputBasic}>
                            <Text style={styles.label} >Placa SENA : </Text> 
                            <Text style={styles.textoInput}> {infoMaquina.fi_placa_sena} </Text>
                        </View>
                        <View style={styles.inputBasic}>
                            <Text style={styles.label} >Serial : </Text>
                            <Text style={styles.textoInput}> {varObligatorias?.idVar2?.det_valor}</Text>
                        </View>
                        <View style={styles.inputBasic}>
                            <Text style={styles.label} >Precio Equipo : </Text>
                            <Text style={styles.textoInput}> {varObligatorias?.idVar9?.det_valor}</Text>
                        </View>
                        <View style={styles.inputBasic}>
                            <Text style={styles.label} >Marca : </Text>
                            <Text style={styles.textoInput}> {varObligatorias?.idVar7?.det_valor}</Text>
                        </View>

                        <View style={styles.inputBasic}>
                            <Text style={styles.label} >Modelo : </Text>
                            <Text style={styles.textoInput}> {varObligatorias?.idVar8?.det_valor}</Text>
                        </View>

                        <View style={styles.inputBasic}>
                            <Text style={styles.label} >Fecha Adquisicion : </Text>
                            <Text style={styles.textoInput}> {varObligatorias?.idVar1?.det_valor}</Text>
                        </View>

                    </View>
                  </View>
                </View>


            
          </Page>
        </Document>
      </>
    )
}

 