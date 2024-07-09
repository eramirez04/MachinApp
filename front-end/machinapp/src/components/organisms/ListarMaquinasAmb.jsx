import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import CardMaquinas from "../molecules/CardMaquinas.jsx"
import { Link, useParams } from "react-router-dom"
import api from "../atoms/api/Api.jsx"

const ListarMaquinasAmb = ({idAmbiente}) => {

    const [maquinas, setMaquinas] = useState([])

    useEffect(()=>{
        const buscarMaquinas = async () =>{
            try{
                const response = await api.get(`ficha/listarPorAmbiente/${idAmbiente}`)
                setMaquinas(response.data)
                
            }
            catch(error){
                console.error('Error listando maquinas por ambiente ', error)
            }
        }
        buscarMaquinas()
    }, [idAmbiente])


  return (
      <>
        <div className = ' bg-white text-gray-600 flex flex-wrap flex-row justify-center my-16'>
            {
                maquinas.map((maquina) =>(
                    <div key= {maquina.idFicha}>
                        <Link  to= {`/infoMaquina/${maquina.idFicha}`} >
                            <CardMaquinas placa={maquina.placa_sena} serial ={maquina.serial} tipoEquipo={maquina.tipoEquipo[0].ti_fi_nombre} estado={maquina.estado} img={maquina.imagen}/>
                        </Link>
                    </div>
                ))
            }
        </div>

      </>
    )
}
export default ListarMaquinasAmb  