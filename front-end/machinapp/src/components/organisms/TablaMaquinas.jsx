import { useEffect, useState } from 'react'
/* import FilasTablaMaquinas from "../molecules/FilasTablaMaquinas.jsx" */
import {axiosCliente} from "../../service/api/axios.js"
import {Chip,Tooltip} from "@nextui-org/react"
import { FaEye } from "react-icons/fa"
import { Link } from 'react-router-dom'


import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";




const statusColorMap = {
    operacion: "success",
    fuera_de_servicio: "danger",
    en_reparacion: "warning",
} 
  
const   TablaMaquinas=() =>{

    const [maquinas, setMaquinas] = useState([])

    useEffect(()=>{

        const buscarInfo = async ()=>{

            try{
                const response = await axiosCliente.get('ficha/listar')
                setMaquinas(response.data)
    
            }catch(error){
                console.error('Error listando maquinas ')
            }
        }
        buscarInfo()
        

    }, [])


    return (
        <>
            <Table aria-label="Tabla de maquinas">

                <TableHeader >
                    <TableColumn className='bg-green-600 text-white text-sm' >ID</TableColumn>
                    <TableColumn className='bg-green-600 text-white text-sm'>Placa Sena</TableColumn>
                    <TableColumn className='bg-green-600 text-white text-sm'>Serial</TableColumn>
                    <TableColumn className='bg-green-600 text-white text-sm'>Estado</TableColumn>
                    <TableColumn className='bg-green-600 text-white text-sm'>Ubicacion</TableColumn>
                    <TableColumn className='bg-green-600 text-white text-sm'></TableColumn>
                </TableHeader>

                <TableBody>
                    {
                        maquinas.map((maquina)=>(
                            <TableRow key = {maquina.idFichas} className='hover:bg-base-300'>
                                <TableCell><b>{maquina.idFichas}</b></TableCell>
                                
                                <TableCell>{maquina.fi_placa_sena} </TableCell>
                                <TableCell>{maquina.fi_serial} </TableCell>
                                <TableCell>          
                                    <Chip className="capitalize" color={statusColorMap[maquina.fi_estado]} size="sm" variant="flat">
                                        {maquina.fi_estado}
                                    </Chip>
                                </TableCell>
                                <TableCell>{maquina.sit_nombre}</TableCell>
                                <TableCell>
                                    <Link to= {`/infoMaquina/${maquina.idFichas}`} className='bg-slate-900'>
                                        <Tooltip content="Details">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <FaEye />
                                            </span>
                                        </Tooltip>
                                    </Link>
                                </TableCell>
                                
                            </TableRow>                        
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
  }
  export default TablaMaquinas