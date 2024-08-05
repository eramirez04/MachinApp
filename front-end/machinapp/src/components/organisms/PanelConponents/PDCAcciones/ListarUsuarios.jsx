import { useEffect, useState } from "react";
import { axiosCliente } from "../../../../service/api/axios.js";
/* import MenuLeft from "../../../molecules/Menuleft.jsx"; */
/* import { SearchComponent } from "../../../atoms/Inputs/InputSearch.jsx"; */
/* import InputSubmit from "../../../atoms/Inputs/InputSubmit.jsx"; */
import { PaginateTable } from "../../table/PaginateTable.jsx";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

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
  const newArrayDataUser = usuarios.map((item) => ({
    nombre: item.us_nombre,
    apellidos: item.us_apellidos,
    correo: item.us_correo,
    tipo_documento: item.us_tipo_documento,
  }));

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const response = await axiosCliente.get("/user/listar");
        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    buscarUsuarios();
  }, []);

  return (
    <>
      <div className="h-screen p-7">
        {/*   <MenuLeft /> */}
        <div className="flex  justify-center items-center">
          {/*   <SearchComponent /> */}
          <div className="pl-5 w-60">{/*    <InputSubmit /> */}</div>
        </div>
        <div className="flex flex-row">
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
