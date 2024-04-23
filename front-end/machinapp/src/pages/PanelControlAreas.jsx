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

const ListarAreas = () =>{

    const [areas, setAreas] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarAreas = async ()=>{
            try{
                const response = await api.get('/area/listararea')
                setAreas(response.data.resultadoArea)

                
            } catch(error){
                console.error('Error listando areas:', error)
            }
        }

        buscarAreas() 
    }, [])


    const borrarUsuario = async() =>{

        try{
            await api.delete(`/eliminar/${areas.idArea}`,{

            }).finally(()=>{
                navigate("/listararea")
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

                <div className='m-3 p-96 flex-auto pt-32'>


                    <table className='table'>
                        <thead className=' text-slate-800 text-sm pl-52'>
                            <tr>
                                <th className=' pb-8'>ID</th>
                                <th className=' pb-8'>Sede relacionada</th>
                                <th className=' pb-8'>Nombre area</th>
                            </tr>
                        </thead>
                        <tbody  className=' bg-white text-sm border-b-neutral-500'>
                            {
                                areas.map((area)=>(
                                    <tr  key={area.idArea}>
                                        <td >{area.idArea} </td>
                                        <td >{area.sede_nombre}</td>
                                        <td >{area.area_nombre}</td>
                                        <td ><button onClick={borrarUsuario} ></button><ButtonD/></td>
                                        <td ><Link to={`/actualizar/${area.idArea}`}><ButtonU/></Link></td>
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