import { AuthProvider } from "./AuthContext";
import PropTypes from "prop-types";

export const ProviderContext = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

ProviderContext.propTypes = {
  children: PropTypes.element,
};
