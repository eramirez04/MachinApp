import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { axiosCliente } from '../../service/api/axios'
import { FaArrowLeft } from "react-icons/fa"

const InfoDetalladaAmbiente = () => {
  const { idAmbientes } = useParams()
  const [ambiente, setAmbiente] = useState(null)

  useEffect(() => {
    const obtenerAmbiente = async () => {
      try {
        const response = await axiosCliente.get(`/sitio/listarsitioporid/${idAmbientes}`)
        setAmbiente(response.data.resultadoSitio)
      } catch (error) {
        console.error(error)
      }
    }

    obtenerAmbiente()
  }, [idAmbientes])

  if (!ambiente) {
    return <div>Cargando...</div>
  }

  return (
    <div className='bg-gray-200 min-h-screen p-20'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <header className='bg-green-500 py-4 px-6 flex justify-between items-center'>
          <h1 className='text-2xl font-extrabold text-white'>Información del ambiente</h1>
          <Link to={`/Sitios`}>
            <button className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center'>
              <FaArrowLeft className='mr-2' /> Regresar
            </button>
          </Link>
        </header>
        <div className='p-6'>
          <table className='min-w-full bg-white text-gray-500'>
              {ambiente.map((detalle, index) => (
                <tbody key={index}>
                    <tr className='w-full border-b'>
                      <td className='py-4 px-6 font-bold'>ID</td>
                      <td className='py-4 px-6'>{detalle.idAmbientes}</td>
                    </tr>
                    <tr className='w-full border-b'>
                      <td className='py-4 px-6 font-bold'>Nombre del Sitio</td>
                      <td className='py-4 px-6'>{detalle.sit_nombre}</td>
                    </tr>
                    <tr className='w-full border-b'>
                      <td className='py-4 px-6 font-bold'>Fecha de Registro</td>
                      <td className='py-4 px-6'>{new Date(detalle.sit_fecha_registro).toLocaleDateString()}</td>
                    </tr>
                    <tr className='w-full border-b'>
                      <td className='py-4 px-6 font-bold'>Área en donde está ubicado</td>
                      <td className='py-4 px-6'>{detalle.area_nombre}</td>
                    </tr>
                    <tr className='w-full border-b'>
                      <td className='py-4 px-6 font-bold'>Tipo de Sitio</td>
                      <td className='py-4 px-6'>{detalle.tipo_sitio}</td>
                    </tr>
                    <tr className='w-full border-b'>
                      <td className='py-4 px-6 font-bold'>Instructor encargado</td>
                      <td className='py-4 px-6'>{detalle.instructor_encargado}</td>
                    </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  )
}

export default InfoDetalladaAmbiente