import { Nav, useAuth, AvatarCom, Footer, Header } from "../../index.js";
import { Suspense } from "react";
import PropTypes from "prop-types";

//componentes
import { Outlet } from "react-router-dom";

import MenuMobile from "../molecules/navigation/MenuMobile.jsx";

export const Layout = ({ children }) => {
  const { rol } = useAuth();
  return (
    <>
      <Header color={"bg-white"} contenido={<AvatarCom />} />

      <main className="flex">
        <section className="flex flex-col max-lg:hidden">
          <Nav rol={rol} />
        </section>
        <section className="w-full flex flex-col gap-4 rounded-md  p-5 ">
          <Suspense fallback={<h1>Cargando</h1>}>
            <main className="bg-white rounded-lg shadow-lg h-full p-5 ">
              <div className="lg:hidden relative z-30  sm:px-6 2xl:p-10">
                <MenuMobile />
              </div>
              {children}
            </main>
            <Outlet />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
};

// forma de prototipar un componente

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  titlePage: PropTypes.string,
};

/* mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 */
