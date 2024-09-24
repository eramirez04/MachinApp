import { useTranslation } from "react-i18next";
import { Layout, ListarUsuarios, Breadcrumb } from "../../index";

export const PaneldeControlUsuarios = () => {
  const { t } = useTranslation();
  return (
    <>
      <Layout>
        <Breadcrumb pageName={t("listado_usuarios")} />
        <ListarUsuarios />
      </Layout>
    </>
  );
};
