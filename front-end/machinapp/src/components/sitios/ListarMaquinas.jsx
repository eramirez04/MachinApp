import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../Nav'
import ButtonSitios from './ButtonSitios'
import api from '../Api'

const BuscarMaquinas=()=>  {

    const [maquinas, setMaquinas] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const listarFicha = async ()=>{
            try{
                const response = await api.get('/ficha/listar')
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
        <h3 className='text-black mt-10'>En este ambiente se encuentra el titulado de Barismo, donde se encuentran diferentes maquinas ligadas a el proceso del café</h3>
      </div>
        <div className='bg-yellow-50 w-full h-96 flex justify-center items-center'>
          <Link to={'/Maquinas'}><ButtonSitios /></Link>
        </div>
      </div>
  )
}

export default BuscarMaquinas