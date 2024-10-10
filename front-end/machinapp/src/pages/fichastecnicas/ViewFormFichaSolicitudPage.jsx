import { Layout, Breadcrumb, FormFichaSolicitud } from "../../index";
import { useTranslation } from "react-i18next";

export const FichaSolicitudPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Layout>
        <Breadcrumb pageName={t("maintenance_request")} />
        <FormFichaSolicitud />
      </Layout>
    </>
  );
};
