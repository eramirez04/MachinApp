import { useFetchSolicitud, useFetchRoles, useFetchAmbientes } from "../index";
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

  const {
    equiposData,
    loading: loadinDataEquipo,
    eroresMaquinas,
    refreshEquipos,
  } = useFetchEquipo();

  const { solicitudData, loading: loadinDataSolicitud } = useFetchSolicitud();
  const { roles, loading: loadingRol, refreshRol } = useFetchRoles();
  const {
    ambientes,
    isLoading: loadinAmbientes,
    refress,
  } = useFetchAmbientes();

  const [loading, setLoading] = useState(true);

  const refreshDataUser = async () => {
    await fetcDataUser();
  };

  useEffect(() => {
    setLoading(
      loadinDataUser ||
        loadinDataEquipo ||
        loadinDataSolicitud ||
        loadingRol ||
        loadinAmbientes
    );
  }, [
    loadinDataUser,
    loadinDataEquipo,
    loadinDataSolicitud,
    loadingRol,
    loadinAmbientes,
  ]);

  const value = {
    refreshDataUser,
    loading,
    dataUser,
    equiposData,
    solicitudData,
    roles,
    refreshRol,
    ambientes,
    refress,
    eroresMaquinas,
    refreshEquipos
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
