// eslint-disable-next-line no-unused-vars
import React, { lazy } from "react";

// layout
import { Layout } from "../../index.js";
const BuscarUsuario = lazy(() =>
  import("../../components/organisms/ListarUsuario.jsx")
);

const Perfil = () => {
  return (
    <>
      <Layout>
        <div className="px-10 ">
          <span className="text-4xl font-bold text-gray-800 mb-4">Perfil</span>
          <div className="border-b-8 border-green-600 inline-block w-full"></div>
        </div>
        <BuscarUsuario />
      </Layout>
    </>
  );
};

export default Perfil;
