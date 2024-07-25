import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosCliente } from '../../service/api/axios'
import ButtonC from '../atoms/buttons/BottonC'
import { FaEdit } from "react-icons/fa"

const BuscarAreas = ({idSede}) => {
  const [areas, setAreas] = useState([])

  useEffect(() => {
    const listarArea = async () => {
      try {
        const response = await axiosCliente.get(`area/listarporsede/${idSede}`)
        setAreas(response.data.resultadoAreas)
      } catch (error) {
        console.error(error)
      }
    }

    listarArea()
  }, [idSede])

  return (
    <div className='bg-gray-200 h-screen overflow-y-auto'>
      <header className='bg-green-500 py-16 shadow-md top-0 z-10'>
        <h1 className='text-5xl font-extrabold text-center text-white'>Centro de Gestión y Desarrollo Sostenible Surcolombiano</h1>
        <p className='text-center text-white mt-6 mx-4 md:mx-0'>
          Este centro está ubicado en el departamento del Huila, municipio de Pitalito. Este centro cuenta con dos sedes a día de hoy.
        </p>
      </header>
      <div className='flex flex-col items-center space-y-14 pt-10 pb-24'>
        <div className='flex justify-end w-full'>
          <ButtonC bgColor="bg-blue-600 text-white mr-10 hover:bg-blue-800 hover:shadow-xl hover:scale-105" name="Añadir nueva"></ButtonC>
        </div>
        {areas.map((area) => (
          <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-2/3 transform transition-all hover:scale-105 hover:shadow-2xl' key={area.idArea}>
            <img
              src={`http://localhost:3000/imagenes/${area.img_area}`}
              alt={area.area_nombre}
              className='w-full h-64 object-cover'
            />
            <button className='absolute text-4xl bottom-[120px] right-4 text-orange-400 hover:cursor-pointer hover:text-orange-500'><FaEdit/></button>
            <div className='p-6'>
              <h2 className='text-2xl font-bold text-gray-800'>{area.area_nombre}</h2>
              <p className='text-gray-600 mt-2'>{area.area_direccion}</p>
              <p className='text-gray-700 mt-4'>{area.area_descripcion}</p>
              <div className='mt-4 flex justify-end'>
                <Link to={`/Areas/${area.idArea}`}>
                  <ButtonC bgColor="bg-green-400 hover:bg-green-600 text-white" name="Ingresar"/>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuscarAreas