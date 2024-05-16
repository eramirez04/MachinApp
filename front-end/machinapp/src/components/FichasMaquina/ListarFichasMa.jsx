import React from "react"

import api from "../Api"
import { useState } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import Nav from "../Nav"
import Header from "../Header"

const ListarFichasMa= ()=>{

    const [maquinas, setMaquinas] = useState([])
    const {idAmbiente} = useParams() 

    useEffect(()=>{
        const buscarMaquinas = async () =>{
            try{
                const response = await api.get(`ficha/listarPorAmbiente/${idAmbiente}`)
                setMaquinas(response.data)
                console.log(response.data)

            }
            catch(error){
                console.error('Error listando maquinas por ambiente ', error)
            }
        }
        buscarMaquinas()
    }, [idAmbiente])

    const estadoMaquina =(estadoMaquina)=>{
        if(estadoMaquina == "operacion"){
            return <b className="text-green-500 inline">{estadoMaquina}</b>
        }
        else if (estadoMaquina == "fuera_de_servicio"){
            return <b className="text-red-600 inline">{estadoMaquina}</b>
        }
        else{
            return <b className="text-yellow-500 inline">{estadoMaquina}</b>
        }
    }
    const rutaImg=(rutaImg)=>{

        let direccionImg =  `http://localhost:3000/imagenes/ficha/${rutaImg}`
        return direccionImg
    }

    return(
        <>
            <Header/>
            <Nav className="z-10"/>

            <div className="bg-white py-28 ">
            
                <h2 className="text-5xl font-semibold mx-40 text-green-700 mb-12 ">Ambiente</h2>
                
                <div>
                <Link><button className="btn btn-success"> Agregar</button></Link>
                </div>
                
                

                <div className= 'mx-20 bg-white text-gray-600 flex flex-wrap flex-row justify-center'>
                
                    {
                        maquinas.map((maquina) =>(
                            <Link to = {`/maquinaInfo/${maquina.idFicha}`} >
                            <div className="card w-72 bg-gray-100 shadow-xl flex m-7 hover:drop-shadow-2xl static" key= {maquina.idFicha}>

                                <figure><img src={rutaImg(maquina.imagen)} alt="maquina" /></figure>
                                <div className="card-body">
                                    <ul>
                                        <li>Placa SENA: {maquina.placa_sena}</li>
                                        <li>Serial: {maquina.serial}</li>
                                        <li>Tipo de Equipo: {maquina.tipoEquipo[0].ti_fi_nombre}</li>
                                        <li>Estado: {estadoMaquina(maquina.estado)}</li>
                                    </ul>
                                </div>
                            </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ListarFichasMa