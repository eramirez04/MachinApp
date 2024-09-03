import { useState } from "react"
import { useEffect } from "react"
import { CardStyle } from "../../index.js"
import {axiosCliente} from "../../service/api/axios.js"


const ListarMaquinasAmb = ({idAmbiente}) => {

    const [maquinas, setMaquinas] = useState([])

    useEffect(()=>{
        const buscarMaquinas = async () =>{
            try{
                const response = await axiosCliente.get(`ficha/listarPorAmbiente/${idAmbiente}`)
                setMaquinas(response.data)
                console.log(response.data)
            }
            catch(error){
                console.error('Error listando maquinas por ambiente ', error)
            }
        }
        buscarMaquinas()
    }, [idAmbiente])


  return (
      <>
        <div className = ' bg-white text-gray-600 flex flex-wrap flex-row justify-center my-20 gap-6'>
            {
                maquinas.map((maquina) =>(
                    <div className="w-[250px]" key= {maquina.idFichas}>
                            <CardStyle 
                            subtitle={`${maquina.ti_fi_nombre }`}  
                            titleCard={`Placa:${maquina.fi_placa_sena}`} 
                            imagen={`imagenes/ficha/${maquina.fi_imagen}`}
                            link={`/infoMaquina/${maquina.idFichas}`}
                            nameLink="ver mas" >

                                <ul>
                                    <li><b>Serial:</b> {maquina.fi_serial}</li>
                                    <li><b>Modelo:</b> { maquina.fi_modelo}</li>
                                    <li><b>Estado:</b> {maquina.fi_estado} </li>
                                </ul>

                            </CardStyle>
                    </div>
                ))
            }
        </div>

      </>
    )
}
export default ListarMaquinasAmb  