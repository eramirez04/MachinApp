import Layout from "../../components/template/Layout";
import { FormFichaSolicitud } from "../../components/organisms/formularios/FormFichaSolicitud";

export const FichaSolicitudPage = () => {
  return (
    <>
      <Layout titlePage="Ficha solicitud">
        <FormFichaSolicitud />
      </Layout>
    </>
  );
};
