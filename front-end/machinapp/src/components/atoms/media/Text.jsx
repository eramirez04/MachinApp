import PropTypes from "prop-types";

const Paragraphs = ({ children }) => {
  return (
    <>
      {" "}
      <p className="mt-4 text-xl text-custom-blue">{children}</p>{" "}
    </>
  );
};

Paragraphs.propTypes = {
  children: PropTypes.element,
};

export default Paragraphs;
