// eslint-disable-next-line no-unused-vars
import React, { lazy } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import Footer from "../components/molecules/Footer.jsx";

// translate
import { useLenguage } from "../hooks/useTranslate.jsx";

import { useTranslation } from "react-i18next";
//componentes
import Header from "../components/molecules/Header.jsx";

// modal
const ModalComponte = lazy(() => import("../components/molecules/Modal.jsx"));

// login
const Login = lazy(() => import("../components/organisms/Login.jsx"));
import { FormUser } from "../components/organisms/formularios/FormUser.jsx";

const Inicio = () => {
  const { t } = useTranslation();
  const { lenguage, onChangeTransalate } = useLenguage();

  return (
    <>
      <div>
        <h1></h1>
        <p></p>

        <div>
          <select
            onChange={(e) => onChangeTransalate(e.target.value)}
            value={lenguage}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      <div className="">
        <Header
          color={"bg-white"}
          contenido={
            <ModalComponte
              buttonModal={"Crea una Cuenta"}
              tittleModal={"Crea tu Cuenta"}
              componente={<FormUser />}
              /*    size={"3xl"} */
              colorButton="success"
              variantButton={"shadow"}
            />
          }
        />
        <div className="relative overflow-hidden bg-gray-50">
          <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div className=" mx-auto max-w-7xl  px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg ">
                <h1 className="text-4xl font-bold tracking-tight text-custom-green sm:text-6xl">
                  {t("description_welcome")}
                </h1>
                <p className="mt-4 text-xl text-custom-blue">{t("welcome")}</p>
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
                          <div className="h-64 w-44 overflow-hidden rounded-lg bg-red-300">
                            <LazyLoadImage
                              src="escuela.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg bg-red-900">
                            <LazyLoadImage
                              src="escuela.jpg"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg bg-black">
                            <LazyLoadImage
                              src="escuela.jpg"
                              className="h-full w-full object-cover object-center"
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
                  <ModalComponte
                    buttonModal={"Login"}
                    tittleModal={"Iniciar Sesion"}
                    colorButton="primary"
                    variantButton={"ghost"}
                    componente={<Login />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inicio;