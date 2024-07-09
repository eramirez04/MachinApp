import React from "react"

const InfoCard = ({placa, serial, tipoEquipo, estado}) => {
  
  let estadoDec

  if(estado == "operacion"){
    estadoDec = <b className="text-green-500 inline">{estado}</b>
  }
  else if (estado == "fuera_de_servicio"){
    estadoDec = <b className="text-red-600 inline">{estado}</b>
  }
  else{
    estadoDec = <b className="text-yellow-500 inline">{estado}</b>
  }
  
  return (
      <>
         <ul>
            <li className="my-1">Placa SENA: {placa}</li>
            <li className="my-1">Serial: {serial}</li>
            <li className="my-1">Tipo de Equipo: {tipoEquipo}</li>
            <li className="my-1">Estado: {estadoDec}</li>
          </ul>
      </>
    )
}
export default InfoCard  