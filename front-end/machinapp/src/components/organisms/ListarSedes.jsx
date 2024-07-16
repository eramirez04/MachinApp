import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../template/Layout'
import ButtonSitios from '../atoms/buttons/ButtonSitios'
import { axiosCliente } from '../../service/api/axios'

const BuscarSedes = () => {
  const [sedes, setSedes] = useState([])

  useEffect(() => {
    const listarSede = async () => {
      try {
        const response = await axiosCliente.get('/sede/listarsede')
        setSedes(response.data.resultadoSede)
      } catch (error) {
        console.error(error)
      }
    }

    listarSede()
  }, [])

  return (
    <Layout titlePage='Centro'>
    <div className='bg-gray-200 h-screen overflow-y-auto'>
      <header className='bg-green-500 py-16 shadow-md top-0 z-10'>
        <h1 className='text-4xl font-extrabold text-center text-white'>Centro de Gestión y Desarrollo Sostenible Surcolombiano</h1>
        <p className='text-center text-white mt-6 mx-4 md:mx-0'>
          Este centro está ubicado en el departamento del Huila, municipio de Pitalito. Este centro cuenta con dos sedes a día de hoy.
        </p>
      </header>
      <div className='flex flex-col items-center space-y-8 py-10'>
        {sedes.map((sede) => (
          <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-2/3 transform transition-all hover:scale-105 hover:shadow-2xl' key={sede.idSede}>
            <img
              src={`http://localhost:3000/imagenes/${sede.img_sede}`}
              alt={sede.sede_nombre}
              className='w-full h-64 object-cover'
            />
            <div className='p-6'>
              <h2 className='text-2xl font-bold text-gray-800'>{sede.sede_nombre}</h2>
              <p className='text-gray-600 mt-2'>{sede.sede_direccion}</p>
              <p className='text-gray-700 mt-4'>{sede.sede_descripcion}</p>
              <div className='mt-4 flex justify-end'>
                <Link to={'/Sedes'}>
                  <ButtonSitios />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  )
}

export default BuscarSedes