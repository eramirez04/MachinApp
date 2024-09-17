import  { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import {Link as LinkNextui} from "@nextui-org/react"
import { BiQrScan } from "react-icons/bi"
import { CiSaveDown1 } from "react-icons/ci"
import {Tooltip} from "@nextui-org/react"

import { Layout, CardStyle, Imagenes ,BlocInformation, axiosCliente, Breadcrumb, ModalComponte,  UpdateEstAmbienteFicha } from "../../index.js"

import { useTranslation } from "react-i18next"

/* import TablaMantenimientosMa from "../../components/organisms/TablaMantenimientosMa.jsx" */


export const InfoMaquina = ()=> {

    const { t } = useTranslation()


  const [maquina, setInfoMaquina ] = useState([])
  const [maquinaMantenimientos, setMantenimientosMaquina ] = useState([])
  const {idMaquina} = useParams()

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
  useEffect(()=>{
    buscarInfo()
  }, [])

  return (
    <>
        <Layout titlePage={`${maquina.tipoEquipo}`} > 

            <Breadcrumb pageName={`${maquina.tipoEquipo}`} />
            
            <div className=" flex justify-center flex-row flex-wrap pt-12 gap-8 mt-11 mb-20 pb-16  border-b-2 border-b-green-600 h-auto">
                

                    
                <div className="w-[480px] flex-1 ">

                    <div className=" shadow-sm border-1 border-green-600 rounded-lg shadow-green-500 p-3  gap-4 flex flex-row justify-end">
                        
{/*                         <a className=" flex justify-self-start text-zinc-800" href="">
                                Acceder ficha tecnica.
                        </a> */}
                        <div className="w-full">
                            
                            <LinkNextui  isBlock showAnchorIcon href= {`/listarFichaTecnica/${maquina.idFichas}`} color="success">
                               {
                                t('accFichaTec')
                               }
                                
                            </LinkNextui>
                            
                        </div>

                        <a href={`http://localhost:3000/QRimagenes/${maquina.CodigoQR}`} target="_blank" download>
                            <Tooltip content = {t('codigoQR')} >
                                <span className="text-3xl cursor-pointer text-zinc-800 ">
                                    <BiQrScan/>
                                </span>
                            </Tooltip>
                        </a>
                        <a href={`http://localhost:3000/fichasTecnicas/FichasRespaldo/${maquina.ficha_respaldo}`} target="_blank" download>
                            <Tooltip content={t('fichaRespaldo')} >
                                <span className="text-3xl cursor-pointer text-zinc-800">
                                    <CiSaveDown1 />
                                </span>
                            </Tooltip>
                        </a>

                    </div>

                    <div className=" my-5 rounded-lg  shadow-sm  shadow-gray-500/50 p-4 " >
                        <h3 className=" pl-10 text-lg border-b-1 border-b-green-600 pb-2 text-zinc-800  font-medium"> {t('infoGeneral')}</h3>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <BlocInformation titulo = "Id" contenido={maquina.idFichas} />
                            <BlocInformation titulo = {t('serial')} contenido={maquina.fi_serial} />
                            <BlocInformation titulo = {t('placaSena')} contenido={maquina.fi_placa_sena} />
                            <BlocInformation titulo = {t('marca')} contenido={maquina.fi_marca} />
                            <BlocInformation titulo = {t('modelo')}contenido={maquina.fi_modelo} />
                            <BlocInformation titulo = {t('estado')} contenido={maquina.fi_estado} />
                        </div>
                    </div>

                    <div className=" my-5 rounded-lg  shadow-sm  shadow-gray-500/50 p-4 " >
                        <h3 className="pl-10 text-lg border-b-1 border-b-green-600 pb-2 text-zinc-800  font-medium"> {t('infoGarantia')}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-3" >
                            <BlocInformation titulo ={t('fechaAdquisi')} contenido={new Date(maquina.fi_fecha_adquisicion).toLocaleDateString()} />
                            <BlocInformation titulo = {t('fechaInicioGaran')} contenido={new Date(maquina.fi_fecha_inicio_garantia).toLocaleDateString()} />
                            <BlocInformation className="w-full " titulo ={t('fechaDescrGarantia')} contenido={maquina.fi_descripcion_garantia} />
                            <BlocInformation titulo = {t('fechaFinGarantia')} contenido={new Date(maquina.fi_fecha_fin_garantia).toLocaleDateString()} />
                        </div>
                    </div>

                    <div className=" my-5 rounded-lg  shadow-sm  shadow-gray-500/50 p-4 " >
                        <h3 className="pl-10 text-lg border-b-1 border-b-green-600 pb-2 text-zinc-800  font-medium">{t('ubicacion')}</h3>
                        
                        <div className="overflow-x-auto mt-6 mb-3">
                            <table className="min-w-full border border-gray-300 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                        <b> {t('sede')} <span className="text-green-600 font-bold">&gt;</span> </b>
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                            <b> {t('area')} <span className="text-green-600 font-bold">&gt;</span> </b>
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                            <b> {t('ambiente')}  </b>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b border-gray-300">
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                        {maquina.sede_nombre}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                        {maquina.area_nombre}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                        {maquina.sit_Nombre}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className=" flex-1 h-full">
                    <CardStyle
                        titleCard = {` ${t('modelo')}: ${maquina.fi_modelo} ` }
                        subtitle =  {`${t('placaSena')}: ${maquina.fi_placa_sena}`}
                    >
                        <div className="w-full flex justify-center">
                            <div className="w-[350px] flex flex-col justify-center  pb-2 " >
                                <figure className="w-full grid justify-items-center bg-white   ">
                                    <Imagenes  rutaImg = {`imagenes/ficha/${maquina.fi_imagen}` } />
                                </figure>
                            </div>
                        </div>

                        <div className="my-8" >
                            <p><b> {t('descripcionEquipo')}:</b> <br /> {maquina.fi_descripcion} </p>
                        </div>
                        <div className="flex flex-col gap-4 my-8 ">
                            
                            <ModalComponte
                                buttonModal={ `${t('actEstadoEquipo')}`}
                                tittleModal = {`${t('actEstadoEquipo')}`}
                                componente={<>
                                <UpdateEstAmbienteFicha dataMaquina={maquina} procesoAct={"EstadoFicha"} buscarInfo={buscarInfo}  />
                                </>}
                                variantButton={"bordered"}
                                colorButton={"warning"}
                            />
                            
                            <ModalComponte
                                buttonModal={`${t('actAmbienteEquipo')}`}
                                tittleModal = {`${t('actAmbienteEquipo')}`}
                                componente={<>
                                <UpdateEstAmbienteFicha dataMaquina={maquina} procesoAct={"AmbienteFicha"}  buscarInfo={buscarInfo}  />
                                </>}
                                variantButton={"bordered"}
                                colorButton={"warning"}
                            />

                        </div>
                    </CardStyle>

                </div>
            </div>
            
            <div className=" block mx-16 mb-14 ">
                    <h3 className="text-3xl font-medium mb-10 text-zinc-700  pb-2" >{t('mantenimientos')}</h3>
                    {/* <TablaMantenimientosMa mantenimientos={maquinaMantenimientos}/> */}
            </div>

        </Layout>
    </>
  )
}
