import React from "react";

import ListarActividades from "../organisms/ListarActividades.jsx";
import RegistrarActividades from '../organisms/RegistroActividades.jsx';







const Modal = () =>{

    return(
        <>
            <div className=" flex flex-col">

                        <div>
                            <ListarActividades/> 
                        </div>
                        <div>
                            <RegistrarActividades/> 
                        </div>    
            </div>
        </>

    )   
}


export default Modal