import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  UserIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  UserCircleIcon,
  HomeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import { axiosCliente } from "../../service/api/axios.js";

const BuscarUsuario = () => {
  let id = 2;

  const [usuario, setUsuario] = useState({
    us_nombre: "",
    us_apellidos: "",
    us_correo: "",
  });

  useEffect(() => {
    const buscar = async () => {
      try {
        const response = await axiosCliente.get(`user/listar/me`);
        setUsuario(response.data[0]);
      } catch (error) {
        console.error(error);
        /*  navegacion('/') */
      }
    };
    buscar();
  }, [id]);

  const { handleSubmit } = useForm();

  const ActualizarUser = async () => {
    try {
      const response = await axiosCliente.put(`user/actualizar/${id}`, usuario);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <>
      <div className="min-h-full">
        <main>
          <div className="mx-auto max-w-7xl py-3 sm:px-3 lg:px-5">
            <div className=" p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
              <div className=" text-base sm:text-lg lg:text-xl">
                <form
                  onSubmit={handleSubmit(ActualizarUser)}
                  action=""
                  className="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                  <div>
                    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                      <img src="" alt="" />
                    </div>
                    <div className="flex">
                      <button> actualizar</button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <div className="p-3 sm:p-1 lg:flex-auto">
                        <div className="mt-10 flex items-center gap-x-1">
                          <span className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                            Informacion personal
                          </span>
                          <div className="h-px flex-auto bg-gray-100"></div>
                        </div>
                        <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                          <li className="flex gap-x-4">
                            <UserIcon className="h-6 w-6" aria-hidden="true" />

                            <input
                              type="text"
                              value={usuario.us_nombre}
                              onChange={(e) =>
                                setUsuario({
                                  ...usuario,
                                  us_nombre: e.target.value,
                                })
                              }
                              className="border-b appearance-none
                              text-gray-700 focus:outline-none focus:shadow-outline"
                            />
                          </li>
                          <li className="flex gap-x-3">
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                            <input
                              type="text"
                              value={usuario.us_apellidos}
                              onChange={(e) =>
                                setUsuario({
                                  ...usuario,
                                  us_apellidos: e.target.value,
                                })
                              }
                              className="border-b appearance-none
                              text-gray-700 focus:outline-none focus:shadow-outline"
                            />
                          </li>
                          <li className="flex gap-x-3">
                            <EnvelopeIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            <input
                              type="email"
                              value={usuario.us_correo}
                              onChange={(e) =>
                                setUsuario({
                                  ...usuario,
                                  us_correo: e.target.value,
                                })
                              }
                              className="border-b appearance-none
                              text-gray-700 focus:outline-none focus:shadow-outline"
                            />
                          </li>
                          <li className="flex gap-x-3">
                            {usuario.us_numero_documento}
                          </li>
                          <li className="flex gap-x-3">
                            <DocumentTextIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            {usuario.us_tipo_documento}
                          </li>
                        </ul>
                      </div>

                      <div className="mt-10 flex items-center gap-x-4">
                        <span className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                          Más info
                        </span>
                        <div className="h-px flex-auto bg-gray-100"></div>
                      </div>
                      <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                        <li className="flex gap-x-4">
                          <UserCircleIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          {usuario.rol_nombre}
                        </li>
                        <li className="flex gap-x-4">
                          <TruckIcon className="h-6 w-6" aria-hidden="true" />
                          {usuario.us_especialidad}
                        </li>
                        <li className="flex gap-x-4">
                          <HomeIcon className="h-6 w-6" aria-hidden="true" />
                          {usuario.us_empresa}
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BuscarUsuario;
