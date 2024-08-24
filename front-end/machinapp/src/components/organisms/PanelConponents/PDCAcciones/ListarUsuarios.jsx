import { useGlobalData, ModalComponte } from "../../../../index.js";
import { FormUser } from "../../formularios/FormUser.jsx";
import { PaginateTable } from "../../table/PaginateTable.jsx";
import { useNavigate } from "react-router-dom";

import { DropDown } from "../../../molecules/navigation/Dropdown.jsx";

const ListarUsuarios = () => {
  const { dataUser } = useGlobalData();

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

  return (
    <>
      <div className="h-screen p-5">
        {/*   <MenuLeft /> */}
        <div className="flex pb-6 justify-between items-center">
          {/*     <SearchComponent /> */}
          Más info aquí
          <div className="pl-5 w-60">
            <ModalComponte
              buttonModal={"Añadir nuevo usuario"}
              componente={<FormUser />}
              tittleModal={"registrando usuario"}
              size={"5xl"}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-default-400 text-small">
            Total de usuarios en la plataforma : {newArrayDataUser.length}
          </span>
          <PaginateTable
            columns={columns}
            data={newArrayDataUser.map((row) => ({
              ...row,
              acciones: (
                <>
                  <DropDown
                    DropdownTriggerElement={"..."}
                    dropdown={["Editar"]}
                    onClick={() => handleEdit(row.numero_documento)}
                  />
                </>
              ),
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default ListarUsuarios;
