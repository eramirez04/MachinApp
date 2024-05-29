import React, { useState, useEffect, lazy, Suspense } from "react";

import Api from "../../components/Api";

// layout
const Layout = lazy(() => import("../Layout/Layout.jsx"));
const BuscarUsuario = lazy(() =>
  import("../../components/Auth/ListarUsuario.jsx")
);

const Pefil = () => {
  return (
    <>
      <Layout contenido={<BuscarUsuario />} />
    </>
  );
};

export default Pefil;
