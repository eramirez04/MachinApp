import { axiosCliente, useAuth } from "../index";
import { useState, useEffect } from "react";

export const useFetchAmbientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { tokenIsValido } = useAuth();

  const obtenerAmbientes = async () => {
    try {
      setLoading(true);
      const res = await axiosCliente.get("/sitio/listarsitio");

      setAmbientes(res.data.resultadoSitio);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const refress = async () => {
    await obtenerAmbientes();
  };

  useEffect(() => {
    if (tokenIsValido) {
      obtenerAmbientes();
    }
  }, [tokenIsValido]);

  return {
    refress,
    ambientes,
    isLoading,
  };
};
