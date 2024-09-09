import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { axiosCliente } from '../../../service/api/axios';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const InfoDetalladaAmbiente = () => {
  const { t } = useTranslation();
  const { idAmbientes } = useParams();
  const [ambiente, setAmbiente] = useState(null);

  useEffect(() => {
    const obtenerAmbiente = async () => {
      try {
        const response = await axiosCliente.get(`/sitio/listarsitioporid/${idAmbientes}`);
        setAmbiente(response.data.resultadoSitio);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerAmbiente();
  }, [idAmbientes]);

  const handleImageError = (event) => {
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    const errorMessage = document.createElement('div');
    errorMessage.className = 'absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 font-bold';
    errorMessage.textContent = t('no_imagen');
    parent.appendChild(errorMessage);
  };

  if (!ambiente) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='bg-gray-200 min-h-screen p-20'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-80'>
        <header className='bg-green-500 py-4 px-6 flex justify-between items-center'>
          <h1 className='text-2xl font-extrabold text-white'>{t("informacion_ambiente")}</h1>
          <Link to={`/Ambientes`}>
            <button className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center'>
              <FaArrowLeft className='mr-2' /> {t("regresar")}
            </button>
          </Link>
        </header>
        <div className='relative h-96'>
          <img
            src={`http://localhost:3000/imagenes/${ambiente[0].img_sitio}`}
            alt={ambiente[0].sit_nombre}
            className='w-full h-full object-cover'
            onError={handleImageError}
          />
        </div>
        <div className='p-6'>
          <table className='min-w-full bg-white text-gray-500'>
            {ambiente.map((detalle, index) => (
              <tbody key={index}>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>ID</td>
                  <td className='py-4 px-6'>{detalle.idAmbientes}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>{t("nombre_sitio")}</td>
                  <td className='py-4 px-6'>{detalle.sit_nombre}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>{t("fecha_registro")}</td>
                  <td className='py-4 px-6'>{new Date(detalle.sit_fecha_registro).toLocaleDateString()}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>{t("area_ubicado")}</td>
                  <td className='py-4 px-6'>{detalle.area_nombre}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>{t("tipo_sitio")}</td>
                  <td className='py-4 px-6'>{detalle.tipo_sitio}</td>
                </tr>
                <tr className='w-full border-b'>
                  <td className='py-4 px-6 font-bold'>{t("instructor_encargado")}</td>
                  <td className='py-4 px-6'>{detalle.instructor_encargado}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfoDetalladaAmbiente;