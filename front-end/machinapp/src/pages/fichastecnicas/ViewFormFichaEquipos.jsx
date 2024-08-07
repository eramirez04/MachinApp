import { FormFichaTecnica } from "../../components/organisms/formularios/FormFichaTecnicaEquipos";
import Layout from "../../components/template/Layout";

export const ViewFormFichaTecnica = () => {
  return (
    <>
      <Layout titlePage={"Ficha tecnica"}>
        <FormFichaTecnica />
      </Layout>
    </>
  );
};
