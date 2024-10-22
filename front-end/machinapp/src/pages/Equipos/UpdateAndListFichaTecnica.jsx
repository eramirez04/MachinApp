import { Layout, Breadcrumb, FormFichaTecnicaListUpdate } from "../../index.js"
import { useParams } from "react-router-dom"

import { useTranslation } from "react-i18next";



export const  UpdateAndListFichaTecnica = () => {

  const {idMaquina} = useParams()

  const { t } = useTranslation();


  return (
    <>
      <Layout>
        <Breadcrumb pageName={t('actFichaTecnica')} />
        <FormFichaTecnicaListUpdate idMaquina = {idMaquina}/>
      </Layout>
    
    </>
  )
}
