import  {FormTipoFichaTecnica}  from "../../components/organisms/formularios/FormTipoFichaTecnica";
import {Layout, Breadcrumb} from "../../index";

export const  ViewFormTipoFicha = ()=> {
  return (
    <>
      <Layout titlePage={"Registro de tipos de Ficha tecnica"}>
        <Breadcrumb pageName={`Registro de tipos de Ficha tecnica`} />
        <FormTipoFichaTecnica />
      </Layout>
    </>
  )
}
