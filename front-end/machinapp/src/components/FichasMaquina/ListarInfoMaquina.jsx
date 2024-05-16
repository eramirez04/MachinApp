import React, { useEffect } from "react"
import api from "../Api"
import { useParams, Link } from "react-router-dom"
import { useState } from "react"


import Nav from "../Nav"
import Header from "../Header"

import { FaDownload } from "react-icons/fa6";

const ListarInfoMaquina =()=>{

    const [maquina, setInfoMaquina ] = useState([])
    const {idFicha} = useParams()

    const [maquinaMantenimientos, setMantenimientosMaquina ] = useState([])

    useEffect(()=>{
        const buscarInfo = async ()=>{
            try{

                const response = await api.get(`ficha/listarInfoEspecifica/${idFicha}`)
                setInfoMaquina(response.data)
                setMantenimientosMaquina(response.data.mantenimientos)
                console.log(response.data)

            }catch(error){
                console.error('Error listando info de maquinas', error)
            }
        }

        buscarInfo()
    }, [idFicha])

    const rutaImg=(rutaImg)=>{

        let direccionImg =  `http://localhost:3000/imagenes/ficha/${rutaImg}`
        return direccionImg
    }
    return(
        <>

            <Header/>
            <Nav/>
            <div className="bg-white flex justify-center  w-full h-auto py-28 ">

                <div className="text-gray-600 inline-block w-96 p-5 bg-zinc-100 rounded">
                    <div key={maquina.idFichas}>
                        <div className="w-full  flex justify-center items-center mb-12 text-sm "><img src={rutaImg(maquina.fi_imagen)} alt="InfoMaquina" className="rounded" /></div>
                        <p className="text-sm"><b>ID:</b> {maquina.idFichas}</p>
                        <p className="text-sm"><b>Serial:</b> {maquina.fi_serial}</p>
                        <p className="text-sm"><b>Placa Sena:</b> {maquina.fi_placa_sena}</p>
                        <p className="text-sm"><b>Fecha adquisicion:</b> {new Date(maquina.fi_fecha_adquisicion).toLocaleDateString() }</p>
                        <p className="text-sm"><b>Estado:</b> {maquina.fi_estado} </p>
                        <p className="text-sm"><b>Inicio garantia:</b>  {new Date(maquina.fi_fecha_inicio_garantia).toLocaleDateString() }</p>
                        <p className="text-sm"><b>Fin garantia:</b>{new Date(maquina.fi_fecha_fin_garantia).toLocaleDateString() }</p>
                    </div>

                    <div className="w-full grid justify-items-end mt-5">
                        <button className="btn btn-link"> FichaTecnica default</button>  {/* enviarme la ficha tecnica por defecto, PDF */}
                    </div>
                </div>

                <div className="overflow-x-auto inline-block ml-24 ">

                    <h4 className="text-2xl  text-gray-600 font-semibold mb-4">Ficha Tecnica Registrada</h4>
                    <div className=" flex mb-6 gap-2">
                        <button className="btn btn-active btn-ghost ">Abrir</button>
                        <button className="btn btn-active btn-ghost">Editar</button>
                        <button className="btn btn-active btn-ghost" >Codigo QR</button>
                    </div>

                    <h4 className="text-2xl mb-4  text-gray-600 font-semibold">Mantenimientos </h4>
                    <table className="table rounded">
                        <thead className="bg-gray-200">
                        <tr className="text-gray-600">
                            <th>ID </th>
                            <th>Codigo </th>
                            <th>Fecha Realizacion</th>
                            <th>Tipo Mantenimiento</th>
                            <th>Descargar PDF</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                maquinaMantenimientos.map((infoMantenimiento)=>(
                                    
                                    <tr key={infoMantenimiento.idMantenimiento} className="hover:bg-slate-100 text-gray-600">
                                        <th>{infoMantenimiento.idMantenimiento}</th>
                                        <td>{infoMantenimiento.mant_codigo_mantenimiento}</td>
                                        <td>{new Date(infoMantenimiento.mant_fecha_realizacion).toLocaleDateString() }</td>
                                        <td>{infoMantenimiento.tipo_mantenimiento}</td>
                                        <td className="grid justify-items-center"><Link><FaDownload className="text-xl"/></Link></td> {/* que me envie el pdf del mantenimiento */}
                                    </tr>
                                    
                                ))
                            }

                        </tbody>
                    </table>
                </div>




            </div>
        </>
    )
}

export default ListarInfoMaquina