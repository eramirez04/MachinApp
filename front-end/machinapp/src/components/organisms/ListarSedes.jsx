import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../molecules/Nav'
import ButtonSitios from '../atoms/buttons/ButtonSitios'
import api from '../atoms/api/Api'

const BuscarSedes=()=>  {

    const [sedes, setSedes] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const listarSede = async ()=>{
            try{
                const response = await api.get('/sede/listarsede')
                setSedes(response.data.resultadoSede)

                
            } catch(error){
                console.error(error)
            }
        }

        listarSede() 
    }, [])

  return (
    <div className='bg-yellow-50 w-full h-full'>
      <Nav/>
      <div className='bg-white w-full h-96'></div>
      <div className='bg-gray-100 items-center justify-center text-center h-40'>
        <h1 className='center text-black p-5 font-bold'>Centro de Gestión y Desarrollo Sostenible Surcolombiano</h1>
        <h3 className='text-black mt-10'>Este centro está ubicado en el departamento del Huila, municipio de Pitalito. Este centro cuenta con dos sedes a día de hoy.</h3>
      </div>
      {
        sedes.map((sede) => (
            <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col' key={sede.idSede}>
              <div className='bg-yellow-50 w-full h-14'>
                <h2 className='text-black font-semibold'>{sede.sede_nombre}, {sede.sede_direccion}</h2>
              </div>
              <div className='flex flex-row mt-10 items-center'>
                <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
                <p className='text-black ml-10 mb-12'>{sede.sede_descripcion}</p>
                <Link to={'/Sedes'}><ButtonSitios /></Link>
              </div>
            </div>
        ))
      }
    </div>
  )
}

export default BuscarSedes