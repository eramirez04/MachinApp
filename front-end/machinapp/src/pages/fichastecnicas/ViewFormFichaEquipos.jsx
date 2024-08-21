import { FormFichaTecnica } from "../../components/organisms/formularios/FormFichaTecnicaEquipos";
import { Layout } from "../../index";

export const ViewFormFichaTecnica = () => {
  return (
    <>
      <Layout titlePage={"Ficha tecnica"}>
        <FormFichaTecnica />
      </Layout>
    </>
  );
};
