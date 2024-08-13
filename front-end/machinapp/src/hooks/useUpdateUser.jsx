import { axiosCliente } from "../service/api/axios";
import { useState } from "react";

export const useUpdateUser = () => {
  const [loading, setLoadind] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (data, id) => {
    try {
      console.log(data, id);
      /*   const res = await axiosCliente.put(`user/actualizar/${id}`, { data });

      console.log(res.data); */
    } catch (error) {
      setError(error.response);
      setLoadind(false);
    } finally {
      setLoadind(false);
    }
  };

  return { updateUser, loading, error };
};
