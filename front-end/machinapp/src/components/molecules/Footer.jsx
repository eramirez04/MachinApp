import React from "react";

const Footer = () =>{
    let hoy = new Date()
    let ahora = hoy.toLocaleDateString()
    const ID = 2669959
    const MachinApp = "MachinApp"
    return (
        <>
            <footer className="rounded-lg shadow dark:bg-gray-900 m-4">
                <div className=" flex-row w-full max-w-screen-xl mx-auto p-2">
                    <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{MachinApp}</span>
                    <span className="block text-gray-500 sm:text-center">Si puedes imaginarlo, Puedes programarlo</span>
                    <p className="flex-row">
                        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {ahora} <a
                            className="hover:underline">{MachinApp}™</a>. <p>ID: {ID}</p></span>
                    </p>
                </div>
            </footer>
        </>
    )
}


export default Footer