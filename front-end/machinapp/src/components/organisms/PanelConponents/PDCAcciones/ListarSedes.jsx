import {useEffect, useState} from 'react'

import api from '../../../atoms/api/Api.jsx'

import MenuLeft from '../../../molecules/Menuleft.jsx'

import {SearchComponent} from "../../../atoms/Inputs/InputSearch.jsx"

import InputSubmit from "../../../atoms/Inputs/InputSubmit.jsx"

const ListarSedes = () =>{

    const [sedes, setSedes] = useState([])


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
            <div className='bg-gray-200'>
                <MenuLeft/>
                <div className='flex justify-center items-center'>
                    <SearchComponent/>
                    <div className='pl-5 w-60'>
                        <InputSubmit    />

                    </div>
                    
                </div>
                <div className='m-3 px-96 flex flex-row'>

                    <table className='table bg-white'>
                        <thead className=' text-white bg-green-600'>
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