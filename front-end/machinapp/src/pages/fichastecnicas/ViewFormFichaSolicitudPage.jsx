import { Layout, Breadcrumb } from "../../index";
import { FormFichaSolicitud } from "../../components/organisms/formularios/FormFichaSolicitud";

export const FichaSolicitudPage = () => {
  return (
    <>
      <Layout>
        <Breadcrumb pageName={"Solicitud de Mantenimiento"} />
        <FormFichaSolicitud />
      </Layout>
    </>
  );
};

/*         <div className="px-10 pt-10">
          <span className="text-4xl font-bold text-gray-800 mb-4">
            Crear solicitud de Mantenimiento
          </span>
          <div className="border-b-4 border-blue-500 inline-block w-full"></div>
        </div>
 */
