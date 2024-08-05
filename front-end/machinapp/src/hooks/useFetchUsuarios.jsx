import { axiosCliente } from "../service/api/axios";
import { useEffect, useState } from "react";

export const useFetchUserData = () => {
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetcDataUser = async () => {
    try {
      const res = await axiosCliente.get("/user/listar");
      setDataUser(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcDataUser();
  }, []);

  return { dataUser, loading, fetcDataUser };
};
