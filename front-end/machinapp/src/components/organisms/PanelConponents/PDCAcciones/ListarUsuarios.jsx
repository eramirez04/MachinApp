/* import MenuLeft from "../../../molecules/Menuleft.jsx"; */
/* import { SearchComponent } from "../../../atoms/Inputs/InputSearch.jsx"; */
/* import InputSubmit from "../../../atoms/Inputs/InputSubmit.jsx"; */
import { FormUser } from "../../formularios/FormUser.jsx";
import { PaginateTable } from "../../table/PaginateTable.jsx";
import ModalComponte from "../../../molecules/Modal.jsx";
import { useGlobalData } from "../../../../hooks/useGlobalData.jsx";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const ListarUsuarios = () => {
  const { dataUser } = useGlobalData();

  // definimos las columnas para la tabla
  const columns = [
    "Nombre",
    "Apellidos",
    "Correo",
    "Tipo de documento",
    "Acciones",
  ];

  // definimos las filas: nota => hay que tener en cuanta que tanto las columnas y filas deben ser igual en numero
  // si envio 4 columnas debo tambien de enviarle 4 filas, de lo contrario nos arrojara un error
  const newArrayDataUser = dataUser.map((item) => ({
    nombre: item.us_nombre,
    apellidos: item.us_apellidos,
    correo: item.us_correo,
    tipo_documento: item.us_tipo_documento,
  }));

  return (
    <>
      <div className="h-screen p-7">
        {/*   <MenuLeft /> */}
        <div className="flex pb-6 justify-between items-center">
          {/*     <SearchComponent /> */}
          mas info aqui
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
                  <div className="items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          ....
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>View</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
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
