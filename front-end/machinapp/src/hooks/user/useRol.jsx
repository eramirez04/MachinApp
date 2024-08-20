import { useState, useEffect } from "react";
import { axiosCliente } from "../../service/api/axios";

//listar roles

export const useFetchRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoadind] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosCliente.get("rol/listar");

        setRoles(res.data);
      } catch (error) {
        setError(error.response);
        setLoadind(false);
        throw error;
      } finally {
        setLoadind(false);
      }
    };
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
  };
};

// registrar roles
