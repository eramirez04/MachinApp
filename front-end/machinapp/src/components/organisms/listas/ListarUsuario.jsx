import { useAuth, Icons, V } from "../../../index.js";

import { Divider, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const BuscarUsuario = () => {
  const { user } = useAuth();

  const newd = {
    nombre: user.us_nombre,
    apellidos: user.us_apellidos,
    correo: user.us_correo,
    "numero Documento": user.us_numero_documento,
    especialidad: user.us_especialidad,
    empresa: user.us_empresa,
  };

  const iconNames = {
    nombre: V.UserIcon,
    apellidos: V.UserIcon,
    correo: V.EnvelopeIcon,
    "numero Documento": V.DocumentTextIcon,
    especialidad: V.UserCircleIcon,
    empresa: V.TruckIcon,
  };

  const newUser = Object.entries(newd);

  return (
    <>
      <div className="flex justify-end">
        <Button color="primary" type="submit" radius="sm">
          <Link
            to={"/perfil/settings"}
            className="h-full w-full text-sm flex justify-center items-center "
          >
            Editar Información
          </Link>
        </Button>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 rounded-lg">
        <Divider />

        <div className="text-base sm:text-lg lg:text-xl">
          <div
            action=""
            className="space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
          >
            <div className="w-full md:w-2/5">
              <div className="flex items-center justify-center w-full bg-gray-300 rounded dark:bg-gray-700 overflow-hidden">
                <img
                  src="ruta-de-tu-imagen.jpg"
                  className="object-cover w-full h-48 sm:h-64 md:h-80 lg:h-96"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="p-3 sm:p-1 lg:flex-auto">
                <div className="mt-10 flex items-center gap-x-1">
                  <span className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                    Informacion personal
                  </span>
                  <div className="h-px flex-auto bg-gray-100"></div>
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                  {newUser.map(([key, value]) => (
                    <li
                      key={key}
                      className={`${V.radius} flex flex-col p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300`}
                    >
                      <label className="flex flex-col space-y-2">
                        <span className="font-semibold text-gray-800 capitalize">
                          {key}
                        </span>
                        <div className="flex items-center gap-2">
                          <Icons icon={iconNames[key]} />
                          <span className="text-gray-700">
                            {value || "No disponible"}
                          </span>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Divider />
        </div>
      </div>
    </>
  );
};

/*    */
