import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import InputSubmit from "../InputSubmit";

import ActualizarUsuario from "./ActualizarUsuario";

import {
  UserIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  UserCircleIcon,
  HomeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import api from "../Api";

let usuarioLocal = localStorage.getItem("token");

const BuscarUsuario = () => {
  // const {id} = useParams()
  let id = 25;
  const [usuario, setUsuario] = useState({});

  const [userAct, setUserAct] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
  });

  const navegacion = useNavigate();

  useEffect(() => {
    const buscar = async () => {
      try {
        const response = await api.get(`user/listar/${id}`);

        let user = {};
        user = response.data.user[0];
        console.log(user.us_nombre);
        setUsuario(user);
      } catch (error) {
        /*  navegacion('/') */
      }
    };
    buscar();
  }, [id]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const ActualizarUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`user/actualizar/${id}`, userAct);

      console.log(response);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
    <>
      <ActualizarUsuario />

      {/*  <div>
        <input type="email" value={usuario.us_correo}
        onChange={(e)=> setUsuario({...usuario, name: e.target.value})}
        />
      </div>
 */}
      <div className="min-h-full">
        <section className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl flex font-bold tracking-tight text-gray-900">
              <UserIcon className="h-10 w-10" aria-hidden="true" />
              Perfíl de usuario
            </h1>
          </div>
        </section>
        <main>
          <div className="mx-auto max-w-7xl py-3 sm:px-3 lg:px-5">
            <div className=" p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
              <div className=" text-base sm:text-lg lg:text-xl">
                <form
                  action=""
                  className="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                  <div>
                    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                      <img src="" alt="" />
                    </div>
                    <div className="flex">
                      <button onClick={ActualizarUser}> actualizar</button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <div className="p-3 sm:p-1 lg:flex-auto">
                        <div className="mt-10 flex items-center gap-x-1">
                          <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                            Informacion personal
                          </h4>
                          <div className="h-px flex-auto bg-gray-100"></div>
                        </div>
                        <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                          <li className="flex gap-x-4">
                            <UserIcon className="h-6 w-6" aria-hidden="true" />{" "}
                            <input
                              type="text"
                              onChange={(e) =>
                                setUserAct({
                                  nombre: e.target.value,
                                })
                              }
                              defaultValue={usuario.us_nombre}
                            />
                          </li>
                          <li className="flex gap-x-3">
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                            <input
                              type="text"
                              defaultValue={usuario.us_apellidos}
                              onChange={(e) =>
                                setUserAct({
                                  ...userAct,
                                  apellidos: e.target.value,
                                })
                              }
                            />
                          </li>
                          <li className="flex gap-x-3">
                            <EnvelopeIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            <input
                              type="email"
                              defaultValue={usuario.us_correo}
                              onChange={(e) =>
                                setUserAct({
                                  ...userAct,
                                  correo: e.target.value,
                                })
                              }
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
                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                          Más info
                        </h4>
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
