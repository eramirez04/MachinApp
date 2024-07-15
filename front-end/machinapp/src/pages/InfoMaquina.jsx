import  { useEffect } from "react"
import TablaMantenimientosMa from "../components/organisms/TablaMantenimientosMa.jsx"
import { useParams } from "react-router-dom"
import { useState } from "react"
import Layout from "../components/template/Layout.jsx"


import {axiosCliente} from "../service/api/axios.js"

import ImgMaquinas from "../components/atoms/ImgMaquinas.jsx"

const InfoMaquina = ()=> {

  const [maquina, setInfoMaquina ] = useState([])
  const [maquinaMantenimientos, setMantenimientosMaquina ] = useState([])
  const {idMaquina} = useParams()




  useEffect(()=>{

      const buscarInfo = async ()=>{
        try{
            const response = await axiosCliente.get(`ficha/listarInfoEspecifica/${idMaquina}`)

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
        <Layout titlePage={`Maquina -- ${maquina.tipoEquipo}`} >
            <div className=" flex pt-20 ">

                <div className="text-gray-500 inline-block  p-5 ml-20 bg-zinc-100 rounded h-fit">

                    <div className="mb-8 w-[300px] ">
                        <ImgMaquinas  img={maquina.fi_imagen}/>
                    </div>
                    
                {/*                         <InfoBasicaMaquina 
                        id ={maquina.idFichas}
                        serial ={maquina.fi_serial}
                        placa ={maquina.fi_placa_sena}
                        feAdquisicion ={new Date(maquina.fi_fecha_adquisicion).toLocaleDateString()}
                        feInicioGarantia ={new Date(maquina.fi_fecha_inicio_garantia).toLocaleDateString()}
                        feFinGrantia ={new Date(maquina.fi_fecha_fin_garantia).toLocaleDateString()}
                    />   */}    

                    <div className="w-full grid justify-items-end mt-5">

                        {/* <DescargarDocs contenido={<button className="btn btn-link">Descargar ficha respaldo</button>} ruta="fichasTecnicas" nombreDocumento={"1.pdf"} />
                        <DescargarDocs contenido={<button className="btn btn-active">Codigo QR</button>} ruta="QRimagenes" nombreDocumento={`${maquina.idFichas}-qr.png`} /> */}
                            
                    </div>


                </div>


                <div className="inline-block mx-10 mb-14 ">
                    <TablaMantenimientosMa mantenimientos={maquinaMantenimientos}/>
                </div>
            </div>
        </Layout>
    </>
  )
}
export default InfoMaquina