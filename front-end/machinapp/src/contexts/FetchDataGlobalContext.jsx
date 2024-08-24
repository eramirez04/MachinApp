import { useFetchSolicitud } from "../index";
import { createContext, useState, useEffect } from "react";
import { useFetchUserData } from "../hooks/user/useFetchUsuarios";
import { useFetchEquipo } from "../hooks/useFetchEquipos";
import PropTypes from "prop-types";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const {
    dataUser,
    loading: loadinDataUser,
    fetcDataUser,
  } = useFetchUserData();

  const { equiposData, loading: loadinDataEquipo } = useFetchEquipo();
  const { solicitudData, loading: loadinDataSolicitud } = useFetchSolicitud();

  const [loading, setLoading] = useState(true);

  const refreshDataUser = async () => {
    await fetcDataUser();
  };

  useEffect(() => {
    setLoading(loadinDataUser || loadinDataEquipo || loadinDataSolicitud);
  }, [loadinDataUser, loadinDataEquipo, loadinDataSolicitud]);

  const value = {
    refreshDataUser,
    loading,
    dataUser,
    equiposData,
    solicitudData,
  };

  return (
    <>
      <GlobalDataContext.Provider value={value}>
        {children}
      </GlobalDataContext.Provider>
    </>
  );
};

GlobalDataProvider.propTypes = {
  children: PropTypes.any,
};
