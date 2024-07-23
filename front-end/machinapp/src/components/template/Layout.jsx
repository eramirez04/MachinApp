// eslint-disable-next-line no-unused-vars
import React, { Fragment, Suspense, lazy } from "react";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import PropTypes from "prop-types";

//componentes
import { Outlet } from "react-router-dom";
const Header = lazy(() => import("../organisms/Header.jsx"));
const Banner = lazy(() => import("../molecules/Banner.jsx"));
const Nav = lazy(() => import("../molecules/Nav.jsx"));
import { AvatarCom } from "../molecules/Avatar.jsx";

// contexto Banner
import { BannerContext } from "../../contexts/BannerContext.jsx";

const Layout = ({ children, titlePage }) => {
  return (
    <>
      <div className="bg-gray-100">
        <Header color={"bg-white"} contenido={<AvatarCom />} />
        <BannerContext.Provider value={{ titleBanner: titlePage }}>
          <Banner />
        </BannerContext.Provider>

        <div className="flex">
          <section className="flex flex-col w-2/12 max-lg:hidden">
            <Nav />
          </section>
          <div className="w-5/6 flex flex-col gap-4 rounded-box bg-white">
            <Suspense fallback={<h1>Cargando</h1>}>
              {children}
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

// forma de prototipar un componente

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  titlePage: PropTypes.string.isRequired,
};

export default Layout;
