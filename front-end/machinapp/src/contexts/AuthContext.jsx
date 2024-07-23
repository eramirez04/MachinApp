import { createContext /*  useState, useContext, useEffect */ } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    alert("hola como estas");
    navigate("/");
  };

  const value = {
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.element,
};
