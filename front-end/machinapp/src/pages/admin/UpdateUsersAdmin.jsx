import Layout from "../../components/template/Layout";
import { FormUserUpdate } from "../../components/organisms/formularios/FormUserUpdate";
import { useLocation } from "react-router-dom";

export const UpdateUserAdmin = () => {
  const location = useLocation();

  const { resultado } = location.state;

  const DataUser = {
    nombre: resultado.us_nombre,
    apellidos: resultado.us_apellidos,
    correo: resultado.us_correo,
    numero_documento: resultado.us_numero_documento,
  };

  return (
    <>
      <Layout>
        <FormUserUpdate userData={DataUser} />
      </Layout>
    </>
  );
};
