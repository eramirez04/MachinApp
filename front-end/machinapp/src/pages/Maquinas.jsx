import React from 'react'

import { Link } from 'react-router-dom'

import Nav from '../components/Nav'



//new

import TablaMaquina from '../components/FichasMaquina/TablaMaquinas.jsx'

const Maquinas=()=>  {


  //crear ficha




  //cambiar estado


  //inabilitar 

  //eliminar
  return (
    <>
      <Nav/>
      <h1 className='center ' >Maquinas</h1>
      <Link to={'/maquinas/5'}> Ambeinte 5 </Link>
      <div className='w-full align-text-center'>
        <h2>Maquinas</h2>
      </div>
      <div className=' flex  items-center justify-center'>
        <TablaMaquina/>
      </div>

    </>
  )
}

export default Maquinas