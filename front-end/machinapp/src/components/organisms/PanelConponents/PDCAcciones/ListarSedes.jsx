import React,{useEffect, useState} from 'react'

import api from '../../../atoms/api/Api.jsx'

import { Link, useNavigate } from 'react-router-dom'

import Nav from '../../../molecules/Nav.jsx'
import MenuLeft from '../../../molecules/Menuleft.jsx'


const ListarSedes = () =>{

    const [sedes, setSedes] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarSedes = async ()=>{
            try{
                const response = await api.get("/sede/listarSede")
                setSedes(response.data.resultadoSede)

                
            } catch(error){
                console.error(error)
            }
        }

        buscarSedes() 
    }, [])




    return (
        <>
            <div className=' bg-yellow-50'>
                
                <Nav/> 
                <MenuLeft/>
                <div className='m-3 p-96 flex flex-row'>

                    <table className='table bg-white'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>centro</th>
                                <th>descripcion CC</th>
                                <th>direccion</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                sedes.map((sede)=>(
                                    <tr  key={sede.idSede}>
                                        <td className='p-3'>{sede.idSede} </td>
                                        <td className='p-4'>{sede.sede_nombre}</td>
                                        <td className='p-5'>{sede.cen_nombre}</td>
                                        <td className='p-3'>{sede.sede_descripcion} </td>
                                        <td className='p-4'>{sede.sede_direccion}</td>
                                        
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

export default ListarSedes