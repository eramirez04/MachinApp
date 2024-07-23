import  { useEffect } from "react"
import TablaMantenimientosMa from "../components/organisms/TablaMantenimientosMa.jsx"
import { useParams } from "react-router-dom"
import { useState } from "react"
import Layout from "../components/template/Layout.jsx"
import {axiosCliente} from "../service/api/axios.js"
import Imagenes from "../components/atoms/media/Imagenes.jsx"
import {CardStyle} from "../components/molecules/CardStyle.jsx"
import { BiQrScan } from "react-icons/bi";
import { CiSaveDown1 } from "react-icons/ci";
import BlocInformation from "../components/atoms/BlocInformation.jsx"


import {Tooltip} from "@nextui-org/react"

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
        <Layout titlePage={`${maquina.tipoEquipo}`} > 
            <div className=" flex justify-center pt-20 mb-20  ">

                <div className="mx-5 w-[400px] ">
    
                    <div className=" flex justify-center  w-[400px] ">
                        <CardStyle
                            titleCard = {`Plca: ${maquina.fi_placa_sena}`}
                            subtitle = {maquina.tipoEquipo} 
                        >
                            <div >
                                <figure className="w-full grid justify-items-center bg-white   ">
                                    <Imagenes  rutaImg = {`imagenes/ficha/${maquina.fi_imagen}` } />
                                </figure>
                                <div className="mt-8 mb-11" >
                                    <p>Descripcion del equipo:  </p>
                                </div>
                            </div>
                        </CardStyle>
                    </div>

                    

                    <div className=" p-3 my-7  w-full border-b-2 border-b-green-600 flex justify-end  text-3xl gap-4">

                        <a href={`http://localhost:3000/QRimagenes/${maquina.idFichas}-qr.png`} target="_blank" download>
                            <Tooltip content="CodigoQR" >
                                <span className="text-3xl cursor-pointer ">
                                    <BiQrScan/>
                                </span>
                            </Tooltip>
                        </a>

                        <a href={`http://localhost:3000/fichasTecnicas/FichasRespaldo/${maquina.ficha_respaldo}`} target="_blank" download>
                            <Tooltip content="Ficha de respaldo" >
                                <span className="text-3xl cursor-pointer ">
                                    <CiSaveDown1 />
                                </span>
                            </Tooltip>
                        </a>

                    </div>

                    <h3 className="mt-11 mb-6 text-xl "> <b className="text-green-600">●</b> Informacion general</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <BlocInformation titulo = "ID: " contenido={maquina.idFichas} />
                        <BlocInformation titulo = "Serial: " contenido={maquina.fi_serial} />
                        <BlocInformation titulo = "Placa SENA: " contenido={maquina.fi_placa_sena} />
                        <BlocInformation titulo = "Estado: " contenido={maquina.fi_estado} />
                    </div>

                    <h3 className="mt-11 mb-6 text-xl "> <b className="text-green-600">●</b> Informacion Garantia</h3>
                    <div className="grid grid-cols-2 gap-4 mb-[16px]" >
                        <BlocInformation titulo = "Fecha adquisición : " contenido={new Date(maquina.fi_fecha_adquisicion).toLocaleDateString()} />
                        <BlocInformation titulo = "Inicio Grantia: " contenido={new Date(maquina.fi_fecha_inicio_garantia).toLocaleDateString()} />
                        
                        <BlocInformation className="w-full " titulo = "Descripcion Grantia: " contenido={maquina.fi_descripcion_garantia} />
                        <BlocInformation titulo = "Fin Grantia: " contenido={new Date(maquina.fi_fecha_fin_garantia).toLocaleDateString()} />
                    </div>

                </div>

                <div className="inline-block mx-5 mb-14 w-[520px] ">
                    <h3 className="text-2xl font-medium mb-7 border-b-2 border-b-green-600 pb-2" >Mantenimientos</h3>
                    <TablaMantenimientosMa mantenimientos={maquinaMantenimientos}/>
                </div>
            </div>
        </Layout>
    </>
  )
}
export default InfoMaquina