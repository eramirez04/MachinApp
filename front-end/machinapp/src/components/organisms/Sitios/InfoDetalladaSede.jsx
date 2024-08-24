import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { axiosCliente } from '../../../service/api/axios';
import { FaArrowLeft } from "react-icons/fa";

const InfoDetalladaSede = () => {
  const { idSede } = useParams();
  const [sede, setSede] = useState(null);

  useEffect(() => {
    const obtenerSede = async () => {
      try {
        const response = await axiosCliente.get(`/sede/listarsede/${idSede}`);
        setSede(response.data.resultadoSede);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerSede();
  }, [idSede]);

  const handleImageError = (event) => {
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    const errorMessage = document.createElement('div');
    errorMessage.className = 'absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 font-bold';
    errorMessage.textContent = 'No se encontró imagen';
    parent.appendChild(errorMessage);
  };

  if (!sede) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='bg-gray-200 min-h-screen p-20'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-60'>
        <header className='bg-green-500 py-4 px-6 flex justify-between items-center'>
          <h1 className='text-2xl font-extrabold text-white'>Información de la Sede</h1>
          <Link to='/Sedes'>
            <button className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center'>
              <FaArrowLeft className='mr-2' /> Regresar
            </button>
          </Link>
        </header>
        <div className='relative h-96'>
          <img
            src={`http://localhost:3000/imagenes/${sede[0].img_sede}`}
            alt={sede[0].sede_nombre}
            className='w-full h-full object-cover'
            onError={handleImageError}
          />
        </div>
        <div className='p-6'>
          <table className='min-w-full bg-white text-gray-500'>
            {sede.map((detalle, index) => (
              <tbody key={index}>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>ID</td>
                  <td className='py-4 px-6'>{detalle.idSede}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>Nombre de la Sede</td>
                  <td className='py-4 px-6'>{detalle.sede_nombre}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>Subdirector</td>
                  <td className='py-4 px-6'>{detalle.sede_subdirector}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>Descripción</td>
                  <td className='py-4 px-6'>{detalle.sede_descripcion}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>Centro en donde se ubica</td>
                  <td className='py-4 px-6'>{detalle.sede_nombre_centro}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>Regional</td>
                  <td className='py-4 px-6'>{detalle.sede_regional}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>Municipio</td>
                  <td className='py-4 px-6'>{detalle.sede_municipio}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>Dirección</td>
                  <td className='py-4 px-6'>{detalle.sede_direccion}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfoDetalladaSede;