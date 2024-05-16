import React,{useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";


import Api from "../Api";


const BuscarUsuario = () =>{
    const {id} = useParams()
    const[usuario, setUsuario] = useState({nombre:'', email: ''})

    const navegacion = useNavigate()


    useEffect(()=>{
        const buscar =async () => {
         try {
            const response = await Api.get(`/user/listar/${id}`)
            setUsuario(response)
            console.log(usuario)
         } catch (error) {
            console.error(error.response.data)
            alert(error.response.data.message)
         }   
        }

        buscar()
    }, [id])


    return (
        <>
        hola desde el perfil
        </>
    )
} 

export default BuscarUsuario