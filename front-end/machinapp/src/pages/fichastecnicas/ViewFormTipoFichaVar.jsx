import  {FormTipoFichaTecnica}  from "../../components/organisms/formularios/FormTipoFichaTecnica";
import {Layout, Breadcrumb} from "../../index";
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
