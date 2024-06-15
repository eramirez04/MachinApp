import React,{useEffect, useState} from 'react'

import api from '../components/atoms/api/Api.jsx'

import { Link, useNavigate } from 'react-router-dom'

import Nav from '../components/molecules/Nav.jsx'
import Header from '../components/organisms/Header.jsx'

import ButtonU from '../components/atoms/buttons/BottonU.jsx'
import ButtonD from '../components/atoms/buttons/BottonD.jsx'
import ButtonC from '../components/atoms/buttons/BottonC.jsx'

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

                <div className='m-3 p-96 flex flex-row'>
                    <p className='font-bold'>
                        <Link to="/registrar"><ButtonC/></Link>
                    </p>

                    <table className='table bg-white'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                usuarios.map((usuario)=>(
                                    <tr  key={usuario.idUsuarios}>
                                        <td className='p-3'>{usuario.idUsuarios} </td>
                                        <td className='p-4'>{usuario.us_nombre}</td>
                                        <td className='p-5'>{usuario.us_correo}</td>
                                        <td className='p-3'><button onClick={borrarUsuario} ></button><ButtonD/></td>
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
