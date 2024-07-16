import { Link } from 'react-router-dom'
import {Chip,Tooltip} from "@nextui-org/react";
import PropTypes from 'prop-types'
import { FaEye } from "react-icons/fa";

const statusColorMap = {
  operacion: "success",
  fuera_de_servicio: "danger",
  en_reparacion: "warning",
}; 

const  FilasTablaMaquinas = ({id, placa, serial, estado, sitNombre})=> {
  return (
    <>
      <td> <b>{id}</b></td>
      <td>{placa}</td>
      <td>{serial}</td>
      <td>
          <Chip className="capitalize" color={statusColorMap[estado]} size="sm" variant="flat">
            {estado}
          </Chip>
      </td>
      <td>{sitNombre}</td>
      <td>
        <Link to= {`/infoMaquina/${id}`} className='bg-slate-900'>
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <FaEye />
            </span>
          </Tooltip>
        </Link>
      </td>
    </>
  )
}

FilasTablaMaquinas.propTypes = {
  id: PropTypes.number.isRequired, 
  placa: PropTypes.string.isRequired,
  serial: PropTypes.string.isRequired,
  estado: PropTypes.string.isRequired,
  sitNombre: PropTypes.string.isRequired,
}


export default FilasTablaMaquinas
