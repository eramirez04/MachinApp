import PropTypes from "prop-types";

import { LazyLoadImage } from "react-lazy-load-image-component";

const Header = ({ color, contenido }) => {
  return (
    <header
      className={`inset-x-0 top-0 h-16 md:px-8 sm:px-8 max-sm:px-8 ${color} z-50`}
    >
      <nav
        className="flex items-center justify-between  lg:px-8"
        aria-label="Global"
      >
        <div className="flex  border-b-4 lg:flex-1">
          <figure className="border-r-2 h-16 w-16 border-gray-300">
            <LazyLoadImage
              src="logoSenaNaranja.png"
              className="h-full w-full cursor-pointer"
              effect="opacity"
              alt="logo-sena"
            />
          </figure>
          <div className="flex justify-center items-center ml-2">MachinApp</div>
        </div>
        {contenido}
        {/*   <MenuMobile /> */}
      </nav>
    </header>
  );
};

Header.propTypes = {
  color: PropTypes.string,
  contenido: PropTypes.element,
};

export default Header;
/* 
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
              <div className="py-6">hola</div>
            </div>
          </div>
        </Dialog.Panel> */
