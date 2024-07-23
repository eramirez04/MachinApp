// eslint-disable-next-line no-unused-vars
import React, { lazy } from "react";

// layout
const Layout = lazy(() => import("../../components/template/Layout.jsx"));
const BuscarUsuario = lazy(() =>
  import("../../components/organisms/ListarUsuario.jsx")
);

const Perfil = () => {
  return (
    <>
      <Layout titlePage={"Perfil de Usuario"}>
        <BuscarUsuario />
      </Layout>
    </>
  );
};

export default Perfil;
