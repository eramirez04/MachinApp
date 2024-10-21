import {Layout, Breadcrumb, FormTipoFichaTecnica} from "../../index";
import { useTranslation } from "react-i18next"

export const  ViewFormTipoFicha = ()=> {

  const { t } = useTranslation()

  return (
    <>
      <Layout titlePage={"Registro de tipos de Ficha tecnica"}>
        <Breadcrumb pageName={t('RegistrarTipoFicha')} />
        <FormTipoFichaTecnica />
      </Layout>
    </>
  )
}
