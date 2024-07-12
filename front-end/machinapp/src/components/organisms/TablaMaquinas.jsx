import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Api from "../atoms/api/Api.jsx"

import FilasTablaMaquinas from "../molecules/FilasTablaMaquinas.jsx"

const   TablaMaquinas=() =>{

    const [maquinas, setMaquinas] = useState([])

    useEffect(()=>{

        const buscarInfo = async ()=>{

            try{
                const response = await Api.get('ficha/listar')
                setMaquinas(response.data)
    
            }catch(error){
                console.error('Error listando maquinas ')
            }
        }
        buscarInfo()

    }, [])


    return (
        <>
            <table className="table ">
                <thead>
                <tr className=" bg-green-600 text-white text-sm">
                    <th>ID</th>
                    <th>Placa Sena</th>
                    <th>Serial</th>
                    <th>Estado</th>
                    <th>Ubicacion</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                        maquinas.map((maquina)=>(
                            <tr key = {maquina.idFichas} className='hover:bg-base-300'>

                                <FilasTablaMaquinas 
                                    id={maquina.idFichas} 
                                    placa={maquina.fi_placa_sena} 
                                    serial={maquina.fi_serial} 
                                    estado={maquina.fi_estado} 
                                    sitNombre={maquina.sit_nombre}
                                />
                            </tr>    
                        ))
                    }
                </tbody>
            </table>
        </>
    )
  }
  export default TablaMaquinas