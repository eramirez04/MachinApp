import { Suspense, lazy } from "react";
import PropTypes from "prop-types";

//componentes
import { Outlet } from "react-router-dom";
const Header = lazy(() => import("../organisms/Header.jsx"));
const Nav = lazy(() => import("../molecules/Nav.jsx"));
import { AvatarCom } from "../molecules/Avatar.jsx";
import Footer from "../molecules/Footer.jsx";
import MenuMobile from "../molecules/navigation/MenuMobile.jsx";

// hook de rol
import { useAuth } from "../../hooks/useAuth.jsx";

const Layout = ({ children }) => {
  const { rol } = useAuth();
  return (
    <>
      <div className="bg-gray-100">
        <Header color={"bg-white"} contenido={<AvatarCom />} />

        <div className="flex">
          <section className="flex flex-col max-lg:hidden">
            <Nav rol={rol} />
          </section>
          <div className="w-full flex flex-col gap-4 rounded-md  p-5 ">
            <Suspense fallback={<h1>Cargando</h1>}>
              <main className="bg-white radio-error rounded-lg shadow-lg h-full">
                <div className="p-5 z-30 ">
                  <MenuMobile />
                </div>
                {children}
              </main>
              <Outlet />
            </Suspense>
          </div>
        </div>
        <Footer />
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
