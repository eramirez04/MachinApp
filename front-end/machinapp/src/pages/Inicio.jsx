import React from 'react'

import { Link } from 'react-router-dom'

import Nav from '../components/Nav'

import RegistroActividades from '../components/Actividades/RegistroActividades'


const Inicio=()=>  {

  return (
    <>
      <RegistroActividades/>
      <Nav/>
      <h1 className='center ' >Inicio</h1>
    </>
  )
}

export default Inicio