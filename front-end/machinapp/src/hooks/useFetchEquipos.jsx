import { useState, useEffect } from "react";
import { axiosCliente } from "../service/api/axios";

export const useFetchEquipo = () => {
  const [equiposData, setEquiposData] = useState([]);
  const [loading, setLoadind] = useState(true);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const res = await axiosCliente.get("ficha/listar");
        setEquiposData(res.data);
      } catch (error) {
        console.error("error", error.response);
      } finally {
        setLoadind(false);
      }
    };
    fetchEquipos();
  }, []);

  return { equiposData, loading };
};
