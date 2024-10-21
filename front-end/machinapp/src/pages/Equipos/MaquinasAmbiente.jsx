import { ListarMaquinasAmb, axiosCliente } from "../../index.js"
import { useEffect, useState } from 'react'
import {Layout, Breadcrumb} from "../../index.js"
import { useParams } from "react-router-dom"


export const MaquinasAmbiente=()=>{

    const {idAmbiente} = useParams()

    const [Nombreambiente, setAmbienteNombre] = useState([]) 

    useEffect(()=>{

        const buscarAmbiente = async ()=>{
            try{
                const response = await axiosCliente.get(`sitio/listarsitioporid/${idAmbiente}`)
                setAmbienteNombre(response.data.resultadoSitio[0].sit_nombre)
            
            }catch(error){
                console.error('No se pudo encontrar el ambiente')
            }
        }
        buscarAmbiente()
    }, [idAmbiente])

    return (
      <>
        <Layout titlePage = { `${Nombreambiente}`}>
            <Breadcrumb pageName={`${Nombreambiente}`} />
            <div>
                <ListarMaquinasAmb idAmbiente={idAmbiente}/>
            </div>
        </Layout>
      </>
    )
}
