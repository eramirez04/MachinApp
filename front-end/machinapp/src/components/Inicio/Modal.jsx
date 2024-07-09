import React from "react";

import ListarActividades from "../Actividades/AAcciones/ListarActividades";
import RegistrarActividades from '../Actividades/RegistroActividades.jsx';







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

