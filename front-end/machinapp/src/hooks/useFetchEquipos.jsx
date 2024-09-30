import { useAuth, axiosCliente } from "../index";
import { useState, useEffect } from "react";

export const useFetchEquipo = () => {
  const [equiposData, setEquiposData] = useState([]);
  const [loading, setLoadind] = useState(true);
  const [eroresMaquinas, setErroresMaquinas] = useState([]);

  // verificamos que el token sea valida para poder hacer la peticion a la api
  const { tokenIsValido } = useAuth();

  const fetchEquipos = async () => {
    try {
      const res = await axiosCliente.get("ficha/listar");
      setEquiposData(res.data);
    } catch (error) {
      setErroresMaquinas(error.response.data);
    } finally {
      setLoadind(false);
    }
  };

  const refreshEquipos = async () => {
    await fetchEquipos();
  };

  useEffect(() => {
    if (tokenIsValido) {
      fetchEquipos();
    }
  }, [tokenIsValido]);

  return { equiposData, loading, eroresMaquinas, refreshEquipos };
};
