import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { axiosCliente } from '../../service/api/axios'
import ButtonC from '../atoms/buttons/BottonC'

const BuscarAmbientes=({idArea})=>  {

    const [ambientes, setAmbientes] = useState([])

    useEffect(()=>{
        const listarSitio = async ()=>{
            try{
                const response = await axiosCliente.get(`/sitio/listarporarea/${idArea}`)
                setAmbientes(response.data.resultadoSitios)

                
            } catch(error){
                console.error(error)
            }
        }

        listarSitio() 
    }, [idArea])

  return (
    <div className='bg-gray-200 min-h-screen'>
      <header className='bg-green-500 py-16 shadow-md top-0 z-10'>
        <h1 className='text-5xl font-extrabold text-center text-gray-800'>Centro de Gestión y Desarrollo Sostenible Surcolombiano</h1>
        <p className='text-center text-gray-700 mt-6 mx-4 md:mx-0'>
          Este centro está ubicado en el departamento del Huila, municipio de Pitalito. Este centro cuenta con dos sedes a día de hoy.
        </p>
      </header>
      <div className='flex flex-col items-center space-y-8 py-10'>
        {ambientes.map((ambiente) => (
          <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-2/3 transform transition-all hover:scale-105 hover:shadow-2xl' key={ambiente.idSede}>
            <img
              src={`http://localhost:3000/imagenes/${ambiente.img_sitio}`}
              alt={ambiente.area_nombre}
              className='w-full h-64 object-cover'
            />
            <div className='p-6'>
              <h2 className='text-2xl font-bold text-gray-800'>{ambiente.sit_nombre} ({ambiente.tipo_sitio})</h2>
              <p className='text-gray-700 mt-4'>{ambiente.area_descripcion}</p>
              <div className='mt-4 flex justify-end'>
                <Link to={'/Ambientes'}>
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

export default BuscarAmbientes