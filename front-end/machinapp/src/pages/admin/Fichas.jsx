import {
  Layout,
  useGlobalData,
  SolicitudList,
  Breadcrumb,
} from "../../index.js";
import { useTranslation } from "react-i18next";

export const Fichas = () => {
  const { solicitudData } = useGlobalData();
  const { t } = useTranslation();


  return (
    <Layout>
      <Breadcrumb pageName={t("Application")} />

        <SolicitudList DataSolicitud={solicitudData} />
    </Layout>
  );
};
