import  {FormTipoFichaTecnica}  from "../../components/organisms/formularios/FormTipoFichaTecnica";
import {Layout} from "../../index";

export const  ViewFormTipoFicha = ()=> {
  return (
    <>
      <Layout titlePage={"Registro de tipos de Ficha tecnica"}>
        <FormTipoFichaTecnica />
      </Layout>
    </>
  )
}
