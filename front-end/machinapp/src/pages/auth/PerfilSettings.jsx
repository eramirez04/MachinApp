import { FormUserUpdate } from "../../components/organisms/formularios/FormUserUpdate";
import Layout from "../../components/template/Layout";
import { useAuth } from "../../hooks/useAuth";

export const PerfilSettings = () => {
  const { user } = useAuth();

  const newDataUser = {
    nombre: user.us_nombre,
    apellidos: user.us_apellidos,
    correo: user.us_correo,
    tipo_documento: user.us_tipo_documento,
    numero_documento: user.us_numero_documento,
  };

  return (
    <>
      <Layout>
        <FormUserUpdate userData={newDataUser} />
      </Layout>
    </>
  );
};
