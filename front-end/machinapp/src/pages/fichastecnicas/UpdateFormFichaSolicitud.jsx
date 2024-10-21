import { Layout, Breadcrumb, FormSolicitudesUpdate } from "../../index.js"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";

export const  UpdateFormFichaSolicitud = () => {
  const {idSolicitud} = useParams()
  const { t } = useTranslation();

  return (
    <>
      <Layout>
        <Breadcrumb pageName={t("Application")} />
        <FormSolicitudesUpdate idSolicitud = {idSolicitud}/>
      </Layout>
    
    </>
  )
}
