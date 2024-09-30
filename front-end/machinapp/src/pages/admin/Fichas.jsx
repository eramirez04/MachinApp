import {
  Layout,
  useGlobalData,
  SolicitudList,
  Breadcrumb,
} from "../../index.js";
import { Spinner } from "@nextui-org/react";

export const Fichas = () => {
  const { solicitudData, loading } = useGlobalData();

  return (
    <Layout>
      <Breadcrumb pageName={"Solicitud"} />

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
