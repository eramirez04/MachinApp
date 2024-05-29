import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ButtonSitios from '../components/sitios/ButtonSitios'

const Sitios=()=>  {
  return (
    <div className='bg-yellow-50 w-full h-full'>
      <Nav/>
      <div className='bg-white w-full h-96'></div>
      <div className='bg-gray-100 items-center justify-center text-center h-40'>
        <h1 className='center text-black p-5 font-bold'>Centro de Gestión y Desarrollo Sostenible Surcolombiano</h1>
        <h3 className='text-black mt-10'>Este centro está ubicado en el departamento del Huila, municipio de Pitalito. Este centro cuenta con dos sedes a día de hoy.</h3>
      </div>
      <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col'>
        <div className='bg-yellow-50 w-full h-14'>
          <h2 className='text-black font-semibold'>Sede Yamboro</h2>
        </div>
        <div className='flex flex-row mt-10 items-center'>
          <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
          <p className='text-black ml-10 mb-12'>Esta sede se encuentra en el corregimiento de Yamboro. En esta sede se encuentra la Escuela Nacional de la Calidad del Café.</p>
          <Link to={'/Sedes'}><ButtonSitios /></Link>
        </div>
      </div>
      <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col'>
      <div className='bg-yellow-50 w-full h-14'>
        <h2 className='text-black font-semibold '>Sede Comercio y Servicios</h2>
      </div>
        <div className='flex flex-row mt-10 items-center'>
          <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
          <p className='text-black ml-10 mb-12'>Esta sede se encuentra en el corregimiento de Yamboro. En esta sede se encuentra la Escuela Nacional de la Calidad del Café.</p>
          <Link to={'/Sedes'}><ButtonSitios /></Link>
        </div>
      </div>
    </div>
  )
}

export default Sitios