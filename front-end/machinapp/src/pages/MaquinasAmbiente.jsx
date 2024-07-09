
import React, { useEffect, useState } from 'react'
import ListarMaquinasAmb from '../components/organisms/ListarMaquinasAmb.jsx'
import Layout from '../components/templates/Layout.jsx'
import { useParams } from "react-router-dom"
import Api from "../components/atoms/api/Api.jsx"

import BtnAdd from "../components/atoms/buttons/BtnAdd.jsx"
import BtnOutService from "../components/atoms/buttons/BtnOutService.jsx"

const MaquinasAmbiente=()=>{

    const {idAmbiente} = useParams()

    const [Nombreambiente, setAmbienteNombre] = useState([]) 

    /* Hacer consulta para el titulo del sitio o ambiente !!!!!! */

    useEffect(()=>{

        const buscarAmbiente = async ()=>{
            try{
                const response = await Api.get(`sitio/listarsitioporid/${idAmbiente}`)
                setAmbienteNombre(response.data.resultadoSitio[0].sit_nombre)
            
            }catch(error){
                console.error('No se pudo encontrar el ambiente')
            }
        }
        buscarAmbiente()
    }, [idAmbiente])



    return (
      <>
        <Layout
            contenido={
                <div className='mx-12'>
                    <div className='mt-20 flex justify-end '>
                        <BtnAdd className="mx-1"/>
                        <BtnOutService className="mx-1" />
                    </div>
                    <ListarMaquinasAmb idAmbiente={idAmbiente}/>
                </div>
            } 
            titlePage={Nombreambiente}
        />
      </>
    )
}
export default MaquinasAmbiente