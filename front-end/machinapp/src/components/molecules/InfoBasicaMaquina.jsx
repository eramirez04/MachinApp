import React from 'react'
import MostrarInfoUnica from "../atoms/MostrarInfoUnica.jsx"


const  InfoBasicaMaquina=({id, serial, placa, feAdquisicion, feInicioGarantia, feFinGrantia})=> {
  return (
    <>
        <MostrarInfoUnica titulo="ID" valor ={id}/>
        <MostrarInfoUnica titulo="Serial" valor ={serial}/>
        <MostrarInfoUnica titulo="Placa SENA" valor ={placa}/>
        <MostrarInfoUnica titulo="Fecha adquisicion" valor ={feAdquisicion}/>
        <MostrarInfoUnica titulo="Fecha Inicio garantia" valor ={feInicioGarantia}/>
        <MostrarInfoUnica titulo="Fecha Fin garantia" valor ={feFinGrantia}/>
    </>
  )
}


export default InfoBasicaMaquina
 