import {
  useGlobalData,
  ModalComponte,
  FormRol,
  FormUser,
  PaginateTable,
  DropDown,
} from "../../../../index.js";

import { useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";
import { useState } from "react";

export const ListarUsuarios = () => {
  const { dataUser, roles } = useGlobalData();
  const [data, setData] = useState(true);

  const navigate = useNavigate();

  // definimos las columnas para la tabla
  const columns = [
    "Nombre",
    "Apellidos",
    "Correo",
    "Tipo de documento",
    "Número de Documento",
    "Rol",
    "Acciones",
  ];

  // columnas para roles []
  const ColumnsRoles = ["id", "Rol", "Descripcion"];

  // definimos las filas: nota => hay que tener en cuanta que tanto las columnas y filas deben ser igual en numero
  // si envio 4 columnas debo tambien de enviarle 4 filas, de lo contrario nos arrojara un error
  const newArrayDataUser = dataUser.map((item) => ({
    nombre: item.us_nombre,
    apellidos: item.us_apellidos,
    correo: item.us_correo,
    tipo_documento: item.us_tipo_documento,
    numero_documento: item.us_numero_documento,
    rol: item.rol_nombre,
  }));

  const handleEdit = (id) => {
    const resultadoUsuario = dataUser.find(
      (persona) => persona.us_numero_documento === id
    );

    // Navega a la ruta deseada con la información del usuario
    navigate("/panelcontrol/user", { state: { resultadoUsuario } });
  };

  const handleDataUser = () => {
    setData(true);
  };

  const handleDataRol = () => {
    setData(false);
  };

  return (
    <>
      <div className="h-screen p-5">
        {/*   <MenuLeft /> */}
        <div className="flex pb-6 justify-between items-center">
          {/*     <SearchComponent /> */}
          mas info aqui
          <div className="pl-5 w-60">
            <ModalComponte
              buttonModal={"Añadir nuevo usuario"}
              componente={<FormUser />}
              tittleModal={"Registrando usuario"}
              size={"5xl"}
              className="w-full"
            />
          </div>
        </div>

        {/* Contenedor de la tabla */}
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-row justify-between p-4 bg-gray-100 border-b">
            <span className="text-gray-600 text-sm md:text-base">
              {data
                ? `Total de usuarios en el sistema: ${newArrayDataUser.length} `
                : `Total de roles en el sistema: ${roles.length}`}
            </span>
            <div className="flex gap-2">
              <Button
                variant="bordered"
                color="success"
                onClick={handleDataUser}
                className="text-xs md:text-sm"
              >
                Usuarios
              </Button>
              <Button
                variant="bordered"
                color="success"
                onClick={handleDataRol}
                className="text-xs md:text-sm"
              >
                Roles
              </Button>
            </div>
          </div>

          {/* Tabla Paginada */}
          <div className="w-full overflow-x-auto">
            <div className="w-full min-w-max">
              <PaginateTable
                columns={data ? columns : ColumnsRoles}
                data={
                  data
                    ? newArrayDataUser.map((row) => ({
                        ...row,
                        acciones: (
                          <div className="truncate">
                            <DropDown
                              DropdownTriggerElement={"..."}
                              dropdown={["Editar"]}
                              onClick={() => handleEdit(row.numero_documento)}
                            />
                          </div>
                        ),
                      }))
                    : roles
                }
                className="w-full table-auto"
              />
            </div>
          </div>
        </div>
        {!data && <FormRol />}
      </div>
    </>
  );
};

