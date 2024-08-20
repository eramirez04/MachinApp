import { Layout } from "../../index";
import { FormUserUpdate } from "../../components/organisms/formularios/FormUserUpdate";
import { useLocation } from "react-router-dom";

export const UpdateUserAdmin = () => {
  const location = useLocation();

  const { resultadoUsuario } = location.state;

  const DataUser = {
    id: resultadoUsuario.idUsuarios,
    nombre: resultadoUsuario.us_nombre,
    apellidos: resultadoUsuario.us_apellidos,
    correo: resultadoUsuario.us_correo,
    tipo_documento: resultadoUsuario.us_tipo_documento,
    numero_documento: resultadoUsuario.us_numero_documento,
    empresa: resultadoUsuario.us_empresa,
    especialidad: resultadoUsuario.us_especialidad,
    rol: resultadoUsuario.rol_nombre,
    id_rol: resultadoUsuario.idRoles,
  };

  return (
    <>
      <Layout>
        <FormUserUpdate userData={DataUser} />
      </Layout>
    </>
  );
};
