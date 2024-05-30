// eslint-disable-next-line no-unused-vars
import React from 'react';


// eslint-disable-next-line react/prop-types
const Modal = ({buttonModal, tittleModal, componente}) => {
    return (
        <>
            <div>
                <button
                    className="btn"
                    onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                    }
                >
                    {buttonModal}
                </button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <span className="font-bold text-lg">{tittleModal}</span>
                        {componente}
                    </div>
                </dialog>
            </div>
        </>
    )
}


export default Modal;
