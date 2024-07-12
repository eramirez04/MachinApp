import React,{useEffect, useState} from 'react'

import LayoutPanelControl from "../components/template/LayoutPanelControl.jsx"

import api from '../components/atoms/api/Api.jsx'

import { Link, useNavigate } from 'react-router-dom'

import Nav from '../components/molecules/Nav.jsx'
import Header from '../components/organisms/Header.jsx'

import ButtonU from '../components/atoms/buttons/BottonU.jsx'
import ButtonD from '../components/atoms/buttons/BottonD.jsx'
import ButtonC from '../components/atoms/buttons/BottonC.jsx'

const ListarUsuarios = () =>{

    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const buscarUsuarios = async ()=>{
            try{
                const response = await api.get('/user/listar')
                setUsuarios(response.data.resultadoUser)

                
            } catch(error){
                console.error('Error listando usuarios:', error)
            }
        }

        buscarUsuarios() 
    }, [])


}




const PaneldeControlUsuarios = () =>{



    return (
        <>
            <header className="py-2 bg-[#52BD8F] sm:py-2 shadow-2xl">
                <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-4">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <span className='text-white font-bold'>MachinApp</span>
                        </div>

                    </div>
                </div>
            </header>
            
        <LayoutPanelControl/>

        </>
    )
}

export default PaneldeControlUsuarios