import { Layout, Breadcrumb, FormFichaTecnica } from "../../index";
import { useTranslation } from "react-i18next";

export const ViewFormFichaTecnica = () => {
  const { t } = useTranslation();
  return (
    <>
      <Layout titlePage={"Ficha técnica"}>
        <Breadcrumb pageName={t(`registrarEquipos`)} />
        <FormFichaTecnica tipo_ficha={"equipo"} />
      </Layout>
    </>
  );
};
