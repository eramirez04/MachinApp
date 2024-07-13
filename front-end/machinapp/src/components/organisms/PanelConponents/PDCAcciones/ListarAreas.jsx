import React,{useEffect, useState} from 'react'

import api from '../../../atoms/api/Api.jsx'

import { Link, useNavigate } from 'react-router-dom'

import Nav from '../../../molecules/Nav.jsx'
import MenuLeft from '../../../molecules/Menuleft.jsx'



const ListarAreas = () =>{

    const [areas, setAreas] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarAreas = async ()=>{
            try{
                const response = await api.get('/area/listararea')
                setAreas(response.data.resultadoArea)

                
            } catch(error){
                console.error(error)
            }
        }

        buscarAreas() 
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
                                <th>Sede</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                areas.map((area)=>(
                                    <tr  key={area.idArea}>
                                        <td className='p-3'>{area.idArea} </td>
                                        <td className='p-4'>{area.area_nombre}</td>
                                        <td className='p-5'>{area.sede_nombre}</td>
                                        
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

export default ListarAreas