import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../molecules/Nav'

const Sedes=()=>  {
    return (
        <div className='bg-white w-full h-full'>
            <Nav/>
            <div className='bg-gray-200 items-center justify-center text-center'>
                <h1 className='center'>CGDSS Sede Yamboro</h1>
                <h3>También llamada Tecnoparque Yamboro, esta sede cuenta con distintas áreas y ambientes distribuidos en todo el territorio.</h3>
            </div>
            <div className='bg-gray-500'>
                <h2>Área de barismo</h2>
                <div className='flex flex-row'>
                <div className='bg-blue-600 w-28 h-28'>p</div>
                <p>Aquí se encuentran los titulados en catación y barismo. En esta área se encuentra la Escuela Nacional de la  Calidad del Café</p>
                <Link to={Areas}></Link><button></button>
                </div>
            </div>
            <div className='bg-gray-500 mt-3'>
                <h2>Área de las TIC</h2>
                <div className='flex flex-row'>
                <div className='bg-blue-600 w-28 h-28'>p</div>
                <p>Aquí se encuentran los titulados en ADSO y Producción Multimedia. En esta área se encuentran bastantes equipos tecnológicos como computadores y televisores.</p>
                </div>
            </div>
        </div>
    )
}

export default Sedes