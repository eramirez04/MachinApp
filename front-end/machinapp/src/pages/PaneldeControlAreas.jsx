import React,{useEffect, useState} from 'react'

import LayoutPanelControlAreas from "../components/template/LayoutPanelControlAreas.jsx"






const PaneldeControlAreas = () =>{



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
            
        <LayoutPanelControlAreas/>

        </>
    )
}

export default PaneldeControlAreas