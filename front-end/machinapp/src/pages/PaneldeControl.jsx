import React,{useEffect, useState} from 'react'

import LayoutPanelControl from "./Layout/LayoutPanelControl.jsx"
import RegistrarActividades from "../components/Actividades/RegistroActividades.jsx"





const PaneldeControlUsuarios = () =>{



    return (
        <>
            <header className="py-2 bg-[#52BD8F] sm:py-2 shadow-2xl">
                <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-4">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <span className='text-white font-bold'>MachinApp</span>
                        </div>
                        <div className="relative hidden md:items-center md:justify-center md:inline-flex group ">
                                    <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>Registro</button>
                                    <dialog id="my_modal_2" className="modal">
                                    <div className="modal-box">
                                        <RegistrarActividades/>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                    </dialog>
                        </div>

                    </div>
                </div>
            </header>
            
        <LayoutPanelControl/>

        </>
    )
}

export default PaneldeControlUsuarios
