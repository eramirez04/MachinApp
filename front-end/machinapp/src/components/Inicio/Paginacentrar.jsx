import React from "react";

import Example from "./Calendario";





const Artboard = () =>{

    return(
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className=" bg-[#52BD8F] rounded-3xl shadow-lg flex-row flex items-center justify-center w-11/12 max-w-6xl h-5/6">

                    <div className="  pr-9 pl-8">
                        <div className="flex flex-col h-72 justify-center  bg-[#52BD8F] items-center rounded-box text-neutral-content">
                            <div className=" text-white text-2xl">
                                proxima revision
                            </div>
                          <span className="countdown font-mono text-white text-5xl">
                            <span style={{"--value":1}}></span>
                          </span>
                            <div className=" text-white text-2xl">
                                jueves
                            </div>
        
                        </div> 
                            <div className=" text-white text-2xl">
                                    las siguiente revisiones son:
                                    <div>
                                        cambio de tal 
                                    </div> 
                            </div>
                     </div>
                     
                    <div className=" bg-white  text-black pt-10 h-96 rounded-2xl " >
                        <Example/>
                    </div>
                </div>

            </div>




        </>
    )   
}


export default Artboard