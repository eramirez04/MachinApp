import  { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import {Link as LinkNextui} from "@nextui-org/react"
import { BiQrScan } from "react-icons/bi"
import { CiSaveDown1 } from "react-icons/ci"

import {Tooltip} from "@nextui-org/react"

import { Layout, CardStyle, Imagenes ,BlocInformation, axiosCliente, Breadcrumb  } from "../../index.js"

/* import TablaMantenimientosMa from "../../components/organisms/TablaMantenimientosMa.jsx" */


export const InfoMaquina = ()=> {

  const [maquina, setInfoMaquina ] = useState([])
  const [maquinaMantenimientos, setMantenimientosMaquina ] = useState([])
  const {idMaquina} = useParams()

  useEffect(()=>{

      const buscarInfo = async ()=>{
        try{
            const response = await axiosCliente.get(`ficha/listarInfoEspecifica/${idMaquina}`)

            setInfoMaquina(response.data)
          
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

            <Breadcrumb pageName={`${maquina.tipoEquipo}`} />
            
            <div className=" flex justify-center flex-row pt-12 mt-11 mb-20 pb-16  border-b-2 border-b-green-600 ">
                
                <div className="mr-14">
                    <CardStyle
                        titleCard = {`Modelo: ${maquina.fi_modelo} ` }
                        subtitle =  {`Placa: ${maquina.fi_placa_sena}`}
                    >
                        <div className="w-[300px] flex flex-col justify-center  pb-2 " >
                            <figure className="w-full grid justify-items-center bg-white   ">
                                <Imagenes  rutaImg = {`imagenes/ficha/${maquina.fi_imagen}` } />
                            </figure>
                            <div className="mt-8 mb-11" >
                                <p><b>Descripcion del equipo:</b> <br /> {maquina.fi_descripcion} </p>
                            </div>
                        </div>
                    </CardStyle>
                </div>

                    

                <div className="w-[500px]">

                    <div className=" shadow-sm border-1 border-green-600 rounded-lg shadow-green-500 p-3  gap-4 flex flex-row justify-end">
                        
{/*                         <a className=" flex justify-self-start text-zinc-800" href="">
                                Acceder ficha tecnica.
                        </a> */}
                        <div className="w-full">
                            
                            <LinkNextui  isBlock showAnchorIcon href= {`/listarFichaTecnica/${maquina.idFichas}`} color="success">
                                Acceder ficha tecnica
                                
                            </LinkNextui>
                            
                        </div>

                        <a href={`http://localhost:3000/QRimagenes/${maquina.CodigoQR}`} target="_blank" download>
                            <Tooltip content="CodigoQR" >
                                <span className="text-3xl cursor-pointer text-zinc-800 ">
                                    <BiQrScan/>
                                </span>
                            </Tooltip>
                        </a>
                        <a href={`http://localhost:3000/fichasTecnicas/FichasRespaldo/${maquina.ficha_respaldo}`} target="_blank" download>
                            <Tooltip content="Ficha de respaldo" >
                                <span className="text-3xl cursor-pointer text-zinc-800">
                                    <CiSaveDown1 />
                                </span>
                            </Tooltip>
                        </a>

                    </div>

                    <div className=" my-5 rounded-lg  shadow-sm  shadow-gray-500/50 p-4 " >
                        <h3 className=" pl-10 text-lg border-b-1 border-b-green-600 pb-2 text-zinc-800  font-medium"> Informacion general</h3>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <BlocInformation titulo = "Id: " contenido={maquina.idFichas} />
                            <BlocInformation titulo = "Serial: " contenido={maquina.fi_serial} />
                            <BlocInformation titulo = "Placa SENA: " contenido={maquina.fi_placa_sena} />
                            <BlocInformation titulo = "Marca: " contenido={maquina.fi_marca} />
                            <BlocInformation titulo = "Modelo: " contenido={maquina.fi_modelo} />
                            <BlocInformation titulo = "Estado: " contenido={maquina.fi_estado} />
                        </div>
                    </div>

                    <div className=" my-5 rounded-lg  shadow-sm  shadow-gray-500/50 p-4 " >
                        <h3 className="pl-10 text-lg border-b-1 border-b-green-600 pb-2 text-zinc-800  font-medium"> Informacion Garantia</h3>
                        <div className="grid grid-cols-2 gap-2 mt-3" >
                            <BlocInformation titulo = "Fecha adquisición : " contenido={new Date(maquina.fi_fecha_adquisicion).toLocaleDateString()} />
                            <BlocInformation titulo = "Inicio Grantia: " contenido={new Date(maquina.fi_fecha_inicio_garantia).toLocaleDateString()} />
                            <BlocInformation className="w-full " titulo = "Descripcion Grantia: " contenido={maquina.fi_descripcion_garantia} />
                            <BlocInformation titulo = "Fin Grantia: " contenido={new Date(maquina.fi_fecha_fin_garantia).toLocaleDateString()} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className=" block mx-16 mb-14 ">
                    <h3 className="text-3xl font-medium mb-10 text-zinc-700  pb-2" >Mantenimientos</h3>
                    {/* <TablaMantenimientosMa mantenimientos={maquinaMantenimientos}/> */}
            </div>

        </Layout>
    </>
  )
}
