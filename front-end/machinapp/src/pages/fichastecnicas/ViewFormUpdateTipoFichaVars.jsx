import {Layout, Breadcrumb, FormUpdateVarsTipoFicha} from "../../index";

import { useTranslation } from "react-i18next"


export const ViewFormTipoFichaUpdate = ()=>{

    const { t } = useTranslation();
    return(
        <>
        <Layout>
            <Breadcrumb pageName={`${t('actVars')}`} />
            <FormUpdateVarsTipoFicha tipo_ficha = {'equipo'}/>
        </Layout>
        </>
    )
 

}