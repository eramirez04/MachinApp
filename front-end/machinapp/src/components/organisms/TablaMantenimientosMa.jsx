
import PropTypes from 'prop-types'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip,} from "@nextui-org/react"
import { CiSaveDown1 } from "react-icons/ci";



const TablaMantenimientosMa = ({ mantenimientos})=> {

  return (
    <>
        <Table  aria-label="Tabla de mantenimientos">
            <TableHeader >
                    <TableColumn className='bg-green-600 text-white text-[12px]' >ID </TableColumn>
                    <TableColumn className='bg-green-600 text-white text-[12px]'>Codigo </TableColumn>
                    <TableColumn className='bg-green-600 text-white text-[12px]'>Fecha Realizacion</TableColumn>
                    <TableColumn className='bg-green-600 text-white text-[12px]'>Tipo Mantenimiento</TableColumn>
                    <TableColumn className='bg-green-600 text-white text-[12px]'> PDF</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    mantenimientos.map((mantenimiento)=>(
                        <TableRow key={mantenimiento.idMantenimiento} className='hover:bg-base-300 '>
                            <TableCell className="py-4 px-5"><b>{mantenimiento.idMantenimiento}</b></TableCell>
                            <TableCell className="py-4 px-5">{mantenimiento.mant_codigo_mantenimiento}</TableCell>
                            <TableCell className="py-4 px-5" >{ new Date(mantenimiento.mant_fecha_realizacion ).toLocaleDateString()}</TableCell>
                            <TableCell className="py-4 px-5" >{ mantenimiento.tipo_mantenimiento }</TableCell>
                            <TableCell className="py-4 px-5">
                                <a href={`http://localhost:3000/fichasTecnicas/1.pdf`} target="_blank" download>  {/* Cambiar esto, debe mandar a la ruta exacta donde se almacenan los mantenimientos */}
                                    <Tooltip content="Download" >
                                        <span className="text-xl cursor-pointer active:opacity-50  text-green-600">
                                            <CiSaveDown1 />
                                        </span>
                                    </Tooltip>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table> 
    </>
  )
}

TablaMantenimientosMa.propTypes = {
    mantenimientos: PropTypes.array.isRequired
  };
export default TablaMantenimientosMa


/* 

<tr key={mantenimiento.idMantenimiento} className="hover:bg-slate-100 text-gray-600">
<th>{mantenimiento.idMantenimiento}</th>
<td>{mantenimiento.mant_codigo_mantenimiento}</td>
<td>{new Date(mantenimiento.mant_fecha_realizacion).toLocaleDateString() }</td>
<td>{mantenimiento.tipo_mantenimiento}</td>
<td className="grid justify-items-center"><Link><BtnDescargar/></Link></td> {/* que me envie el pdf del mantenimiento }
</tr> */