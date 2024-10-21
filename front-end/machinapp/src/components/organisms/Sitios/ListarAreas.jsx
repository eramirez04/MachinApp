import { ButtonC,axiosCliente, V} from "../../../index.js"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción

// eslint-disable-next-line react/prop-types
export const BuscarAreas = ({ idSede }) => {
  const { t } = useTranslation(); // Usar el hook para obtener la función de traducción
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const listarArea = async () => {
      try {
        const response = await axiosCliente.get(`area/listarporsede/${idSede}`);
        setAreas(response.data.resultadoAreas);
      } catch (error) {
        console.error(error);
      }
    };

    listarArea();
  }, [idSede]);

  const handleImageError = (event) => {
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    const errorMessage = document.createElement('div');
    errorMessage.className = 'absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 font-bold';
    errorMessage.textContent = t('no_image_found'); // Usar la traducción para el mensaje de error
    parent.appendChild(errorMessage);
  };

  return (
    <div className='bg-gray-200 min-h-screen'>
      <header className={`py-16 shadow-md top-0 z-10 ${V.bg_sena_verde}`}>
        <h1 className='text-4xl font-extrabold text-center text-white'>
        Centro de Gestión y Desarrollo Sostenible SurColombiano
        </h1>
        <p className='text-center text-white mt-6 mx-4 md:mx-0'>
          {t('descripcion_centro')} {/* Usar la traducción para la descripción */}
        </p>
      </header>
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {areas.map((area) => (
            <div
              className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl relative'
              key={area.idArea}
            >
              <div className='relative h-64 flex items-center justify-center'>
                <img
                  src={`${import.meta.env.VITE_API_IMAGE}imagenes/${area.img_area}`}
                  alt={area.area_nombre}
                  className='h-full'
                  onError={(e) => e.target.src = `${import.meta.env.VITE_API_IMAGE}imagenes/noEncontrada.jpg`}
                />  
              </div>
              <div className='p-6'>
                <div className='flex justify-end'>
                  <Link to={`/Areas/Actualizar/${area.idArea}`}>
                    <button className="text-4xl text-orange-400 hover:cursor-pointer hover:text-orange-500">
                      <FaEdit />
                    </button>
                  </Link>
                </div>
                <h2 className='text-2xl font-bold text-gray-800'>{area.area_nombre}</h2>
                <p className='text-gray-600 mt-2'>{area.sede_nombre}</p>
                <div className='mt-4 flex justify-end'>
                  <Link to={`/Areas/${area.idArea}`}>
                    <ButtonC bgColor='bg-green-400 hover:bg-green-600 text-white' name={t('ingresar')} /> {/* Usar traducción para "Ingresar" */}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};