import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../template/Layout'
import ButtonSitios from '../atoms/buttons/ButtonSitios'
import { axiosCliente } from '../../service/api/axios'

const BuscarAreas = () => {
  const [areas, setAreas] = useState([])

  useEffect(() => {
    const listarArea = async () => {
      try {
        const response = await axiosCliente.get('/area/listararea')
        setAreas(response.data.resultadoArea)
      } catch (error) {
        console.error(error)
      }
    }

    listarArea()
  }, [])

  return (
    <Layout titlePage='Sede'>
    <div className='bg-gray-200 h-screen overflow-y-auto'>
      <header className='bg-green-500 py-16 shadow-md top-0 z-10'>
        <h1 className='text-5xl font-extrabold text-center text-gray-800'>Centro de Gestión y Desarrollo Sostenible Surcolombiano</h1>
        <p className='text-center text-gray-700 mt-6 mx-4 md:mx-0'>
          Este centro está ubicado en el departamento del Huila, municipio de Pitalito. Este centro cuenta con dos sedes a día de hoy.
        </p>
      </header>
      <div className='flex flex-col items-center space-y-8 py-10'>
        {areas.map((area) => (
          <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-2/3 transform transition-all hover:scale-105 hover:shadow-2xl' key={area.idSede}>
            <img
              src={`http://localhost:3000/imagenes/${area.img_area}`}
              alt={area.area_nombre}
              className='w-full h-64 object-cover'
            />
            <div className='p-6'>
              <h2 className='text-2xl font-bold text-gray-800'>{area.area_nombre}</h2>
              <p className='text-gray-600 mt-2'>{area.area_direccion}</p>
              <p className='text-gray-700 mt-4'>{area.area_descripcion}</p>
              <div className='mt-4 flex justify-end'>
                <Link to={'/Areas'}>
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

export default BuscarAreas