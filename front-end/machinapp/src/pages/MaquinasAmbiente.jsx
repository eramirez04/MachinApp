
import { useEffect, useState } from 'react'
import ListarMaquinasAmb from '../components/organisms/ListarMaquinasAmb.jsx'
import Layout from '../components/template/Layout.jsx'
import { useParams } from "react-router-dom"

import {axiosCliente} from "../service/api/axios.js"


const MaquinasAmbiente=()=>{

    const {idAmbiente} = useParams()

    const [Nombreambiente, setAmbienteNombre] = useState([]) 

    /* Hacer consulta para el titulo del sitio o ambiente !!!!!! */

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
            <div className='mx-12'>
                        <div className='mt-20 flex justify-end '>
    {/*                         <BtnAdd className="mx-1"/>
                            <BtnOutService className="mx-1" /> */}
                        </div>
                        <ListarMaquinasAmb idAmbiente={idAmbiente}/>
            </div>
        </Layout>
      </>
    )
}
export default MaquinasAmbiente