import { Layout, Breadcrumb, FormFichaSolicitud } from "../../index";

export const FichaSolicitudPage = () => {
  return (
    <>
      <Layout>
        <Breadcrumb pageName={"Solicitud de Mantenimiento"} />
        <FormFichaSolicitud />
      </Layout>
    </>
  );
};
