import { useEffect, useState } from "react";

import { axiosCliente } from "../../../../service/api/axios.js";

import MenuLeft from "../../../molecules/Menuleft.jsx";

import { SearchComponent } from "../../../atoms/Inputs/InputSearch.jsx";

import InputSubmit from "../../../atoms/Inputs/InputSubmit.jsx";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

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
      <div className="h-screen bg-gray-200">
        <MenuLeft />
        <div className="flex  justify-center items-center">
          <SearchComponent />
          <div className="pl-5 w-60">
            <InputSubmit />
          </div>
        </div>
        <div className="flex flex-row">
          <table className="table bg-white">
            <thead className=" text-white bg-green-600">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>numero CC</th>
                <th>tipo de documento</th>
                <th>especialidad</th>
                <th>empresa</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              <td>1</td>
              <td>emer</td>
              <td>usuario</td>
              <td>1231435</td>
              <td>CC</td>
              <td>nada</td>
              <td>Sena</td>
              <td>paco@paco.com</td>

              {usuarios.map((usuario) => (
                <tr key={usuario.idUsuarios}>
                  <td className="p-3">{usuario.idUsuarios} </td>
                  <td className="p-4">{usuario.us_nombre}</td>
                  <td className="p-5">{usuario.us_correo}</td>
                  <td className="p-3">{usuario.us_tipo_documento} </td>
                  <td className="p-4">{usuario.us_numero_documento}</td>
                  <td className="p-3">{usuario.us_especialidad} </td>
                  <td className="p-4">{usuario.rol_nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListarUsuarios;
