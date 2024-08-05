import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { axiosCliente } from "../service/api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  /*  const [loading, setLoading] = useState(false); */

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const res = await axiosCliente.get("user/listar/me");
        setUser(res.data[0]);
      } catch (error) {
        console.log(error.response);
      }
    };
    getDataUser();
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const value = {
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};
