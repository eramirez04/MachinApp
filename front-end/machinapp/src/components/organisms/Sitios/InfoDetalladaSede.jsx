import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { axiosCliente } from '../../../service/api/axios';
import { FaArrowLeft } from "react-icons/fa";

const InfoDetalladaSede = () => {
  const { idSede } = useParams();
  const [sede, setSede] = useState(null);
  const { t } = useTranslation();

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
    errorMessage.textContent = t('no_image_found');
    parent.appendChild(errorMessage);
  };

  if (!sede) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">

        {/* Header con navegación */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t('sede_info')}</h1>
          <Link to="/Sedes">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              <FaArrowLeft className="mr-2" /> {t('back')}
            </button>
          </Link>
        </div>

        {/* Imagen de la sede */}
        <div className="relative flex justify-center items-center w-full h-80 mb-6">
          <img
            src={`${import.meta.env.VITE_API_IMAGE}imagenes/${sede[0].img_sede}`}
            alt={sede[0].sede_nombre}
            className="h-full rounded-lg shadow-md"
            onError={(e) => e.target.src = `${import.meta.env.VITE_API_IMAGE}imagenes/noEncontrada.jpg`}
          />
        </div>

        {/* Ficha técnica en formato tabla */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          <table className="table-auto w-full text-left text-gray-700">
            <thead className="bg-green-600">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-800">{t('campo_sede')}</th>
                <th className="px-4 py-2 font-semibold text-gray-800">{t('valor_sede')}</th>
              </tr>
            </thead>
            <tbody>
              {sede.map((detalle, index) => (
                <React.Fragment key={index}>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('id')}:</td>
                    <td className="px-4 py-2">{detalle.idSede}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('nombre_sede')}:</td>
                    <td className="px-4 py-2">{detalle.sede_nombre}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('subdirector')}:</td>
                    <td className="px-4 py-2">{detalle.sede_subdirector}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('descripcion')}:</td>
                    <td className="px-4 py-2">{detalle.sede_descripcion}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('centro_ubicado')}:</td>
                    <td className="px-4 py-2">{detalle.sede_nombre_centro}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('regional')}:</td>
                    <td className="px-4 py-2">{detalle.sede_regional}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('municipio')}:</td>
                    <td className="px-4 py-2">{detalle.sede_municipio}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('direccion')}:</td>
                    <td className="px-4 py-2">{detalle.sede_direccion}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-2 font-medium">{t('contacto')}:</td>
                    <td className="px-4 py-2">{detalle.contacto}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfoDetalladaSede;