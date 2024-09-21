import { useState, useEffect } from "react";
import { axiosCliente } from "../service/api/axios";

export const useFetchEquipo = () => {
  const [equiposData, setEquiposData] = useState([]);
  const [loading, setLoadind] = useState(true);
  const [eroresMaquinas, setErroresMaquinas] = useState([]);

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
    fetchEquipos();
  }, []);

  return { equiposData, loading, eroresMaquinas, refreshEquipos };
};
