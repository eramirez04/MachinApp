import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosCliente } from "../../../service/api/axios";
import ButtonC from "../../atoms/buttons/BottonC";
import { FaEdit } from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
import { FormSedes } from "../formularios/FormSedes";
import { V } from "../../../style";
import { useTranslation } from "react-i18next";

const BuscarSedes = () => {
  const { t } = useTranslation();
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    const listarSede = async () => {
      try {
        const response = await axiosCliente.get("/sede/listarsede");
        setSedes(response.data.resultadoSede);
      } catch (error) {
        console.error(error);
      }
    };

    listarSede();
  }, []);

  const handleImageError = (event) => {
    event.target.style.display = "none";
    const parent = event.target.parentElement;
    const errorMessage = document.createElement("div");
    errorMessage.className =
      "absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 font-bold";
    errorMessage.textContent = t('no_imagen');
    parent.appendChild(errorMessage);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <header className={`py-16 shadow-md top-0 z-10 ${V.bg_sena_verde}`}>
        <h1 className="text-4xl font-extrabold text-center text-white">
          {t("cgdss")}
        </h1>
        <p className="text-center text-white mt-6 mx-4 md:mx-0">
          {t("centro_descripcion")}
        </p>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex justify-end">
          <Link to={"/Sedes/Registrar"}>
            <button className="bg-blue-500 rounded-md p-3 hover:bg-blue-700 mb-5 font-semibold">
              {t("registrar_nuevo")}
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sedes.map((sede) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl relative"
              key={sede.idSede}
            >
              <div className="relative h-72">
                <img
                  src={`http://localhost:3000/imagenes/${sede.img_sede}`}
                  alt={sede.sede_nombre}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <Link to={`/Sedes/InfoSede/${sede.idSede}`}>
                <button className="absolute text-4xl top-4 right-4 text-gray-500 hover:cursor-pointer hover:text-gray-700">
                  <AiFillInfoCircle />
                </button>
              </Link>
              <div className="p-6">
                <div className="flex justify-end">
                  <button className="text-4xl text-orange-400 hover:cursor-pointer hover:text-orange-500">
                    <FaEdit />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {sede.sede_nombre}
                </h2>
                <p className="text-gray-600 mt-2">{sede.sede_nombre_centro}</p>
                <div className="mt-4 flex justify-end">
                  <Link to={`/Sedes/${sede.idSede}`}>
                    <ButtonC
                      bgColor="bg-green-400 hover:bg-green-600 text-white"
                      name={t("ingresar")}
                    />
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

export default BuscarSedes;
