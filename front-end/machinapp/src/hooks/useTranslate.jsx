import { useContext } from "react";
import { TranslateContext } from "../contexts/TranslationContext";

export const useLenguage = () => {
  return useContext(TranslateContext);
};
