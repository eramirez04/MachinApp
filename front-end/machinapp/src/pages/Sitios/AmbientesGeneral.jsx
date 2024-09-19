import { Layout, Breadcrumb, BuscarAmbientesGeneral } from "../../index";

export const AmbientesGeneral = () => {
  return (
    <Layout titlePage="Centro">
      <Breadcrumb pageName={"Ambientes de Formacion"} />
      <BuscarAmbientesGeneral />
    </Layout>
  );
};
