import { Layout, Breadcrumb, FormFichaTecnicaListUpdate } from "../../index.js"
import { useParams } from "react-router-dom"

export const  UpdateAndListFichaTecnica = () => {

  const {idMaquina} = useParams()


  return (
    <>
      <Layout>
        <Breadcrumb pageName={`Ficha tecnica`} />
        <FormFichaTecnicaListUpdate idMaquina = {idMaquina}/>
      </Layout>
    
    </>
  )
}
