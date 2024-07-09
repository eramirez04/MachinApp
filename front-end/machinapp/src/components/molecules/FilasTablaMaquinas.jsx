import React from 'react'
import { Link } from 'react-router-dom'

import BtnIrMaquina from '../atoms/buttons/BtnIrMaquina'


const  FilasTablaMaquinas = ({id, placa, serial, estado, sitNombre})=> {
  return (
    <>
      <td>
          <div className='rounded-full w-6 h-6 text-center '>{id}</div>
      </td>
      <td>{placa}</td>
      <td>{serial}</td>
      <td>{estado}</td>
      <td>{sitNombre}</td>
      <td><Link to= {`/infoMaquina/${id}`} className='bg-slate-900' ><BtnIrMaquina/></Link></td>
    </>
  )
}

export default FilasTablaMaquinas
