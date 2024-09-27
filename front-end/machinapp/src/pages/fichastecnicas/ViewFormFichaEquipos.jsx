import { Layout, Breadcrumb, FormFichaTecnica } from "../../index";

export const ViewFormFichaTecnica = () => {
  return (
    <>
      <Layout titlePage={"Ficha técnica"}>
        <Breadcrumb pageName={`Registrar equipos`} />
        <FormFichaTecnica tipo_ficha={"equipo"} />
      </Layout>
    </>
  );
};
