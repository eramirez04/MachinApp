import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import ButtonSitios from '../../components/sitios/ButtonSitios'
import ButtonAnadir from '../../components/sitios/ButtonAnadir'

const Ambientes=()=>  {
  return (
    <div className='bg-yellow-50 w-full h-full'>
      <Nav/>
      <div className='bg-white w-full h-96'></div>
      <div className='bg-gray-100 items-center justify-center text-center h-40'>
        <h1 className='center text-black p-5 font-bold'>Ambiente B6</h1>
        <h3 className='text-black mt-10'>En este ambiente se encuentran las máquinas de trilla y tostión, las cuales son administradas por los instructores...</h3>
      </div>
      <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col'>
        <div className='bg-yellow-50 w-full h-14'>
          <h2 className='text-black font-semibold'>Trilladora</h2>
        </div>
        <div className='flex flex-row mt-10 items-center'>
          <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
          <p className='text-black ml-10 mb-12'>Esta máquina es utilizada para trillar y moler el café, el cual luego se dejará secar para poder tostarlo.</p>
          <Link to={'/Maquinas'}><ButtonSitios /></Link>
        </div>
      </div>
      <div className='flex bg-gray-300 mt-32 text-center justify-center items-center flex-col'>
        <div className='bg-yellow-50 w-full h-14'>
          <h2 className='text-black font-semibold'>Tostadora</h2>
        </div>
        <div className='flex flex-row mt-10 items-center'>
          <div className='bg-blue-600 w-40 h-40 mb-10'>p</div>
          <p className='text-black ml-10 mb-12'>Esta máquina es utilizada para trillar y moler el café, el cual luego se dejará secar para poder tostarlo.</p>
          <Link to={'/Maquinas'}><ButtonSitios /></Link>
        </div>
      </div>
    </div>
  )
}

export default Ambientes