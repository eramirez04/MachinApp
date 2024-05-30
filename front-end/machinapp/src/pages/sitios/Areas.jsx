import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import ButtonSitios from '../../components/sitios/ButtonSitios'
import ButtonAnadir from '../../components/sitios/ButtonAnadir'

const Areas=()=>  {
  return (
    <div className='bg-yellow-50 w-full h-full'>
      <Nav/>
      <div className='bg-white w-full h-96'></div>
      <div className='bg-gray-100 items-center justify-center text-center h-40'>
        <h1 className='center text-black p-5 font-bold'>Área de Barismo</h1>
        <h3 className='text-black mt-10'>En este área se encuentra la Escuela Nacional de la Calidad del Café, junto con distintos módulos (Trilla, tostión, análisis físico y sensorial, etc.)</h3>
      </div>
      <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col'>
        <div className='bg-yellow-50 w-full h-14'>
          <h2 className='text-black font-semibold'>Ambiente B6</h2>
        </div>
        <div className='flex flex-row mt-10 items-center'>
          <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
          <p className='text-black ml-10 mb-12'>En este ambiente se encuentra el titulado de Barismo, en el cual se realizan pruebas de catación...</p>
          <Link to={'/Ambientes'}><ButtonSitios /></Link>
        </div>
      </div>
      <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col'>
      <div className='bg-yellow-50 w-full h-14'>
        <h2 className='text-black font-semibold '>Ambiente B7</h2>
      </div>
        <div className='flex flex-row mt-10 items-center'>
          <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
          <p className='text-black ml-10 mb-12'>En este ambiente se encuentra el titulado de Barismo, en el cual se realizan pruebas de catación...</p>
          <Link to={'/Ambientes'}><ButtonSitios /></Link>
        </div>
      </div>
    </div>
  )
}

export default Areas