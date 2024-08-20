import { Layout } from "../../index";
import ListarUsuarios from "../../components/organisms/PanelConponents/PDCAcciones/ListarUsuarios.jsx";

const PaneldeControlUsuarios = () => {
  return (
    <>
      <Layout titlePage={"Panel de control"}>
        <div className="px-10 pt-10">
          <span className="text-4xl font-bold text-gray-800 mb-4">
            Listado de Usuarios
          </span>
          <div className="border-b-4 border-blue-500 inline-block w-full"></div>
        </div>
        <ListarUsuarios />
      </Layout>
    </>
  );
};

export default PaneldeControlUsuarios;
