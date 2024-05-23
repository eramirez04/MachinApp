import React,{useEffect, useState} from 'react'

import api from '../../Api'

import { Link, useNavigate } from 'react-router-dom'

import Nav from '../../Nav'

import MenuLeft from '../MenuLeft'




const ListarUsuarios = () =>{

    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarUsuarios = async ()=>{
            try{
                const response = await api.get('/user/listar')
                setUsuarios(response.data.resultadoUser)

                
            } catch(error){
                console.error(error)
            }
        }

        buscarUsuarios() 
    }, [])




    return (
        <>
            <div className=' h-screen bg-yellow-50'>
   
                <Nav/> 
                <MenuLeft/>
                <div className='m-3 pt-52 pl-96 pr-96 flex flex-row'>

                    <table className='table  bg-white'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>numero CC</th>
                                <th>tipo de documento</th>
                                <th>especialidad</th>
                                <th>empresa</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                usuarios.map((usuario)=>(
                                    <tr  key={usuario.idUsuarios}>
                                        <td className='p-3'>{usuario.idUsuarios} </td>
                                        <td className='p-4'>{usuario.us_nombre}</td>
                                        <td className='p-5'>{usuario.us_correo}</td>
                                        <td className='p-3'>{usuario.us_tipo_documento} </td>
                                        <td className='p-4'>{usuario.us_numero_documento}</td>
                                        <td className='p-3'>{usuario.us_especialidad} </td>
                                        <td className='p-4'>{usuario.rol_nombre}</td>
                                        <td className='p-5'>{usuario.us_empresa}</td>
                                        
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

export default ListarUsuarios