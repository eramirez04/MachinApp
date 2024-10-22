// eslint-disable-next-line no-unused-vars

// layout
import { Layout, BuscarUsuario, Breadcrumb } from "../../index.js";
import { useTranslation } from "react-i18next";

export const Perfil = () => {
  const { t } = useTranslation();
  return (
    <>
      <Layout>
        <Breadcrumb pageName={t("informacion_personal")} />
        {/*  <div className="px-10 ">
          <span className="text-4xl font-bold text-gray-800 mb-4">Perfil</span>
          <div className="border-b-8 border-green-600 inline-block w-full"></div>
        </div> */}
        <BuscarUsuario />
      </Layout>
    </>
  );
};

