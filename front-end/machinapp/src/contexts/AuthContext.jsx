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

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setRol("");
    localStorage.removeItem("token");
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
    } catch (error) {
      console.log(error);
    }
  };

  const getDataUser = async () => {
    try {
      const res = await axiosCliente.get("user/listar/me");
      setRol(res.data[0].rol_nombre);
      setUser(res.data[0]);
    } catch (error) {
      if (error && error.response) {
        console.error(error.response.data);
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getDataUser();
    } else {
      setUser([]);
    }
  }, []);

  const value = {
    logout,
    rol,
    user,
    login,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.any,
};
