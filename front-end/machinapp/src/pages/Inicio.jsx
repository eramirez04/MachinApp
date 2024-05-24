import React from 'react'


//componentes
import Footer from '../components/Footer.jsx'
import RegistroUsuarios from '../components/Auth/RegistroUsuarios.jsx'

// login
import Login from '../components/Auth/Login.jsx'

const Inicio=()=>  {

  return (
      <>
        <div className="selection:-order-none">
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
                                        <RegistroUsuarios/>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                    </dialog>
                        </div>

                    </div>
                </div>
            </header>
            <div className="md:flex md:justify-center md:gap-14 md:items-center">
                <div className="md:w-1/2 relative sm:px-6 lg:px-8 max-w-7xl pt-24 shadow-2xl">
                    <div className="mb-5 grid items-center  lg:grid-cols-2 ">
                        <div>
                            <h1 className="text-3xl sm:text-3xl lg:text-3xl xl:text-6xl font-bold">Mantenimiento,
                                Seguridad y Alerta</h1>
                            <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
                            Aquí, cada archivo es una pieza clave para mantener nuestras máquinas en su máximo esplendor.
                            Descubre la organización estructurada que preserva la calidad de cada servicio.
                            ¡Explora, registra y eleva el estándar de tus máquinas y equipos con nosotros!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="md:w-4/12">
                    <div className=" bg-white p-6 rounded-lg shadow-2xl ">
                    <Login/>
                    
                    </div>
                </div>

            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Inicio