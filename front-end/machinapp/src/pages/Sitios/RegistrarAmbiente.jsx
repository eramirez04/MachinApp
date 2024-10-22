import { FormAmbientes, Layout, FormFichaTecnica } from "../../index";

export const RegistrarAmbiente = () => {
  return (
    <Layout>
      <FormAmbientes />

      <FormFichaTecnica tipo_ficha={"ambiente"} />
    </Layout>
  );
};
