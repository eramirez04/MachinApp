import { Layout, Breadcrumb, FormSolicitudesUpdate } from "../../index.js"
import { useParams } from "react-router-dom"

export const  UpdateFormFichaSolicitud = () => {

  const {idSolicitud} = useParams()


  return (
    <>
      <Layout>
        <Breadcrumb pageName={`solicitudes`} />
        <FormSolicitudesUpdate idSolicitud = {idSolicitud}/>
      </Layout>
    
    </>
  )
}
