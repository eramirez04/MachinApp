import { useState, useEffect } from "react";
import { axiosCliente } from "../service/api/axios";

export const useFetchAmbientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const obtenerAmbientes = async () => {
    try {
      setLoading(true);
      const res = await axiosCliente.get("/sitio/listarsitio");

      setAmbientes(res.data.resultadoSitio);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refress = async () => {
    await obtenerAmbientes();
  };

  useEffect(() => {
    obtenerAmbientes();
  }, []);

  return {
    refress,
    ambientes,
    isLoading,
  };
};
