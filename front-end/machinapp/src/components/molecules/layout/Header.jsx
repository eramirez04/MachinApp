import PropTypes from "prop-types";

import { LazyLoadImage } from "react-lazy-load-image-component";

export const Header = ({ color, contenido }) => {
  return (
    <header
      className={`inset-x-0 top-0 h-16 md:px-8 sm:px-8 max-sm:px-8 ${color} z-50`}
    >
      <nav
        className="flex items-center justify-between  lg:px-8"
        aria-label="Global"
      >
        <div className="flex  shadow-sm lg:flex-1">
          <figure className=" h-16 w-16 border-gray-300">
            <LazyLoadImage
              src="/logoSenaNaranja.png"
              className="h-full w-full cursor-fdfdpointer"
              effect="opacity"
              alt="logo-sena"
            />
          </figure>
          <div className="flex justify-center items-center ml-2">MachinApp</div>
        </div>
        {contenido}
      </nav>
    </header>
  );
};

Header.propTypes = {
  color: PropTypes.string,
  contenido: PropTypes.element,
};
