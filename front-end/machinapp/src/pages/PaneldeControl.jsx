import React,{useEffect, useState} from 'react'

import LayoutPanelControl from "../components/templates/LayoutPanelControl.jsx"






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