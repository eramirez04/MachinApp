import {useEffect, useState} from 'react'

import api from '../../../atoms/api/Api.jsx'


import MenuLeft from '../../../molecules/Menuleft.jsx'

import {SearchComponent} from "../../../atoms/Inputs/InputSearch.jsx"

import InputSubmit from "../../../atoms/Inputs/InputSubmit.jsx"

const ListarAreas = () =>{

    const [areas, setAreas] = useState([])


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
            <div >
                
                <MenuLeft/>
                <div className='flex justify-center items-center'>
                    <SearchComponent/>
                    <div className='pl-5 w-60'>
                        <InputSubmit    />

                    </div>
                    
                </div>
                <div className='m-3 flex px-96 flex-row'>

                    <table className='table bg-white'>
                        <thead className=' text-white bg-green-600'>
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