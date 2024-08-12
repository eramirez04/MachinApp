import { useContext } from "react";
import { GlobalDataContext } from "../contexts/FetchDataGlobalContext";

export const useGlobalData = () => {
  return useContext(GlobalDataContext);
};
