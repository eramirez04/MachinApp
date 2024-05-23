import React,{useState, useEffect} from "react";


import Api from "../../components/Api";

// layout 
import Layout from "../Layout/Layout.jsx"
import BuscarUsuario from "../../components/Auth/ListarUsuario.jsx";

const Pefil = () =>{
    
    return (
        <>
        <Layout contenido={<BuscarUsuario/>}/>
        </>
    )
}

export default Pefil
