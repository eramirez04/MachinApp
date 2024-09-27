import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { axiosCliente } from "../service/api/axios";
import { slepp } from "../utils/sleep";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [rol, setRol] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState("");

  const [tokenIsValido, settokenIsValido] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setRol("");
    localStorage.removeItem("token");
    localStorage.setItem("valido", false);
    navigate("/");
  };

  const login = async (data) => {
    setLoading(true); // Iniciar carga al hacer login
    try {
      const response = await axiosCliente.post("/login", {
        correo: data.Correo,
        contrasenia: data.Contraseña,
      });

      // si la respuesta es exitosa, redirecciona a la pantalla home, y guarda token en localstorage
      if (response) {
        setLocalStorage(response.data.token);
        settokenIsValido(true);
        await getDataUser();
        await slepp(1000);
        /*    setLoading(false); */
        navigate("/home");
      }
    } catch (error) {
      return error.response;
    } finally {
      setLoading(false); // Finalizar carga después de login
    }
  };

  // funcion para gurdar token en local6storage
  const setLocalStorage = (token) => {
    try {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("valido", true);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataUser = async () => {
    try {
      const res = await axiosCliente.get("user/listar/me");
      setRol(res.data[0].rol_nombre);
      settokenIsValido(true);
      setUser(res.data[0]);
    } catch (error) {
      console.error(error.response);
      if (error && error.response) {
        setErrorAuth(error.response);
      }
    }
  };

  const refreshUserLoged = async () => {
    return await getDataUser();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const valido = localStorage.getItem("valido");
    if (token && valido) {
      settokenIsValido(true);
      getDataUser();
    } else {
      setUser([]);
    }
  }, [tokenIsValido]);

  const value = {
    logout,
    rol,
    refreshUserLoged,
    user,
    login,
    loading,
    errorAuth,
    tokenIsValido,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};
