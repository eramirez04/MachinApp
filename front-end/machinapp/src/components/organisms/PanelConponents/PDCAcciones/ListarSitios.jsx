import React,{useEffect, useState} from 'react'

import api from '../../../atoms/api/Api.jsx'

import { Link, useNavigate } from 'react-router-dom'

import Nav from '../../../molecules/Nav.jsx'
import MenuLeft from '../../../molecules/Menuleft.jsx'

const ListarSitios = () =>{

    const [Sitios, setSitios] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarSitios = async ()=>{
            try{
                const response = await api.get("/sitio/listarsitio")
                setSitios(response.data.resultadoSitio)

                
            } catch(error){
                console.error(error)
            }
        }

        buscarSitios() 
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
                            </tr>
                        </thead>
                        <tbody >
                            {
                                Sitios.map((Sitio)=>(
                                    <tr  key={Sitio.idAmbientes}>
                                        <td className='p-3'>{Sitio.idAmbientes} </td>
                                        <td className='p-4'>{Sitio.sit_nombre}</td>
                                        <td className='p-5'>{Sitio.tipo_sitio}</td>
                                        <td className='p-3'>{Sitio.area_nombre} </td>
                                        
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

export default ListarSitios