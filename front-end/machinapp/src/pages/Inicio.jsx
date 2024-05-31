// eslint-disable-next-line no-unused-vars
import React, {lazy} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";

//componentes
const Header = lazy(() => import("../components/organisms/Header.jsx"));


// registro de usuarios componente
const RegistroUsuarios = lazy(() =>
    import("../components/organisms/RegistroUsuarios.jsx")
);
// modal
const Modal = lazy(() => import("../components/molecules/Modal.jsx"));

// login
const Login = lazy(() => import("../components/organisms/Login.jsx"));

const Inicio = () => {
    return (
        <>
            <div className="">
                <Header color={"bg-white"}/>
                <div className="relative overflow-hidden bg-gray-50">
                    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                        <div className=" mx-auto max-w-7xl  px-4 sm:static sm:px-6 lg:px-8">
                            <div className="sm:max-w-lg ">
                                <h1 className="text-4xl font-bold tracking-tight text-custom-green sm:text-6xl">
                                    Mantenimiento, Seguridad y Alerta
                                </h1>
                                <p className="mt-4 text-xl text-custom-blue">
                                    Aquí, cada archivo es una pieza clave para mantener nuestras
                                    máquinas en su máximo esplendor. Descubre la organización
                                    estructurada que preserva la calidad de cada servicio.
                                    ¡Explora, registra y eleva el estándar de tus máquinas y
                                    equipos con nosotros!
                                </p>
                            </div>
                            <div>
                                <div className="mt-10">
                                    {/*  <!-- Decorative image grid --> */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                    >
                                        <div
                                            className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                            <div className="flex items-center space-x-6 lg:space-x-8 ">
                                                <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 ">
                                                    <div
                                                        className="h-64 w-44 overflow-hidden  rounded-lg sm:opacity-0 lg:opacity-100 bg-black">
                                                        <LazyLoadImage
                                                            src="cafe.webp"
                                                            className="h-full w-full object-cover z-20 object-center"
                                                            effect="blur"
                                                        />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg bg-black">

                                                        <LazyLoadImage
                                                            src="escuela.jpg"
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg bg-black">
                                                        {/* <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" alt="" class="h-full w-full object-cover object-center"> */}
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg bg-black">
                                                        {/* <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" class="h-full w-full object-cover object-center"> */}
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg bg-black">
                                                        {/* <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" alt="" class="h-full w-full object-cover object-center"> */}
                                                    </div>
                                                </div>
                                                <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg bg-black">
                                                        <LazyLoadImage
                                                            src="escuela2.jpeg"
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <LazyLoadImage
                                                            src="maquina.jpeg"
                                                            className="h-full w-full object-cover object-center"
                                                            effect="blur"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal buttonModal={"Login"} tittleModal={"Iniciar Sesion"}
                                           componente={<Login/>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  <Footer /> */}
        </>
    );
};

export default Inicio;
