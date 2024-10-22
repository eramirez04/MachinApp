import {useEffect, useState} from 'react'

import {axiosCliente } from "../../service/api/axios" 




const ListarActividades = () =>{

    const [actividades, setActividades] = useState([])


    useEffect(()=>{
        const buscarActividades = async ()=>{
            try{
                const response = await axiosCliente.get('/actividades/listar')
                setActividades(response.data.resultadoActividad)

                
            } catch(error){
                console.error(error)
            }
        }

        buscarActividades() 
    }, [])




    return (
        <>
            <div className='max-w-md mx-auto z-40 ' >
                <h1 className=" text-2xl text-[#52BD8F]">Lista de Actividades</h1>
                <div className=' pb-16'>

                    <table className='table bg-white'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>Actividad </th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                actividades.map((actividade)=>(
                                    <tr  key={actividade.idActividades}>
                                        <td className='p-3'>{actividade.idActividades} </td>
                                        <td className='p-4'>{actividade.us_nombre}</td>
                                        <td className='p-5'>{actividade.rol_nombre}</td>
                                        <td className='p-3'>{actividade.acti_nombre} </td>
                                        <td className='p-4'>{actividade.acti_estado}</td>

                                        
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

export default ListarActividades