import { FormFichaTecnica } from "../../components/organisms/formularios/FormFichaTecnicaEquipos";
import { Layout, Breadcrumb } from "../../index";

export const ViewFormFichaTecnica = () => {
  return (
    <>
      <Layout titlePage={"Ficha técnica"}>
      <Breadcrumb pageName={`Registrar equipos`} />
        <FormFichaTecnica />
      </Layout>
    </>
  );
};
