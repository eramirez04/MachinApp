import React,{useEffect, useState} from 'react'

import api from '../components/Api'

import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Nav from '../components/Nav'
import NavR from '../components/NavR'

import ButtonU from '../components/BottonU'
import ButtonD from '../components/BottonD'
import ButtonC from '../components/BottonC'

import InputSearch from '../components/InputSearch'

const ListarUsuarios = () =>{

    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarUsuarios = async ()=>{
            try{
                const response = await api.get('/user/listar')
                setUsuarios(response.data.resultadoUser)

                
            } catch(error){
                console.error('Error listando usuarios:', error)
            }
        }

        buscarUsuarios() 
    }, [])


    const borrarUsuario = async() =>{

        try{
            await api.delete(`/eliminar/${usuarios.idUsuarios}`,{

            }).finally(()=>{
                navigate("/listar")
            })

        }catch(error){
            console.error('Error eliminando el usuario')
        }
    }


    return (
        <>
            <div className=' bg-yellow-50'>
                <Header/>
                <Nav/> 
                <NavR/> 
                <InputSearch/> 

               

                <Link to="/registrar" className=' float-right'><ButtonC/></Link>


                <div className='m-3 pl-52 flex-auto pt-32 '>

                    <table className='table'>
                        <thead className=' text-slate-800 text-sm pl-52'>
                            <tr >
                                <th className=' pb-8'>ID</th>
                                <th className=' pb-8'>Nombre</th>
                                <th className=' pb-8'>Correo</th>
                                <th className=' pb-8'>contraseña</th>
                                <th className=' pb-8'>tipo de documento</th>
                                <th className=' pb-8'>numero de documento</th>
                                <th className=' pb-8'>roles</th>
                                <th className=' pb-8'>Eliminar</th>
                                <th className=' pb-8'>Editar</th>
                            </tr>
                        </thead>
                        <tbody className=' bg-white text-sm border-b-neutral-500'>
                            {
                                usuarios.map((usuario)=>(
                                    <tr  key={usuario.idUsuarios}>
                                        <td className=' px-14'>{usuario.idUsuarios} </td>
                                        <td className=' pr-24'>{usuario.us_nombre}</td>
                                        <td className=' px-5 pr-16'>{usuario.us_correo}</td>
                                        <td className=' pr-24'>{usuario.us_contrasenia}</td>
                                        <td className=' pr-16'>{usuario.us_tipo_documento}</td>
                                        <td className=''>{usuario.us_numero_documento}</td>
                                        <td className=''>{usuario.rol_nombre}</td>
                                        <td className=''><button onClick={borrarUsuario} ></button><ButtonD/></td>
                                        <td ><Link to={`/actualizar/${usuario.idUsuarios}`}><ButtonU/></Link></td>
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
