
import React, { useState } from "react";


const Header = () => {
    return(
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
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                                </dialog>
                    </div>

                </div>
            </div>
        </header>
    )
};

export default Header;