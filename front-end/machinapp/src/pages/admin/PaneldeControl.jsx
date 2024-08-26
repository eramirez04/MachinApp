import { Layout, ListarUsuarios, Breadcrumb } from "../../index";

const PaneldeControlUsuarios = () => {
  return (
    <>
      <Layout titlePage={"Panel de control"}>
        <Breadcrumb pageName={"Listado de Usuarios"} />
        <ListarUsuarios />
      </Layout>
    </>
  );
};

export default PaneldeControlUsuarios;
