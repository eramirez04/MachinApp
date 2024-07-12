// eslint-disable-next-line no-unused-vars
import React, {lazy} from "react";

// layout
const Layout = lazy(() => import("../../components/template/Layout.jsx"));
const BuscarUsuario = lazy(() =>
    import("../../components/organisms/ListarUsuario.jsx")
);

const Pefil = () => {
    return (
        <>
            <Layout contenido={<BuscarUsuario/>} titlePage={"Perfil de Usuario"}/>
        </>
    );
};

export default Pefil;
