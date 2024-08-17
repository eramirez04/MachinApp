import { axiosCliente } from "../../service/api/axios";
import { useState, useEffect } from "react";

export const useSolicitudFichasData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registrarSolicitudFichas = async (data) => {
    let has = {};

    const newDataSolicitud = data.filter((o) =>
      has[o.fk_ficha] ? false : (has[o.fk_ficha] = true)
    );

    try {
      const res = await axiosCliente.post(
        "solicitudesfichas/",
        newDataSolicitud
      );

      return res.data;
    } catch (error) {
      setError(error.response);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    registrarSolicitudFichas,
    error,
    loading,
  };
};

export const useFetchSolicitud = () => {
  const [solicitudData, setsolicitudData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataSoliticitud = async () => {
      setLoading(true);
      try {
        const res = await axiosCliente.get("/solicitud/");

      /*   console.log(res.data);
 */
        setsolicitudData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setError(error.response);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchDataSoliticitud();
  }, []);

  return {
    solicitudData,
    error,
    loading,
  };
};
