import {
  Layout,
  useGlobalData,
  SolicitudList,
  Breadcrumb,
} from "../../index.js";
import { Spinner } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export const Fichas = () => {
  const { solicitudData, loading } = useGlobalData();
  const { t } = useTranslation();


  return (
    <Layout>
      <Breadcrumb pageName={t("Application")} />

      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <SolicitudList DataSolicitud={solicitudData} />
      )}
    </Layout>
  );
};
