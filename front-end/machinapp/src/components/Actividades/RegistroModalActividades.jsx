
import React from 'react';
import RegistrarActividades from './RegistroActividades';


const ButtonRegistroModalActividades=() =>{
  return (
    <>
                        <div className="relative hidden md:items-center md:justify-center z-50 md:inline-flex group ">
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
    </>
  );
}
export default ButtonRegistroModalActividades