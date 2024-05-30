import React, { lazy } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";
const navigation = [];

//componentes
const Footer = lazy(() => import("../components/Footer.jsx"));

// registro de usuarios componente
const RegistroUsuarios = lazy(() =>
  import("../components/Auth/RegistroUsuarios.jsx")
);

// login

const Login = lazy(() => import("../components/Auth/Login.jsx"));

const Inicio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="">
        <header className="inset-x-0 top-0  z-50 ">
          <nav
            className="flex  items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex border-b-4 lg:flex-1">
              <figure className="border-r-2  border-gray-300">
                <LazyLoadImage
                  src="logoSenaNaranja.png"
                  className="w-[85px] cursor-pointer bg-white"
                  effect="opacity"
                  alt="logo-sena"
                />
              </figure>
              <div className="flex justify-center items-center ml-2">
                MachinApp
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
          </nav>
          <Dialog
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">{/* contenido aqui */}</div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
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
                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8 ">
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 ">
                          <div className="h-64 w-44 overflow-hidden  rounded-lg sm:opacity-0 lg:opacity-100 bg-black">
                            <LazyLoadImage
                              src="cafe.jpeg"
                              className="h-full w-full object-cover z-20 object-center"
                              effect="blur"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg bg-black">
                            {/*  <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" alt="" class=""> */}
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
                            {/* <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" class=""> */}
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

                  {/* <button className="inline-block rounded-md border border-transparent bg-[#00324D] px-8 py-3 text-center font-medium text-white hover:bg-[#336580]">
                    Crear Cuenta
                  </button> */}
                  <div>
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Login
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <span className="font-bold text-lg">Iniciar Sesion</span>
                        <Login />
                      </div>
                    </dialog>
                  </div>
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
