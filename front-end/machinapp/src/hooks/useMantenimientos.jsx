import { axiosCliente } from "../index";
import { useState, useEffect } from "react";

export const useMantenimientosQuery = () => {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const res = await axiosCliente.get("mantenimiento/grafica/");
        setMantenimientos(res.data);
        setisLoading(false);
        return res.data;
      } catch (error) {
        setisLoading(false);
        console.error(error.response.data);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    mantenimientos,
    isLoading,
  };
};
