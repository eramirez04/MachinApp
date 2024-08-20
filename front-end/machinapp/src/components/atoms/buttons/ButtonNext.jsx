import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

// seguir trabajando con este componente
// url para mas info
// https://nextui.org/docs/components/button

export const ButtonNext = ({ text, type, color, variant, children }) => {
  return (
    <Button color={color} type={type} variant={variant}>
      {children} {text}
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
