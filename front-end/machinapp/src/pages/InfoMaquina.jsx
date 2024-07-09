import React, { useEffect } from "react"
import api from "../components/atoms/api/Api.jsx"
import TablaMantenimientosMa from "../components/organisms/TablaMantenimientosMa.jsx"
import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import Layout from "../components/templates/Layout.jsx"


import InfoBasicaMaquina from "../components/molecules/InfoBasicaMaquina.jsx"
import ImgMaquinas from "../components/atoms/ImgMaquinas.jsx"


import DescargarDocs from "../components/atoms/DescargarDocs.jsx"


const InfoMaquina = ()=> {

  const [maquina, setInfoMaquina ] = useState([])
  const [maquinaMantenimientos, setMantenimientosMaquina ] = useState([])
  const {idMaquina} = useParams()




  useEffect(()=>{

      const buscarInfo = async ()=>{
        try{
            const response = await api.get(`ficha/listarInfoEspecifica/${idMaquina}`)

            setInfoMaquina(response.data)
            console.log(response.data)
            setMantenimientosMaquina(response.data.mantenimientos)

        }catch(error){
              console.error('Error listando info de maquinas', error)
          }
      }

      buscarInfo()

  }, [idMaquina])

  return (
    <>
        <Layout
            contenido={
                <div className=" flex pt-20 ">

                    <div className="text-gray-500 inline-block w-96 p-5 ml-20 bg-zinc-100 rounded h-fit">
                        <div className="mb-8 w-[344px] ">
                            <ImgMaquinas  img={maquina.fi_imagen}/>
                        </div>
                        
                        <InfoBasicaMaquina 
                            id ={maquina.idFichas}
                            serial ={maquina.fi_serial}
                            placa ={maquina.fi_placa_sena}
                            feAdquisicion ={new Date(maquina.fi_fecha_adquisicion).toLocaleDateString()}
                            feInicioGarantia ={new Date(maquina.fi_fecha_inicio_garantia).toLocaleDateString()}
                            feFinGrantia ={new Date(maquina.fi_fecha_fin_garantia).toLocaleDateString()}
                        />      

                        <div className="w-full grid justify-items-end mt-5">

                            <DescargarDocs contenido={<button className="btn btn-link">Descargar ficha respaldo</button>} ruta="fichasTecnicas" nombreDocumento={"1.pdf"} />
                            <DescargarDocs contenido={<button className="btn btn-active">Codigo QR</button>} ruta="QRimagenes" nombreDocumento={`${maquina.idFichas}-qr.png`} />
                                
                        </div>


                    </div>

                    
                    <div className="inline-block ml-20 ">
                        <TablaMantenimientosMa mantenimientos={maquinaMantenimientos}/>
                    </div>
                </div>
            }
            titlePage={`Maquina -- ${maquina.tipoEquipo}`}        
        />
    </>
  )
}
export default InfoMaquina