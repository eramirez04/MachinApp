import { createContext, useState, useEffect } from "react";
import { useFetchUserData } from "../hooks/useFetchUsuarios";
import PropTypes from "prop-types";
/* import { useAuth } from "../hooks/useAuth"; */

//
export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  // verificamos el rol del usuario logueado
/*   const { rol } = useAuth(); */

  const {
    dataUser,
    loading: loadinDataUser,
    fetcDataUser,
  } = useFetchUserData();

  const [loading, setLoading] = useState(true);

  const refreshDataUser = async () => {
    await fetcDataUser();
  };

  useEffect(() => {
    setLoading(loadinDataUser);
  }, [loadinDataUser]);

  const value = {
    refreshDataUser,
    loading,
    dataUser,
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
