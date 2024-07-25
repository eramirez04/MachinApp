import {useEffect, useState} from 'react'

import api from '../../../atoms/api/Api.jsx'

import MenuLeft from '../../../molecules/Menuleft.jsx'

import {SearchComponent} from "../../../atoms/Inputs/InputSearch.jsx"

import InputSubmit from "../../../atoms/Inputs/InputSubmit.jsx"

const ListarSitios = () =>{

    const [Sitios, setSitios] = useState([])

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
            <div  className='bg-gray-200'>
                
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