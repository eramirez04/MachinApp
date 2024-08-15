import Layout from "../../components/template/Layout";
import { FormUserUpdate } from "../../components/organisms/formularios/FormUserUpdate";
import { useLocation } from "react-router-dom";

export const UpdateUserAdmin = () => {
  const location = useLocation();

  const { resultadoUsuario } = location.state;

  const DataUser = {
    nombre: resultadoUsuario.us_nombre,
    apellidos: resultadoUsuario.us_apellidos,
    correo: resultadoUsuario.us_correo,
    numero_documento: resultadoUsuario.us_numero_documento,
  };

  return (
    <>
      <Layout>
        <FormUserUpdate userData={DataUser} />
      </Layout>
    </>
  );
};
