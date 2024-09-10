import { useTranslation } from "react-i18next";
import { Layout, ListarUsuarios, Breadcrumb } from "../../index";

const PaneldeControlUsuarios = () => {
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

export default PaneldeControlUsuarios;
