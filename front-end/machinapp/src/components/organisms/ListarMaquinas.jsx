import { useEffect, useState } from 'react'
import {Nav } from "../../index"

import { axiosCliente } from '../../service/api/axios'

export const BuscarMaquinas=()=>  {
    const [maquinas, setMaquinas] = useState([])

    useEffect(()=>{
        const listarFicha = async ()=>{
            try{
                const response = await axiosCliente.get('/ficha/listar')
                setMaquinas(response.data.respuesta)
            } catch(error){
                console.error(error)
            }
        }

        listarFicha() 
    }, [])

  return (
    <div className='bg-yellow-50 w-full h-full'>
      <Nav/>
      <div className='bg-white w-full h-96'></div>
      <div className='bg-gray-100 items-center justify-center text-center h-40'>
        <h1 className='center text-black p-5 font-bold'>Ambiente Y13</h1>
        <h3 className='text-black mt-10'>En este ambiente se encuentran varios equipos, los cuales son:</h3>
      </div>
      {
        maquinas.map((maquina) => (
            <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col' key={maquina.idFichas}>
              <div className='bg-yellow-50 w-full h-14'>
                <h2 className='text-black font-semibold'>{maquina.ti_fi_nombre}</h2>
              </div>
              <div className='flex flex-row mt-10 items-center'>
                <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
                <p className='text-black ml-10 mb-12'>{maquina.fi_placa_sena}</p>

              </div>
            </div>
        ))
      }
    </div>
  )
}

