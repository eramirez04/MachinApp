import { Layout, Breadcrumb, FormSolicitudesUpdate } from "../../index.js"
import { useParams } from "react-router-dom"

export const  UpdateFormFichaSolicitud = () => {

  const {idSolicitud} = useParams()


  return (
    <>
      <Layout>
        <Breadcrumb pageName={`Solicitud`} />
        <FormSolicitudesUpdate idSolicitud = {idSolicitud}/>
      </Layout>
    
    </>
  )
}
