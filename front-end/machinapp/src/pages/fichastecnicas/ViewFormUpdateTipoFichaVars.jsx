import {Layout, Breadcrumb, FormUpdateVarsTipoFicha} from "../../index";


export const ViewFormTipoFichaUpdate = ()=>{

    return(
        <>
        <Layout>
            <Breadcrumb pageName={'Actualizar Variables Tipo de Ficha'} />
            <FormUpdateVarsTipoFicha tipo_ficha = {'equipo'}/>
        </Layout>
        </>
    )
 

}