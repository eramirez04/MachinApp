import { Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { axiosCliente } from '../../../service/api/axios'

import {Imagenes} from '../../../index.js'


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
        gap:10,
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
/*         fontSize: 14,
        color:'#303030' */
        fontSize:11,
        color: '#333',
      },
      respuestaInfo:{
/*         fontSize: 14,
        color: '#4e4e4e', */
        fontSize:11,
        color: '#333',
        flexWrap: 'wrap',     
        overflow: 'hidden', 
      },
      contentedorVarios:{
        flexDirection:'column',
        width:'100%'
      },
      contenedorDes:{
        flexDirection: 'column',
        width:'100%',
        paddingVertical:8,
        paddingHorizontal:12,
        paddingBottom:20,
        gap:2
      },
      contenedorRow:{
        flexDirection:'row'
      },
      subTituloSecc:{
        padding:5,
        fontSize: 14,
        color:'#292929',
        backgroundColor:'#f9f9f9'
      },
      contenedorImagen:{  
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%',
       height: '245px',
       borderRadius: 6, // equivalente a rounded-md
       backgroundColor: '#FFFFFF', 
       paddingHorizontal:5,
       border:1,
       borderColor:'#dcdcdc'
      },
      imagen:{
        height: '100%',
        width: '100%',
        objectFit: 'contain', // equivalente a object-contain
        borderRadius: 12 
      },
      garantiaDes:{
        borderLeft: 1,
        borderLeftColor: 'green',
        gap:5
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
      },
      tituloCaractGen: {
        padding:4,
        paddingVertical:6,
        backgroundColor:'#eaeaea',
        fontSize:11,
        color: '#333',
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
      },
      contCaractGen: {
        padding:4,
        paddingVertical:10,
        textAlign: 'left',
        flexWrap: 'wrap',
        fontSize:11,
        color: '#333',
        borderBottom:1,
        borderBottomColor:'#eaeaea',
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
      },
      containerTituloSeccion: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 10, 
        backgroundColor: '#f0f0f0',
        borderRadius: 4
      },
      textoTituloSeccion: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333',
      },
      textoDescripcion: {
          fontSize: 11,
          color: '#555',
          flex: 1, 
          textAlign: 'right',
          overflow: 'visible', 
          maxWidth: '80%', 
      },
      contenidoSecccion:{
        padding:5,
        marginTop:8,
        fontSize:11,
        color: '#333',
      }, 

      /* Especificaciones tecnicas */
      contentEspecTec:{
        width:'100%',
        borderTop:2, 
        borderTopColor: 'green',
        paddingVertical:10
      },

      /* Estilos para la tabla */
      table: {
        display: "table",
        width: "auto",
        margin: 10,
        borderStyle: "solid",
        borderWidth: 0,
        borderRadius: 5,
        
      },
      tableRow: {
        flexDirection: "row",
        backgroundColor: '#f9f9f9', 
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1, 
      },
      tableHeader: {
        backgroundColor: '#eaeaea', 
        fontWeight: 'bold',
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5,
      },
      tableCol35: {
        width: "35%",
        padding: 10, 
        borderBottomWidth: 0, // Eliminar el borde inferior
        flexWrap: 'wrap',
      },
      tableCol65: {
        width: "65%",
        padding: 10,
        borderBottomWidth: 0,
        flexWrap: 'wrap',
        maxWidth:'100%'
      },
      tableCell: {
        fontSize: 11,
        textAlign: 'left',
        color: '#333', 
        flexWrap: 'wrap',
      },
      tableCellRight: {
        fontSize: 11,
        textAlign: 'left',
        color: '#333',
        flexWrap: 'wrap',
      },
      tableRowBasico:{
        flexDirection: "row",
        backgroundColor: '#f9f9f9', 
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1, 
        borderRadius:4
      },
      tableCol35Basico:{
        backgroundColor:'#eaeaea',
        width: "35%",
        padding: 10, 
        flexWrap: 'wrap',
        borderBottomLeftRadius: 4,
        borderTopLeftRadius:4 
      } ,
      gapTable :{
        gap:2
      },
      paddignTopMa:{
        paddingTop:30,
      },


      /* Para la descripcion del equipo y garantia */


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
                  <View style={[styles.table, styles.gapTable]}>
                    
                    <View  style={styles.tableRowBasico}>
                      <View style={styles.tableCol35Basico}>
                        <Text style={styles.tableCell}>Placa SENA: </Text>
                      </View>
                      <View style={styles.tableCol65}>
                        <Text style={styles.tableCellRight}>{infoMaquina.fi_placa_sena}</Text>
                      </View>
                    </View>

                    <View  style={styles.tableRowBasico}>
                      <View style={styles.tableCol35Basico}>
                        <Text style={styles.tableCell}>{varObligatorias?.idVar2?.var_nombre}: </Text>
                      </View>
                      <View style={styles.tableCol65}>
                        <Text style={styles.tableCellRight}>{varObligatorias?.idVar2?.det_valor}</Text>
                      </View>
                    </View>

                    <View  style={styles.tableRowBasico}>
                      <View style={styles.tableCol35Basico}>
                        <Text style={styles.tableCell}>{varObligatorias?.idVar9?.var_nombre}: </Text>
                      </View>
                      <View style={styles.tableCol65}>
                        <Text style={styles.tableCellRight}>{varObligatorias?.idVar9?.det_valor}</Text>
                      </View>
                    </View>

                    <View  style={styles.tableRowBasico}>
                      <View style={styles.tableCol35Basico}>
                        <Text style={styles.tableCell}>{varObligatorias?.idVar7?.var_nombre}: </Text>
                      </View>
                      <View style={styles.tableCol65}>
                        <Text style={styles.tableCellRight}>{varObligatorias?.idVar7?.det_valor}</Text>
                      </View>
                    </View>

                    <View  style={styles.tableRowBasico}>
                      <View style={styles.tableCol35Basico}>
                        <Text style={styles.tableCell}>{varObligatorias?.idVar8?.var_nombre}: </Text>
                      </View>
                      <View style={styles.tableCol65}>
                        <Text style={styles.tableCellRight}>{varObligatorias?.idVar8?.det_valor}</Text>
                      </View>
                    </View>

                    <View  style={styles.tableRowBasico}>
                      <View style={styles.tableCol35Basico}>
                        <Text style={styles.tableCell}>{varObligatorias?.idVar1?.var_nombre}: </Text>
                      </View>
                      <View style={styles.tableCol65}>
                        <Text style={styles.tableCellRight}>{varObligatorias?.idVar1?.det_valor}</Text>
                      </View>
                    </View>

                  </View>


                </View>

                <View style={[styles.containerHijo , styles.paddignTopMa]}>
                  <View style={styles.contenedorImagen}>
                    {/* <Imagenes rutaImg={`imagenes/ficha/${infoMaquina.fi_imagen}`}/> */}
                    <Image style={styles.imagen}   src={`http://localhost:3000/imagenes/ficha/${infoMaquina.fi_imagen}`} />
                  </View> 
                </View>
              </View>


              {/* Descripcion de equipo */}
              < View>

              </View>


              {/* Garantia */}
              < View>
              
              </View>

              
{/*               <View style={styles.contentedorVarios}>
                <View style={styles.contenedorDes}>
                  <Text style={styles.subTituloSecc}>{varObligatorias?.idVar6?.var_nombre}</Text>
                  <Text style={styles.respuestaInfo}>{varObligatorias?.idVar6?.det_valor}</Text>
                </View>

                <View style={styles.contenedorDes}>
                  <Text style={styles.subTituloSecc}>Informacion Garantia</Text>
                  
                  <View style={styles.contenedorRow}>
                    <View style={styles.containerHijo}>
                      <View style={styles.contenedorInfo}>
                        <Text style={styles.tituloInfo}>{varObligatorias?.idVar3?.var_nombre}:  </Text>
                        <Text style={styles.respuestaInfo}>{varObligatorias?.idVar3?.det_valor} </Text>
                      </View>

                      <View style={styles.contenedorInfo}>
                        <Text style={styles.tituloInfo}>{varObligatorias?.idVar4?.var_nombre}:  </Text>
                        <Text style={styles.respuestaInfo}>{varObligatorias?.idVar4?.det_valor}</Text>
                      </View>
                    </View>

                    <View style={styles.containerHijo}>
                      <View style={[styles.contenedorInfo, styles.garantiaDes]}>
                        <Text style={styles.tituloInfo}>{varObligatorias?.idVar5?.var_nombre}:  </Text>
                        <Text style={styles.respuestaInfo}>{varObligatorias?.idVar5?.det_valor}ddddddddddddd ddddddddddddddddddddd ddddddddddddddddddddddd dddddddddddddd</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View> */}

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
            
            {
              varEspTecnicas.length>0 ? (
              <View style={styles.container}> 
                <View style={styles.containerTitulo}>
                  <Text style={styles.textoTitulo}>Especificaciones tecnicas</Text>
                </View>

                <View style={styles.contentEspecTec}>
                  <View style={styles.table}>
                    {/*  encabezados */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                      <View style={styles.tableCol35}>
                        <Text style={styles.tableCell}>Nombre</Text>
                      </View>
                      <View style={styles.tableCol65}>
                        <Text style={styles.tableCell}>Valor</Text>
                      </View>
                    </View>

                    {/* contenido Tabla*/}

                    {
                      varEspTecnicas.map((varTecnica, index)=>(
                        <View key={index} style={styles.tableRow}>
                        <View style={styles.tableCol35}>
                          <Text style={styles.tableCell}>{varTecnica.var_nombre}</Text>
                        </View>
                        <View style={styles.tableCol65}>
                          <Text style={styles.tableCellRight}>{varTecnica.det_valor}</Text>
                        </View>
                      </View>
                      ))
                    }



                  </View>
                </View>
              </View>
              ):(<></>)
            }

            {/* para secciones */}
            {
              varSecciones.length > 0 ? 
              
              varSecciones.map((varseccion, index)=>(

                <View key={index} style={styles.container}> 
                  <View style={styles.containerTituloSeccion}>
                    <Text style={styles.textoTituloSeccion}>{varseccion.var_nombre}</Text>
                    <Text style={styles.textoDescripcion}>{varseccion.var_descripcion}</Text>
                  </View>
                  <View style={styles.contenidoSecccion}>
                    <Text>{varseccion.det_valor}</Text>
                  </View>
                </View>
              ))
              :(<></>)
            }          
          </Page>
        </Document>
      </>
    )
}