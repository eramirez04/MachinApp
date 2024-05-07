import React from "react";

const Alert = (props) =>{
    let descripcionAlerta = props.descripcion
    return(
        <>
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{descripcionAlerta}</span>
            </div>
        </>
    )
}


export default Alert