import Layout from "../components/template/Layout.jsx";
import ListarUsuarios from "../components/organisms/PanelConponents/PDCAcciones/ListarUsuarios.jsx";
const PaneldeControlUsuarios = () => {
  return (
    <>
      <Layout titlePage={"Panel de control"}>
        <ListarUsuarios />
      </Layout>
    </>
  );
};

export default PaneldeControlUsuarios;
