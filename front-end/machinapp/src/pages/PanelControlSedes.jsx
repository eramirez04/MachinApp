import React,{useEffect, useState} from 'react'

import api from '../components/Api'

import { Link, useNavigate } from 'react-router-dom'

import Nav from '../components/Nav'
import Header from '../components/Header'
import NavR from '../components/NavR'

import ButtonU from '../components/BottonU'
import ButtonD from '../components/BottonD'
import ButtonC from '../components/BottonC'
import InputSearch from '../components/InputSearch'

const ListarSede = () =>{

    const [sedes, setSede] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarSedes = async ()=>{
            try{
                const response = await api.get('/sede/listarsede')
                setSede(response.data.resultadoSede)

                
            } catch(error){
                console.error('Error listando sedes:', error)
            }
        }

        buscarSedes() 
    }, [])


    const borrarSede = async() =>{

        try{
            await api.delete(`/eliminar/${sedes.idSede}`,{

            }).finally(()=>{
                navigate("/listarsede")
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
                        <thead  className=' text-slate-800 text-sm pl-52'>
                            <tr>
                                <th className=' pb-8'>ID</th>
                                <th className=' pb-8'>Centro relacionado</th>
                                <th className=' pb-8'>Nombre Sede</th>
                                <th className=' pb-8'>Direccion sede</th>
                                <th className=' pb-8'>Descripcion sede</th>
                            </tr>
                        </thead>
                        <tbody className=' bg-white text-sm border-b-neutral-500'>
                            {
                                sedes.map((sede)=>(
                                    <tr  key={sede.idSede}>
                                        <td >{sede.idSede} </td>
                                        <td >{sede.cen_nombre}</td>
                                        <td >{sede.sede_nombre}</td>
                                        <td >{sede.sede_descripcion}</td>
                                        <td >{sede.sede_direccion}</td>
                                        <td ><button onClick={borrarSede} ></button><ButtonD/></td>
                                        <td ><Link to={`/actualizar/${sede.idSede}`}><ButtonU/></Link></td>
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

export default ListarSede