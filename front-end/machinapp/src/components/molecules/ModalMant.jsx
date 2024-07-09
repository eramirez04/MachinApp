import React, { useEffect } from 'react';
import Boton from '../atoms/Boton';

const Modal = ({ id, children, titulo }) => {
    useEffect(() => {
        const dialog = document.getElementById(id);

        const handleClose = (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        };

        dialog.addEventListener('click', handleClose);

        return () => {
            dialog.removeEventListener('click', handleClose);
        };
    }, [id]);

    return (
        <dialog id={id} className="modal">
            <div className="modal-box" style={{  maxWidth: '1500px'  }}>
                <h3 className="font-bold text-lg">{titulo}</h3>
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <Boton texto="Cerrar" onClick={() => document.getElementById(id).close()} />
            </form>
        </dialog>
    );
};

export default Modal;

