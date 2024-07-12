import { Button } from "@headlessui/react";
import PropTypes from "prop-types";

// seguir trabajando con este componente
// url para mas info
// https://nextui.org/docs/components/button

const ButtonNext = ({ text, type, color, variant, children }) => {
  return (
    <Button color={color} className="" type={type} variant={variant}>
      {text}
      {children}
    </Button>
  );
};

ButtonNext.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.any,
};

export default ButtonNext;
