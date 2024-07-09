import React, { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useState } from "react"

import BtnDescargar from "../atoms/buttons/BtnDescargar.jsx"

import FilasTablaMantenimientosMa from "../molecules/FilasTablaMantenimientosMa.jsx"


const TablaMantenimientosMa = ({ mantenimientos})=> {

  return (
    <>
        <div className="w-72">
        <h4 className="text-2xl mb-4  text-gray-600 font-semibold">Mantenimientos </h4>
            <table className="table ">
                <thead className="bg-gray-200">
                    <tr className=" bg-green-600 text-white text-sm">
                        <th>ID </th>
                        <th>Codigo </th>
                        <th>Fecha Realizacion</th>
                        <th>Tipo Mantenimiento</th>
                        <th>Descargar PDF</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mantenimientos.map((mantenimiento)=>(
                            <tr key={mantenimiento.idMantenimiento} className='hover:bg-base-300'>
                                <FilasTablaMantenimientosMa 
                                idMantenimiento={mantenimiento.idMantenimiento}
                                codigoMantenimiento={mantenimiento.mant_codigo_mantenimiento}
                                fechaMantenimiento={mantenimiento.mant_fecha_realizacion}
                                tipoMantenimiento={mantenimiento.tipo_mantenimiento}
                                />
                            </tr>
                        ))
                    }
                </tbody>
            </table> 
        </div>
    </>
  )
}
export default TablaMantenimientosMa


/* 

<tr key={mantenimiento.idMantenimiento} className="hover:bg-slate-100 text-gray-600">
<th>{mantenimiento.idMantenimiento}</th>
<td>{mantenimiento.mant_codigo_mantenimiento}</td>
<td>{new Date(mantenimiento.mant_fecha_realizacion).toLocaleDateString() }</td>
<td>{mantenimiento.tipo_mantenimiento}</td>
<td className="grid justify-items-center"><Link><BtnDescargar/></Link></td> {/* que me envie el pdf del mantenimiento }
</tr> */