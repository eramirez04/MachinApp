import React from 'react'
import { Link } from "react-router-dom"


const  FilasTablaMantenimientosMa = ({idMantenimiento, codigoMantenimiento, fechaMantenimiento, tipoMantenimiento})=> {
  return (
    <>
        
        <th>{idMantenimiento}</th>
        <td>{codigoMantenimiento}</td>
        <td>{new Date(fechaMantenimiento).toLocaleDateString() }</td>
        <td>{tipoMantenimiento}</td>
        <td className="grid justify-items-center"><Link>Descargar</Link></td> {/* que me envie el pdf del mantenimiento */}
    
    </>
  )
}

export default FilasTablaMantenimientosMa